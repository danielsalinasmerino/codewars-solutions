// https://www.codewars.com/kata/5314b3c6bb244a48ab00076c

/**
 * Checks if a ticket number is "lucky" by comparing the sum of digits in the left and right halves.
 * A ticket is lucky if the sum of digits in the left half equals the sum of digits in the right half.
 * For odd-length tickets, the middle digit is excluded from both halves.
 *
 * @param {string} ticket - The ticket number as a string of decimal digits
 * @returns {boolean} True if the ticket is lucky, false otherwise
 * @throws {Error} If the ticket is empty or contains non-decimal characters
 *
 * @example
 * luckCheck("003111") // returns true (0+0+3 === 1+1+1)
 * luckCheck("813372") // returns false (8+1+3 !== 3+7+2)
 * luckCheck("17935") // returns true (1+7 === 3+5, middle digit 9 excluded)
 */
function luckCheck(ticket) {
  if (!ticket || ticket.length === 0) {
    throw new Error("Ticket cannot be empty");
  }

  if (!/^\d+$/.test(ticket)) {
    throw new Error("Ticket must contain only decimal digits");
  }

  const isOdd = ticket.length % 2 !== 0;

  const leftPart = [...ticket].slice(0, ticket.length / 2);
  const leftSum = leftPart.reduce((sum, digit) => sum + Number(digit), 0);

  const rightPart = [...ticket].slice(ticket.length / 2);
  let rightSum = rightPart.reduce((sum, digit) => sum + Number(digit), 0);
  if (isOdd) {
    rightSum = rightSum - Number(rightPart[0]);
  }

  return leftSum === rightSum;
}
