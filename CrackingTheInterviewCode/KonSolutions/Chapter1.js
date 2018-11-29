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
