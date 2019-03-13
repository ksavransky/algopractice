// Robot in a Grid: Imagine a robot sitting on the upper left corner of grid with r rows and c columns.
// The robot can only move in two directions, right and down, but certain cells are "off limits"
// such that the robot cannot step on them.
// Design an algorithm to find a path for the robot from the top left to the bottom right.

const sampleMaze1 =
[
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

// function findPathHelper(maze, currentPos, currentPath, solutionPath) {
//   console.log('currentPos', currentPos)
//   console.log('currentPath', currentPath)
//   console.log('solutionPath', solutionPath)
//   if (solutionPath.length > 0) {
//     return solutionPath
//   }
//   currentPath.push(currentPos)
//   const downSpot = maze[currentPos[0] + 1][currentPos[1]]
//   const rightSpot = maze[currentPos[0]][currentPos[1] + 1]
//   if (downSpot === 'undefined' && rightSpot === 'undefined') {
//     solutionPath.push(currentPath)
//   } else if (downSpot === 0) {
//     findPathHelper(maze, [currentPos[0] + 1, currentPos[1]], currentPath, solutionPath)
//   } else if (rightSpot === 0) {
//     findPathHelper(maze, [currentPos[0], currentPos[1] + 1], currentPath, solutionPath)
//   } else {
//
//     // while () {
//     //   currentPath.pop()
//     //   const lastSpotNotStuck = currentPath.slice(-1)
//     //   const rightSpot = maze[lastSpotNotStuck[0]][lastSpotNotStuck[1] + 1] // while loop here to find first available right
//     // }
//
//     findPathHelper(maze, lastSpotNotStuck, currentPath, solutionPath)
//   }
// }


// function findPathHelper(maze, currentPos, currentPath, solutionPath) {
//   console.log('currentPos', currentPos)
//   console.log('currentPath', currentPath)
//   console.log('solutionPath', solutionPath)
//   if (solutionPath.length > 0) {
//     return solutionPath
//   }
//   currentPath.push(currentPos)
//   let downSpot = null
//   if (maze[currentPos[0] + 1] && maze[currentPos[0] + 1][currentPos[1]]) {
//     downSpot = maze[currentPos[0] + 1][currentPos[1]]
//   }
//   // const downSpot = maze[currentPos[0] + 1][currentPos[1]]
//   let rightSpot = null
//   if (maze[currentPos[0]] && maze[currentPos[0]][currentPos[1] + 1]) {
//     rightSpot = maze[currentPos[0]][currentPos[1] + 1]
//   }
//   if (!downSpot && !rightSpot) {
//     solutionPath.push(currentPath)
//   }
//   if (downSpot === 0) {
//     findPathHelper(maze, [currentPos[0] + 1, currentPos[1]], currentPath, solutionPath)
//   }
//   if (rightSpot === 0) {
//     findPathHelper(maze, [currentPos[0], currentPos[1] + 1], currentPath, solutionPath)
//   }
// }

function findPath(maze) {
  const currentPath = []
  const solutionPath = []
  findPathHelper(maze, [0, 0], currentPath, solutionPath)
  return solutionPath
}

console.log(findPath(sampleMaze1))
