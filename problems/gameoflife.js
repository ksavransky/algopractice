// Given a board with m by n cells, each cell has an initial state live (1) or dead (0).
// Each cell interacts with its eight neighbors (horizontal, vertical, diagonal)
// using the following four rules (taken from the above Wikipedia article):
//
//     Any live cell with fewer than two live neighbors dies, as if caused by under-population.
//     Any live cell with two or three live neighbors lives on to the next generation.
//     Any live cell with more than three live neighbors dies, as if by over-population..
//     Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
//
// Write a function to compute the next state (after one update) of the board given its current state.
// The next state is created by applying the above rules simultaneously to every cell in the current state,
/// where births and deaths occur simultaneously.

// Input:
let inputBoard = [
  [0,1,0],
  [0,0,1],
  [1,1,1],
  [0,0,0]
]
// Output:
// [
//   [0,0,0],
//   [1,0,1],
//   [0,1,1],
//   [0,1,0]
// ]

function gameOfLife(board) {
  const boardHeight = board.length
  const nextBoard = []
  for (let i = 0; i < boardHeight; i++) {
    nextBoard.push([])
  }

  const surroundingLocations = [[-1 , -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      let liveNearCells = 0
      surroundingLocations.forEach((location) => {
        if (board[rowIndex + location[0]] && board[columnIndex + location[1]]) {
          let nearCell = board[rowIndex + location[0]][columnIndex + location[1]]
          if (nearCell === 1) {
            liveNearCells += 1
          }
        }
      })
      let newCellState = cell
      if (cell === 1) {
        if (liveNearCells < 2) {
          newCellState = 0
        } else if (liveNearCells < 4) {
          newCellState = 1
        } else if (liveNearCells > 3) {
          newCellState = 0
        }
      } else if (liveNearCells === 3) {
        newCellState = 1
      }
      nextBoard[rowIndex][columnIndex] = newCellState
    })
  })
  return nextBoard
}

console.log(gameOfLife(inputBoard))

// Follow up challenge:
// Could you solve it in-place? Remember that the board needs to be updated at the same time:
// You cannot update some cells first and then use their updated values to update other cells.

// To solve it in place, we use 2 bits to store 2 states:
//
// [2nd bit, 1st bit] = [next state, current state]
//
// - 00  dead (next) <- dead (current)
// - 01  dead (next) <- live (current)
// - 10  live (next) <- dead (current)
// - 11  live (next) <- live (current)
//
//     In the beginning, every cell is either 00 or 01.
//     Notice that 1st state is independent of 2nd state.
//     Imagine all cells are instantly changing from the 1st to the 2nd state, at the same time.
//     Let's count # of neighbors from 1st state and set 2nd state bit.
//     Since every 2nd state is by default dead, no need to consider transition 01 -> 00.
//     In the end, delete every cell's 1st state by doing >> 1.
//
// For each cell's 1st bit, check the 8 pixels around itself, and set the cell's 2nd bit.
//
//     Transition 01 -> 11: when board == 1 and lives >= 2 && lives <= 3.
//     Transition 00 -> 10: when board == 0 and lives == 3.

// function gameOfLifeInPlace(board) {
//
// }
