// Given a string containing digits from 2-9 inclusive,
// return all possible letter combinations that the number could represent.
// A mapping of digit to letters (just like on the telephone buttons) is given below.
// Note that 1 does not map to any letters.

// Input: "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

// my thoughts: use a tree to create this?
// e.g. first digit is 2, so create 3 nodes 'a', 'b', 'c'
// e.g. second digit is 3, so insert 3 nodes into each node above, 'd', 'e', 'f'
// do a in-order traveresal? to get results

function letterCombinations(digits) {
  const phoneDigitsToLetters = {
    0: '0', 1: '1', 2: ['a','b','c'], 3: ['d','e','f'], 4: ['g','h','i'],
    5: ['j','k','l'], 6: ['m','n','o'], 7: ['p','q','r','s'], 8: ['t','u','v'], 9: ['w','x','y','z']
  }
  const results = []
  digits = digits.split('').map(digit => parseInt(digit))
  for (let i = 0; i < digits.length; i++) {
    digits[i]
  }

}

0, 0
0, 1
0, 2

const digits = "23"
console.log(letterCombinations(digits))
