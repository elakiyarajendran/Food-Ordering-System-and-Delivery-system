from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import User
from restaurants.models import Restaurant
from orders.models import Order
from .models import Review
from .serializers import ReviewSerializer

class ReviewCreateView(APIView):
    def post(self, request):
        data = request.data
        order_id = data.get('order_id')
        restaurant_id = data.get('restaurant_id')
        rating = int(data.get('rating', 5))
        text = data.get('text', '')
        dish_tags = data.get('dish_tags', [])

        user = User.objects.first()
        restaurant = None
        order = None

        if order_id:
            order = Order.objects.filter(order_id=order_id).first()
            if order:
                restaurant = order.restaurant

        if not restaurant and restaurant_id:
            restaurant = Restaurant.objects.filter(id=restaurant_id).first()

        if not restaurant:
            return Response({'error': 'Restaurant is required'}, status=status.HTTP_400_BAD_REQUEST)

        review = Review.objects.create(
            order=order,
            user=user,
            restaurant=restaurant,
            rating=rating,
            text=text,
            dish_tags=dish_tags
        )

        # recalculate restaurant average rating
        all_reviews = Review.objects.filter(restaurant=restaurant)
        if all_reviews.exists():
            avg = sum([r.rating for r in all_reviews]) / all_reviews.count()
            restaurant.avg_rating = round(avg, 1)
            restaurant.total_reviews = all_reviews.count()
            restaurant.save()

        return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)

class RestaurantReviewsView(APIView):
    def get(self, request, restaurant_id):
        reviews = Review.objects.filter(restaurant_id=restaurant_id).order_by('-created_at')
        return Response(ReviewSerializer(reviews[:20], many=True).data)
