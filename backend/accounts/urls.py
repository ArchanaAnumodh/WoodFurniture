from django.urls import path
from .views import signup, login_view, get_csrf

urlpatterns = [
    path("signup/", signup, name="signup"),
    path("login/", login_view, name="login"),
    path("csrf/", get_csrf, name="get_csrf"),
]
