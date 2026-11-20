import uuid
from django.db import models
from django.conf import settings
from restaurants.models import Restaurant, FoodItem

class Order(models.Model):
    STATUS_CHOICES = (
        ('Placed', 'Placed'),
        ('Accepted', 'Accepted'),
        ('Preparing', 'Preparing'),
        ('Ready', 'Ready'),
        ('Out for delivery', 'Out for delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    )
    
    order_id = models.CharField(max_length=30, unique=True, default='')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='orders')
    
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Placed')
    delivery_address = models.JSONField(default=dict)
    
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    delivery_fee = models.DecimalField(max_digits=8, decimal_places=2, default=40.00)
    platform_fee = models.DecimalField(max_digits=8, decimal_places=2, default=5.00)
    discount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    coupon_code = models.CharField(max_length=50, blank=True, null=True)
    special_instructions = models.TextField(blank=True, null=True)
    
    estimated_delivery_time = models.CharField(max_length=50, default='30-40 mins')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = f"FDX-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.order_id} - {self.status} (₹{self.total})"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    food_item = models.ForeignKey(FoodItem, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    options = models.JSONField(default=list, blank=True)
    note = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.quantity}x {self.name}"

class OrderStatusHistory(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_history')
    status = models.CharField(max_length=30)
    note = models.CharField(max_length=200, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.order.order_id}: {self.status} at {self.timestamp}"

class DeliveryAssignment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='delivery_assignment')
    partner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    partner_name = models.CharField(max_length=100, default='Ravi Kumar')
    partner_phone = models.CharField(max_length=20, default='+91 98765 43210')
    partner_rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.9)
    current_lat = models.DecimalField(max_digits=9, decimal_places=6, default=13.0827)
    current_lng = models.DecimalField(max_digits=9, decimal_places=6, default=80.2707)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Delivery for {self.order.order_id} by {self.partner_name}"
