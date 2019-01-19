// Can turn arguments into an array if used in function parameter declaration
function seeArgs(...args) {
  return args
}
// console.log(seeArgs(1, 2, 3)) // [1, 2, 3]


// Can 'spread' an array into individual arguments if array passed into a regular function with ...array
function sumArray(x, y, z){
  return x + y + z
}
let array = [1, 2, 3]
// console.log(sumArray(...array)) // 6


function spreadAnObject(props){
  const { key1, key2 } = props
  console.log(key1)
  console.log(key2)
}

const obj1 = {
  key1: 1,
  key2: 2,
}

spreadAnObject(obj1)
// 1
// 2


var myArray = ['a', 'b', 'c', 'd'];
// myArray.push('end');
// myArray.unshift('start');
// console.log(myArray); // ["start", "a", "b", "c", "d", "end"]

myArray = ['start', ...myArray, 'end'];
// console.log(myArray); // ["start", "a", "b", "c", "d", "end"]
