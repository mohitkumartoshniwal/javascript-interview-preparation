/**
 * @see https://leetcode.com/problems/plus-one/
 */

// Time Complexity: O(n)
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  // Traverse the digits array from the end (least significant digit) to the beginning
  for (let i = digits.length - 1; i >= 0; i--) {
    // Check if the current digit is less than 9
    if (digits[i] < 9) {
      // If it is less than 9, simply increment this digit by one
      digits[i]++;
      // Return the updated digits array as no further carry is needed
      return digits;
    }

    // If the current digit is 9, setting it to 0 since 9 + 1 will generate a carry
    digits[i] = 0;
  }

  // After the loop, if all digits were 9 (e.g., [9, 9, 9]), all have been set to 0.
  // We need to add a new most significant digit to handle the carry (e.g., [1, 0, 0, 0])
  // This step creates a new array with 1 followed by all zeroes.
  return [1, ...digits];
};
