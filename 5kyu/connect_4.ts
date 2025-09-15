// https://www.codewars.com/kata/586c0909c1923fdb89002031

const NUMBER_OF_PLAYERS = 2;
const STARTING_PLAYER_TURN = 1;

const NUMBER_OF_COLUMNS = 7;
const NUMBER_OF_ROWS = 6;

export type PlayerInfo = {
  id: number; // Player identifier (1 or 2)
  turn: number; // Turn order
};

export class Connect4 {
  grid: number[][]; // 2D grid: 0 = empty, playerId = occupied
  players: PlayerInfo[];
  turn: number; // Current player's id
  winner: PlayerInfo | undefined;

  constructor(
    numberOfRows = NUMBER_OF_ROWS,
    numberOfColumns = NUMBER_OF_COLUMNS
  ) {
    // Initialize empty grid
    this.grid = Array.from({ length: numberOfRows }, () =>
      Array(numberOfColumns).fill(0)
    );

    // Create players (id and turn order are same here, but could diverge later)
    this.players = Array.from({ length: NUMBER_OF_PLAYERS }, (_, index) => ({
      id: index + 1,
      turn: index + 1,
    }));

    this.turn = STARTING_PLAYER_TURN;
    this.winner = undefined;
  }

  /**
   * Attempt to drop a piece into the given column.
   * Returns the game status message after the move.
   */
  play(columnIndex: number): string {
    if (this.winner) return this.getMessage("finished");

    const playerTurnMessage = this.getMessage("turn", this.turn);

    // Find the lowest available row in this column
    const rowIndex = this.findAvailableRow(columnIndex);

    if (rowIndex === -1) {
      return this.getMessage("columnFull");
    }

    // Place piece
    this.grid[rowIndex][columnIndex] = this.turn;

    // Check win conditions
    if (this.checkWin(rowIndex, columnIndex)) {
      this.winner = this.players.find((player) => player.id === this.turn);
      return this.getMessage("win", this.turn);
    }

    // Advance to next turn
    this.advanceTurn();

    return playerTurnMessage;
  }

  /** Finds the lowest empty row in a column, or -1 if column is full */
  private findAvailableRow(columnIndex: number): number {
    for (let row = this.grid.length - 1; row >= 0; row--) {
      if (this.grid[row][columnIndex] === 0) {
        return row;
      }
    }
    return -1;
  }

  /** Moves turn to the next player */
  private advanceTurn(): void {
    this.turn++;
    if (this.turn > this.players.length) {
      this.turn = 1;
    }
  }

  /** Checks win conditions (horizontal + vertical for now) */
  /** Checks win conditions (horizontal, vertical, and diagonals) */
  private checkWin(rowIndex: number, columnIndex: number): boolean {
    const currentPlayer = this.turn;

    // Row check (horizontal)
    if (this.hasFourInARow(this.grid[rowIndex], currentPlayer)) {
      return true;
    }

    // Column check (vertical)
    const columnValues = this.grid.map((row) => row[columnIndex]);
    if (this.hasFourInARow(columnValues, currentPlayer)) {
      return true;
    }

    // Diagonal check (top-left → bottom-right)
    const diagonal1: number[] = [];
    for (let r = rowIndex, c = columnIndex; r > 0 && c > 0; r--, c--) {} // move to top-left
    for (
      let r = rowIndex, c = columnIndex;
      r < this.grid.length && c < this.grid[0].length;
      r++, c++
    ) {
      diagonal1.push(this.grid[r][c]);
    }
    if (this.hasFourInARow(diagonal1, currentPlayer)) {
      return true;
    }

    // Diagonal check (top-right → bottom-left)
    const diagonal2: number[] = [];
    for (
      let r = rowIndex, c = columnIndex;
      r > 0 && c < this.grid[0].length - 1;
      r--, c++
    ) {} // move to top-right
    for (
      let r = rowIndex, c = columnIndex;
      r < this.grid.length && c >= 0;
      r++, c--
    ) {
      diagonal2.push(this.grid[r][c]);
    }
    if (this.hasFourInARow(diagonal2, currentPlayer)) {
      return true;
    }

    return false;
  }

  /**
   * Helper: checks if the given array contains 4 consecutive values equal to `value`
   */
  private hasFourInARow(array: number[], value: number): boolean {
    let consecutiveCount = 0;

    for (const element of array) {
      if (element === value) {
        consecutiveCount++;
        if (consecutiveCount === 4) return true;
      } else {
        consecutiveCount = 0; // reset on mismatch
      }
    }

    return false;
  }

  /**
   * Centralized messages
   */
  private getMessage(
    type: "finished" | "columnFull" | "turn" | "win",
    playerId?: number
  ): string {
    switch (type) {
      case "finished":
        return "Game has finished!";
      case "columnFull":
        return "Column full!";
      case "turn":
        return `Player ${playerId} has a turn`;
      case "win":
        return `Player ${playerId} wins!`;
    }
  }
}
