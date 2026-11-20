from rest_framework import serializers
from .models import Payment, Coupon

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'gateway_order_id', 'gateway_payment_id', 'amount', 'status', 'method', 'created_at']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['code', 'discount_type', 'value', 'min_order', 'max_discount', 'description']
