// https://www.codewars.com/kata/55633765da97b266e3000067

/**
 * Elo Rating System Constants
 */
const ELO_CONSTANTS = {
  INITIAL_RATING: 1000,
  RATING_SCALE: 400,
  EXPERT_THRESHOLD: 2400,
  EXPERIENCE_THRESHOLD: 30,
  K_FACTORS: {
    NOVICE: 25, // Players with less than 30 games
    INTERMEDIATE: 15, // Experienced players without expert rating
    EXPERT: 10, // Players who have reached 2400+
  },
};

const defaultKFunction = (experience) => {
  const { NOVICE, INTERMEDIATE, EXPERT } = ELO_CONSTANTS.K_FACTORS;

  if (experience.length < ELO_CONSTANTS.EXPERIENCE_THRESHOLD) return NOVICE;

  if (
    experience.some(
      (experienceRecord) => experienceRecord > ELO_CONSTANTS.EXPERT_THRESHOLD
    )
  )
    return EXPERT;

  return INTERMEDIATE;
};

function elo(experience, opponentRating, score, k) {
  const playerRating = experience.length
    ? experience[experience.length - 1]
    : ELO_CONSTANTS.INITIAL_RATING;

  const expectation =
    1 /
    (1 + 10 ** ((opponentRating - playerRating) / ELO_CONSTANTS.RATING_SCALE));

  const factorKFunction = k ? k : defaultKFunction;

  const newPlayerRating =
    playerRating + factorKFunction(experience) * (score - expectation);

  return Math.round(newPlayerRating);
}
