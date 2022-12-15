import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from .models import *
from .utils import *


# todo ajouter du contenu au départ
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
    return render(request, "my_lib/index.html")


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


def library(request):
    return render (request, "my_lib/library.html")


def profile(request, profile):
    if profile == "my-profile":
        return render(request, "my_lib/my_profile.html")
    else:
        return render(request, "my_lib/profile.html", {

        })


def recommendator(request):
    return render(request, "my_lib/recommendator.html")

@login_required
def add_to_list(request):
    """
    Add selected book to user's custom list

    Parameters
    ----------
    request: WSGIRequest
        Represent the browser request

    Return
    ------
    JsonResponse:
        status code ok
    """
    
    if request.method == "PUT":
        data = json.loads(request.body)
        list_to = str(data.get("list"))
        book_id = int(data.get("book"))

        book = Book.objects.get(id=book_id)
        user = User.objects.get(username=request.user)

        match list_to:
            case "readings":
                if book in user.readings_list.all():
                    user.readings_list.remove(book)
                    action = 'deleted'
                else:
                    user.readings_list.add(book)
                    action = 'added'
                list_name = "readings"
            case "read":
                if book in user.read_list.all():
                    user.read_list.remove(book)
                    action = 'deleted'
                else:
                    user.read_list.add(book)
                    action = 'added'
                list_name = "read"
            case "toread":
                if book in user.to_read_list.all():
                    user.to_read_list.remove(book)
                    action = 'deleted'
                else:
                    user.to_read_list.add(book)
                    action = 'added'
                list_name = "to read"
            case "stars":
                if book in user.five_stars_list.all():
                    user.five_stars_list.remove(book)
                    action = 'deleted'
                else:
                    user.five_stars_list.add(book)
                    action = 'added'
                list_name = "5 stars"
            case _:
                return JsonResponse({"error": "You can't add it to this list."}, status=400)
        
        user.save()

        response = {
            'comment': f"{book.title} was {action} to your {list_name}'s list"
        }
        return JsonResponse(response, status=200)


def search(request):
    if request.method == 'GET':
        # Check if GET request contain a search
        if request.GET.__contains__("search"):
            search = request.GET.get("search")
            author = False
            bookname = False
            if request.GET.__contains__("author"):
                if request.GET.get("author") == "on":
                    author = True
            if request.GET.__contains__("bookname"):
                if request.GET.get("bookname") == "on":
                    bookname = True

            if request.user.is_authenticated:
                user = User.objects.get(username=request.user)
            # Get the booklist corresponding to the search
            # and send it to fetch request in JS
            try:
                temp_booklist = get_searched_books(search, author, bookname)
            except Book.DoesNotExist or Author.DoesNotExist:
                return JsonResponse({"error": "Your search does not exist in our DB."}, status=400)
            else:
                booklist = []

                for book in temp_booklist:
                    if user: 
                        
                        try:
                            note = Note.objects.get(user=user.id, book=book.id)
                        except Note.DoesNotExist:
                            note = None
                        is_in_readings = True if book in user.readings_list.all() else False
                        is_in_read = True if book in user.read_list.all() else False
                        is_in_toread = True if book in user.to_read_list.all() else False
                        is_in_stars = True if book in user.five_stars_list.all() else False
                        note = note.note if note != None else note
                        first_name = book.author.first_name if book.author.first_name != None else ''
                        last_name = book.author.last_name if book.author.last_name != None else ''
                        author =  first_name + " " + last_name

                    book = book.serialize()
                    book["is_in_readings"] = is_in_readings
                    book["is_in_read"] = is_in_read
                    book["is_in_toread"] = is_in_toread
                    book["is_in_stars"] = is_in_stars
                    book["note"] = note
                    book["author"] =  author
                    print(book)
                    booklist.append(book)
                    
                response = {
                    "connected": True if user else False,
                    "booklist": booklist,
                }
                return JsonResponse(response, status=200)

@login_required
def get_list(request):
    booklist = []
    if request.GET.__contains__("list"):
        listname = request.GET.get("list")
    else:
        return JsonResponse({"error": "Your list does not exist in our DB."}, status=400)
    
    user = User.objects.get(username=request.user)
    temp_booklist = []
    match listname:
        case 'readings':
            temp_booklist = user.readings_list.all()
        case 'read':
            temp_booklist = user.read_list.all()
        case 'toread':
            temp_booklist = user.to_read_list.all()
        case 'stars':
            temp_booklist = user.five_stars_list.all()
        case _:
            return JsonResponse({"error": "Your list does not exist in our DB."}, status=400)

    for book in temp_booklist:
        if user: 
            
            try:
                note = Note.objects.get(user=user.id, book=book.id)
            except Note.DoesNotExist:
                note = None
            is_in_readings = True if book in user.readings_list.all() else False
            is_in_read = True if book in user.read_list.all() else False
            is_in_toread = True if book in user.to_read_list.all() else False
            is_in_stars = True if book in user.five_stars_list.all() else False
            note = note.note if note != None else note
            first_name = book.author.first_name if book.author.first_name != None else ''
            last_name = book.author.last_name if book.author.last_name != None else ''
            author =  first_name + " " + last_name

        book = book.serialize()
        book["is_in_readings"] = is_in_readings
        book["is_in_read"] = is_in_read
        book["is_in_toread"] = is_in_toread
        book["is_in_stars"] = is_in_stars
        book["note"] = note
        book["author"] =  author
        print(book)
        booklist.append(book)
        
    response = {
        "connected": True if user else False,
        "booklist": booklist,
    }
    return JsonResponse(response, status=200)