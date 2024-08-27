/**
 * @see https://leetcode.com/problems/delete-node-in-a-linked-list/
 */

// Time Complexity: O(1)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  // Copy the value of the next node to the current node
  node.val = node.next.val;

  // Skip over the next node
  node.next = node.next.next;
};
