from decimal import Decimal
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from orders.models import Order
from .models import Payment, Coupon
from .serializers import CouponSerializer

class CouponValidateView(APIView):
    def post(self, request):
        code = request.data.get('code', '').strip().upper()
        subtotal = Decimal(str(request.data.get('subtotal', 0)))

        coupon = Coupon.objects.filter(code__iexact=code, active=True).first()
        if not coupon:
            if code == 'FOOD50':
                # Built-in 50% discount from UI reference
                discount = (subtotal * Decimal('0.50')).quantize(Decimal('0.01'))
                if discount > Decimal('150.00'):
                    discount = Decimal('150.00')
                return Response({
                    'valid': True,
                    'code': 'FOOD50',
                    'discount': float(discount),
                    'description': '50% OFF applied! (Up to ₹150)'
                })
            return Response({'valid': False, 'message': 'Invalid or expired promo code'}, status=status.HTTP_400_BAD_REQUEST)

        if subtotal < coupon.min_order:
            return Response({'valid': False, 'message': f'Minimum order amount of ₹{coupon.min_order} required'}, status=status.HTTP_400_BAD_REQUEST)

        if coupon.discount_type == 'percent':
            discount = (subtotal * (coupon.value / Decimal('100.00'))).quantize(Decimal('0.01'))
            if discount > coupon.max_discount:
                discount = coupon.max_discount
        else:
            discount = coupon.value

        return Response({
            'valid': True,
            'code': coupon.code,
            'discount': float(discount),
            'description': coupon.description
        })

class PaymentVerifyView(APIView):
    def post(self, request):
        order_id = request.data.get('order_id')
        payment_method = request.data.get('payment_method', 'UPI')
        
        order = Order.objects.filter(order_id=order_id).first()
        if not order and order_id and order_id.isdigit():
            order = Order.objects.filter(id=int(order_id)).first()

        if not order:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        payment, _ = Payment.objects.get_or_create(
            order=order,
            defaults={
                'amount': order.total,
                'gateway_order_id': f"razor_order_{order.order_id}",
                'gateway_payment_id': f"razor_pay_{order.order_id}",
                'status': 'success',
                'method': payment_method
            }
        )
        payment.status = 'success'
        payment.method = payment_method
        payment.save()

        return Response({
            'success': True,
            'order_id': order.order_id,
            'amount': float(order.total),
            'status': 'Payment Successful',
            'celebration': True
        })
