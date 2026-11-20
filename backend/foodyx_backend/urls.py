from django.contrib import admin
from django.urls import path
from accounts.views import RegisterView, LoginView, DemoLoginView, AddressListCreateView
from restaurants.views import RestaurantListView, RestaurantDetailView, FoodItemListView
from orders.views import OrderCreateView, OrderDetailView, OrderCancelView, OrderSimulateStepView, OrderHistoryView
from payments.views import CouponValidateView, PaymentVerifyView
from reviews.views import ReviewCreateView, RestaurantReviewsView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth & Accounts
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/demo/', DemoLoginView.as_view(), name='demo-login'),
    path('api/addresses/', AddressListCreateView.as_view(), name='addresses'),

    # Restaurants & Menus
    path('api/restaurants/', RestaurantListView.as_view(), name='restaurant-list'),
    path('api/restaurants/<int:pk>/', RestaurantDetailView.as_view(), name='restaurant-detail'),
    path('api/food-items/', FoodItemListView.as_view(), name='food-items'),
    path('api/search/', RestaurantListView.as_view(), name='search'),

    # Orders & Tracking
    path('api/orders/', OrderCreateView.as_view(), name='order-create'),
    path('api/orders/history/', OrderHistoryView.as_view(), name='order-history'),
    path('api/orders/<str:pk_or_code>/', OrderDetailView.as_view(), name='order-detail'),
    path('api/orders/<str:pk_or_code>/cancel/', OrderCancelView.as_view(), name='order-cancel'),
    path('api/orders/<str:pk_or_code>/simulate/', OrderSimulateStepView.as_view(), name='order-simulate'),

    # Payments & Coupons
    path('api/cart/coupon/', CouponValidateView.as_view(), name='coupon-validate'),
    path('api/payments/coupon/', CouponValidateView.as_view(), name='coupon-validate-alt'),
    path('api/payments/verify/', PaymentVerifyView.as_view(), name='payment-verify'),

    # Reviews
    path('api/reviews/', ReviewCreateView.as_view(), name='review-create'),
    path('api/restaurants/<int:restaurant_id>/reviews/', RestaurantReviewsView.as_view(), name='restaurant-reviews'),
]
