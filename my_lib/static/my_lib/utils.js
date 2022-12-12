

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