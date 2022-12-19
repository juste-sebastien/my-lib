from datetime import datetime

from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser


class Editor(models.Model):
    """
    Create Editor model

    Parameters
    ----------
    Model

    """
    name = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return f'{self.name}'


class Author(models.Model):
    """
    Create book Author model

    Parameters
    ----------
    Model

    """
    first_name = models.CharField(max_length=64, blank=True)
    last_name = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Genre(models.Model):
    """
    Create litterary genre model

    Parameters
    ----------
    Model

    """
    genre = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return f'{self.genre}'


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
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="book_author")
    genre = models.ManyToManyField(Genre, related_name="book_genre")
    editor = models.ForeignKey(Editor, on_delete=models.CASCADE, related_name="book_editor")
    page_nbr = models.IntegerField(blank=True)
    average_ratings = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True, default=0)
    total_raters = models.IntegerField(blank=True)
    total_readers = models.IntegerField(blank=True, null=True)
    synopsis = models.TextField(max_length=1000, blank=True, null=True)
    cover = models.URLField(blank=True, null=True)
    buy_link = models.URLField(blank=True)
    publication = models.PositiveIntegerField(
            validators=[
                MinValueValidator(1000), 
                MaxValueValidator(datetime.now().year)],
            help_text="Use the following format: <YYYY>",
            blank=True,
            null=True
    )

    def __str__(self):
        return f'{self.title}'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author_first_name": self.author.first_name,
            "author_last_name": self.author.last_name,
            "genre": [genre.genre for genre in self.genre.all()],
            "editor": self.editor.name,
            "page_nb":  self.page_nbr,
            "average_ratings": self.average_ratings,
            "total_readers": self.total_readers,
            "synopsis": self.synopsis,
            "cover": self.cover,
            "buy_link": self.buy_link,
            "publication": self.publication
        }


class User(AbstractUser):
    """
    Create User model based on AbstractUser model

    Parameters
    ----------
    AbstractUser

    """
    read_list = models.ManyToManyField(Book, related_name="user_readlist")
    readings_list = models.ManyToManyField(Book, related_name="user_readings_list")
    to_read_list = models.ManyToManyField(Book, related_name="user_to_read_list")
    five_stars_list = models.ManyToManyField(Book, related_name="user_five_list")
    average_readings_page = models.IntegerField(blank=True)
    average_publication = models.IntegerField(blank=True)
    read_genres = models.ManyToManyField(Genre, related_name="fav_genres")

    def __str__(self):
        return f'{self.username}'


class Comment(models.Model):
    """
    Create Comment model

    Parameters
    ----------
    Model

    """
    title = models.CharField(max_length=64)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="commented")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="commentor")
    date = models.DateField(auto_now_add=True)
    content = models.TextField(max_length=1000)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.book.title}'


class Note(models.Model):
    """
    Create Note model

    Parameters
    ----------
    Model

    """
    note = models.DecimalField(max_digits=3, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return f'Note by {self.user.username} on {self.book.title}'
