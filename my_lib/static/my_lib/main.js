import { generateBookCard, } from "./generators.js";
import { getCookie } from "./utils.js";

// Defining all variables
const containers = {
  home: document.querySelector('#home-main-container'),
  library: document.querySelector('#books-main-container'),
  myProfile: document.querySelector('#user-profile-container'),
  profileOf: document.querySelector('#other-profile-container'),
  recommendator: document.querySelector('#recommendator-main-container')
}

var searchButton = '';
if (document.querySelector('#home-search-button')) {
  searchButton = document.querySelector('#home-search-button');
  searchButton.addEventListener('click', () => {
    getResearch();
  });
};

var searchContainer = '';
 if(document.querySelector('#home-container')) {
  searchContainer = document.querySelector('#home-container');
 }

 var searchInput = '';
 if (document.querySelector('#search')) {
  searchInput = document.querySelector('#search');
 }

 var searchAuthor = '';
 if (document.querySelector('#author-radio')){
  searchAuthor = document.querySelector('#author-radio');
 }

 var searchBookname = '';
 if (document.querySelector('#bookname-radio')) {
  searchBookname = document.querySelector('#bookname-radio')
 }

const linkHome = document.querySelector('#link-home');
var linkLibrary = '';
if (document.querySelector('#link-library')) {
  linkLibrary = document.querySelector('#link-library');
}
var linkRecommendator = '';
if (document.querySelector('#link-recommendator')) {
  linkRecommendator = document.querySelector('#link-recommendator');
}

export const profileContainer = '';


// By default
loadPage('index');

// Add EventListener on some elements
document.addEventListener('DOMContentLoaded', function() {

  // Create elements for links
  linkHome.addEventListener('click', () => {loadPage('index')});
  if (linkLibrary != '') {
    linkLibrary.addEventListener('click', () => {loadPage('books')});
  }
  if (linkRecommendator != '') {
  linkRecommendator.addEventListener('click', () => {loadPage('reco')});
  }
})

/**
 * Select function to call with page name
 * 
 * @param {string} name - the name of webpage
 */
function loadPage(name) {
  if (name === 'books') {
      loadLibrary(name);
  } else if (name === 'reco') {
      loadRecommendator();
  }
}

function loadLibrary(place) {
  const bookHeader = document.querySelector('#books-header');
  var headerAppend = [];
  //const navBar = generateNavBar(headerAppend, place);

  console.log(navBar);
  
}


function loadRecommendator() {
  console.log('reco run');
}


/**
 * Display an alert to view the content of the comment
 * 
 * @param {*} comment - comment of a book
 */

// /!\ Voir pour bouger dans utils.js

export function zoomOnComment(comment, book) {
  if(zoomedComment.style.visibility != "hidden"){
    zoomedComment.style.visibility = "hidden";
  } else {
    zoomedComment.style.visibility = "visible";
    zoomedComment.innerHTML = generateZoomedComment(comment, book);
  }
}

/**
 * Find books corresponding to user's research 
 * and display then in a card
 * 
 */
function getResearch(){
  var url = `/search/?search=${searchInput.value}`;

  if (searchAuthor.checked) {
    url = url.concat('&author=on');
  };

  if (searchBookname.checked) {
    url = url.concat('&bookname=on');
  };
  fetch(url)
      .then(response => response.json())
      .then(response => {
        searchContainer.innerHTML = '';
        response.booklist.forEach(book => {
          searchContainer.appendChild(generateBookCard(
            book,
            response.connected
          ));
        });
      })
      .then(() => {
        searchAuthor.checked = false;
        searchBookname.checked = false;
        searchInput.value = '';
      })
      .catch(error => {
      console.log('Error: ', error);
      });
}

/**
 * Send to api a book to add to a specific list
 * 
 * @param {string} listName - name of list
 * @param {object} book - object return by api
 */
export function addToBooklist(listName, book) {
  fetch(`/add-to-list/`, {
    method: 'PUT',
    body: JSON.stringify({
       list: listName,
       book: `${book['id']}`
    }),
    credentials: 'same-origin',
      headers: {
        "X-CSRFToken": getCookie("csrftoken")
      }
  })
  .then(response => console.log(response))
  .catch(error => {
    console.log('Error: ', error);
  });
}


export function loadCustomList(buttonContent) {

}
