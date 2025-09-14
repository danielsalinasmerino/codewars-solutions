// https://www.codewars.com/kata/5287e858c6b5a9678200083c

export function narcissistic(value: number): boolean {
  const digits = [...String(value)].map(Number);
  const power = digits.length;
  const poweredSum = digits.reduce((sum, digit) => sum + digit ** power, 0);
  return poweredSum === value;
}
