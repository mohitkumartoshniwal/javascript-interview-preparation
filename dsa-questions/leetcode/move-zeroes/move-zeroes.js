/**
 * @see https://leetcode.com/problems/move-zeroes/
 */

// Time Complexity: O(n), where n is the length of the array. Each element is processed once
/**
 * Moves all zeros in the array to the end while maintaining the relative order of non-zero elements.
 *
 * @param {number[]} nums - The input array of integers.
 * @return {void} - The function modifies the array in place and does not return anything.
 */
var moveZeroes = function (nums) {
  let lastNonZeroIndex = 0; // Pointer for the position of the next non-zero element

  // Iterate through the array
  let i = 0;
  while (i < nums.length) {
    if (nums[i] !== 0) {
      // Swap the current non-zero element with the element at lastNonZeroIndex
      [nums[i], nums[lastNonZeroIndex]] = [nums[lastNonZeroIndex], nums[i]];
      lastNonZeroIndex++;
    }
    i++;
  }
};
