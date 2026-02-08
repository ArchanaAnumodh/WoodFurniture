from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from products.models import Product
from accounts.models import Address
from .models import Order, OrderItem
from rest_framework import status
from django.shortcuts import get_object_or_404


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    data = request.data
    items = data.get("items", [])
    total_price = data.get("total_price")
    address_id = data.get("address_id")

    try:
        address = Address.objects.get(id=address_id, user=user)
    except Address.DoesNotExist:
        return Response({"error": "Invalid address"}, status=400)
  
    total_price = 0

    for item in items:
        product = Product.objects.get(id=item["product_id"])
        total_price += product.price * item["quantity"]
    order = Order.objects.create(
        user=user,
        address=address,
        total_price=total_price
    )

    

    OrderItem.objects.create(
            order=order,
            product_id=product.id,
            name=product.name,              # safer than frontend name
            quantity=item["quantity"],
            price=product.price             # ✅ get real price from DB
        )
    


    return Response({"message": "Order placed successfully"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by("-created_at")
    data = []

    for order in orders:
        items = []
        for item in order.items.all():
            items.append({
                "name": item.name,
                "quantity": item.quantity,
                "price": float(item.price),
            })

        data.append({
            "id": order.id,
            "total_price": float(order.total_price),
            "created_at": order.created_at,
            "status": order.status,
            "items": items,
        })

    return Response(data)



@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)

    if order.status == "Cancelled":
        return Response({"error": "Order already cancelled"}, status=400)

    order.status = "Cancelled"
    order.save()

    return Response({"message": "Order cancelled successfully"})



@permission_classes([IsAuthenticated])
def reorder(request, order_id):
    try:
        old_order = Order.objects.get(id=order_id, user=request.user)
        new_order = Order.objects.create(
            user=request.user,
            total_price=old_order.total_price,
            status="Pending"
        )

        old_items = OrderItem.objects.filter(order=old_order)
        for item in old_items:
            OrderItem.objects.create(
                order=new_order,
                product_id=item.product_id,
                name=item.name,
                price=item.price,
                quantity=item.quantity,
            )

        return Response({"message": "Order placed again"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)


