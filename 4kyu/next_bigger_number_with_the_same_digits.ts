// https://www.codewars.com/kata/55983863da40caa2c900004e

/**
 * Find the next bigger number using the same digits.
 * If no such number exists, return -1.
 *
 * Example:
 *   nextBigger(12) => 21
 *   nextBigger(513) => 531
 *   nextBigger(2017) => 2071
 *   nextBigger(9) => -1
 */
export function nextBigger(n: number): number {
  const digits = String(n).split("").map(Number);

  // Step 1: Find the pivot (from right to left where digits[i] < digits[i+1])
  let pivot = -1;
  for (let i = digits.length - 2; i >= 0; i--) {
    if (digits[i] < digits[i + 1]) {
      pivot = i;
      break;
    }
  }
  if (pivot === -1) return -1; // No bigger number possible

  // Step 2: Find the smallest digit greater than digits[pivot] to the right
  let swapIndex = -1;
  for (let i = digits.length - 1; i > pivot; i--) {
    if (digits[i] > digits[pivot]) {
      swapIndex = i;
      break;
    }
  }

  // Step 3: Swap pivot with swapIndex
  [digits[pivot], digits[swapIndex]] = [digits[swapIndex], digits[pivot]];

  // Step 4: Sort (or reverse, since it's descending) everything to the right of pivot
  const rightPart = digits.splice(pivot + 1).sort((a, b) => a - b);
  const result = Number([...digits, ...rightPart].join(""));

  return result;
}
