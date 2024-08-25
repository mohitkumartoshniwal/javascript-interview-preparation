/**
 * Custom trim function to remove leading and trailing whitespace characters.
 * @param {string} str - The string to be trimmed.
 * @returns {string} - The trimmed string.
 */
function trim(str) {
  /**
   * Determines if a character is a whitespace character.
   * @param {string} ch - The character to be checked.
   * @returns {boolean} - True if the character is a whitespace character.
   */
  function isWhiteSpaceCharacter(ch) {
    // Check if the character is a space, tab, or newline.
    return [" ", "\t", "\n"].includes(ch);
  }

  // Initialize pointers for the start and end of the string.
  let start = 0;
  let end = str.length - 1;

  // Move the start pointer forward until a non-whitespace character is found.
  while (start < str.length && isWhiteSpaceCharacter(str[start])) {
    start++;
  }

  // Move the end pointer backward until a non-whitespace character is found.
  while (end >= 0 && isWhiteSpaceCharacter(str[end])) {
    end--;
  }

  // Slice the string from start to end + 1 (inclusive) and return.
  return str.slice(start, end + 1);
}

// Test cases

// Test with a string that has both leading and trailing whitespace.
const s = " Hello World ";
console.log(trim(s)); // "Hello World"
console.log(s.trim() === trim(s)); // true (comparison with native trim)

// Test with only leading whitespace.
console.log(trim("   Leading whitespace")); // "Leading whitespace"

// Test with only trailing whitespace.
console.log(trim("Trailing whitespace   ")); // "Trailing whitespace"

// Test with both leading and trailing whitespace.
console.log(trim("   Both sides   ")); // "Both sides"

// Test with a string that has no whitespace.
console.log(trim("NoWhitespace")); // "NoWhitespace"

// Test with a string that has only whitespace characters.
console.log(trim("    ").length === 0); // ""

// Test with an empty string.
console.log(trim("").length === 0); // ""

// Test with tab and newline characters.
console.log(trim("\t\tTabs and newlines\n\n")); // "Tabs and newlines"

// Test with a mix of spaces, tabs, and newlines.
console.log(trim(" \t\n Mixed whitespace \n\t ")); // "Mixed whitespace"

// Edge case: single character string with no whitespace.
console.log(trim("A")); // "A"

// Edge case: single character string with whitespace.
console.log(trim(" ").length === 0); // ""
