/**
 * @see https://leetcode.com/problems/climbing-stairs/
 */

// Time Complexity: O(2^N) - Exponential time complexity (inefficient for large N)
// This approach leads to Time Limit Exceeded (TLE) for larger inputs.

/**
 * @param {number} n - The number of steps to reach the top
 * @return {number} - The number of distinct ways to climb to the top
 */
var climbStairs = function (n) {
  // Base case: If there are 0 or 1 steps, there's only 1 way to reach the top
  if (n === 0 || n === 1) return 1;

  // Recursively calculate the number of ways to climb when taking 1 step or 2 steps
  let climbOneStep = climbStairs(n - 1);
  let climbTwoSteps = climbStairs(n - 2);

  // The total number of ways to reach the top is the sum of the two possibilities
  return climbOneStep + climbTwoSteps;
};

// Optimized solution using memoization to reduce time complexity from O(2^N) to O(N)
let map = new Map(); // Map to store already calculated results for subproblems

/**
 * @param {number} n - The number of steps to reach the top
 * @return {number} - The number of distinct ways to climb to the top
 */
var climbStairs = function (n) {
  // Base case: If there are 0 or 1 steps, there's only 1 way to reach the top
  if (n === 0 || n === 1) return 1;

  // If the result for the current number of steps is already calculated, return it
  if (map.has(n)) {
    return map.get(n);
  }

  // Recursively calculate the number of ways to climb when taking 1 step or 2 steps
  let climbOneStep = climbStairs(n - 1);
  let climbTwoSteps = climbStairs(n - 2);
  let totalWays = climbOneStep + climbTwoSteps;

  // Store the result in the map to avoid redundant calculations in future calls
  map.set(n, totalWays);

  // Return the total number of ways to reach the top
  return totalWays;
};
