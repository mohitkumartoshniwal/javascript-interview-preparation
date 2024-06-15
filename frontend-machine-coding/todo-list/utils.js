/**
 *
 * @param {string} html
 * @returns
 */
export function getElementFromHtml(html) {
  let children = document
    .createRange()
    .createContextualFragment(html.trim()).children;
  return children[0];
}

/**
 *
 * @returns {number}
 */
export function generateId() {
  return Math.floor(Math.random() * 1000);
}
