/**
 * @see https://leetcode.com/problems/rotate-array/
 */

// Time Complexity: O(N), where N is the length of the array. Each element is reversed a constant number of times.
// Space Complexity: O(1). The algorithm uses a constant amount of extra space.

/**
 * Rotate the array to the right by k steps.
 *
 * @param {number[]} nums - The array to rotate.
 * @param {number} k - The number of steps to rotate the array.
 * @return {void} - The function modifies the array in place.
 */
var rotate = function (nums, k) {
  const n = nums.length;
  k = k % n; // In case k is greater than the length of the array

  // Reverse the entire array
  reverse(nums, 0, n - 1);
  // Reverse the first k elements
  reverse(nums, 0, k - 1);
  // Reverse the remaining elements
  reverse(nums, k, n - 1);
};

/**
 * Helper function to reverse a portion of the array.
 *
 * @param {number[]} array - The array to reverse.
 * @param {number} start - The start index of the portion to reverse.
 * @param {number} end - The end index of the portion to reverse.
 */
function reverse(array, start, end) {
  while (start < end) {
    [array[start], array[end]] = [array[end], array[start]];
    start++;
    end--;
  }
}
