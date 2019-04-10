// p475
// Smallest Difference: Given two arrays of integers,
// compute the pair of values (one value in each array)
//  with the smallest (non-negative) difference. Return the difference.

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

// console.log(getCellsInLine([0, 0], [3, 3]))

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


// Living People: Given a list of people with their birth and death years,
// implement a method to compute the year with the most number of people alive.
// You may assume that all people were born between 1900 and 2000 (inclusive).
// If a person was alive during any portion of that year, they should be included in that year's count.
// For example, Person (birth= 1908, death= 1909) is included in the counts for both 1908 and 1909.
const peopleList = [[1900, 1910], [1909, 1999], [1950, 1976], [1951, 1952]]

function livingPeopleBrute(peopleList){
  const yearsCount = {}
  let maxYear = [1900, 0]
  peopleList.forEach(entry => {
    const [start, end] = entry
    let year = start
    while(year < end + 1) {
      if (yearsCount[year]) {
        yearsCount[year] = yearsCount[year] + 1
      } else {
        yearsCount[year] = 1
      }
      if (yearsCount[year] > maxYear[1]) {
        maxYear = [year, yearsCount[year]]
      }
      year += 1
    }
  })
  return maxYear[0]
}

console.log(livingPeopleBrute(peopleList))

function livingPeopleBetter(peopleList){
  let births = []
  let deaths = []
  peopleList.forEach(entry => {
    const [start, end] = entry
    births.push(start)
    deaths.push(end)
  })
  if (births.length === 0) {
    return null
  }
  births = births.sort()
  deaths = deaths.sort()
  let birthIndex = 0
  let deathIndex = 0
  let maxNumberLiving = {
    year: 1900,
    amount: 0
  }
  let numberLiving = 0
  while(births[birthIndex] && deaths[deathIndex]) {
    if (births[birthIndex] < deaths[deathIndex]) {
      numberLiving += 1
      if (numberLiving > maxNumberLiving.amount) {
        maxNumberLiving.year = births[birthIndex]
        maxNumberLiving.amount = numberLiving
      }
      birthIndex += 1
    } else {
      numberLiving -= 1
      deathIndex += 1
    }
  }
  return maxNumberLiving.year
}

console.log(livingPeopleBetter(peopleList))
