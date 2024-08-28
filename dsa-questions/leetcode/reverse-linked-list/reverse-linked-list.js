/**
 * @see https://leetcode.com/problems/reverse-linked-list/
 */

// TC O(N)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // Initialize previous as null and current as the head of the list
  let prev = null;
  let curr = head;

  // Traverse the list
  while (curr !== null) {
    // Temporarily store the next node
    let nextNode = curr.next;

    // Reverse the current node's pointer
    curr.next = prev;

    // Move prev and curr one step forward
    prev = curr;
    curr = nextNode;
  }

  // After the loop, prev will be pointing to the new head of the reversed list
  return prev;
};
