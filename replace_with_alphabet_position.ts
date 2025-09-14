// https://www.codewars.com/kata/546f922b54af40e1e90001da

const alphabetPositions = Object.fromEntries(
  Array.from({ length: 26 }, (_, i) => [String.fromCharCode(97 + i), i + 1])
);

export function alphabetPosition(text: string): string {
  return text
    .toLocaleLowerCase()
    .split("")
    .map((char) => alphabetPositions[char] ?? undefined)
    .filter(Boolean)
    .join(" ");
}
