from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from .models import *


def index(request):
    """
    Render the index webpage with some books

    Parameters
    ----------
    request: WSGIRequest
        Represent the browser request

    Return
    ------
    render():
        The rendering of the index webpage
    """
    return render(request, "my_lib/index.html", {
        "books": Book.objects.all(),
    })


def login_view(request):
    """
    Check if it's a POST request. Check if user is in DB and return to index webpage.
    If authentification failed, render login webpage

    Parameters
    ----------
    request: WSGIRequest
        Represent the browser request

    Return
    ------
    render():
        The rendering of the login webpage
    HttpResponseRedirect():
        Http response that redirect user to index page
    """
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "my_lib/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "my_lib/login.html")


def logout_view(request):
    """
    Logout user and return to index

    Parameters
    ----------
    request: WSGIRequest
        Represent the browser request

    Return
    ------
    HttpsReponseRedirect():
        return user to index page
    """
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    """
    Register a new user's account. If failed, return back to register page.
    If not, user will be sent to index page.

    Parameters
    ----------
    request: WSGIRequest
        Represent the browser request

    Return
    ------
    render():
        The rendering of the register webpage
    HttpResponseRedirect():
        return user to index page
    """
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "my_lib/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "my_lib/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "my_lib/register.html")
