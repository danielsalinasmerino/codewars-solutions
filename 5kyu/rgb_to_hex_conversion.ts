// https://www.codewars.com/kata/513e08acc600c94f01000001

function clampByte(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)));
}

function byteToHex(value: number): string {
  return clampByte(value).toString(16).toUpperCase().padStart(2, "0");
}

export function rgb(r: number, g: number, b: number): string {
  return [r, g, b].map(byteToHex).join("");
}
