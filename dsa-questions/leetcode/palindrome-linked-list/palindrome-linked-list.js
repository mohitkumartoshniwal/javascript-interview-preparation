/**
 * @see https://leetcode.com/problems/palindrome-linked-list/
 */

// Time Complexity: O(n)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (!head || !head.next) return true; // A list with 0 or 1 node is a palindrome

  // Step 1: Find the middle of the linked list
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half of the linked list
  let prev = null;
  while (slow) {
    let nextNode = slow.next;
    slow.next = prev;
    prev = slow;
    slow = nextNode;
  }

  // Step 3: Compare the first half and the reversed second half
  let left = head,
    right = prev;
  while (right) {
    // We only need to compare up to the end of the reversed second half
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  // Step 4 (Optional): Restore the original order of the second half (if needed)
  // -- This step is not necessary unless we need to keep the list intact.

  return true;
};
