/**
 * @see https://leetcode.com/problems/matrix-diagonal-sum/
 */

// TC - O(N)
/**
 * The function calculates the sum of the primary and secondary diagonals of a square matrix.
 * The primary diagonal runs from the top-left to the bottom-right.
 * The secondary diagonal runs from the top-right to the bottom-left.
 * If the matrix has an odd number of rows, the center element (which appears in both diagonals) is only counted once.
 *
 * @param {number[][]} mat - The input square matrix.
 * @return {number} - The sum of the diagonals.
 */
var diagonalSum = function (mat) {
  let r = mat.length; // Number of rows
  let c = mat[0].length; // Number of columns

  let sum = 0;
  for (let rowIndex = 0; rowIndex < r; rowIndex++) {
    // Get the primary diagonal element
    let primaryDiagonalElement = mat[rowIndex][rowIndex];
    sum += primaryDiagonalElement;

    // Get the secondary diagonal element
    let lastRowElement = c - 1;
    let secondaryDiagonalElement = mat[rowIndex][lastRowElement - rowIndex];

    // If the element is not the same as the primary diagonal element, add it
    if (rowIndex !== lastRowElement - rowIndex) {
      sum += secondaryDiagonalElement;
    }
  }

  return sum;
};
