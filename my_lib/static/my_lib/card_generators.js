import { 
    addToBooklist,
    getBookSheet
 } from "./main.js";
import {
    createElementAndApplyProperties,
} from "./utils.js";
import {
    setRate,
} from "./library.js";

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

    var rate = 0;
    const container = createElementAndApplyProperties('div', [
        { name: 'className', value: 'stars-container' }
    ]);

    const span1 = createElementAndApplyProperties('span', [
        { 
            name: 'textContent',
            value: Number(book['note']) >= 1 ? '★' : '☆'
        },
        { name: 'className', value: 'star-span' }
    ]);

    span1.addEventListener('click', () => {
        if (span1.textContent === '☆') {
            span1.textContent = '★';
            rate = 1;
        } else {
            span5.textContent = '☆';
            span4.textContent = '☆';
            span3.textContent = '☆';
            span2.textContent = '☆';
            span1.textContent = '☆';
            rate = 0;
        };
        setRate(rate, book);
        });
        
        const span2 = createElementAndApplyProperties('span', [
            { 
                name: 'textContent',
                value: Number(book['note']) >= 2 ? '★' : '☆'
            },
            { name: 'className', value: 'star-span' }
        ]);

        const span3 = createElementAndApplyProperties('span', [
            { 
                name: 'textContent',
                value: Number(book['note']) >= 3 ? '★' : '☆'
            },
            { name: 'className', value: 'star-span' }
        ]);

        const span4 = createElementAndApplyProperties('span', [
            { 
                name: 'textContent',
                value: Number(book['note']) >= 4 ? '★' : '☆'
            },
            { name: 'className', value: 'star-span' }
        ]);

        const span5 = createElementAndApplyProperties('span', [
            { 
                name: 'textContent',
                value: Number(book['note']) >= 5 ? '★' : '☆'
            },
            { name: 'className', value: 'star-span' }
        ]);

        span2.addEventListener('click', () => {
            if (span2.textContent === '☆') {
                span1.textContent = '★';
                span2.textContent = '★';
                rate = 2;
            } else {
                span5.textContent = '☆';
                span4.textContent = '☆';
                span3.textContent = '☆';
                span2.textContent = '☆';
                rate = 1;
            };
            setRate(rate, book);
        });

        span3.addEventListener('click', () => {
            if (span3.textContent === '☆') {
                span1.textContent = '★';
                span2.textContent = '★';
                span3.textContent = '★';
                rate = 3;
            } else {
                span5.textContent = '☆';
                span4.textContent = '☆';
                span3.textContent = '☆';
                rate = 2;
            };
            setRate(rate, book);
        });

        span4.addEventListener('click', () => {
            if (span4.textContent === '☆') {
                span1.textContent = '★';
                span2.textContent = '★';
                span3.textContent = '★';
                span4.textContent = '★';
                rate = 4;
            } else {
                span5.textContent = '☆';
                span4.textContent = '☆';
                rate = 3;
            };
            setRate(rate, book);
        });

        span5.addEventListener('click', () => {
            if (span5.textContent === '☆') {
                span1.textContent = '★';
                span2.textContent = '★';
                span3.textContent = '★';
                span4.textContent = '★';
                span5.textContent = '★';
                rate = 5;
            } else {
                span5.textContent = '☆';
                rate = 4;
            };
            setRate(rate, book);
        });

        toAppend.push(
            {
                target: container,
                element: span1,
            },
            {
                target: container,
                element: span2,
            },
            {
                target: container,
                element: span3,
            },
            {
                target: container,
                element: span4,
            },
            {
                target: container,
                element: span5,
            },
        );

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

    const viewMore = createElementAndApplyProperties('button', [
        { name: 'textContent', value: 'View More' }
    ]);

    viewMore.addEventListener('click', () => {
        getBookSheet(book, sheet);
    })

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
            target: bottomInfo,
            element: viewMore,
        },
        {
            target: topInfo,
            element: title,
        },
        {
            target: topInfo,
            element: container,
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


function generateRating(book) {
    const toAppend = [];
    toAppend.forEach((element) => {
        element.target.appendChild(element.element);
    });

    return container;
}