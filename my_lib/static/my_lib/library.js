import { generateBookCard } from "./card_generators.js";
import { 
    getCookie,
    setCardsPerPage,
    changeArrowDisplay,
    displayAlert
} from "./utils.js";

var pageNum = 1;
var cardsPerPage = setCardsPerPage();

document.addEventListener('DOMContentLoaded', function() {
    const linkReadings = document.querySelector('#link-readings');
    linkReadings.addEventListener('click', () => {
        loadList('readings', 1);
    });

    const linkRead = document.querySelector('#link-read');
    linkRead.addEventListener('click', () => {
        loadList('read', 1);
    });

    const linkToread = document.querySelector('#link-toread');
    linkToread.addEventListener('click', () => {
        loadList('toread', 1);
    });

    const linkStars = document.querySelector('#link-stars');
    linkStars.addEventListener('click', () => {
        loadList('stars', 1);
    });

    const bookSheet = document.querySelector('#book-sheet');
    const alert = document.querySelector('#alert-comment');

    function loadList(name, currentPage) {
        var url = `/get-list/?list=${name}`;
        console.log('inloadlist', currentPage);
        url = url.concat(`&page=${currentPage}`);
        url = url.concat(`&per-page=${cardsPerPage}`);

        fetch(url)
        .then(response => response.json())
        .then(response => {
            const leftArrow = document.querySelector('#library-left-arrow');
            const rightArrow =document.querySelector('#library-right-arrow');
            changeArrowDisplay(leftArrow, response['previous_page']);
            changeArrowDisplay(rightArrow, response['next_page']);
            leftArrow.addEventListener('click', () => {
                console.log('inleft event', pageNum);
                if (pageNum > 1) {
                    pageNum -= 1;
                }
                loadList(name, pageNum);   
            });
            rightArrow.addEventListener('click', () => {
                console.log('in right event', pageNum);
                if (pageNum < response['total_pages']) {
                pageNum +=1;
                }
                loadList(name, pageNum)
            });

            document.querySelector('#books-container').innerHTML = '';
            response.booklist.forEach(book => {
            document.querySelector('#books-container').appendChild(
                generateBookCard(
                    book,
                    bookSheet,
                    alert,
                    response.connected
                ));
            });
        })
        .catch(error => {
        console.log('Error: ', error);
            let content = 'An error occurs, please try to reload page';
            displayAlert(alert, 'alert-danger', content);
        });
    };
});