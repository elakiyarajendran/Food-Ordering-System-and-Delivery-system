from django.db import models
from django.conf import settings
from restaurants.models import Restaurant
from orders.models import Order

class Review(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='review', null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=5)
    text = models.TextField(blank=True)
    dish_tags = models.JSONField(default=list, blank=True)
    reply = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.rating}* by {self.user.username} for {self.restaurant.name}"
