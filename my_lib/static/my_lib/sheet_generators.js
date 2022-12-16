import {
    createElementAndApplyProperties
} from "./utils.js"

export function generateBookSheet(book) {
    const toAppend = [];

    const mainContainer = createElementAndApplyProperties('div', [
        { name: 'className', value: 'bookview-container' },
    ]);

    const title = createElementAndApplyProperties('h4', [
        { name: 'className', value: 'bookview-title'},
        { name: 'textContent', value: `${book['title']}`}
    ]);

    const author = createElementAndApplyProperties('div', [
        { name: 'className', value: 'bookview-author'},
        { name: 'textContent', value: `${book['author']}` },
    ]);

    const infoContainer = createElementAndApplyProperties('div', [
        { name: 'className', value: 'bookview-info-container'}
    ]);

    const genre = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `Genre: \n${book['genre']}`}
    ]);

    const editor = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `Editor: \n${book['editor']}`}
    ]);

    const average = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `Average: \n${book['average']}` }
    ]);

    const readers = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `Total readers: ${book['total_readers']}` }
    ]);

    const synopsis = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `Synopsis: \n${book['synopsis']}` },
        { name: 'className', value: 'bookview-synopsis'},
    ]);

    const comments = createElementAndApplyProperties('div', [
        //{ name: 'innerHTML', value: generateComments },
        { name: 'className', value: 'bookview-comments'},
    ]);

    const buy = createElementAndApplyProperties('a', [
        { name: 'href', value: `${book['buy_link']}`},
        { name: 'className', value: 'bookview-info-container'}
    ])

    toAppend.push(
        {
            target: infoContainer,
            element: genre,
        },
        {
            target: infoContainer,
            element: editor,
        },
        {
            target: infoContainer,
            element: average,
        },
        {
            target: infoContainer,
            element: readers,
        },
        {
            target: mainContainer,
            element: title,
        },
        {
            target: mainContainer,
            element: author,
        },
        {
            target: mainContainer,
            element: infoContainer,
        },
        {
            target: mainContainer,
            element: synopsis,
        },
        {
            target: mainContainer,
            element: comments,
        },
        {
            target: mainContainer,
            element: buy,
        },

    )

    toAppend.forEach((element) => {
        element.target.appendChild(element.element);
    });

    return mainContainer;
}