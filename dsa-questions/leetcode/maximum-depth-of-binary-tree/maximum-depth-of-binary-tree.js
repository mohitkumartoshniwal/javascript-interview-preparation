/**
 * @see https://leetcode.com/problems/maximum-depth-of-binary-tree/
 */

/*
Time Complexity: O(n), where n is the number of nodes in the binary tree. Each node is visited exactly once.
Space Complexity: O(h), where h is the height of the binary tree. This space is used by the recursion stack. In the worst case (if the tree is completely unbalanced), this could be O(n).
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val);
 *     this.left = (left===undefined ? null : left);
 *     this.right = (right===undefined ? null : right);
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  // Base case: if the root is null, return 0
  if (root === null) {
    return 0;
  }

  // Recursively find the depth of the left and right subtrees
  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);

  // The maximum depth is 1 + the maximum of the left and right depths
  return 1 + Math.max(leftDepth, rightDepth);
};
