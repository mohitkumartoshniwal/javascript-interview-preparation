/**
 * @see  https://leetcode.com/problems/merge-two-sorted-lists/
 */

// TC O(n + m)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // Create a dummy node to serve as the start of the merged list
  let dummyHead = new ListNode();
  let current = dummyHead;

  // Traverse both lists
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      // If list1's node value is smaller or equal, append it to the merged list
      current.next = list1;
      list1 = list1.next; // Move to the next node in list1
    } else {
      // If list2's node value is smaller, append it to the merged list
      current.next = list2;
      list2 = list2.next; // Move to the next node in list2
    }
    current = current.next; // Move to the next node in the merged list
  }

  // If one of the lists is exhausted, append the remaining part of the other list
  if (list1 !== null) {
    current.next = list1;
  } else {
    current.next = list2;
  }

  // The merged list starts from the next node of the dummy node
  return dummyHead.next;
};
