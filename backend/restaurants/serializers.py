from rest_framework import serializers
from .models import Restaurant, Category, FoodItem, ItemOption

class ItemOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOption
        fields = ['id', 'name', 'extra_price']

class FoodItemSerializer(serializers.ModelSerializer):
    options = ItemOptionSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)

    class Meta:
        model = FoodItem
        fields = [
            'id', 'restaurant', 'restaurant_name', 'category', 'category_name',
            'name', 'description', 'price', 'is_veg', 'is_available',
            'is_popular', 'image', 'avg_rating', 'total_reviews', 'options'
        ]

class CategorySerializer(serializers.ModelSerializer):
    items = FoodItemSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'sort_order', 'items']

class RestaurantSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            'id', 'owner', 'name', 'tagline', 'cuisines', 'address', 'city',
            'latitude', 'longitude', 'opening_hours', 'avg_rating',
            'total_reviews', 'cost_for_two', 'delivery_time_mins',
            'discount_percent', 'discount_code', 'is_open', 'featured',
            'image', 'categories'
        ]
