// https://js-algorithms.tutorialhorizon.com/2015/11/20/generate-permutations-backtracking/

// The time and space complexity of the above algorithm should be the same as the number of items produced.
// The number of unique permutations of any set of size n is n!,
// therefore the time and space complexity of our algorithm is O(n!).


function swap(array, i, j) {
  const save = array[i]
  array[i] = array[j]
  array[j] = save
}

function permutations(array, startIndex, endIndex) {
  if (startIndex === endIndex) {
    console.log(array)
  } else {
    for(let i = startIndex; i <= endIndex; i++){ // i <= endIndex; note: <=
      swap(array, startIndex, i) // startIndex i swap back and forth
      permutations(array, startIndex + 1, endIndex) // endIndex doesn't ever change; startIndex + 1
      swap(array, i, startIndex)  // startIndex i swap back and forth
    }
  }
}

const input = ['A', 'B', 'C']
console.log(permutations(input, 0, input.length - 1))


function swap (inputArray, index1, index2) {
  var temp = inputArray[index1];
  inputArray[index1] = inputArray[index2];
  inputArray[index2] = temp;
  return inputArray;
}

function permute (inputArray, startIndex, endIndex) {
  console.log('in top of permute, inputArray:', inputArray)
  // console.log('in top of permute, startIndex:', startIndex)
  // console.log('in top of permute, endIndex:', endIndex)
  if (startIndex === endIndex) {
  	console.log('result:', inputArray.join(''));
  } else {
    for (let i = startIndex; i <= endIndex; i++) {
      // console.log('in loop top, i:', i)
      // console.log('in loop top, startIndex:', startIndex)
      // console.log('in loop top, endIndex:', endIndex)
      swap(inputArray, startIndex, i);
      // console.log('in loop after FIRST swap, i:', i)
      // console.log('in loop after FIRST swap, inputArray:', inputArray)
      // console.log('in loop after FIRST swap, startIndex:', startIndex)
      // console.log('in loop after FIRST swap, endIndex:', endIndex)
      permute(inputArray, startIndex + 1, endIndex);
      // console.log('in loop after permute call, i:', i)
      // console.log('in loop after permute call, inputArray:', inputArray)
      // console.log('in loop after permute call, startIndex:', startIndex)
      // console.log('in loop after permute call, endIndex:', endIndex)
      swap(inputArray, i, startIndex); // backtrack
      // console.log('in loop after SECOND swap, i:', i)
      // console.log('in loop after SECOND swap, startIndex:', inputArray)
      // console.log('in loop after SECOND swap, startIndex:', startIndex)
      // console.log('in loop after SECOND swap, endIndex:', endIndex)
    }
  }
}

let inputArray = [1, 2, 3, 4];
permute(inputArray, 0, inputArray.length - 1);
 // ABC, ACB, BAC, BCA, CBA, CAB





// let resultArr = [],
//   usedChars = [];
//
// function permute(input) {
//   console.log('in permute, input', input)
//   let i, charAtIndexI;
//   for (i = 0; i < input.length; i++) {
//     console.log('in the loop and i is: ', i)
//     // remove element at index i out of the array (splice also modifies the array)
//     charAtIndexI = input.splice(i, 1)[0];
//     console.log('charAtIndexI', charAtIndexI)
//
//     // add charAtIndexI to used character array
//     usedChars.push(charAtIndexI);
//     console.log('usedChars', usedChars)
//
//     if (input.length == 0) {
//       // if input array has nothing in it, push usedChars into resultArr
//       // note that slice is not destructive i.e. usedChars stays the same
//       resultArr.push(usedChars.slice());
//       console.log('in input.length == 0, pushed usedChars into resultArr', resultArr)
//     }
//
//     // recurse with remaining input
//     permute(input);
//
//     // put charAtIndexI back into input
//     console.log('going to call input.splice(i, 0, charAtIndexI) - input BEFORE, i, and input:', i, input)
//     input.splice(i, 0, charAtIndexI);
//     console.log('going to call input.splice(i, 0, charAtIndexI) - input AFTER i, and input:', i, input)
//
//     console.log('about to usedChars.pop() -- usedChars BEFORE', usedChars)
//     usedChars.pop();
//     console.log('about to usedChars.pop() -- usedChars AFTER', usedChars)
//   }
//   return resultArr
// };
//
// // console.log(permute([1,2,3]))
//
// // let arr = [1,2,3]
// // console.log(arr.splice(0, 0, 4))
// // console.log(arr)
//
// // console.log([1, 2].slice())
//
//
//
// // https://initjs.org/all-permutations-of-a-set-f1be174c79f8
//
// // function getAllPermutations (string)
// //   define results
// //   if string is a single character
// //     add the character to results
// //     return results
// //   for each char in string
// //     define innerPermutations as a char of string
// //     set innerPermutations to getAllPermutations (without next char)
// //     foreach string in innerPermutations
// //       add defined char and innerPermutations char
// //   return results
//
// function getAllPermutations(string) {
//   var results = [];
//
//   if (string.length === 1) {
//     results.push(string);
//     return results;
//   }
//
//   for (var i = 0; i < string.length; i++) {
//     var firstChar = string[i];
//     var charsLeft = string.substring(0, i) + string.substring(i + 1);
//     var innerPermutations = getAllPermutations(charsLeft);
//     for (var j = 0; j < innerPermutations.length; j++) {
//       results.push(firstChar + innerPermutations[j]);
//     }
//   }
//   return results;
// }
//
//
//
//
//
// // http://dsernst.com/2014/12/14/heaps-permutation-algorithm-in-javascript/
//
// var swap = function (array, pos1, pos2) {
//   var temp = array[pos1];
//   array[pos1] = array[pos2];
//   array[pos2] = temp;
// };
//
// var heapsPermute = function (array, output, n) {
//   n = n || array.length; // set n default to array.length
//   if (n === 1) {
//     output(array);
//   } else {
//     for (var i = 1; i <= n; i += 1) {
//       heapsPermute(array, output, n - 1);
//       if (n % 2) {
//         var j = 1;
//       } else {
//         var j = i;
//       }
//       swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
//     }
//   }
// };
//
//
// // For testing:
// var print = function(input){
//   console.log(input);
// }
//
// // heapsPermute(['a', 'b', 'c', 'd'], print);
// // heapsPermute([1, 2, 3], print)
