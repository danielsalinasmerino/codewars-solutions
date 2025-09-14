// https://www.codewars.com/kata/5467e4d82edf8bbf40000155

export function descendingOrder(n: number): number {
  return Number(
    String(n)
      .split("")
      .sort((a, b) => Number(b) - Number(a))
      .join("")
  );
}
