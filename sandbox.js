// Given a list of people with each person’s birth year and death year,
// find the year with the highest population

// const dobList = [
//   {
//     born: 1,
//     died: 2,
//   },
//   {
//     born: 2,
//     died: 3,
//   },
//   {
//     born: 3,
//     died: 4,
//   },
//   {
//     born: 5,
//     died: 6,
//   },
//   {
//     born: 5,
//     died: 7,
//   },
// ]

// Kon idea:
// start at smallest year someone was born, and end on last year someone died
// go through each year in between and count how many people alive
// keep largest as result
// no extra space this way; time is list length x number of years in span


function swap(array, start, end) {
  const temp = array[start]
  array[start] = array[end]
  array[end] = temp
  return array
}

function permutations(inputArray, startIndex, finishIndex) {
  if (startIndex === finishIndex) {
    console.log(inputArray)
  } else {
    for (let i = startIndex; i <= finishIndex; i++) {
      swap(inputArray, startIndex, i)
      permutations(inputArray, startIndex + 1, finishIndex)
      swap(inputArray, i, startIndex)
    }
  }
}

const arr = [1,2,3]
permutations(arr, 0, arr.length - 1)
