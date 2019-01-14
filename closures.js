let addMaker = (x) => {
  return (y) => {
    return x + y
  }
}

let addTwo = addMaker(2)

// console.log(addTwo(3))


let counter = () => {
  let count = 0

  return () => {
    count += 1
    return count
  }
}

let counterInstance = counter()

console.log(counterInstance())
console.log(counterInstance())
console.log(counterInstance())



// for (var i = 0; i < 3; i++) {
// 	setTimeout(function(){console.log(i);}, 1000 + i);
// }
// output: 3 3 3   :(

// for (var i = 0; i < 3; i++) {
// 	(function(i){
// 		setTimeout(function(){console.log(i);}, 1000 + i);
// 	})(i)
// }

// output: 0 1 2   :)
// wrapped call in a closure function and passed in 'i' as a variable to self executing closure
