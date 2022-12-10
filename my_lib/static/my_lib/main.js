import { generateBookCard } from "./generators.js";

// Defining all variables
const navBar = document.querySelector('.navbar');
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


  // By default
  loadPage('index');
})

/**
 * Select function to call with page name
 * 
 * @param {string} name - the name of webpage
 */
function loadPage(name) {
  if (name === 'index'){
    loadIndex();
  } else if (name === 'books') {
      loadLibrary();
  } else if (name === 'reco') {
      loadRecommendator();
  } else {
      loadPage('index');
  }
}



function loadIndex() {
  const searchElement = {
    button: document.querySelector('#home-search-button'),
    container: document.querySelector('#home-container'),
    input: document.querySelector('#search'),
    author: document.querySelector('#author-radio'),
    bookname: document.querySelector('#bookname-radio'),
  }

  var url = `?search=${searchElement.input.value}`;

  if (searchElement.author.checked) {
    url = url.concat('&author=on');
  }

  if (searchElement.bookname.checked) {
    url = url.concat('&bookname=on');
  }

  searchElement.container.innerHTML = `
    <div>Welcome to MyLib' </div>
  `
  console.log(url);
  searchElement.button.addEventListener('click', () => {
    fetch(url)
        .then(response => response.json())
        .then(books => {
          searchElement.container.innerHTML = '';
          books.forEach(book => {
            searchElement.container.appendChild(generateBookCard(book));
          });
        })
        .then(() => {
          searchElement.author.checked = false;
          searchElement.bookname.checked = false;
          searchElement.input.value = '';
        })
        .catch(error => {
        console.log('Error: ', error);
        })
  })
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