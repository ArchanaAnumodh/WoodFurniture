from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    full_name = request.data.get('full_name')
    email = request.data.get('email')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')

    # Validation
    if not all([full_name, email, password, confirm_password]):
        return Response(
            {"error": "All fields are required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if password != confirm_password:
        return Response(
            {"error": "Passwords don't match"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if len(password) < 6:
        return Response(
            {"error": "Password must be at least 6 characters"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=email).exists():
        return Response(
            {"error": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Create user
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        
        # Update the UserProfile with full_name
        # (UserProfile is auto-created by signal)
        user.profile.full_name = full_name
        user.profile.save()

        return Response(
            {"message": "Signup successful"},
            status=status.HTTP_201_CREATED
        )
    
    except Exception as e:
        return Response(
            {"error": "Failed to create account"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )