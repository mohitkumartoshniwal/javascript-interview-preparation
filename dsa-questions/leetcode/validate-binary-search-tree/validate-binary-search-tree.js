/**
 * @see https://leetcode.com/problems/validate-binary-search-tree/description/
 */

/*
Time Complexity is O(n), where n is the number of nodes in the binary tree.
Space Complexity is O(h), where h is the height of the binary tree
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  return isBST(root, -Infinity, Infinity);
};

function isBST(node, lowerBound, upperBound) {
  // Base case: An empty tree is a valid BST
  if (node === null) {
    return true;
  }

  // Check current node value against the valid range
  if (node.val <= lowerBound || node.val >= upperBound) {
    return false;
  }

  // Recursively check the left and right subtrees with updated ranges
  return (
    isBST(node.left, lowerBound, node.val) &&
    isBST(node.right, node.val, upperBound)
  );
}
