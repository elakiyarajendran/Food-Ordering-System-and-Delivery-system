from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Restaurant, Category, FoodItem
from .serializers import RestaurantSerializer, FoodItemSerializer

class RestaurantListView(APIView):
    def get(self, request):
        queryset = Restaurant.objects.all()
        
        search = request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(cuisines__icontains=search) |
                Q(city__icontains=search) |
                Q(items__name__icontains=search)
            ).distinct()

        cuisine = request.query_params.get('cuisine', '').strip()
        if cuisine and cuisine.lower() != 'all':
            queryset = queryset.filter(cuisines__icontains=cuisine)

        city = request.query_params.get('city', '').strip()
        if city:
            queryset = queryset.filter(city__iexact=city)

        veg_only = request.query_params.get('veg_only', '').lower() == 'true'
        if veg_only:
            queryset = queryset.filter(items__is_veg=True).distinct()

        rating_min = request.query_params.get('rating_min')
        if rating_min:
            try:
                queryset = queryset.filter(avg_rating__gte=float(rating_min))
            except ValueError:
                pass

        sort_by = request.query_params.get('sort_by', 'popular')
        if sort_by == 'rating':
            queryset = queryset.order_by('-avg_rating')
        elif sort_by == 'delivery_time':
            queryset = queryset.order_by('delivery_time_mins')
        elif sort_by == 'cost_low':
            queryset = queryset.order_by('cost_for_two')
        elif sort_by == 'cost_high':
            queryset = queryset.order_by('-cost_for_two')
        else:
            queryset = queryset.order_by('-avg_rating', 'delivery_time_mins')

        serializer = RestaurantSerializer(queryset, many=True)
        return Response(serializer.data)

class RestaurantDetailView(APIView):
    def get(self, request, pk):
        try:
            restaurant = Restaurant.objects.get(pk=pk)
            serializer = RestaurantSerializer(restaurant)
            return Response(serializer.data)
        except Restaurant.DoesNotExist:
            return Response({'error': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)

class FoodItemListView(APIView):
    def get(self, request):
        queryset = FoodItem.objects.filter(is_available=True)
        
        popular = request.query_params.get('popular', '').lower() == 'true'
        if popular:
            queryset = queryset.filter(is_popular=True)

        category = request.query_params.get('category')
        if category:
            queryset = queryset.filter(category_id=category)

        search = request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        serializer = FoodItemSerializer(queryset[:20], many=True)
        return Response(serializer.data)
