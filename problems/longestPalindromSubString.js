function isPalindrome(str) {
   return str.split('').reverse().join('') === str
}

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.

// Input: "cbbd"
// Output: "bb"
