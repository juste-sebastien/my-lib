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

    const bookSheet = document.querySelector('#book-sheet');
    const alert = document.querySelector('#alert-comment');
    const refreshButton = document.querySelector('#recommendator-button');

    refreshButton.addEventListener('click', () => {
        loadRecommendator(pageNum)
    });

    loadRecommendator(pageNum);

    function loadRecommendator(pageNum) {
        var url = 'recommendation/?';
        url = url.concat(`page=${pageNum}`);
        url = url.concat(`&per-page=${cardsPerPage}`);

        fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response['not_enough']) {
                document.querySelector('#reco-books-container').innerHTML = response['not_enough'];
            } else {
                const leftArrow = document.querySelector('#reco-left-arrow');
                const rightArrow =document.querySelector('#reco-right-arrow');
                changeArrowDisplay(leftArrow, response['previous_page']);
                changeArrowDisplay(rightArrow, response['next_page']);
                leftArrow.addEventListener('click', () => {
                    if (pageNum > 1) {
                        pageNum--;
                    }
                    loadRecommendator(pageNum);   
                });
                rightArrow.addEventListener('click', () => {
                    if (pageNum < response['total_pages']) {
                    pageNum++;
                    }
                    loadRecommendator( pageNum)
                });

                document.querySelector('#reco-books-container').innerHTML = '';
                response.booklist.forEach(book => {
                document.querySelector('#reco-books-container').appendChild(
                    generateBookCard(
                        book,
                        bookSheet,
                        alert,
                        response.connected
                    ));
                });
            }
        })
        .catch(error => {
        console.log('Error: ', error);
            let content = 'An error occurs, please try to reload page';
            displayAlert(alert, 'alert-danger', content);
        });
    };
});
