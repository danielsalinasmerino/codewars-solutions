// https://www.codewars.com/kata/536e9a7973130a06eb000e9f

// Define effectiveness multipliers in a frozen object (immutable constants)
const Effectiveness = Object.freeze({
  Super: 2, // Attack is very effective
  Neutral: 1, // Attack is normal effectiveness
  NotVery: 0.5, // Attack is not very effective
});

// Type effectiveness chart (attackingType → defendingType → multiplier)
// Frozen so it can't be mutated by accident
const TypeChart = Object.freeze({
  fire: Object.freeze({
    fire: Effectiveness.NotVery,
    water: Effectiveness.NotVery,
    grass: Effectiveness.Super,
    electric: Effectiveness.Neutral,
  }),
  water: Object.freeze({
    fire: Effectiveness.Super,
    water: Effectiveness.NotVery,
    grass: Effectiveness.NotVery,
    electric: Effectiveness.NotVery,
  }),
  grass: Object.freeze({
    fire: Effectiveness.NotVery,
    water: Effectiveness.Super,
    grass: Effectiveness.NotVery,
    electric: Effectiveness.Neutral,
  }),
  electric: Object.freeze({
    fire: Effectiveness.Neutral,
    water: Effectiveness.Super,
    grass: Effectiveness.Neutral,
    electric: Effectiveness.NotVery,
  }),
});

/**
 * Calculates damage given types and stats.
 *
 * Formula: base * (attack / defense) * effectiveness
 * @param {string} attackerType - The type of the attacker (e.g., "fire")
 * @param {string} defenderType - The type of the defender (e.g., "water")
 * @param {number} attack - The attack stat of the attacker
 * @param {number} defense - The defense stat of the defender
 * @param {number} [basePower=50] - Optional base power of the move (default 50)
 * @returns {number} - The resulting damage
 */
function calculateDamage(
  attackerType,
  defenderType,
  attack,
  defense,
  basePower = 50
) {
  // Get effectiveness multiplier, default to Neutral if type not found
  const effectiveness =
    TypeChart[attackerType]?.[defenderType] ?? Effectiveness.Neutral;

  // Damage formula
  const damage = basePower * (attack / defense) * effectiveness;

  return damage;
}
