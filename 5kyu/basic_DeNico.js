/**
 * Splits a string into equal-sized chunks.
 * @param {string} input - The string to split.
 * @param {number} chunkSize - The length of each chunk.
 * @returns {string[]} - An array of string chunks.
 */
function splitIntoChunks(input, chunkSize) {
  return input.match(new RegExp(`.{1,${chunkSize}}`, "g")) || [];
}

/**
 * Reorders the characters of a string according to an index mapping.
 * @param {string} source - The original string to reorder.
 * @param {string|number[]} indexMapping - The index mapping defining the new order.
 * @returns {string} - The reordered string.
 */
function reorderByMapping(source, indexMapping) {
  const sourceCharacters = source.split("");
  const mappingIndices = String(indexMapping).split("").map(Number);

  const reordered = mappingIndices.map((index) => sourceCharacters[index]);
  return reordered.join("");
}

/**
 * Decrypts a message encoded with the "DeNico" cipher.
 * @param {string} key - The key used for the cipher.
 * @param {string} message - The encoded message.
 * @returns {string} - The decoded message.
 */
function deNico(key, message) {
  // Step 1: Determine the numeric key order based on the sorted key characters.
  const sortedKeyChars = [...key].sort();
  const numericKey = [...key]
    .map((character) => sortedKeyChars.indexOf(character))
    .join("");

  // Step 2: Split the message into groups matching the key length.
  const messageChunks = splitIntoChunks(message, key.length);

  // Step 3: Reorder each chunk according to the numeric key.
  const reorderedChunks = messageChunks.map((chunk) =>
    reorderByMapping(chunk, numericKey)
  );

  // Step 4: Combine and trim any trailing spaces.
  return reorderedChunks.join("").trim();
}
