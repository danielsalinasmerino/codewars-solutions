// https://www.codewars.com/kata/54dc6f5a224c26032800005c

/**
 * Given a list of articles with stock values and a list of categories,
 * produce a formatted string showing the total stock for each category.
 *
 * Example:
 * stockList(["ABAR 200", "CDXE 500"], ["A", "C"])
 * -> "(A : 200) - (C : 500)"
 *
 * Rules:
 * - If either list is empty, return an empty string
 * - Category totals are based on the first letter of the article code
 *
 * @param listOfArt - Array of article strings, e.g., "ABAR 200"
 * @param listOfCat - Array of category letters, e.g., "A", "B"
 * @returns Formatted stock totals string
 */
export const stockList = (listOfArt: string[], listOfCat: string[]): string => {
  if (listOfArt.length === 0 || listOfCat.length === 0) return "";

  // Parse the articles into structured objects
  const articles = listOfArt.map((art) => {
    const [code, qty] = art.split(" ");
    return { category: code[0], stock: Number(qty) };
  });

  // Compute totals per category
  const results = listOfCat.map((cat) => {
    const total = articles.reduce(
      (sum, article) => sum + (article.category === cat ? article.stock : 0),
      0
    );

    return `(${cat} : ${total})`;
  });

  // Join with the requested format
  return results.join(" - ");
};
