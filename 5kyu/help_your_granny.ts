// https://www.codewars.com/kata/5536a85b6ed4ee5a78000035

// Represents a friend, their town, and the distance to that town
type FriendLocation = {
  name: string;
  town: string;
  distance: number;
};

/**
 * Calculate the missing side of a right triangle using the Pythagorean theorem.
 *
 * @param sideA - A known side (can be hypotenuse or leg depending on `missing`)
 * @param sideB - Another known side
 * @param missing - Which side we want to calculate ("hypotenuse" or "leg")
 * @returns The length of the missing side
 */
function calculateMissingSide(
  sideA: number,
  sideB: number,
  missing: "hypotenuse" | "leg"
): number {
  if (missing === "hypotenuse") {
    return Math.sqrt(sideA ** 2 + sideB ** 2);
  }

  // When calculating a leg, ensure the larger side is passed as the hypotenuse
  if (sideA <= sideB) {
    throw new Error("Hypotenuse must be larger than the leg.");
  }
  return Math.sqrt(sideA ** 2 - sideB ** 2);
}

/**
 * Calculate the total tour distance given:
 * - A list of friends
 * - A mapping of friends to towns
 * - A distance table (town name followed by its distance)
 *
 * The calculation:
 * 1. Start at the first town, end at the last town.
 * 2. Add direct distances to first and last towns.
 * 3. Use right-triangle distance (Pythagorean theorem) between intermediate towns.
 *
 * @param friends - List of friend names
 * @param fTowns - Mapping [friend, town]
 * @param distTable - Array alternating between town and distance
 * @returns Total tour distance (floored to integer)
 */
export const tour = (
  friends: string[],
  fTowns: string[][],
  distTable: (string | number)[]
): number => {
  // Step 1: Build structured data (friends with their towns and distances)
  const structure: FriendLocation[] = friends
    .map((friendName) => {
      const town = (fTowns.find(([f]) => f === friendName) ?? ["", ""])[1];
      if (!town) return undefined;

      const index = distTable.findIndex((entry) => entry === town);
      if (index === -1 || typeof distTable[index + 1] !== "number") {
        return undefined;
      }

      const distance = Number(distTable[index + 1]);
      return { name: friendName, town, distance };
    })
    .filter((item): item is FriendLocation => Boolean(item)); // type guard for safety

  if (structure.length < 2) {
    throw new Error("Not enough valid towns to calculate a tour.");
  }

  // Step 2: Start and end distances
  let totalDistance = structure[0].distance + structure.at(-1)!.distance;

  // Step 3: Distances between intermediate towns
  for (let i = 0; i < structure.length - 1; i++) {
    const distA = structure[i].distance;
    const distB = structure[i + 1].distance;

    const legDistance = calculateMissingSide(
      Math.max(distA, distB),
      Math.min(distA, distB),
      "leg"
    );

    totalDistance += legDistance;
  }

  return Math.floor(totalDistance);
};
