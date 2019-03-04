// You are given coins of different denominations and a total amount of money amount.
// Write a function to compute the fewest number of coins that you need to make up that amount.
// If that amount of money cannot be made up by any combination of the coins, return -1.
//
// Example 1:
// Input: coins = [1, 2, 5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

// Example 2:
// Input: coins = [2], amount = 3
// Output: -1

// Note: You may assume that you have an infinite number of each kind of coin.


// KON solution!!!
function fewestCoins(coins, amount) {
  // step 1: get rid of all coins larger than amount
  coins = coins.sort().filter(n => n <= amount)

  // step 2: if there are no coins to choose from, return -1
  if (coins.length === 0) {
    return -1
  }

  // step 3: remove largest coin from coins
  const largestCoin = coins.pop()

  // step 4: if largest coin is exactly divisble into amount, you got the answer
  if (largestCoin % amount === 0) {
    return largestCoin / amount
  }

  // step 5: largest coin is NOT exactly divisble into amount, so get the number of largest coins possible
  let numberOfLargestCoins = Math.floor(amount / largestCoin)

  // step 6: starting with the number of largest coins possible and taking one away each loop, see if you can come up with the answer
  while (numberOfLargestCoins > 0) {

    // step 7: do the same problem (i.e. recurse) with a new amount that is amount minus largest coin value times number of largest coins used
    const amountLessLargestCoins = amount - (numberOfLargestCoins * largestCoin)
    const sameProblemLessLargestCount = fewestCoins(coins, amountLessLargestCoins)

    // final step: if same problem resurse doesn't yield a -1, you foudn the answer, just add it to number of largest coins you already used in from this loop
    if (sameProblemLessLargestCount !== -1) {
      return numberOfLargestCoins + sameProblemLessLargestCount
    }
    numberOfLargestCoins--
  }
  return -1
}

console.log(fewestCoins([1, 2, 5], 11))
console.log(fewestCoins([2], 3))
console.log(fewestCoins([1, 3, 5, 7], 23)) // 5, [7, 7, 5, 3, 1] or [7, 7, 3, 3, 3]
