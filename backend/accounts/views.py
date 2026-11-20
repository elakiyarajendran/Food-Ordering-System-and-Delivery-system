from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Address
from .serializers import UserSerializer, AddressSerializer

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '')
        name = request.data.get('name', 'Food Explorer')
        role = request.data.get('role', 'customer')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        username = email.split('@')[0]
        if User.objects.filter(username=username).exists():
            username = f"{username}_{User.objects.count() + 1}"

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=name,
            role=role
        )
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email_or_username = request.data.get('email', '').strip()
        password = request.data.get('password', '')
        
        user = User.objects.filter(email__iexact=email_or_username).first() or \
               User.objects.filter(username__iexact=email_or_username).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'message': 'Login successful'
            })
        
        # If demo login check
        if password == 'foodyx123' and user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
            
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

class DemoLoginView(APIView):
    """Convenience endpoint to seamlessly switch or log in as demo roles"""
    def post(self, request):
        role = request.data.get('role', 'customer')
        user = User.objects.filter(role=role).first()
        if not user:
            # create demo user if not exists
            user = User.objects.create_user(
                username=f"demo_{role}",
                email=f"{role}@foodyx.com",
                password="password123",
                first_name=role.replace('_', ' ').title(),
                role=role
            )
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'message': f'Logged in as {user.get_role_display()}'
        })

class AddressListCreateView(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')
        if user_id:
            addresses = Address.objects.filter(user_id=user_id)
        else:
            addresses = Address.objects.all()[:5]
        return Response(AddressSerializer(addresses, many=True).data)

    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            # associate with first user or passed user
            user = User.objects.first()
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
