import virtualTree from "./virtualTree.js";

/**
 * Renders a virtual DOM representation into actual DOM elements.
 *
 * @param {Object} vDOM - The virtual DOM object to render.
 * @returns {HTMLElement} - The rendered DOM element.
 */
function render(vDOM) {
  const { type, props } = vDOM;

  // If vDOM is not an object, it is a text node.
  if (typeof vDOM !== "object") {
    // Create a text node with the vDOM value.
    const element = document.createTextNode(vDOM);
    return element;
  }

  // Create an HTML element of the type specified in vDOM.
  /**
   * @type {HTMLElement}
   */
  const root = document.createElement(type);

  // Extract children and other attributes from props.
  const { children, ...attrProps } = props;

  // Set attributes on the created element.
  for (const attribute in attrProps) {
    const value = attrProps[attribute];
    root.setAttribute(attribute, value);
  }

  // Render and append children elements if children is an array.
  if (Array.isArray(children)) {
    for (const child of children) {
      const element = render(child);
      root.appendChild(element);
    }
  } else {
    // Render and append a single child element if children is not an array.
    const element = render(children);
    root.appendChild(element);
  }

  return root;
}

// Render the virtual tree and append it to the document body.
document.body.appendChild(render(virtualTree));
