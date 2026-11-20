from django.db import models
from django.conf import settings

class Restaurant(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_restaurants', null=True, blank=True)
    name = models.CharField(max_length=150)
    tagline = models.CharField(max_length=200, blank=True, default='')
    cuisines = models.CharField(max_length=200, help_text="e.g. Italian, Continental, Gourmet")
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, default='Chennai')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=13.0827)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=80.2707)
    opening_hours = models.CharField(max_length=100, default='10:00 AM - 11:00 PM')
    avg_rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.8)
    total_reviews = models.IntegerField(default=120)
    cost_for_two = models.IntegerField(default=500)
    delivery_time_mins = models.IntegerField(default=30)
    discount_percent = models.IntegerField(default=50)
    discount_code = models.CharField(max_length=50, default='FOOD50')
    is_open = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    image = models.TextField(help_text="URL or base64 image")

    def __str__(self):
        return self.name

class Category(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"{self.restaurant.name} - {self.name}"

class FoodItem(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    is_veg = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    image = models.TextField(blank=True)
    avg_rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.8)
    total_reviews = models.IntegerField(default=50)

    def __str__(self):
        return f"{self.name} (₹{self.price})"

class ItemOption(models.Model):
    item = models.ForeignKey(FoodItem, on_delete=models.CASCADE, related_name='options')
    name = models.CharField(max_length=100)
    extra_price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.name} (+₹{self.extra_price})"
