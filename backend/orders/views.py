from decimal import Decimal
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import User
from restaurants.models import Restaurant, FoodItem
from payments.models import Coupon, Payment
from .models import Order, OrderItem, OrderStatusHistory, DeliveryAssignment
from .serializers import OrderSerializer

class OrderCreateView(APIView):
    def post(self, request):
        data = request.data
        items_data = data.get('items', [])
        restaurant_id = data.get('restaurant_id')
        user_id = data.get('user_id')
        coupon_code = data.get('coupon_code', '').strip().upper()
        special_instructions = data.get('special_instructions', '')
        delivery_address = data.get('delivery_address', {
            'line1': 'Flat 402, Golden Towers, Anna Nagar',
            'city': 'Chennai',
            'pincode': '600040'
        })
        payment_method = data.get('payment_method', 'UPI')

        if not items_data:
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        # Get or fallback user
        user = None
        if user_id:
            user = User.objects.filter(id=user_id).first()
        if not user:
            user = User.objects.first()

        restaurant = None
        if restaurant_id:
            restaurant = Restaurant.objects.filter(id=restaurant_id).first()
        if not restaurant and items_data:
            first_food = FoodItem.objects.filter(id=items_data[0].get('id')).first()
            if first_food:
                restaurant = first_food.restaurant
        if not restaurant:
            restaurant = Restaurant.objects.first()

        # Recalculate Subtotal securely on backend
        subtotal = Decimal('0.00')
        order_items_to_create = []

        for it in items_data:
            food_item = FoodItem.objects.filter(id=it.get('id')).first()
            qty = int(it.get('quantity', 1))
            if food_item:
                item_price = food_item.price
                item_name = food_item.name
            else:
                item_price = Decimal(str(it.get('price', 199)))
                item_name = it.get('name', 'Delicious Item')

            subtotal += item_price * qty
            order_items_to_create.append({
                'food_item': food_item,
                'name': item_name,
                'price': item_price,
                'quantity': qty,
                'options': it.get('options', []),
                'note': it.get('note', '')
            })

        # Calculate Fees & Discounts
        delivery_fee = Decimal('40.00')
        if subtotal > Decimal('500.00'):
            delivery_fee = Decimal('0.00')

        platform_fee = Decimal('5.00')
        tax = (subtotal * Decimal('0.05')).quantize(Decimal('0.01'))

        discount = Decimal('0.00')
        if coupon_code:
            coupon = Coupon.objects.filter(code__iexact=coupon_code, active=True).first()
            if coupon and subtotal >= coupon.min_order:
                if coupon.discount_type == 'percent':
                    discount = (subtotal * (coupon.value / Decimal('100.00'))).quantize(Decimal('0.01'))
                    if discount > coupon.max_discount:
                        discount = coupon.max_discount
                else:
                    discount = coupon.value
            elif coupon_code == 'FOOD50':
                discount = (subtotal * Decimal('0.50')).quantize(Decimal('0.01'))
                if discount > Decimal('150.00'):
                    discount = Decimal('150.00')

        total = subtotal + delivery_fee + platform_fee + tax - discount
        if total < Decimal('0.00'):
            total = Decimal('0.00')

        # Create Order
        order = Order.objects.create(
            user=user,
            restaurant=restaurant,
            status='Placed',
            delivery_address=delivery_address,
            subtotal=subtotal,
            tax=tax,
            delivery_fee=delivery_fee,
            platform_fee=platform_fee,
            discount=discount,
            total=total,
            coupon_code=coupon_code,
            special_instructions=special_instructions,
            estimated_delivery_time='30-40 mins'
        )

        for oi in order_items_to_create:
            OrderItem.objects.create(
                order=order,
                food_item=oi['food_item'],
                name=oi['name'],
                price=oi['price'],
                quantity=oi['quantity'],
                options=oi['options'],
                note=oi['note']
            )

        # Status History initial
        OrderStatusHistory.objects.create(order=order, status='Placed', note='Order has been placed successfully')

        # Delivery partner assignment
        DeliveryAssignment.objects.create(
            order=order,
            partner_name='Ravi Kumar',
            partner_phone='+91 98765 43210',
            partner_rating=Decimal('4.9'),
            current_lat=restaurant.latitude,
            current_lng=restaurant.longitude
        )

        # Payment record
        Payment.objects.create(
            order=order,
            gateway_order_id=f"pay_order_{order.order_id}",
            gateway_payment_id=f"pay_txn_{order.order_id}",
            amount=total,
            status='success' if payment_method != 'Cash on Delivery' else 'pending',
            method=payment_method
        )

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

class OrderDetailView(APIView):
    def get(self, request, pk_or_code):
        order = Order.objects.filter(order_id=pk_or_code).first()
        if not order and pk_or_code.isdigit():
            order = Order.objects.filter(id=int(pk_or_code)).first()
            
        if not order:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response(OrderSerializer(order).data)

class OrderCancelView(APIView):
    def post(self, request, pk_or_code):
        order = Order.objects.filter(order_id=pk_or_code).first()
        if not order and pk_or_code.isdigit():
            order = Order.objects.filter(id=int(pk_or_code)).first()

        if not order:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        if order.status in ['Preparing', 'Ready', 'Out for delivery', 'Delivered']:
            return Response({'error': f'Order cannot be cancelled in "{order.status}" stage.'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = 'Cancelled'
        order.save()
        OrderStatusHistory.objects.create(order=order, status='Cancelled', note='Cancelled by customer')

        return Response({'message': 'Order cancelled successfully', 'status': order.status})

class OrderSimulateStepView(APIView):
    """
    Progresses order step through the lifecycle:
    Placed -> Accepted -> Preparing -> Ready -> Out for delivery -> Delivered
    Also updates delivery partner coordinates smoothly.
    """
    def post(self, request, pk_or_code):
        order = Order.objects.filter(order_id=pk_or_code).first()
        if not order and pk_or_code.isdigit():
            order = Order.objects.filter(id=int(pk_or_code)).first()

        if not order:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        FLOW = ['Placed', 'Accepted', 'Preparing', 'Ready', 'Out for delivery', 'Delivered']
        current_status = order.status

        # If custom target status provided by restaurant or delivery partner
        target_status = request.data.get('status')
        if target_status and target_status in FLOW:
            order.status = target_status
        else:
            if current_status in FLOW and FLOW.index(current_status) < len(FLOW) - 1:
                order.status = FLOW[FLOW.index(current_status) + 1]
            elif current_status == 'Delivered':
                order.status = 'Delivered'

        order.save()
        OrderStatusHistory.objects.create(order=order, status=order.status, note=f'Status transitioned to {order.status}')

        # Move simulated delivery partner coordinates
        assignment = getattr(order, 'delivery_assignment', None)
        if assignment:
            # Interpolate towards delivery address
            dest_lat = Decimal('13.0850')
            dest_lng = Decimal('80.2100')
            start_lat = order.restaurant.latitude
            start_lng = order.restaurant.longitude

            progress_ratio = {
                'Placed': 0.0,
                'Accepted': 0.1,
                'Preparing': 0.25,
                'Ready': 0.4,
                'Out for delivery': 0.7,
                'Delivered': 1.0
            }.get(order.status, 0.5)

            assignment.current_lat = (start_lat + (dest_lat - start_lat) * Decimal(str(progress_ratio))).quantize(Decimal('0.000001'))
            assignment.current_lng = (start_lng + (dest_lng - start_lng) * Decimal(str(progress_ratio))).quantize(Decimal('0.000001'))
            assignment.save()

        return Response(OrderSerializer(order).data)

class OrderHistoryView(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')
        orders = Order.objects.all().order_by('-created_at')
        if user_id:
            orders = orders.filter(user_id=user_id)
        return Response(OrderSerializer(orders[:15], many=True).data)
