import {
    createElementAndApplyProperties
} from "./utils.js"

export function generateBookSheet(book) {
    const toAppend = [];

    const mainContainer = createElementAndApplyProperties('div', [
        { name: 'textContent', value: `${book['title']}`},
    ])



    return mainContainer;
}