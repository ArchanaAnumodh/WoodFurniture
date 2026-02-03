from django.urls import path
from .views import create_order,user_orders,cancel_order, reorder

urlpatterns = [
    path("create/", create_order),
    path("my_orders/",user_orders ),
    path("<int:order_id>/cancel/", cancel_order),
    path("<int:order_id>/reorder/", reorder),
]
