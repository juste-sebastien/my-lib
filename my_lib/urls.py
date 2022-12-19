from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("library", views.library, name="library"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("profile/<str:profile>", views.profile, name="profile"),
    path("recommendator", views.recommendator, name='recommendator'),
    path("register", views.register, name="register"),

    # API Routes
    path("search/", views.search, name="search"),
    path("add-to-list/", views.add_to_list, name="add_to_list"),
    path("get-list/", views.get_list, name="get_list"),
    path("set-rate/<int:book_id>", views.set_note, name="set_note"),
    path("recommendation/", views.get_recommendation, name="get_recommendation")
]