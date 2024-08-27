/**
 * @see https://leetcode.com/problems/valid-anagram/
 */

// Time Complexity: O(n)
/**
 * Determines if two strings are anagrams of each other.
 *
 * @param {string} s - The first string.
 * @param {string} t - The second string.
 * @return {boolean} - Returns true if the strings are anagrams, otherwise false.
 */
var isAnagram = function (s, t) {
  // If the lengths are different, they cannot be anagrams
  if (s.length !== t.length) {
    return false;
  }

  // Initialize an array to count character frequencies (for 26 lowercase English letters)
  const charCount = new Array(26).fill(0);

  // Increment the count for each character in the first string
  for (let i = 0; i < s.length; i++) {
    charCount[s.charCodeAt(i) - 97]++;
  }

  // Decrement the count for each character in the second string
  for (let i = 0; i < t.length; i++) {
    charCount[t.charCodeAt(i) - 97]--;
  }

  // If any count is not zero, the strings are not anagrams
  for (let count of charCount) {
    if (count !== 0) {
      return false;
    }
  }

  // If all counts are zero, the strings are anagrams
  return true;
};
