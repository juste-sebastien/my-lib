from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser


class Editor(models.Model):
    """
    Create Editor model

    Parameters
    ----------
    Model

    """
    name = models.CharField(max_length=64, blank=True)


class Author(models.Model):
    """
    Create book Author model

    Parameters
    ----------
    Model

    """
    first_name = models.CharField(max_length=64, blank=True)
    last_name = models.CharField(max_length=64, blank=True)


class Genre(models.Model):
    """
    Create litterary genre model

    Parameters
    ----------
    Model

    """
    genre = models.CharField(max_length=64, blank=True)


class Book(models.Model):
    """
    Create Book model

    Parameters
    ----------
    Model

    """
    isbn = models.CharField(
        validators=[
            MinLengthValidator(10, 'the field must contain at least 10 characters')
            ],
        max_length=13,
        blank=True
    )
    title = models.CharField(max_length=128, blank=False, null=False)
    author = models.OneToOneField(Author, on_delete=models.CASCADE, related_name="book_author")
    genre = models.ManyToManyField(Genre, related_name="book_genre")
    editor = models.OneToOneField(Editor, on_delete=models.CASCADE, related_name="book_editor")
    page_nbr = models.IntegerField(blank=True)
    average_ratings = models.DecimalField(max_digits=3, decimal_places=1, blank=True)
    buy_link = models.URLField(blank=True)


class User(AbstractUser):
    """
    Create User model based on AbstractUser model

    Parameters
    ----------
    AbstractUser

    """
    booklist = models.ManyToManyField(Book, related_name="user_booklist")


class Comment(models.Model):
    """
    Create Comment model

    Parameters
    ----------
    Model

    """
    title = models.CharField(max_length=64)
    book = models.OneToOneField(Book, on_delete=models.CASCADE, related_name="commented")
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="commentor")
    date = models.DateField(auto_now_add=True)
    content = models.TextField(max_length=1000)


class Note(models.Model):
    """
    Create Note model

    Parameters
    ----------
    Model

    """
    note = models.DecimalField(max_digits=3, decimal_places=2)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    book = models.OneToOneField(Book, on_delete=models.CASCADE)
