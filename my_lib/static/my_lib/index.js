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

    searchButton.addEventListener('click', () => {
        getResearch();
    });

    /**
     * Find books corresponding to user's research 
     * and display then in a card
     * 
     */
    function getResearch(){
        var url = `/search/?search=${searchInput.value}`;
        if (document.querySelector('#author-radio').checked) {
            url = url.concat('&author=on');
        };
        if (document.querySelector('#bookname-radio').checked) {
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
            if (response['previous_page']) {
                leftArrow.classList.add("enabled-arrow");
                leftArrow.addEventListener('click', () => {
                    if (pageNum > 1) {
                        pageNum--;
                    }
                    url = url.replace(`page=${pageNum+1}`, `page=${pageNum}`);
                    response = function() {
                        fetch(url)
                        .then(response => response.json());
                    };
                });
            } else {
                leftArrow.classList.remove("enabled-arrow");
                leftArrow.setAttribute('disabled', '');
            }
            if (response['next_page']) {
                rightArrow.classList.add("enabled-arrow");
                rightArrow.addEventListener('click', () => {
                    if (pageNum < book["total_pages"]) {
                        pageNum++;
                    }
                    url = url.replace(`page=${pageNum-1}`, `page=${pageNum}`);
                    response = function() {
                     fetch(url)
                     .then(response => response.json());
                    };
                 });
            } else {
                rightArrow.classList.remove("enabled-arrow");
                rightArrow.setAttribute('disabled', '');
            }

            document.querySelector('#search-results-container').innerHTML = '';
            response['booklist'].forEach(book => {
            document.querySelector('#search-results-container').appendChild(
                generateBookCard(
                    book,
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
            document.querySelector('#author-radio').checked = false;
            document.querySelector('#bookname-radio').checked = false;
            document.querySelector('#search-input').value = '';
            setTimeout(function() {
                hideAlert(alert, 'alert-danger', content);
            }, 4000);
        });
    }
})
