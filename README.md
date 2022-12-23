# My Lib'
***


## Table of Contents
1. [Video Demo](#video-demo)
2. [Description](#description)
3. [Distinctiveness and Complexity](#distinctiveness)
4. [Compatibilities](#compatibilities)
5. [Installation](#installation) 
6. [Files content](#files)
7. [Features](#features)
8. [Contributing](#contributing)

#### Video Demo: [click here for the result](https://youtu.be/jzZUt5rgwss)
***


#### Description:
***
My Lib' is an library to store your books. You can rate them and add or remove them to different lists. You can also use the recommendator to have the possibility to discover new books.


#### Distinctiveness and Complexity:
The recommendation system is currently based on others users rates, the books category, the author, the publication year, and page number. In a few, you can add some tags to book, and recommendator will take care of them to recommend books.


#### Compatibilities
***
Python 3.6+


#### Installation
***
Please read [requirements.txt](https://github.com/juste-sebastien/mail/blob/master/requirements.txt) to get all libs using with this project and use the package manager [pip](https://pip.pypa.io/en/stable/) to install them.

```bash
git clone https://github.com/juste-sebastien/my-lib
cd path/to/the/file
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

Now open your brower and go there
```http://127.0.0.1:8000/```


#### Files
***
```views.py``` display different views
```utils.py``` contain functions there no need to be in views.py
```index.html``` display index webpage
```layout.html``` display base of all webpage
```library.html``` display your own library webpage
```login.html``` display login webpage
```recommendator.html``` display recommendation system webpage
```register.html``` display register webpage
```/static/fonts``` all fonts needed in project
```bookcards.css``` contain specific style for a single bookcard
```styles.css``` contain style of all website
```card_generators.js``` contain how to display on screen a bookcard
```index.js``` specific functions to run index.html
```library.js``` specific functions to run library.html
```main.js``` contain functions common to all webpages
```recommendator.js``` specific functions to run recommendator.html
```sheet_generators.js``` contain how to display on screen booksheet
```utils.js``` contain functions to simplify work in al other files

#### Features
***
- [ ] Add tags to book and put them in recommendator
- [ ] Populate DB with Selenium
- [ ] Style all elements

#### Contributing
***
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.