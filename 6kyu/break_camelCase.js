// https://www.codewars.com/kata/5208f99aee097e6552000148

/**
 * Inserts a space before each uppercase character in the text.
 * @param {string} text - The input text to process
 * @returns {string} Text with spaces inserted before uppercase characters
 */
function solution(text) {
  return text
    .split("")
    .map((char) => (char === char.toUpperCase() ? ` ${char}` : char))
    .join("");
}
