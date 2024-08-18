/**
 * @see https://leetcode.com/problems/subsets/
 */

// TC O(2^N * N)
// Picking and not picking will make 2^N and copying for the base case would make N

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const ans = []; // Store all the subsets here
  helper(nums, 0, [], ans); // Start the recursive process
  return ans;
};

/**
 * Recursive helper function to generate subsets
 *
 * @param {number[]} nums - The input array of numbers
 * @param {number} index - The current index in the array we're considering
 * @param {number[]} combinationsFormedSoFar - The current subset being formed
 * @param {number[][]} ans - The final array to store all subsets
 */
function helper(nums, index, combinationsFormedSoFar, ans) {
  // Base case: If we've considered all elements
  if (index === nums.length) {
    // Note: In JavaScript, arrays are passed by reference
    ans.push([...combinationsFormedSoFar]); // Add a copy of the current subset to ans
    return;
  }

  // Recursive case 1: Do not pick the current element
  helper(nums, index + 1, combinationsFormedSoFar, ans);

  // Recursive case 2: Pick the current element
  combinationsFormedSoFar.push(nums[index]); // Add the current element to the subset
  helper(nums, index + 1, combinationsFormedSoFar, ans);

  // Backtrack by removing the last element to restore the previous state
  combinationsFormedSoFar.pop();
}
