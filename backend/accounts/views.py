from rest_framework.decorators import authentication_classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth import authenticate, login
from .models import Address
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    full_name = request.data.get('full_name')
    email = request.data.get('email')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    print(request.data)

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

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(username=email, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.profile.full_name,
        }
    })



@api_view(["GET", "POST"])
def debug_view(request):
    print("🟢 DEBUG VIEW HIT")
    print("METHOD:", request.method)
    print("PATH:", request.path)
    print("DATA:", request.data)
    return Response({"ok": True})

@api_view(["GET"])
def get_csrf(request):
    return Response({"csrfToken": get_token(request)})

@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_address(request):
    user = request.user

    # 🔹 GET ALL ADDRESSES
    if request.method == "GET":
        addresses = Address.objects.filter(user=user)

        return Response([
            {
                "id": addr.id,
                "full_name": addr.full_name,
                "phone": addr.phone,
                "address_line": addr.address_line,
                "city": addr.city,
                "state": addr.state,
                "pincode": addr.pincode,
                "is_default": addr.is_default,
            }
            for addr in addresses
        ])

    # 🔹 ADD NEW ADDRESS
    if request.method == "POST":
        data = request.data

        address = Address.objects.create(
            user=user,
            full_name=data.get("full_name", ""),
            phone=data.get("phone", ""),
            address_line=data.get("address_line", ""),
            city=data.get("city", ""),
            state=data.get("state", ""),
            pincode=data.get("pincode", ""),
            is_default=False
        )

        return Response({"message": "Address added successfully"})


@api_view(["GET", "PUT"])      
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user

    if request.method == "GET":
        return Response({
            "full_name": user.get_full_name(),
            "email": user.email,
            "phone": getattr(user, "phone", "")
        })

    if request.method == "PUT":
        data = request.data
        user.first_name = data.get("full_name", "").split(" ")[0]
        user.last_name = " ".join(data.get("full_name", "").split(" ")[1:])
        user.email = data.get("email", user.email)

        # if you stored phone in profile model, update there instead
        if hasattr(user, "phone"):
            user.phone = data.get("phone", "")

        user.save()
        return Response({"message": "Profile updated"})

@api_view(["PUT"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_address(request, id):
    address = get_object_or_404(Address, id=id, user=request.user)

    data = request.data
    address.full_name = data.get("full_name", address.full_name)
    address.phone = data.get("phone", address.phone)
    address.address_line = data.get("address_line", address.address_line)
    address.city = data.get("city", address.city)
    address.state = data.get("state", address.state)
    address.pincode = data.get("pincode", address.pincode)
    address.save()

    return Response({"message": "Address updated"})


@api_view(["DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_address(request, id):
    address = get_object_or_404(Address, id=id, user=request.user)
    address.delete()
    
    return Response({"message": "Address deleted"})


@api_view(["PUT"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def set_default_address(request, id):
    user = request.user
    Address.objects.filter(user=user, is_default=True).update(is_default=False)

    address = get_object_or_404(Address, id=id, user=user)
    address.is_default = True
    address.save()

    return Response({"message": "Default address updated"})



