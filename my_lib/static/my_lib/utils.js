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
  element.classList.remove('alert-undisplay');
  element.classList.add(elementClass);
  setTimeout(
    hideAlert,
    4000,
    element, 
    elementClass
  );
}


export function hideAlert(element, elementClass) {
  console.log(element.classList);
  element.textContent = '';
  element.classList.remove('alert-display');
  element.classList.add('alert-undisplay');
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
  if (status) {
    element.classList.add("enabled-arrow");
  } else {
      element.classList.remove("enabled-arrow");
      element.setAttribute('disabled', '');
  }
}

export function setRate(note, book) {
  fetch(`set-rate/${book['id']}`, {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({
          note: note,
      }),
      headers: {
          "X-CSRFToken": getCookie("csrftoken")
      }
    })
    .then(response => response.json())
    .then(user => console.log(user))
    .catch(error => {
      console.log('Error: ', error);
      let content = 'An error occurs, please try to reload page';
      displayAlert(alert, 'alert-danger', content);
      setTimeout(function() {
          hideAlert(alert, 'alert-danger', content);
      }, 4000);
    });
}