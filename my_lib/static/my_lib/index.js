import {
    generateBookCard,
} from "./card_generators.js";

import {
    displayAlert,
    hideAlert,
    setCardsPerPage,
} from "./utils.js";

var pageNum = 1;
var cardsPerPage = setCardsPerPage();

document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.querySelector('#search-container');
    const searchInput = document.querySelector('#search-input');
    const searchAuthorRadio = document.querySelector('author-radio');
    const searchBooknameRadio = document.querySelector('bookname-radio');
    const searchButton = document.querySelector('#search-button');
    const alert = document.querySelector('#alert-comment');
    const bookSheet = document.querySelector('#book-sheet');

    searchButton.addEventListener('click', () => {
        getResearch(searchInput.value);
    });

    /**
     * Find books corresponding to user's research 
     * and display then in a card
     * 
     */
    function getResearch(research){

        var url = `/search/?search=${research}`;
        if (searchAuthorRadio.checked) {
            url = url.concat('&author=on');
        };
        if (searchBooknameRadio.checked) {
            url = url.concat('&bookname=on');
        };

        url = url.concat(`&page=${pageNum}`);
        url = url.concat(`&per-page=${cardsPerPage}`);

        fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const leftArrow = document.querySelector('#search-left-arrow');
            const rightArrow =document.querySelector('#search-right-arrow');
            changeArrowDisplay(leftArrow, response['previous_page']);
            changeArrowDisplay(rightArrow, response['next_page']);
            leftArrow.addEventListener('click', () => {
                if (pageNum > 1) {
                    pageNum--;
                }
                getResearch(research); 
            });
            rightArrow.addEventListener('click', () => {
                if (pageNum < response['total_pages']) {
                pageNum++;
                }
                getResearch(research);
            });

            document.querySelector('#books-container').innerHTML = '';
            response.booklist.forEach(book => {
            document.querySelector('#books-container').appendChild(
                generateBookCard(
                    book,
                    bookSheet,
                    response.connected
                ));
            });
        })
        .then(() => {
            document.querySelector('#author-radio').checked = false;
            document.querySelector('#bookname-radio').checked = false;
            document.querySelector('#search-input').value = '';
        })
        .catch(error => {
            console.log('Error: ', error);
            let content = 'This book currently does not exist in our database';
            displayAlert(alert, 'alert-danger', content);
            searchAuthorRadio.checked = false;
            searchBooknameRadio.checked = false;
            searchInput.value = '';
            setTimeout(function() {
                hideAlert(alert, 'alert-danger', content);
            }, 4000);
        });
    }
})
