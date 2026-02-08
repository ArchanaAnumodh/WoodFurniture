from django.urls import path
from .views import signup, login_view, get_csrf, get_address, profile_view, delete_address, update_address, set_default_address
from .views import set_default_address

urlpatterns = [
    path("signup/", signup, name="signup"),
    path("login/", login_view, name="login"),
    path("csrf/", get_csrf, name="get_csrf"),
    path("address/", get_address),
    path("profile/", profile_view),
    path("address/<int:id>/default/", set_default_address),
    path("address/<int:id>/update/", update_address),
    path("address/<int:id>/delete/", delete_address),
    path("address/<int:id>/set-default/", set_default_address),
    

]
