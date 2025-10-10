// https://www.codewars.com/kata/536c00e21da4dc0a0700128b

/**
 * Generates a humorous villain name based on a birthday
 * @param {Date} birthday - The birthday date
 * @returns {string} A villain name in the format "The [Adjective] [Noun]"
 */
function getVillainName(birthday) {
  // Month-based adjectives (0-11 for Jan-Dec)
  const adjectives = [
    "Evil", // January
    "Vile", // February
    "Cruel", // March
    "Trashy", // April
    "Despicable", // May
    "Embarrassing", // June
    "Disreputable", // July
    "Atrocious", // August
    "Twirling", // September
    "Orange", // October
    "Terrifying", // November
    "Awkward", // December
  ];

  // Day-based nouns (using last digit of day: 0-9)
  const nouns = [
    "Mustache", // Days ending in 0
    "Pickle", // Days ending in 1
    "Hood Ornament", // Days ending in 2
    "Raisin", // Days ending in 3
    "Recycling Bin", // Days ending in 4
    "Potato", // Days ending in 5
    "Tomato", // Days ending in 6
    "House Cat", // Days ending in 7
    "Teaspoon", // Days ending in 8
    "Laundry Basket", // Days ending in 9
  ];

  const month = birthday.getMonth();
  const dayLastDigit = birthday.getDate() % 10;

  return `The ${adjectives[month]} ${nouns[dayLastDigit]}`;
}
