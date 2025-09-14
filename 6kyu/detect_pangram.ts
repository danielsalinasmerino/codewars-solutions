// https://www.codewars.com/kata/545cedaa9943f7fe7b000048

const alphabetTemplate = Object.fromEntries(
  Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), false])
);

export const isPangram = (phrase: string): boolean => {
  const alphabet = { ...alphabetTemplate };

  for (const char of phrase.toLowerCase()) {
    if (char in alphabet) {
      alphabet[char] = true;
    }
  }

  return Object.values(alphabet).every((value) => value);
};
