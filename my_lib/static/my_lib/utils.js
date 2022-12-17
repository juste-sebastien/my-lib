

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
