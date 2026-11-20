from rest_framework import serializers
from .models import Order, OrderItem, OrderStatusHistory, DeliveryAssignment

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'food_item', 'name', 'price', 'quantity', 'options', 'note']

class OrderStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatusHistory
        fields = ['id', 'status', 'note', 'timestamp']

class DeliveryAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAssignment
        fields = ['partner_name', 'partner_phone', 'partner_rating', 'current_lat', 'current_lng', 'updated_at']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_history = OrderStatusHistorySerializer(many=True, read_only=True)
    delivery_assignment = DeliveryAssignmentSerializer(read_only=True)
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    restaurant_image = serializers.CharField(source='restaurant.image', read_only=True)
    restaurant_address = serializers.CharField(source='restaurant.address', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_id', 'user', 'restaurant', 'restaurant_name',
            'restaurant_image', 'restaurant_address', 'status',
            'delivery_address', 'subtotal', 'tax', 'delivery_fee',
            'platform_fee', 'discount', 'total', 'coupon_code',
            'special_instructions', 'estimated_delivery_time',
            'created_at', 'updated_at', 'items', 'status_history',
            'delivery_assignment'
        ]
