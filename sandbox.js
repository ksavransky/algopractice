function quickSort(ary) {
  if (ary.length < 2) {
    return ary
  }

  const lesser = []
  const greater = []
  const pivot = ary[0]

  for(let i = 1; i < ary.length; i++){
    if (ary[i] <= pivot){
      lesser.push(ary[i])
    } else {
      greater.push(ary[i])
    }
  }

  return quickSort(lesser).concat([pivot]).concat(quickSort(greater))

}


const ary = [4, 2, 101, 15, 1, 3]

console.log(quickSort(ary))
