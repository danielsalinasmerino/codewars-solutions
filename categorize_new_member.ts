// https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa

type MembershipCategory = "Senior" | "Open";

type NumberPair = [number, number];

export const categoriseMember = ([
  age,
  handicap,
]: NumberPair): MembershipCategory =>
  age >= 55 && handicap > 7 ? "Senior" : "Open";

export function openOrSenior(data: number[][]): MembershipCategory[] {
  return data.map((memberInfo) => categoriseMember(memberInfo as NumberPair));
}
