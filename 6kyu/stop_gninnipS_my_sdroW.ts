// https://www.codewars.com/kata/5264d2b162488dc400000001

function reverseIfLong(word: string): string {
  return word.length >= 5 ? word.split("").reverse().join("") : word;
}

export function spinWords(sentence: string): string {
  return sentence.split(" ").map(reverseIfLong).join(" ");
}
