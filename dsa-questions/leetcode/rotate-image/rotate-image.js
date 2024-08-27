/**
 * @see https://leetcode.com/problems/rotate-image/
 */

// Time Complexity: O(n^2)
// Space Complexity: O(1)
/**
 * Rotates the input matrix by 90 degrees clockwise in-place.
 * The approach involves two steps:
 * 1. Transpose the matrix.
 * 2. Reverse each row to achieve the desired rotation.
 *
 * @param {number[][]} matrix - 2D array representing the matrix to be rotated.
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  // Step 1: Transpose the matrix
  // In a transpose, we convert rows into columns.
  // We swap the elements at (rowIndex, colIndex) with (colIndex, rowIndex).
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    // Notice that the inner loop runs only for colIndex < rowIndex
    // to avoid unnecessary swaps and to handle only one side of the diagonal.
    for (let colIndex = 0; colIndex < rowIndex; colIndex++) {
      // Swap elements across the diagonal
      [matrix[rowIndex][colIndex], matrix[colIndex][rowIndex]] = [
        matrix[colIndex][rowIndex],
        matrix[rowIndex][colIndex],
      ];
    }
  }

  // Step 2: Reverse each row
  // After transposing, reverse each row to achieve the 90-degree rotation.
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    matrix[rowIndex].reverse();
  }
};
