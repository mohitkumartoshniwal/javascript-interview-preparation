/**
 * @see https://leetcode.com/problems/valid-palindrome/
 */

// Time Complexity: O(n): The string is processed twice (once for filtering and once for palindrome checking), where n is the length of the string.
// Space Complexity: O(n): The filtered string is stored in a new variable.
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let cleanedS = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  let left = 0;
  let right = cleanedS.length - 1;

  while (left < right) {
    if (cleanedS[left] !== cleanedS[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};
