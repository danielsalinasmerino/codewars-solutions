// https://www.codewars.com/kata/587136ba2eefcb92a9000027

// 🎲 Snakes and Ladders game implementation

// Map of "special squares" → "destination squares" (snakes & ladders)
const events: Record<number, number> = {
  // snakes
  99: 80,
  95: 75,
  92: 88,
  89: 68,
  74: 53,
  64: 60,
  62: 19,
  49: 11,
  46: 25,
  16: 6,
  // ladders
  2: 38,
  7: 14,
  8: 31,
  15: 26,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  78: 98,
  87: 94,
};

const NUMBER_OF_PLAYERS = 2;
const STARTING_PLAYER_SQUARE = 0;
const STARTING_PLAYER_TURN = 1;
const WINNING_SQUARE = 100;

// 🔹 Centralized messages (no magic strings)
const Messages = {
  gameOver: () => "Game over!",
  win: (playerName: string) => `Player ${playerName} Wins!`,
  position: (playerName: string, square: number) =>
    `Player ${playerName} is on square ${square}`,
};

export type PlayerInfo = {
  square: number; // Current position on the board
  name: string; // Player identifier (e.g. "1", "2")
  turn: number; // Player order
};

export class SnakesLadders {
  players: PlayerInfo[];
  turn: number; // Whose turn it currently is
  winner: PlayerInfo | undefined;

  constructor() {
    // Initialize players at starting square
    this.players = Array.from({ length: NUMBER_OF_PLAYERS }, (_, i) => ({
      square: STARTING_PLAYER_SQUARE,
      name: String(i + 1),
      turn: i + 1,
    }));

    this.turn = STARTING_PLAYER_TURN;
    this.winner = undefined;
  }

  /**
   * Plays one turn of the game.
   * @param die1 First die roll
   * @param die2 Second die roll
   * @returns Status string describing result of the turn
   */
  play(die1: number, die2: number): string {
    if (this.winner) {
      return Messages.gameOver();
    }

    const currentPlayer = this.getCurrentPlayer();
    const rollTotal = die1 + die2;

    // Determine new square after roll, bounce, and event resolution
    const nextSquare = this.applyEvents(
      this.applyBounce(currentPlayer.square + rollTotal)
    );

    currentPlayer.square = nextSquare;

    // Win condition
    if (currentPlayer.square === WINNING_SQUARE) {
      this.winner = currentPlayer;
      return this.createWinMessage(currentPlayer);
    }

    // Advance turn if no double was rolled
    if (die1 !== die2) {
      this.advanceTurn();
    }

    return this.createPositionMessage(currentPlayer);
  }

  /** Returns the current player whose turn it is */
  private getCurrentPlayer(): PlayerInfo {
    const player = this.players.find((p) => p.turn === this.turn);
    if (!player) {
      throw new Error(
        `Invalid turn state: No player found for turn ${this.turn}`
      );
    }
    return player;
  }

  /** Applies bounce rule: if overshooting 100, bounce back the excess */
  private applyBounce(square: number): number {
    if (square > WINNING_SQUARE) {
      const excess = square - WINNING_SQUARE;
      return WINNING_SQUARE - excess;
    }
    return square;
  }

  /** Applies snake or ladder effect if present */
  private applyEvents(square: number): number {
    return events[square] ?? square;
  }

  /** Moves turn to the next player */
  private advanceTurn(): void {
    this.turn++;
    if (this.turn > this.players.length) {
      this.turn = 1;
    }
  }

  /** Creates win message */
  private createWinMessage(player: PlayerInfo): string {
    return Messages.win(player.name);
  }

  /** Creates position message */
  private createPositionMessage(player: PlayerInfo): string {
    return Messages.position(player.name, player.square);
  }
}
