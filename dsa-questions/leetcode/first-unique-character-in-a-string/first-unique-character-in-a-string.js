/**
 * @see https://leetcode.com/problems/first-unique-character-in-a-string/
 */

// Time Complexity: O(n)
// Space Complexity: O(1) (constant space) in terms of the alphabet since we're only dealing with lowercase English letters (a fixed set of 26 characters).

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let charMap = new Map();

  for (let char of s) {
    charMap.set(char, (charMap.get(char) ?? 0) + 1);
  }

  for (let index = 0; index < s.length; index++) {
    if (charMap.get(s[index]) === 1) {
      return index;
    }
  }

  return -1;
};
