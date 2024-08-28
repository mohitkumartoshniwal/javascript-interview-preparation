/**
 * @see https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 */

// TC O(n)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Removes the nth node from the end of the list.
 *
 * @param {ListNode} head - The head of the linked list.
 * @param {number} n - The position from the end of the list to remove the node.
 * @return {ListNode} - The head of the modified list.
 */
var removeNthFromEnd = function (head, n) {
  // Create a dummy node that points to the head of the list.
  // This helps in handling edge cases, such as removing the head itself.
  let dummyHead = new ListNode();
  dummyHead.next = head;

  // Initialize two pointers, both starting from the dummy node.
  let slow = dummyHead;
  let fast = dummyHead;

  // Move the fast pointer n+1 steps ahead to maintain the gap between fast and slow.
  while (n >= 0) {
    fast = fast.next;
    n--;
  }

  // Move both pointers until fast reaches the end of the list.
  while (fast != null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Now, slow.next is the node to be removed.
  // Skip the node to remove it from the list.
  slow.next = slow.next.next;

  // Return the head of the modified list.
  return dummyHead.next;
};
