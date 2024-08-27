/**
 * @see https://leetcode.com/problems/single-number/
 */

// Time Complexity: O(N), where N is the number of elements in the array. We are iterating through the array once.
// Space Complexity: O(1), since we are using only a constant amount of extra space
/**
 * Finds the single number in the array where every other number appears twice.
 *
 * @param {number[]} nums - The input array of integers.
 * @return {number} - The single number that does not have a duplicate.
 */
var singleNumber = function (nums) {
  // Initialize the result variable
  let result = 0;

  // Iterate through the array
  for (let num of nums) {
    // Apply XOR operation
    result ^= num;
  }

  // Return the single number
  return result;
};
