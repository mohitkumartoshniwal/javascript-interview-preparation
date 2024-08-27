/**
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
 */

// Time Complexity: O(N), where N is the length of the prices array. We only make one pass through the array.
// Space Complexity: O(1). We only use a few extra variables.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let totalProfit = 0;

  // Iterate through the array
  for (let day = 1; day < prices.length; day++) {
    // If the price today is higher than the price yesterday
    if (prices[day] > prices[day - 1]) {
      // Add the profit to the total profit
      totalProfit += prices[day] - prices[day - 1];
    }
  }

  return totalProfit;
};
