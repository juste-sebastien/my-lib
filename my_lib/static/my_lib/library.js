import { generateBookCard } from "./card_generators.js";

document.addEventListener('DOMContentLoaded', function() {
    const linkReadings = document.querySelector('#link-readings');
    linkReadings.addEventListener('click', () => {
        loadList('readings');
    });

    const linkRead = document.querySelector('#link-read');
    linkRead.addEventListener('click', () => {
        loadList('read');
    });

    const linkToread = document.querySelector('#link-toread');
    linkToread.addEventListener('click', () => {
        loadList('toread');
    });

    const linkStars = document.querySelector('#link-stars');
    linkStars.addEventListener('click', () => {
        loadList('stars');
    });

    const bookSheet = document.querySelector('#book-sheet');

    function loadList(name) {
        var url = `/get-list/?list=${name}`;

        fetch(url)
        .then(response => response.json())
        .then(response => {
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
        .catch(error => {
        console.log('Error: ', error);
        });
    };
});