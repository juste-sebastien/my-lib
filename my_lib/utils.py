from .models import *


def get_searched_books(search, statement1, statement2):
    """
    Search for books in DB

    Parameters
    ----------
    search: str
        content of user's search
    statement1: bool
        true if search concern author
    statement2: bool
        true if search concern book title

    Return
    ------
    booklist: list
        contain list of books
    """
    booklist = []
    search = str(search).strip().lower().title()
    if statement1:
        try:
            author = Author.objects.get(first_name=search)
        except Author.DoesNotExist:
            author = Author.objects.get(last_name=search)

        
        for book in Book.objects.all():
            if book.author.id == author.id:
                booklist.append(book)
    
    if statement2:
        try:
            book = Book.objects.get(title=search)
        except Book.DoesNotExist:
            raise Book.DoesNotExist
        else:
            booklist.append(book)

    return booklist
