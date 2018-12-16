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

function gameOfLifeInPlace(board) {
  const surroundingLocations = [[-1 , -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      let liveNearCells = 0
      surroundingLocations.forEach((location) => {
        if (board[rowIndex + location[0]]) {
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
    })
  })

}

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
        if (board[rowIndex + location[0]]) {
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

// console.log(gameOfLife(inputBoard))

// Follow up challenge:
// Could you solve it in-place? Remember that the board needs to be updated at the same time:
// You cannot update some cells first and then use their updated values to update other cells.

// To solve it in place, we use 2 bits to store 2 states (i.e. USE BITWISE Operators):
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

// &	AND	Sets each bit to 1 if both bits are 1
// |	OR	Sets each bit to 1 if one of two bits is 1
// ^	XOR	Sets each bit to 1 if only one of two bits is 1
// ~	NOT	Inverts all the bits
// <<	Zero fill left shift	Shifts left by pushing zeros in from the right and let the leftmost bits fall off
// >>	Signed right shift	Shifts right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off
// >>>	Zero fill right shift	Shifts right by pushing zeros in from the left, and let the rightmost bits fall off

var gameOfLifeSolution = function(board){

    let m = board.length;
    if (m == 0) return;

    let n = board[0].length;

    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++){
            let isLive = board[i][j];
            let numOfLiveNeighbors = getLiveNeighbors(i, j, board);

            if (isLive && (numOfLiveNeighbors == 3 || numOfLiveNeighbors == 2)) rescueCell(i, j, board);
            else if (!isLive && numOfLiveNeighbors == 3) rescueCell(i, j, board);
        }
    }

    console.log('board1', board)

    // go through entire board and convert each cell for next round
    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++){
            // 0 means dead this round and next, stays 0
            // 0 >>> 1  = 0
            // 1 means alive this round but dead next, becomes 0
            // 1 >>> 1  = 0
            // 2 means dead this round but alive next, becomes 1
            // 2 >>> 1  = 1
            // 3 means alive this round and alive next, becomes 1
            // 3 >>> 1  = 1
            board[i][j] >>>= 1;
        }
    }

    console.log('board2', board)


};

var getLiveNeighbors = (row, col, board) => {
    let counter = 0;
    for(let i = row - 1; i <= row + 1; i++){
        for (let j = col - 1; j <= col + 1; j++){
            if (i == row && j == col) continue;
            if (board[i] == null) continue;
            if (board[i][j] == null) continue;
            // 0 & 1 ; for purposes of counting neighbors a dead cell that will stay dead is dead, i.e. 0 stays 0
            // 0
            // 1 & 1 ; for purposes of counting neighbors a living cell that will be dead next round is dead, i.e. 1 becomes 0
            // 1
            // 2 & 1 ; for purposes of counting neighbors a dead cell that will be alive next round is still dead, i.e. 2 becomes 0
            // 0
            // 3 & 1 ; for purposes of counting neighbors a living cell that will be alive next round is still alive, i.e. 3 becomes 1
            // 1
            counter += (board[i][j] & 1);
        }
    }

    return counter;
}

var rescueCell = (row, col, board) => {
    // 0 | 1 << 1 ; this means we are adding life to a previously dead cell
    // 2
    // 1 | 1 << 1 ; this means we a living cell stays alive
    // 3
    board[row][col] = board[row][col] | (1 << 1);
}


console.log(gameOfLifeSolution(inputBoard))
// console.log(inputBoard)
