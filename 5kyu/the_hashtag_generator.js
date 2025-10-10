// https://www.codewars.com/kata/52449b062fb80683ec000024

const HASHTAG_SYMBOL = "#";
const MAXIMUM_CHARACTERS = 140;

/**
 * Converts a string into a hashtag format
 * - Capitalizes first letter of each word
 * - Removes spaces
 * - Returns false if result is empty or exceeds 140 characters
 *
 * @param {string} str - The input string to convert
 * @returns {string|boolean} - The hashtag or false if invalid
 */
function generateHashtag(str) {
  // Start with the hashtag symbol
  let result = HASHTAG_SYMBOL;

  // Flag to track if the next character should be capitalized
  let shouldBeUpper = true;

  // Iterate through each character after trimming leading/trailing spaces
  for (const character of str.trim().split("")) {
    // Process non-space characters
    if (character !== " ") {
      if (shouldBeUpper) {
        // Capitalize first letter of each word
        result += character.toUpperCase();
        shouldBeUpper = false;
      } else {
        // Lowercase subsequent letters
        result += character.toLowerCase();
      }
    } else {
      // Space found - capitalize next letter
      shouldBeUpper = true;
    }
  }

  // Validate: hashtag must have content and not exceed 140 characters
  if (result.length > MAXIMUM_CHARACTERS || result === HASHTAG_SYMBOL) {
    return false;
  }

  return result;
}
