// solution: http://jgpettibone.github.io/coin-sums/
// EXPLANATION -- READ THIS: https://stackoverflow.com/questions/42883552/javascript-making-change-algorithm

function makeChange(total, coins){
  let count = 0

  function changer(index, value) {
    let currentCoin = coins[index]
    // console.log('index', index)
    // console.log('value', value)
    // console.log('currentCoin', currentCoin, '\n')

    if (index === 0){
      if(value % currentCoin === 0){
        // console.log('about to add to count, value, currentCoin', value, currentCoin)
        count++
      }
      // console.log('about to add to return out of index === 0', '\n')
      return
    }

    // value >= 0 checks to make sure when we subtract currentCoin from value we are not in a negative number
    // a negative number means we subtracted a coin larger than the total value from the value e.g. total value is 10, but we tried to use a coin with value of 20
    while (value >= 0 ){
      changer(index - 1, value)
      value -= currentCoin
    }
  }

  changer(coins.length - 1, total)
  return count
}


console.log('total = 4; coins = [1, 2, 3] -- answer should be 4, answer: ', makeChange(4, [1, 2, 3]))
// [1,1,1,1], [1, 1, 2], [2, 2], [1, 3]

// console.log('total = 10; coins = [2, 5, 3, 6] -- answer should be 5, answer: ', makeChange(10, [2, 5, 3, 6]))
// [2, 2, 2, 2, 2], [2, 2, 3, 3], [2, 2, 6], [2, 3, 5], [5, 5]
