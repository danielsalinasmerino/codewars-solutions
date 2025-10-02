// https://www.codewars.com/kata/526d42b6526963598d0004db

// Create alphabet mapping: {A: 1, B: 2, ..., Z: 26}
const ALPHABET = Object.fromEntries(
  Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), i + 1])
);

// Create reverse lookup for O(1) access: {1: 'A', 2: 'B', ..., 26: 'Z'}
const REVERSE_ALPHABET = Object.fromEntries(
  Object.entries(ALPHABET).map(([key, val]) => [val, key])
);

/**
 * Creates a Caesar cipher encoder/decoder with a given shift value
 * @param {number} shift - Number of positions to shift (positive or negative)
 * @returns {Object} Object with encode and decode methods
 */
const CaesarCipher = function (shift) {
  /**
   * Shifts a character position with wrapping
   * @param {number} position - Current position (1-26)
   * @param {number} offset - Amount to shift
   * @returns {number} New position (1-26)
   */
  const shiftPosition = (position, offset) => {
    return ((((position - 1 + offset) % 26) + 26) % 26) + 1;
  };

  /**
   * Transforms a message by shifting each letter
   * @param {string} message - Message to transform
   * @param {number} offset - Shift amount (positive for encode, negative for decode)
   * @returns {string} Transformed message
   */
  const transform = (message, offset) => {
    return message
      .toUpperCase()
      .split("")
      .map((character) => {
        // Non-alphabetic characters pass through unchanged
        if (!ALPHABET[character]) return character;

        const currentPosition = ALPHABET[character];
        const newPosition = shiftPosition(currentPosition, offset);
        return REVERSE_ALPHABET[newPosition];
      })
      .join("");
  };

  return {
    encode: (message) => transform(message, shift),
    decode: (encodedMessage) => transform(encodedMessage, -shift),
  };
};
