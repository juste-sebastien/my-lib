import {
    generateBookCard,
} from "./card_generators.js";

document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.querySelector('#search-container');
    const searchInput = document.querySelector('#search-input');
    const searchAuthorRadio = document.querySelector('author-radio');
    const searchBooknameRadio = document.querySelector('bookname-radio');
    const searchButton = document.querySelector('#search-button');

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

        fetch(url)
        .then(response => response.json())
        .then(response => {
            document.querySelector('#search-results-container').innerHTML = '';
            response.booklist.forEach(book => {
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
        });
    }
})
