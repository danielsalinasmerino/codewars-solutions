// https://www.codewars.com/kata/525caa5c1bf619d28c000335

const Result = {
  NotFinished: -1,
  OneWon: 1,
  TwoWon: 2,
  Draw: 0,
};

/**
 * Determines the result of a tic-tac-toe game.
 *
 * @param {number[][]} board - A 3x3 array representing the game board (0: empty, 1: player 1, 2: player 2).
 * @returns {number} Result.OneWon if player 1 wins, Result.TwoWon if player 2 wins, Result.Draw if draw, Result.NotFinished if unfinished.
 */
function isSolved(board) {
  // Check rows
  for (const row of board) {
    if (row.every((cell) => cell === 1)) return Result.OneWon;
    if (row.every((cell) => cell === 2)) return Result.TwoWon;
  }

  // Check columns
  for (let col = 0; col < board.length; col++) {
    const column = [board[0][col], board[1][col], board[2][col]];
    if (column.every((cell) => cell === 1)) return Result.OneWon;
    if (column.every((cell) => cell === 2)) return Result.TwoWon;
  }

  // Check diagonals
  const diagonals = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const diagonal of diagonals) {
    if (diagonal.every((cell) => cell === 1)) return Result.OneWon;
    if (diagonal.every((cell) => cell === 2)) return Result.TwoWon;
  }

  if (board.some((row) => row.includes(0))) return Result.NotFinished;

  return Result.Draw;
}
