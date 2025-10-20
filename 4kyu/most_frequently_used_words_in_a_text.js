// https://www.codewars.com/kata/51e056fe544cf36c410000fb

function topThreeWords(text) {
  const wordCount = {};

  // Replace anything that is NOT a letter or apostrophe
  const words = text
    .toLowerCase()
    .replace(/[^a-zA-Z']+/g, " ")
    .split(" ")
    .filter((word) => word && word !== "'"); // Filter empty strings and standalone apostrophes

  // Count words
  for (const word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }

  // Sort and take top 3 (only once)
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1]) // Descending order
    .slice(0, 3)
    .map(([key]) => key);
}
