from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("library", views.library, name="library"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("profile/<str:profile>", views.profile, name="profile"),
    path("recommendator", views.recommendator, name="recommendator"),
    path("register", views.register, name="register"),

    # API Routes
    path("search/", views.index, name="search"),
    path("add-to-list/<str:adding>", views.index, name="add_to_list")
]