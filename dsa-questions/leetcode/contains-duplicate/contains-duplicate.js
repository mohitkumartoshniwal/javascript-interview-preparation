/**
 * @see https://leetcode.com/problems/contains-duplicate/
 */

// Time Complexity: O(N log N), where N is the number of elements in the array. This is due to the sorting operation, which dominates the complexity. The iteration through the array is O(N), but sorting is the most time-consuming operation here.
// Space Complexity: O(1), assuming the sorting is done in-place.

/**
 * Checks if there are any duplicate values in the given array.
 *
 * @param {number[]} nums - The input array of integers.
 * @return {boolean} - Returns true if there are duplicates, false otherwise.
 */
var containsDuplicate = function (nums) {
  // Sort the array to bring duplicate elements next to each other
  nums.sort((a, b) => a - b);

  // Iterate through the sorted array
  for (let index = 1; index < nums.length; index++) {
    // Check if the current value is the same as the previous value
    const currentValue = nums[index];
    if (currentValue === nums[index - 1]) {
      // If duplicate is found, return true
      return true;
    }
  }

  // If no duplicates are found, return false
  return false;
};
