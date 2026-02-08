from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product
from .serializers import ProductSerializer


@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    data = []

    for product in products:
        images = [
            request.build_absolute_uri(img.image.url)
            for img in product.images.all()
        ]

        data.append({
            "id": product.id,
            "name": product.name,
            "price": float(product.price),
            "description": product.description,
            "dimensions": product.dimensions,
            "images": images,   # ✅ multiple images
        })

    return Response(data)


@api_view(["GET"])
def product_detail(request, id):
    product = get_object_or_404(Product, id=id)

    images = [
        request.build_absolute_uri(img.image.url)
        for img in product.images.all()
    ]

    return Response({
        "id": product.id,
        "name": product.name,
        "price": float(product.price),
        "description": product.description,
        "dimensions": product.dimensions,
        "images": images,   # ✅ multiple images
    })


@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, context={"request": request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
