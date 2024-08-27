/**
 * @see https://leetcode.com/problems/transpose-matrix/
 */

// TC - O(M*N)
/**
 * Given a 2D matrix, this function returns its transpose.
 * The transpose of a matrix is obtained by swapping its rows and columns.
 *
 * @param {number[][]} matrix - The input 2D matrix.
 * @return {number[][]} - The transposed matrix.
 */
var transpose = function (matrix) {
  // Get the number of rows and columns in the original matrix
  let r = matrix.length;
  let c = matrix[0].length;

  // Create an empty output matrix with the dimensions swapped (rows become columns, columns become rows)
  let output = Array.from({ length: c }, () => Array(r).fill(0));

  // Iterate through each element of the original matrix
  for (let rowIndex = 0; rowIndex < r; rowIndex++) {
    for (let colIndex = 0; colIndex < c; colIndex++) {
      // Assign the value at [rowIndex][colIndex] in the original matrix to [colIndex][rowIndex] in the output matrix
      output[colIndex][rowIndex] = matrix[rowIndex][colIndex];
    }
  }

  // Return the transposed matrix
  return output;
};
