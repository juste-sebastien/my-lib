const smallSize = 640;
const mediumSize = 1007;
const largeSize = 1008;

/**
 *  Create a new HTML element in the DOM
 *  and apply any rules to it
 * 
 * @param {*} elementType - HTML tag
 * @param {*} properties - HTML attributes or behaviors
 * @returns {*} newElement - final component version
 */
export function createElementAndApplyProperties(elementType, properties) {
    const newElement = document.createElement(elementType);
    properties.forEach((property) => {
      // Check subProperty existence
      property.subProperty
        ? (newElement[property.name][property.subProperty] = property.value)
        : (newElement[property.name] = property.value);
    });
    return newElement;
  }

/**
 * Get crsf from navigator cookie
 * 
 * @param {*} name - crsf
 * @returns {*} cookieValue - value of crsf
 */
  export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }


export function displayAlert(element, elementClass, content) {
  element.textContent = content;
  element.classList.add('alert-display');
  element.classList.add(elementClass);
}


export function hideAlert(element, elementClass, content) {
  element.textContent = '';
  element.classList.remove('alert-display');
  element.classList.remove(elementClass);
}


export function setCardsPerPage() {
  var width = window.innerWidth;

  if (width <= smallSize) {
    return 1;
  } else if (width >= largeSize) {
    return 4;
  } else {
    return 2;
  }
}

export function changeArrowDisplay(element, status){
  console.log(status)
  if (status) {
    console.log('test pass');
    element.classList.add("enabled-arrow");
  } else {
      element.classList.remove("enabled-arrow");
      element.setAttribute('disabled', '');
  }
  /*
if (response['next_page']) {
    rightArrow.classList.add("enabled-arrow");
    rightArrow.addEventListener('click', () => {
        url = url.replace(`page=${pageNum-1}`, `page=${pageNum}`);
        response = function() {
         fetch(url)
         .then(response => response.json());
        };
     });
} else {
    rightArrow.classList.remove("enabled-arrow");
    rightArrow.setAttribute('disabled', '');
}

document.querySelector('#books-container').innerHTML = '';
response['booklist'].forEach(book => {
document.querySelector('#books-container').appendChild(
    generateBookCard(
        book,
        bookSheet,
        response.connected
    ));
});

url = url.replace(`page=${pageNum+1}`, `page=${pageNum}`);
        response = function() {
            fetch(url)
            .then(response => response.json());
        };
        */
}