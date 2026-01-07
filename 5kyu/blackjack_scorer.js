/**
 * Calculates the total score of a blackjack hand.
 *
 * @param {string[]} cards - An array of card representations (e.g., ["A", "K", "5"]).
 * @returns {number} The total score for the hand according to blackjack rules.
 */
function scoreHand(cards) {
  const values = cards.map((card) => {
    if (["J", "Q", "K"].includes(card)) {
      return 10;
    } else if (card === "A") {
      return 11;
    } else {
      return parseInt(card, 10);
    }
  });

  let total = values.reduce((acc, curr) => acc + curr, 0);
  let aces = cards.filter((card) => card === "A").length;

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
}
