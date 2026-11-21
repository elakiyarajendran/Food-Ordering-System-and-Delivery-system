import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'foodyx_backend.settings')
django.setup()

from accounts.models import User, Address
from restaurants.models import Restaurant, Category, FoodItem, ItemOption
from orders.models import Order, OrderItem, OrderStatusHistory, DeliveryAssignment
from payments.models import Payment, Coupon
from reviews.models import Review

def run():
    print("Updating restaurant & food item images to authentic UI mockup assets...")
    Review.objects.all().delete()
    Payment.objects.all().delete()
    OrderStatusHistory.objects.all().delete()
    DeliveryAssignment.objects.all().delete()
    OrderItem.objects.all().delete()
    Order.objects.all().delete()
    Coupon.objects.all().delete()
    ItemOption.objects.all().delete()
    FoodItem.objects.all().delete()
    Category.objects.all().delete()
    Restaurant.objects.all().delete()
    Address.objects.all().delete()
    User.objects.all().delete()

    customer = User.objects.create_user(
        username='elakiya',
        email='customer@foodyx.com',
        password='password123',
        first_name='Elakiya',
        last_name='R',
        role='customer',
        phone='+91 98401 23456'
    )

    owner = User.objects.create_user(
        username='chef_marco',
        email='owner@foodyx.com',
        password='password123',
        first_name='Marco',
        last_name='Pierre',
        role='restaurant_owner',
        phone='+91 98402 34567'
    )

    delivery = User.objects.create_user(
        username='ravi_kumar',
        email='delivery@foodyx.com',
        password='password123',
        first_name='Ravi',
        last_name='Kumar',
        role='delivery_partner',
        phone='+91 98765 43210'
    )

    admin = User.objects.create_superuser(
        username='admin',
        email='admin@foodyx.com',
        password='password123',
        first_name='System',
        last_name='Admin',
        role='admin'
    )

    Address.objects.create(
        user=customer,
        label='Home',
        line1='Flat 402, Golden Towers, Anna Nagar',
        city='Chennai',
        pincode='600040',
        latitude=Decimal('13.0850'),
        longitude=Decimal('80.2100'),
        is_default=True
    )

    Coupon.objects.create(
        code='FOOD50',
        discount_type='percent',
        value=Decimal('50.00'),
        min_order=Decimal('199.00'),
        max_discount=Decimal('150.00'),
        description='50% OFF on your first order! Max discount ₹150.'
    )
    Coupon.objects.create(
        code='TASTE20',
        discount_type='percent',
        value=Decimal('20.00'),
        min_order=Decimal('299.00'),
        max_discount=Decimal('100.00'),
        description='20% OFF on gourmet meals above ₹299.'
    )

    r1 = Restaurant.objects.create(
        owner=owner,
        name='The Gourmet Hub',
        tagline='Exquisite flavours crafted with passion',
        cuisines='Italian, Continental, Gourmet',
        address='12 Sterling Road, Nungambakkam',
        city='Chennai',
        latitude=Decimal('13.0610'),
        longitude=Decimal('80.2370'),
        avg_rating=Decimal('4.8'),
        total_reviews=21000,
        cost_for_two=500,
        delivery_time_mins=30,
        discount_percent=50,
        discount_code='FOOD50',
        image='/images/res-gourmet.png',
        featured=True
    )

    r2 = Restaurant.objects.create(
        owner=owner,
        name='Pizza Palace',
        tagline='Woodfired artisanal sourdough pizzas',
        cuisines='Pizza, Italian, Fast Food',
        address='45 Khader Nawaz Khan Road',
        city='Chennai',
        latitude=Decimal('13.0630'),
        longitude=Decimal('80.2450'),
        avg_rating=Decimal('4.7'),
        total_reviews=18000,
        cost_for_two=400,
        delivery_time_mins=32,
        discount_percent=20,
        discount_code='PIZZA20',
        image='/images/res-pizza.png',
        featured=True
    )

    r3 = Restaurant.objects.create(
        owner=owner,
        name='Burger Boulevard',
        tagline='Smash burgers with gourmet melted cheddar',
        cuisines='Burger, American, Fast Food',
        address='78 Besant Nagar Beach Road',
        city='Chennai',
        latitude=Decimal('13.0001'),
        longitude=Decimal('80.2667'),
        avg_rating=Decimal('4.8'),
        total_reviews=15000,
        cost_for_two=350,
        delivery_time_mins=28,
        discount_percent=30,
        discount_code='BURGER30',
        image='/images/res-burger.png',
        featured=True
    )

    r4 = Restaurant.objects.create(
        owner=owner,
        name='Pasta Planet',
        tagline='Handcrafted pasta in authentic Italian sauces',
        cuisines='Italian, Pasta, Desserts',
        address='24 Alwarpet High Road',
        city='Chennai',
        latitude=Decimal('13.0330'),
        longitude=Decimal('80.2520'),
        avg_rating=Decimal('4.7'),
        total_reviews=12000,
        cost_for_two=450,
        delivery_time_mins=35,
        discount_percent=20,
        discount_code='PASTA20',
        image='/images/res-pasta.png',
        featured=True
    )

    c1_starters = Category.objects.create(restaurant=r1, name='Signature Starters', sort_order=1)
    c1_pizzas = Category.objects.create(restaurant=r1, name='Artisanal Pizzas', sort_order=2)
    c1_mains = Category.objects.create(restaurant=r1, name='Gourmet Mains', sort_order=3)
    c1_beverages = Category.objects.create(restaurant=r1, name='Beverages & Shakes', sort_order=4)

    f_pizza = FoodItem.objects.create(
        category=c1_pizzas,
        restaurant=r1,
        name='Cheesy Paradise Pizza',
        description='Overloaded with mozzarella, vintage cheddar, golden corn, and aromatic basil leaves.',
        price=Decimal('299.00'),
        is_veg=True,
        is_popular=True,
        avg_rating=Decimal('4.8'),
        total_reviews=12400,
        image='/images/popular-pizza.png'
    )
    ItemOption.objects.create(item=f_pizza, name='Medium (10 inch)', extra_price=Decimal('0.00'))
    ItemOption.objects.create(item=f_pizza, name='Large (12 inch)', extra_price=Decimal('100.00'))
    ItemOption.objects.create(item=f_pizza, name='Extra Cheese Burst', extra_price=Decimal('60.00'))

    f_burger = FoodItem.objects.create(
        category=c1_mains,
        restaurant=r1,
        name='Royal Burger',
        description='Signature toasted brioche bun, succulent prime patty, caramelized onions and secret sauce.',
        price=Decimal('249.00'),
        is_veg=False,
        is_popular=True,
        avg_rating=Decimal('4.7'),
        total_reviews=9200,
        image='/images/popular-burger.png'
    )
    ItemOption.objects.create(item=f_burger, name='Single Patty', extra_price=Decimal('0.00'))
    ItemOption.objects.create(item=f_burger, name='Double Patty Deluxe', extra_price=Decimal('80.00'))
    ItemOption.objects.create(item=f_burger, name='French Fries Add-on', extra_price=Decimal('50.00'))

    f_pasta = FoodItem.objects.create(
        category=c1_mains,
        restaurant=r1,
        name='Creamy Alfredo Pasta',
        description='Fettuccine drenched in silky butter-parmesan reduction infused with crushed roasted garlic.',
        price=Decimal('279.00'),
        is_veg=True,
        is_popular=True,
        avg_rating=Decimal('4.8'),
        total_reviews=7400,
        image='/images/popular-pasta.png'
    )
    ItemOption.objects.create(item=f_pasta, name='Add Sautéed Mushrooms', extra_price=Decimal('40.00'))
    ItemOption.objects.create(item=f_pasta, name='Add Grilled Chicken', extra_price=Decimal('70.00'))

    f_dragon = FoodItem.objects.create(
        category=c1_mains,
        restaurant=r1,
        name='Spicy Dragon Bowl',
        description='Wok-tossed ramen noodles with crunchy peppers, fiery dragon chili glaze, and steamed edamame.',
        price=Decimal('319.00'),
        is_veg=False,
        is_popular=True,
        avg_rating=Decimal('4.9'),
        total_reviews=10300,
        image='/images/popular-dragon.png'
    )

    f_coffee = FoodItem.objects.create(
        category=c1_beverages,
        restaurant=r1,
        name='Iced Coffee',
        description='Slow-brewed dark roast espresso shaken over mountain crystal ice with velvety whipped cream.',
        price=Decimal('149.00'),
        is_veg=True,
        is_popular=True,
        avg_rating=Decimal('4.9'),
        total_reviews=4300,
        image='/images/item-coffee.png'
    )

    FoodItem.objects.create(
        category=c1_starters,
        restaurant=r1,
        name='Truffle Fries Supreme',
        description='Crisp hand-cut golden potatoes tossed in Italian white truffle oil and freshly grated parmesan.',
        price=Decimal('189.00'),
        is_veg=True,
        is_popular=False,
        avg_rating=Decimal('4.7'),
        total_reviews=1800,
        image='/images/popular-burger.png'
    )

    order1 = Order.objects.create(
        order_id='FDX-7429',
        user=customer,
        restaurant=r1,
        status='Out for delivery',
        delivery_address={
            'line1': 'Flat 402, Golden Towers, Anna Nagar',
            'city': 'Chennai',
            'pincode': '600040',
            'lat': 13.0850,
            'lng': 80.2100
        },
        subtotal=Decimal('697.00'),
        tax=Decimal('34.85'),
        delivery_fee=Decimal('40.00'),
        platform_fee=Decimal('5.00'),
        discount=Decimal('40.00'),
        total=Decimal('737.00'),
        coupon_code='FOOD50',
        special_instructions='Please leave package at the doorstep and ring the bell.',
        estimated_delivery_time='20-25 mins'
    )

    OrderItem.objects.create(order=order1, food_item=f_burger, name='Royal Burger', price=Decimal('249.00'), quantity=1)
    OrderItem.objects.create(order=order1, food_item=f_pizza, name='Cheesy Paradise Pizza', price=Decimal('299.00'), quantity=1)
    OrderItem.objects.create(order=order1, food_item=f_coffee, name='Iced Coffee', price=Decimal('149.00'), quantity=1)

    OrderStatusHistory.objects.create(order=order1, status='Placed', note='Order received by restaurant')
    OrderStatusHistory.objects.create(order=order1, status='Accepted', note='Chef accepted your order')
    OrderStatusHistory.objects.create(order=order1, status='Preparing', note='Fresh ingredients in the oven')
    OrderStatusHistory.objects.create(order=order1, status='Out for delivery', note='Delivery partner Ravi Kumar on the way')

    DeliveryAssignment.objects.create(
        order=order1,
        partner=delivery,
        partner_name='Ravi Kumar',
        partner_phone='+91 98765 43210',
        partner_rating=Decimal('4.9'),
        current_lat=Decimal('13.0720'),
        current_lng=Decimal('80.2250')
    )

    Payment.objects.create(
        order=order1,
        gateway_order_id='razor_fdx_7429',
        gateway_payment_id='pay_live_7429',
        amount=Decimal('737.00'),
        status='success',
        method='UPI'
    )

    Review.objects.create(
        order=order1,
        user=customer,
        restaurant=r1,
        rating=5,
        text='Incredible taste and lightning fast delivery! The Cheesy Paradise Pizza arrived piping hot.',
        dish_tags=['Cheesy Paradise Pizza', 'Royal Burger'],
        reply='Thank you so much Elakiya! We are delighted you loved the pizza.'
    )

    print("Database seeding with authentic UI mockup assets completed!")

if __name__ == '__main__':
    run()
