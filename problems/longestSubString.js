// Input: "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
//
// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

//
// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
//              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

function lengthOfLongestSubstring(input){
  let currentSubString = new Set()
  let longestSubLength = 0
  for (let i = 0; i < input.length; i++){
    const currentLetter = input[i]
    if (currentSubString.has(currentLetter)) {
      currentSubString = new Set()
      currentSubString.add(currentLetter)
    } else {
      currentSubString.add(currentLetter)
      if (currentSubString.size > longestSubLength) {
        longestSubLength = currentSubString.size
      }
    }
  }
  return longestSubLength
}

console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('pwwkew'))
