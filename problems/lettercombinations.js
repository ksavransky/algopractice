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

// function letterCombinations(digits) {
//   const phoneDigitsToLetters = {
//     0: '0', 1: '1', 2: ['a','b','c'], 3: ['d','e','f'], 4: ['g','h','i'],
//     5: ['j','k','l'], 6: ['m','n','o'], 7: ['p','q','r','s'], 8: ['t','u','v'], 9: ['w','x','y','z']
//   }
//
// }


//leetcode solution

const letterCombinations = (digits, current = "", res = []) => {
    const numbers = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz"
    }

    if (digits.length === 0 && current === "") {
        return res;
    }

    if (digits.length < 1) {
        return(res.push(current));
    }

    let currentNumber,
        currentLetter;

    currentNumber = numbers[digits[0]];

    for (let i = 0; i < currentNumber.length; i++) {
      currentLetter = numbers[digits[0]][i];
      letterCombinations(digits.slice(1), current + currentLetter, res);
    }

    return res;
}

const digits = "23"
console.log(letterCombinations(digits))
