/**
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 */

// Time Complexity: O(N)
// Space Complexity: O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length === 0) return 0;

  let uniqueIndex = 0; // Pointer for the unique element's position

  // Iterate through the array
  for (let currentIndex = 1; currentIndex < nums.length; currentIndex++) {
    // If a new unique element is found
    if (nums[currentIndex] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[currentIndex]; // Place the unique element at the uniqueIndex-th position
    }
  }

  // Return the count of unique elements
  return uniqueIndex + 1;
};
