// Implement an algorithm to determine if a string has all unique characters What if you can not use additional data structures?

function allUnique(str){
  const chars = {}
  for (let i = 0; i < str.length; i++) {
    console.log(i)
    if(chars[str[i]]){
      return false
    } else {
      chars[str[i]] = 1
    }
  }
  return true
}

function find_unique_characters(str) {
  let unique = '';
  for (let i = 0; i < str.length; i++) {
    if (str.lastIndexOf(str[i]) === str.indexOf(str[i])) {
      unique += str[i];
    }
  }
  return unique;
}

// console.log(find_unique_characters('baraban'));
// console.log(find_unique_characters('anaconda'));

function areAnagrams(str1, str2){
  if (str1.length !== str2.length) {
    return false
  }
  const str1Sorted = str1.split("").sort()
  const str2Sorted = str2.split("").sort()
  for (let i = 0; i < str1Sorted.length; i++){
    if(str1Sorted[i] !== str2Sorted[i]) {
      return false
    }
  }
  return true
}

// console.log(areAnagrams('abcd', 'dcba'))
// console.log(areAnagrams('abcd', 'dcca'))

// Write a method to replace all spaces in a string with ‘%20’

// function replaceSpaceWithPrecent20(str){
//   let result = ''
//
//   for (let i = 0; i < str.length; i++){
//     if(str[i] === ' ') {
//       result += '%20'
//     } else {
//       result += str[i]
//     }
//   }
//
//   return result
// }

function replaceSpaceWithPrecent20(str){
  return str.replace(/\s/g, '%20')
}

// console.log(replaceSpaceWithPrecent20('hi there you'))


// Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes,
// write a method to rotate the image by 90 degrees Can you do this in place?

let imageArray = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['h', 'i', 'j'],
  ['k', 'l', 'm'],
]

function rotateArrayImage(imageArray){
  const originalImageHeight = imageArray.length
  const originalImageWidth = imageArray[0].length

  const rotatedArray = []
  for (let i = 0; i < originalImageWidth; i++) {
    rotatedArray.push([])
  }

  imageArray.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      // 0, 0 becomes 0, 4
      // 0, 1 becomes 1, 4
      rotatedArray[columnIndex][(originalImageHeight - 1) - rowIndex] = cell
    })
  })
  return rotatedArray
}

// console.log(rotateArrayImage(imageArray))

// Expected result:
// imageArrayRotated90 = [
//   ['k', 'h', 'd', 'a'],
//   ['l', 'i', 'e', 'b'],
//   ['m', 'j', 'f', 'c'],
// ]


// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column is set to 0

// Best algo: We keep track in two arrays all the rows with zeros and all the columns with zeros
// We then make a second pass of the matrix and set a cell to zero if its row or column is zero
function zeroMakesZero(matrix) {
  const rowsWithZero = []
  const columnsWithZero = []
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === 0) {
        rowsWithZero.push(rowIndex)
        columnsWithZero.push(columnIndex)
      }
    })
  })
  rowsWithZero.forEach((rowIndex) => {
    matrix[rowIndex].forEach((cell, columnIndex) => {
      matrix[rowIndex][columnIndex] = 0
    })
  })
  columnsWithZero.forEach((columnIndex) => {
    for(let rowIndex = 0; rowIndex < matrix.length; rowIndex++){
      matrix[rowIndex][columnIndex] = 0
    }
  })
  return matrix
}

const matrix = [
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0],
]

// console.log(zeroMakesZero(matrix))

function palindromePermutaiton(str){
  str = str.toLowerCase().replace(' ', '')
  if (!str || str.length === 0) {
    return false
  }
  if (str.length === 1) {
    return true
  }
  const charMap = {}
  for (let i = 0; i < str.length; i++) {
    if (charMap[str[i]]) {
      charMap[str[i]] = charMap[str[i]] + 1
    } else {
      charMap[str[i]] = 1
    }
  }
  const theKeys = Object.keys(charMap)
  if (str.length % 2 === 0){
    for (let i = 0; i < theKeys.length; i++) {
      let key = theKeys[i]
      if (charMap[key] % 2 !== 0) {
        return false
      }
    }
  } else {
    let oddCount = 0
    for (let i = 0; i < theKeys.length; i++) {
      let key = theKeys[i]
      if (charMap[key] % 2 !== 0) {
        oddCount += 1
        if (oddCount > 1) {
          return false
        }
      }
    }
  }
  return true
}

// Input: Tact Coa
// Output: True (permutations: "taco cat", "atco eta", etc.)

// my algo: spaces dont seem to matter. if length is even, has to be even amount of each char.
// if length is odd, has to be even amount of each char except one
// if length is 1, return true
// if length is 0, return false
//
// console.log(palindromePermutaiton('Toatackck'))

// One Away: There are three types of edits that can be performed on strings: insert a character,
// remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.

function oneAway(str1, str2) {
  const lengthDifference = Math.abs(str1.length - str2.length)
  if (lengthDifference > 1){
    return false
  }

  if (lengthDifference === 0) {
    let charDiffCount = 0
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) {
        charDiffCount += 1
        if (charDiffCount > 1) {
          return false
        }
      }
    }
  } else {
    let shorterString = str1
    let longerString = str2
    if (str1.length > str2.length) {
      shorterString = str2
      longerString = str1
    }

    let offCount = 0
    for (let i = 0; i < shorterString.length; i++){
      if (shorterString[i] !== longerString[i + offCount]) {
        offCount += 1
        if (offCount > 1){
          return false
        }
        if (shorterString[i] !== longerString[i + offCount]) {
          return false
        }
      }
    }
  }
  return true


}
// console.log(oneAway('pale', 'bale'))

// EXAMPLE
// pale, ple -> true
// pales, pale -> true
// pale, bale -> true
// pale, bake -> false

//For example, the string aabcccccaaa would become a2blc5a3.
// If the "compressed" string would not become smaller than the original string, your method should return
// the original string.

function stringCompression(str) {
  let compressedString = ''
  let currentLetter = str[0]
  let count = 1
  // note the str.length + 1
  for (let i = 1; i < str.length + 1; i++) {
    if (str[i] === currentLetter) {
      count += 1
    } else {
      if (count === 1) {
        compressedString += currentLetter
      } else {
        compressedString += currentLetter + count
        count = 1
      }
      currentLetter = str[i]
    }
  }
  return compressedString.length < str.length ? compressedString : str
}

// console.log(stringCompression('abcc'))
// console.log(stringCompression('abccc'))
// console.log(stringCompression('aabcccccaaa'))

// Assume you have a method isSubstring which checks if one word is a substring of another.
// Given two strings, sl and s2, write code to check if s2 is a rotation of sl
// using only one call to isSubstring (e.g.,"waterbottle" is a rotation of "erbottlewat").

function isSubstring(string, subString) {
  if (typeof string !== 'string' || typeof subString !== 'string' ) {
    return false
  }
  return string.indexOf(subString) !== -1
}

function isRotation(s1, s2) {
  return isSubstring(s1.split('').sort().join(''), s2.split('').sort().join(''))
}

console.log(isRotation("waterbottle", "erbottlewat"))


// OOOOOO sexy book solution:
export function isRotatedSubstring(str1, str2) {
  if (!str1 || !str2) {
    throw new Error('invalid input');
  }
  if (str1.length !== str2.length) {
    return false;
  }
  // LOOK AT THIS. GREAT!
  return isSubstring(str1 + str1, str2);
}
