/**
 * @see https://leetcode.com/problems/symmetric-tree/
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
var isSymmetric = function (root) {
  return isMirror(root, root);
};

/**
 * Helper function to determine if two trees are mirror images of each other.
 *
 * @param {TreeNode} tree1 - The root node of the first tree.
 * @param {TreeNode} tree2 - The root node of the second tree.
 * @return {boolean} - Returns true if the trees are mirrors of each other, otherwise false.
 */
function isMirror(tree1, tree2) {
  // Both trees are empty, thus they are symmetric
  if (tree1 === null && tree2 === null) {
    return true;
  }

  // One tree is empty while the other is not, thus they are not symmetric
  if (tree1 === null || tree2 === null) {
    return false;
  }

  // The root values are different, thus they are not symmetric
  if (tree1.val !== tree2.val) {
    return false;
  }

  // Recursively check if the left subtree of tree1 is a mirror of the right subtree of tree2
  // and if the right subtree of tree1 is a mirror of the left subtree of tree2
  return isMirror(tree1.left, tree2.right) && isMirror(tree1.right, tree2.left);
}
