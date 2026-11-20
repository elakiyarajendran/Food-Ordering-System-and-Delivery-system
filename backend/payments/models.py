from django.db import models
from orders.models import Order

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    )
    METHOD_CHOICES = (
        ('UPI', 'UPI'),
        ('Card', 'Credit / Debit Card'),
        ('Wallets', 'Wallets (PhonePe, Paytm)'),
        ('Net Banking', 'Net Banking'),
        ('Cash on Delivery', 'Cash on Delivery'),
    )
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    gateway_order_id = models.CharField(max_length=100, blank=True, default='')
    gateway_payment_id = models.CharField(max_length=100, blank=True, default='')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    method = models.CharField(max_length=30, choices=METHOD_CHOICES, default='UPI')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} for {self.order.order_id}: {self.status} (₹{self.amount})"

class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=20, choices=(('percent', 'Percentage'), ('flat', 'Flat Amount')), default='percent')
    value = models.DecimalField(max_digits=6, decimal_places=2, default=50.00)
    min_order = models.DecimalField(max_digits=8, decimal_places=2, default=200.00)
    max_discount = models.DecimalField(max_digits=8, decimal_places=2, default=150.00)
    active = models.BooleanField(default=True)
    description = models.CharField(max_length=200, default='Get 50% OFF on your order')

    def __str__(self):
        return f"{self.code} - {self.description}"
