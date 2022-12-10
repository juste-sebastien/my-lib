import { 
    profileContainer, 
    zoomOnComment 
} from "./main.js";

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
        <div>${comment.title} by ${comment.author}</div>
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
    let bookContainer = document.createElement('div');
    bookContainer.className = '';
    bookContainer.innerHTML = `
        <img src="${book.cover}" alt="${book.title} cover" />
        <div>
            <h4>${book.title}</h4>
            <div>${note}</div>
            <div>${book.author}</div>
            <div>Average: ${book.average}</div>
            <div>Total readers: ${book.readers}</div>
        </div>
    `
    return bookContainer;
}