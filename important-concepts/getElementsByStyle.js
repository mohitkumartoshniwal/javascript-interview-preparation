/**
 * @param {Element} element
 * @param {string} property
 * @param {string} value
 * @return {Array<Element>}
 */
export default function getElementsByStyle(element, property, value) {
  let elements = [];

  function traverse(el) {
    if (!el) {
      return;
    }

    const computedStyles = getComputedStyle(el);

    if (computedStyles.getPropertyValue(property) === value) {
      elements.push(el);
    }

    for (let child of el.children) {
      traverse(child);
    }
  }

  for (let el of element.children) {
    traverse(el);
  }

  return elements;
}

const doc = new DOMParser().parseFromString(
  `<div>
    <span style="font-size: 12px">Span</span>
    <p style="font-size: 12px">Paragraph</p>
    <blockquote style="font-size: 14px">Blockquote</blockquote>
  </div>`,
  'text/html',
);

getElementsByStyle(doc.body, 'font-size', '12px');
// [span, p] <-- This is an array of elements.

/**
What are computed styles and why are they important?
Let's take a closer look at Window.getComputedStyle(). According to MDN, it returns the property values after applying active stylesheets and resolving any basic computation those values may contain. Obtaining resolved styles is important because:

Styling can be done in many ways: There are many ways to style an element on a webpage:
Inline: Directly within the HTML tag.
Internal: With a <style> tag.
External: Linking to a separate CSS file.
Styles follow cascading and inheritance rules: CSS works by cascading styles – rules from different sources combine and potentially override each other. Elements can also inherit styles from their parent elements.
Multiple ways of defining styles properties: Other than using the raw final values when styling elements:
Many value types: Some properties like colors can be done in different ways. e.g. color: white, color: #fff, color: rgb(255, 255, 255) are all valid ways to render white text color.
Shorthands: Properties can be defined using shorthands, e.g. margin: 10px results in margin-top: 10px as well as for the other directions.
CSS variables: Properties can also be written using CSS variables or more officially known as CSS custom properties, e.g. color: var(--text-color). The final color value is not known until the browser resolves the value of the --text-color variable.
Styles have to be resolved: The getComputedStyle() API gives you a snapshot of the final, calculated styles applied to an element after all the cascading and inheritance rules have been applied. This is incredibly valuable because it reflects how the element is actually rendered in the browser.
The implication of using Window.getComputedStyle() is that we can only match based on the element's resolved values. Font sizes, paddings, margins, can be defined using px, rem, em, etc but the resolved value unit for these properties obtained from getComputedStyle() is px. Colors can be defined using named colors, HSL, RGB (and more) formats but the resolved style format for colors is RGB hexadecimal. This is a limitation that you should mention during your interviews if you have the opportunity.

element.style.color = 'white';
console.log(getComputedStyle(element).getPropertyValue('color')); // 'rgb(255, 255, 255)'
While it is possible to write your own conversion/resolution logic within your getElementsByStyle() function so that the value argument is resolved before comparing against the element's resolved styles, it is only achievable for certain properties that do not rely on properties of other elements. Properties like inherit, rem which rely on properties of other elements due to CSS cascading cannot be matched easily and accurately.
**/
