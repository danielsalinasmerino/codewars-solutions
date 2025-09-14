// https://www.codewars.com/kata/5853213063adbd1b9b0000be

// Represents the possible moves in the Street Fighter selection grid
type Move = "down" | "up" | "right" | "left";

/**
 * Utility object to check move directions.
 * Makes the code easier to read and avoids string comparisons everywhere.
 */
const MoveUtils = {
  isDown: (move: Move) => move === "down",
  isUp: (move: Move) => move === "up",
  isRight: (move: Move) => move === "right",
  isLeft: (move: Move) => move === "left",
};

/**
 * Simulates the Street Fighter character selection.
 * @param fighters - 2D grid representing the fighters.
 * @param position - Initial position [row, column].
 * @param moves - List of moves to perform.
 * @returns Array of fighter names visited after each move.
 */
export function streetFighterSelection(
  fighters: string[][],
  position: number[],
  moves: Move[]
): string[] {
  // Keep track of the current position in [row, column] format
  let currentPosition = [...position];

  // Collect visited fighter names
  const visited: string[] = [];

  // Grid dimensions
  const maxRow = fighters.length - 1;
  const maxCol = fighters[0].length - 1;

  for (const move of moves) {
    let [row, col] = currentPosition;

    if (MoveUtils.isUp(move)) {
      // Stay in place if already at the top row
      if (row > 0) row -= 1;
    } else if (MoveUtils.isDown(move)) {
      // Stay in place if already at the bottom row
      if (row < maxRow) row += 1;
    } else if (MoveUtils.isLeft(move)) {
      // Wrap around horizontally to the last column
      col = col === 0 ? maxCol : col - 1;
    } else if (MoveUtils.isRight(move)) {
      // Wrap around horizontally to the first column
      col = col === maxCol ? 0 : col + 1;
    }

    currentPosition = [row, col];
    visited.push(fighters[row][col]);
  }

  return visited;
}
