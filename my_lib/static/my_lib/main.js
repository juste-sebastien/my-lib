// Defining all variables
const navBar = document.querySelector('.navbar');
const linkHome = document.querySelector('#link-home');
var linkLibrary = '';
if (document.querySelector('#link-library')) {
  linkLibrary = document.querySelector('#link-library');
}
var linkRecommendator = '';
if (document.querySelector('#link-recommendator')) {
  submitPost = document.querySelector('#link-recommendator');
}


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
  const searchButton = document.querySelector('#home-search-button');
  const homeContainer = document.querySelector('#home-container');

  homeContainer.textContent = 'Begin to search a book';

  searchButton.addEventListener('click', () => {
    homeContainer.textContent = 'Groovy!';
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