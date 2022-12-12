import { generateBookCard } from "./generators.js";

// Defining all variables
const containers = {
  home: document.querySelector('#home-main-container'),
  library: document.querySelector('#books-main-container'),
  myProfile: document.querySelector('#user-profile-container'),
  profileOf: document.querySelector('#other-profile-container'),
  recommendator: document.querySelector('#recommendator-main-container')
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
  if (name === 'index'){
    let searchElement = {
      button: document.querySelector('#home-search-button'),
      container: document.querySelector('#home-container'),
      input: document.querySelector('#search'),
      author: document.querySelector('#author-radio'),
      bookname: document.querySelector('#bookname-radio'),
    };
  
    searchElement.button.addEventListener('click', () => {
      getResearch(searchElement);
    });
  } else if (name === 'books') {
      loadLibrary();
  } else if (name === 'reco') {
      loadRecommendator();
  } else {
      loadPage('index');
  }
}

function loadLibrary() {
  console.log('lib runs');
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
 * @param {*} element - search element
 */
function getResearch(element){
  var url = `/search/?search=${element.input.value}`;

  if (element.author.checked) {
    url = url.concat('&author=on');
  };

  if (element.bookname.checked) {
    url = url.concat('&bookname=on');
  };
  fetch(url)
      .then(response => response.json())
      .then(books => {
        element.container.innerHTML = '';
        books.forEach(book => {
          element.container.appendChild(generateBookCard(book));
        });
      })
      .then(() => {
        element.author.checked = false;
        element.bookname.checked = false;
        element.input.value = '';
      })
      .catch(error => {
      console.log('Error: ', error);
      });
}


export function addToBooklist(listName, book) {
  fetch(`/add-to-list/${listName}&&${book['id']}`, {
    method: 'PUT',
    body: JSON.stringify({ read : false })
  })
  .then(response => load_mailbox('inbox'))
  .catch(error => {
    console.log('Error: ', error);
  });
}