/**
 * Converts an HTML element into a virtual DOM representation.
 *
 * @param {HTMLElement} root - The root HTML element to convert.
 * @returns {Object} - The virtual DOM representation of the element.
 */
function virtualDOM(root) {
  // Create the virtual tree object with the type of the root element.
  const virtualTree = {
    type: root.tagName.toLowerCase(),
  };

  const props = {};

  // Check if the root element has any attributes.
  if (root.hasAttributes()) {
    const attributes = root.attributes;

    // Iterate over each attribute to add it to the props object.
    for (const attribute of attributes) {
      const name = attribute.name;
      const value = attribute.value;

      // Special check for "class" attribute
      if (name === "class") {
        props["className"] = value;
      } else {
        props[name] = value;
      }
    }
  }

  const children = [];

  // Check if the root element has any child nodes.
  if (root.childNodes.length > 0) {
    // Iterate over each child node.
    for (let index = 0; index < root.childNodes.length; index++) {
      const node = root.childNodes[index];

      // Handle text nodes.
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim().replace("\n", "");
        if (text.length > 0) {
          children.push(text);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recursively convert child elements to virtual DOM.
        children.push(virtualDOM(node));
      }
    }
  }

  // If there are child nodes, add them to the props object.
  if (children.length > 0) {
    props.children = children.length === 1 ? children[0] : children;
  }

  // Assign the props to the virtual tree object.
  virtualTree.props = props;

  // Return the virtual DOM representation.
  return virtualTree;
}

// Get the root HTML element by its ID and convert it to a virtual DOM representation.
const root = document.getElementById("root");
console.log(virtualDOM(root));

// OUTPUT
// {
//   "type": "div",
//   "props": {
//       "id": "root",
//       "className": "container",
//       "children": [
//           {
//               "type": "div",
//               "props": {
//                   "className": "header",
//                   "children": {
//                       "type": "h1",
//                       "props": {
//                           "children": "Welcome to My Web Page"
//                       }
//                   }
//               }
//           },
//           {
//               "type": "div",
//               "props": {
//                   "className": "content",
//                   "children": [
//                       {
//                           "type": "p",
//                           "props": {
//                               "children": "This is a simple example of HTML structure using various tags."
//                           }
//                       },
//                       {
//                           "type": "a",
//                           "props": {
//                               "href": "https://www.example.com",
//                               "className": "link",
//                               "target": "_blank",
//                               "children": "Visit Example.com"
//                           }
//                       }
//                   ]
//               }
//           },
//           {
//               "type": "div",
//               "props": {
//                   "className": "content",
//                   "children": {
//                       "type": "button",
//                       "props": {
//                           "className": "button",
//                           "children": "Click Me"
//                       }
//                   }
//               }
//           },
//           {
//               "type": "div",
//               "props": {
//                   "className": "content",
//                   "children": {
//                       "type": "span",
//                       "props": {
//                           "className": "highlight",
//                           "children": "This is a highlighted span element."
//                       }
//                   }
//               }
//           }
//       ]
//   }
// }
