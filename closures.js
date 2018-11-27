let addMaker = (x) => {
  return (y) => {
    return x + y
  }
}

let addTwo = addMaker(2)

console.log(addTwo(3))


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
