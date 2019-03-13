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

function findPathHelper(maze, currentPos, currentPath, solutionPath) {
  if (solutionPath.length > 0) {
    return solutionPath
  }
  currentPath.push(currentPos)
  let downSpot = null
  if (maze[currentPos[0] + 1] && typeof maze[currentPos[0] + 1][currentPos[1]] === 'number') {
    downSpot = maze[currentPos[0] + 1][currentPos[1]]
  }
  let rightSpot = null
  if (maze[currentPos[0]] && typeof maze[currentPos[0]][currentPos[1] + 1] === 'number') {
    rightSpot = maze[currentPos[0]][currentPos[1] + 1]
  }

  if (typeof downSpot !== 'number' && typeof rightSpot !== 'number') {
    solutionPath.push(currentPath)
  }
  if (rightSpot === 1 && downSpot === 1) {
    currentPath.pop()
  }
  if (downSpot === 0) {
    findPathHelper(maze, [currentPos[0] + 1, currentPos[1]], currentPath, solutionPath)
  }
  if (rightSpot === 0) {
    findPathHelper(maze, [currentPos[0], currentPos[1] + 1], currentPath, solutionPath)
  }
}

function findPath(maze) {
  const currentPath = []
  const solutionPath = []
  findPathHelper(maze, [0, 0], currentPath, solutionPath)
  return solutionPath
}

console.log(findPath(sampleMaze1))
