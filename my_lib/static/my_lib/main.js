import {
    getCookie,
} from "./utils.js";

import {
    generateBookSheet
} from "./sheet_generators.js"

document.addEventListener('DOMContentLoaded', function() {
  if ( document.body.contains(document.getElementById("link-library"))) {
    document.querySelector('#link-home').addEventListener('click', () => {
      document.querySelector('#link-home').classList.add('link-active');
      document.querySelector('#link-library').classList.remove('link-active');
      document.querySelector('#link-recommendator').classList.remove('link-active');
    });

    document.querySelector('#link-library').addEventListener('click', () => {
      document.querySelector('#link-home').classList.remove('link-active');
      document.querySelector('#link-library').classList.add('link-active');
      document.querySelector('#link-recommendator').classList.remove('link-active');
    });
    document.querySelector('#link-recommendator').addEventListener('click', () => {
      document.querySelector('#link-home').classList.remove('link-active');
      document.querySelector('#link-library').classList.remove('link-active');
      document.querySelector('#link-recommendator').classList.add('link-active');
    });
  }

});


/**
 * Send to api a book to add to a specific list
 * 
 * @param {string} listName - name of list
 * @param {object} book - object return by api
 */
//todo voir pour bouger dans utils
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


export function getBookSheet(book, sheet) {
    sheet.innerHTML = generateBookSheet(book).innerHTML;
    sheet.style.visibility = 'visible';

    sheet.addEventListener('click', () => {
        sheet.style.visibility = 'hidden';
    });
}