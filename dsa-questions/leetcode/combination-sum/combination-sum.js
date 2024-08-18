/**
 * @see https://leetcode.com/problems/combination-sum/
 */

// TODO need to check more accurate TC
// TC O(2^N * N)
// Picking and not picking will make 2^N and copying for the base case would make N

/**
 * @param {number[]} candidates - The array of candidate numbers
 * @param {number} target - The target sum we need to achieve
 * @return {number[][]} - A list of all unique combinations that sum up to the target
 */
var combinationSum = function (candidates, target) {
  const ans = []; // Store all the valid combinations here
  helper(candidates, target, 0, [], ans); // Start the recursive process
  return ans;
};

/**
 * Recursive helper function to generate combinations
 *
 * @param {number[]} candidates - The input array of numbers
 * @param {number} target - The remaining sum we need to achieve
 * @param {number} index - The current index in the array we're considering
 * @param {number[]} combinationsFormedSoFar - The current combination being formed
 * @param {number[][]} ans - The final array to store all valid combinations
 */
function helper(candidates, target, index, combinationsFormedSoFar, ans) {
  // Base case: If the remaining target is 0, we've found a valid combination
  if (target === 0) {
    ans.push([...combinationsFormedSoFar]); // Add a copy of the current combination to ans
    return;
  }

  // If the remaining target is negative or we've exhausted all candidates, stop the recursion
  if (target < 0 || index === candidates.length) {
    return;
  }

  // Recursive case 1: Do not pick the current candidate
  helper(candidates, target, index + 1, combinationsFormedSoFar, ans);

  // Recursive case 2: Pick the current candidate and continue
  combinationsFormedSoFar.push(candidates[index]); // Add the current candidate to the combination
  helper(
    candidates,
    target - candidates[index], // Reduce the target by the current candidate's value
    index, // Stay at the current index to allow repeated use of the same candidate
    combinationsFormedSoFar,
    ans
  );

  // Backtrack by removing the last element to restore the previous state
  combinationsFormedSoFar.pop();
}
