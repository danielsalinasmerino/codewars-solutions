// https://www.codewars.com/kata/528d9adf0e03778b9e00067e

/**
 * Finds the coordinates of a mine (value of 1) in a 2D minefield array
 * @param {number[][]} field - 2D array representing the minefield
 * @returns {[number, number] | undefined} Coordinates [row, col] of the mine, or undefined if not found
 */
function mineLocation(field) {
  // Iterate through each row of the field
  for (let row = 0; row < field.length; row++) {
    // Check if current row contains a mine
    if (field[row].includes(1)) {
      // Find the column index of the mine in this row
      const col = field[row].findIndex((cell) => cell === 1);

      // Return coordinates immediately once mine is found
      return [row, col];
    }
  }

  // Return undefined if no mine is found
  return undefined;
}
