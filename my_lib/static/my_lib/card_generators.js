import { 
    addToBooklist,
    getBookSheet
 } from "./main.js";
import {
    createElementAndApplyProperties,
} from "./utils.js";


/**
 * Generate a book card
 * 
 * @param {object} book - informations concerning a book
 * @param {HTMLElement} sheet - container for displaying book information
 * 
 * @return {HTMLElement} cardContainer
 */
export function generateBookCard(book, sheet) {
    const toAppend = [];

    const cardContainer = createElementAndApplyProperties('div', [
        { name: 'className', value: 'bookcard'}
    ]);
    cardContainer.addEventListener('click', () => {
        getBookSheet(book, sheet);
    })

    const image = createElementAndApplyProperties('img', [
        { name: 'src', value: `${book['cover']}`},
        { name: 'alt', value: `${book['title']}'s cover`},
        { name: 'className', value: 'bookcard-header'},
    ]);

    const infoContainer = createElementAndApplyProperties('div', [
        { name: 'className', value: 'bookcard-body'},
    ]);

    const topInfo = createElementAndApplyProperties('div', []);

    const title = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `${book['title']}`}
    ]);

    const note = createElementAndApplyProperties('div', [
        { 
            name: 'textContent', 
            value: book['note'] === null ? 'Not rated' : `${book['note']}`
        }
    ]);

    const author = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `${book['author']}`}
    ]);

    const synopsis = createElementAndApplyProperties('div', [
        { 
            name: 'textContent', 
            value: book['synopsis'] === null ? '' : `${book['synopsis']}`
        }
    ]);

    const bottomInfo = createElementAndApplyProperties('div', []);

    const readers = createElementAndApplyProperties('div', [
        { 
            name: 'textContent', 
            value: book['total_readers'] === null ? '' : `${book['total_readers']}`
        }
    ]);

    const average = createElementAndApplyProperties('div', [
        { 
            name: 'textContent', 
            value: book['average_ratings'] === null ? '' : `${book['average_ratings']}`
        }
    ]);

    const buttonPanel = createElementAndApplyProperties('div', [
        { name: 'className', value: 'bookcard-panel-buttons'},
    ]);

    const readingsButton = createElementAndApplyProperties('button', [
        { 
            name: 'textContent', 
            value: book['is_in_readings'] ? '📖 Remove' : '📖 Add'
        },
        { name: 'className', value: 'addlist-button'},
    ]);
    readingsButton.addEventListener('click', () => {
        if (book['is_in_readings']) {
            readingsButton.textContent = '📖 Remove'
        } else {
            readingsButton.textContent = '📖 Add'
        }
        book['is_in_readings'] = !book['is_in_readings'];
        addToBooklist('readings', book);
    })

    const readButton = createElementAndApplyProperties('button', [
        { 
            name: 'textContent', 
            value: book['is_in_read'] ? '✔ Remove' : '✔ Add'
        },
        { name: 'className', value: 'addlist-button'},
    ]);
    readButton.addEventListener('click', () => {
        if (book['is_in_read']) {
            readButton.textContent = '✔ Remove'
        } else {
            readButton.textContent = '✔ Add'
        }
        book['is_in_read'] = !book['is_in_read'];
        addToBooklist('read', book);
    });

    const toreadButton = createElementAndApplyProperties('button', [
        { 
            name: 'textContent', 
            value: book['is_in_toread'] ? '📚 Remove' : '📚 Add'
        },
        { name: 'className', value: 'addlist-button'},
    ]);
    toreadButton.addEventListener('click', () => {
        if (book['is_in_toread']) {
            toreadButton.textContent = '📚 Remove'
        } else {
            toreadButton.textContent = '📚 Add'
        }
        book['is_in_toread'] = !book['is_in_toread'];
        addToBooklist('toread', book);
    });

    const starsButton = createElementAndApplyProperties('button', [
        { 
            name: 'textContent', 
            value: book['is_in_stars'] ? '🏆 Remove' : '🏆 Add'
        },
        { name: 'className', value: 'addlist-button'},
    ]);
    starsButton.addEventListener('click', () => {
        if (book['is_in_stars']) {
            starsButton.textContent = '🏆 Remove'
        } else {
            starsButton.textContent = '🏆 Add'
        }
        book['is_in_stars'] = !book['is_in_stars'];
        addToBooklist('stars', book);
    });

    toAppend.push(
        {
            target: buttonPanel,
            element: readingsButton,
        },
        {
            target: buttonPanel,
            element: readButton,
        },
        {
            target: buttonPanel,
            element: toreadButton,
        },
        {
            target: buttonPanel,
            element: starsButton,
        },
        {
            target: bottomInfo,
            element: readers,
        },
        {
            target: bottomInfo,
            element: average,
        },
        {
            target: topInfo,
            element: title,
        },
        {
            target: topInfo,
            element: note,
        },
        {
            target: topInfo,
            element: author,
        },
        {
            target: infoContainer,
            element: topInfo,
        },
        {
            target: infoContainer,
            element: synopsis,
        },
        {
            target: infoContainer,
            element: bottomInfo,
        },
        {
            target: cardContainer,
            element: image,
        },
        {
            target: cardContainer,
            element: infoContainer,
        },
        {
            target: cardContainer,
            element: buttonPanel,
        },
    );

    toAppend.forEach((element) => {
        element.target.appendChild(element.element);
    });

    return cardContainer;
}