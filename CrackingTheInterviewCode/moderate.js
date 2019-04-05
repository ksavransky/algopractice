// Intersection:
// Given two straight line segments
// (represented as a start point and an end point), compute the point of intersection, if any.


function getCellsInLine(pointOne, pointTwo, cellsInLine = []) {
  cellsInLine.push(pointOne)
  if (pointOne[0] === pointTwo[0] && pointOne[1] === pointTwo[1]) {
    return cellsInLine
  }
  let differenceBetweenXs = pointOne[0] - pointTwo[0]
  let differenceBetweenYs = pointOne[1] - pointTwo[1]
  if (differenceBetweenXs !== 0) {
    differenceBetweenXs = differenceBetweenXs / Math.abs(differenceBetweenXs)
  }
  if (differenceBetweenYs !== 0) {
    differenceBetweenYs = differenceBetweenYs / Math.abs(differenceBetweenYs)
  }
  return getCellsInLine([pointOne[0] - differenceBetweenXs, pointOne[1] - differenceBetweenYs], pointTwo, cellsInLine)
}

console.log(getCellsInLine([0, 0], [3, 3]))

// function intersection(lineOne, lineTwo) {
//
//
// }

// my thoughts
// one line2 point must be below one of the line1 points and the other line2 point must be above one of the line1 points
// ???


// const line1 = [[0, 0], [3, 3]]
// const line2 = [[0, 1], [0, 4]]
// console.log(intersection(line1, line2))
// output: [1, 1]
