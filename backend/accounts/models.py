from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('restaurant_owner', 'Restaurant Owner'),
        ('delivery_partner', 'Delivery Partner'),
        ('admin', 'Administrator'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

class Address(models.Model):
    LABEL_CHOICES = (
        ('Home', 'Home'),
        ('Work', 'Work'),
        ('Other', 'Other'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    label = models.CharField(max_length=20, choices=LABEL_CHOICES, default='Home')
    line1 = models.CharField(max_length=255)
    city = models.CharField(max_length=100, default='Chennai')
    pincode = models.CharField(max_length=20, default='600001')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=13.0827)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=80.2707)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.label}: {self.line1}, {self.city}"
