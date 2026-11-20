from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.first_name', default='Customer', read_only=True)
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'order', 'user', 'user_name', 'restaurant', 'restaurant_name', 'rating', 'text', 'dish_tags', 'reply', 'created_at']
