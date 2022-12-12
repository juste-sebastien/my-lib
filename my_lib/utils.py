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
    search = sanitize(str(search).strip())
    
    if statement1:
        found_author = ''
        for author in Author.objects.all():
            f_name_normalize = sanitize(author.first_name)
            l_name_normalize = sanitize(author.last_name)
            if search in f_name_normalize:
                found_author = author
            elif search in l_name_normalize:
                found_author = author

        if found_author != "":
            booklist = Book.objects.filter(author=found_author).all()
        
    
    if statement2:
        for book in Book.objects.all():
            title_normalize = sanitize(book.title)
            if search in title_normalize:
                booklist.append(book)

    if len(booklist) == 0:
        raise Book.DoesNotExist

    return booklist


def sanitize(text):
    """
    Sanitize a string to escape accentuated chars

    Parameters
    ----------
    text: str
        the content to sanitize

    Return
    ------
    text.encode(): str
        sanitized text
    """
    return text.casefold().encode('ascii', errors='ignore')