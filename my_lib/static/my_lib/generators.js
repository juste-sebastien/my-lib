import { 
    profileContainer, 
    zoomOnComment,
    addToBooklist,
} from "./main.js";

import {
    createElementAndApplyProperties,
} from './utils.js';


/**
 * Generate user profile
 * 
 * @param {*} user
 */
export function generateUserProfile(user) {
    // ToDo -> mettre les classes
    profileContainer = '';
    profileContainer.innerHTML = `
        <div>
            <div>    
                <img src="${user.img_profile}" alt="${user.username}" />
                <div>${user.username}</div>
                <div>Total comments: ${user.total_comments}</div>
                <div>Total books read: ${user.total_reading}</div>
            <div>
        </div>
    `;
}


/**
 * Generate a book comment content
 * 
 * @param {*} comment - comment of a book
 * @param {*} book - informations concerning a book
 * 
 * @return {HTMLElement} commentContent
 */
export function generateComment(comment, book) {
    // ToDo -> mettre les classes
    let commentContent = document.createElement('div');
    commentContent.innerHTML = `
        <div>
            <img src="${book.cover}" alt="${book.title} cover" />
            <div>
                <div>
                    <div>${comment.title} by ${comment.author}</div>
                    <div>${comment.date}</div>
                </div>
                <textarea>${comment.content}</textarea>
            </div>
        </div>
    `
    commentContent.addEventListener('click', () => {
        zoomOnComment(comment, book);
    });
    return commentContent
}


/**
 * Generate a zoomed comment content
 * 
 * @param {*} comment - comment of a book
 * @param {*} book - informations concerning a book
 * 
 * @return {HTMLElement} commentContent
 */
export function generateZoomedComment(comment, book) {
   // ToDo -> mettre les classes 
    const content = `
        <div>
            ${comment.title} by ${comment.author}
            <img></img>
        </div>
        <div>on ${book.title}</div>
        <div>${comment.content}</div>
    `
    return content;
}

/**
 * Generate a book card
 * 
 * @param {*} note - note of a book given by a user
 * @param {*} book - informations concerning a book
 * 
 * @return {HTMLElement} bookContainer
 */
export function generateBookCard(book, note='N/A') {
    // Todo -> mettre les classes 
    // Define an empty Array
    const toAppend = [];

    // Create top navbar
    // Create readings Button
    const readingsButton = createElementAndApplyProperties('li', [
        {name: 'style', subProperty: 'cursor', value: 'pointer'},
        {name: 'textContent', value: 'Readings'},
    ]);
    readingsButton.addEventListener('click', function() {
        addToBooklist('readings', book);
    }
);
    const readingsImage = createElementAndApplyProperties('img', [
        {name: 'src', value: ''},
        {name: 'alt', value: ' 📖'},

    ]);

    // Create read button
    const readButton = createElementAndApplyProperties('li', [
        {name: 'style', subProperty: 'cursor', value: 'pointer'},
        {name: 'textContent', value: 'Read'},
    ]);
    readButton.addEventListener('click', function() {
                addToBooklist('read', book);
            }
    );
    const readImage = createElementAndApplyProperties('img', [
        {name: 'src', value: ''},
        {name: 'alt', value: ' ✔'},

    ]);

    // Create to read button
    const toReadButton = createElementAndApplyProperties('li', [
        {name: 'style', subProperty: 'cursor', value: 'pointer'},
        {name: 'textContent', value: 'To read'},
    ]);
    toReadButton.addEventListener('click', function() {
        addToBooklist('to_read', book);
    }
);
    const toReadImage = createElementAndApplyProperties('img', [
        {name: 'src', value: ''},
        {name: 'alt', value: ' 📚'},

    ]);

    // Create stars button
    const starsButton = createElementAndApplyProperties('li', [
        {name: 'style', subProperty: 'cursor', value: 'pointer'},
        {name: 'textContent', value: '5 Stars'},
    ]);
    starsButton.addEventListener('click', function() {
        addToBooklist('stars', book);
    }
);
    const starsImage = createElementAndApplyProperties('img', [
        {name: 'src', value: ''},
        {name: 'alt', value: ' 🏆'},

    ]);

    // Create navbar
    const navBar = createElementAndApplyProperties('nav', [
        {name: 'className', value: 'book-navbar'},
    ]);

    // And inner list
    const ul = createElementAndApplyProperties('ul', [
        {name: 'textContent', value: 'Add to list:'},
    ]);
    
    toAppend.push(
        {
            target: readingsButton,
            element: readingsImage,
        },
        {
            target: readButton,
            element: readImage,
        },
        {
            target: toReadButton,
            element: toReadImage,
        },
        {
            target: starsButton,
            element: starsImage,
        },
        {
            target: ul,
            element: readingsButton,
        },
        {
            target: ul,
            element: readButton,
        },
        {
            target: ul,
            element: toReadButton,
        },
        {
            target: ul,
            element: starsButton,
        },
        {
            target: navBar,
            element: ul,
        },
    );
    
    const bookContainer = createElementAndApplyProperties('div', [
        {name: 'className', value: ''}
    ]);
    
    const bookCover = createElementAndApplyProperties('img', [
        {name: 'src', value: `${book['cover']}`},
        {name: 'alt', value: `${book['title']} cover`},
    ]);
    const bookInfoContent = createElementAndApplyProperties('div', []);
    
    const bookInfoTitle = createElementAndApplyProperties('h4', [
        {name: 'textContent', value: `${book['title']}`}
    ]);

    const bookNote = createElementAndApplyProperties('div', [
        {
            name: 'textContent', 
            value: note != undefined ? `Your note: ${note}` : 'Your note: N/A'
        },
    ]);

    const bookAuthor = createElementAndApplyProperties('div', [
        {
            name: 'textContent', 
            value: book['author_last_name'] != undefined ? `Author: ${book['author_last_name']}` : 'Author: N/A'
        },
    ]);
    
    const bookAverage = createElementAndApplyProperties('div', [
        {
            name: 'textContent', 
            value: book['average_ratings'] != undefined ? `Average: ${book['average_ratings']}` : 'Average: N/A'
        },
    ]);

    const bookReaders = createElementAndApplyProperties('div', [
        {
            name: 'textContent', 
            value: book['total_readers'] != undefined ? `Total readers: ${book['total_readers']}` : 'Total readers: 0'
        },
    ]);

    const bookViewmore = createElementAndApplyProperties('button', [
        {name: 'textContent', value: 'View more'},
    ]);
    bookViewmore.addEventListener('click', function() {
        console.log('view more');
    }
);

    toAppend.push(
        {
            target: bookInfoContent,
            element: bookInfoTitle,
        },
        {
            target: bookInfoContent,
            element: bookNote,
        },
        {
            target: bookInfoContent,
            element: bookAuthor,
        },
        {
            target: bookInfoContent,
            element: bookAverage,
        },
        {
            target: bookInfoContent,
            element: bookReaders,
        },
        {
            target: bookContainer,
            element: navBar,
        },
        {
            target: bookContainer,
            element: bookCover,
        },
        {
            target: bookContainer,
            element: bookInfoContent,
        },
        {
            target: bookContainer,
            element: bookViewmore,
        }
    );



    // Append all element to DOM
    toAppend.forEach((element) => {
        element.target.appendChild(element.element);
    });
    
    return bookContainer;
}