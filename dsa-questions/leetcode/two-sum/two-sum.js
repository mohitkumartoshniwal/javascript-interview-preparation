/**
 * @see https://leetcode.com/problems/two-sum/
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
/**
 * Find two indices in the array such that their values add up to the target.
 *
 * @param {number[]} nums - Array of integers.
 * @param {number} target - The target sum.
 * @return {number[]} - The indices of the two numbers that add up to the target.
 */
var twoSum = function (nums, target) {
  // Create a Map to store numbers and their indices
  const numToIndex = new Map();

  // Iterate over each number in the array
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;

    // Check if the complement (target - currentNum) exists in the Map
    if (numToIndex.has(complement)) {
      // If it exists, return the indices of the complement and the current number
      return [numToIndex.get(complement), i];
    }

    // If the complement does not exist in the Map, store the current number and its index
    numToIndex.set(currentNum, i);
  }

  // If no solution is found, return an empty array (should not be reached with valid input)
  return [];
};
