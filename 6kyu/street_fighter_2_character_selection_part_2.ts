// https://www.codewars.com/kata/58583922c1d5b415b00000ff

// Represents the possible moves in the Street Fighter selection grid
type Move = "down" | "up" | "right" | "left";

/**
 * Deltas for each move direction.
 * Rows are Y-axis, columns are X-axis.
 */
const directionDeltas: Record<Move, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

/**
 * Simulates the Street Fighter character selection.
 * Supports wrapping horizontally and ignores "holes" (empty slots).
 *
 * @param fighters - 2D grid representing the fighters.
 * @param position - Initial position [row, column].
 * @param moves - List of moves to perform.
 * @returns Array of fighter names visited after each move.
 */
export function superStreetFighterSelection(
  fighters: string[][],
  position: number[],
  moves: string[]
): string[] {
  let currentPosition = [...position];
  const visited: string[] = [];

  const maxRow = fighters.length - 1;
  const maxCol = fighters[0].length - 1;

  for (const move of moves) {
    let [row, col] = currentPosition;
    const [dRow, dCol] = directionDeltas[move as Move] ?? [0, 0];

    if (move === "up" || move === "down") {
      // Vertical moves: only move if within bounds and not a hole
      const newRow = row + dRow;
      if (newRow >= 0 && newRow <= maxRow && fighters[newRow][col]) {
        row = newRow;
      }
    } else if (move === "left" || move === "right") {
      // Horizontal moves: wrap around and skip holes
      let newCol = (col + dCol + fighters[0].length) % fighters[0].length;

      // Keep looping until a non-empty slot is found
      while (!fighters[row][newCol]) {
        newCol = (newCol + dCol + fighters[0].length) % fighters[0].length;
      }

      col = newCol;
    }

    currentPosition = [row, col];
    visited.push(fighters[row][col]);
  }

  return visited;
}
