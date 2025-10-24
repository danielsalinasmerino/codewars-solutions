// https://www.codewars.com/kata/5427db696f30afd74b0006a3

// -------------------------
// 🎳 Constants & Enums
// -------------------------
const BOWLING = Object.freeze({
  TOTAL_FRAMES: 10,
  MAX_PINS: 10,
});

const FRAME_TYPE = Object.freeze({
  STRIKE: "strike",
  SPARE: "spare",
  NORMAL: "normal",
});

// -------------------------
// 🎯 Convert Rolls to Frames
// -------------------------
const convertRollsToFrames = (rolls) => {
  const frames = [];
  let rollIndex = 0;

  for (
    let frameNumber = 1;
    frameNumber <= BOWLING.TOTAL_FRAMES;
    frameNumber++
  ) {
    const firstRoll = rolls[rollIndex];
    const isStrike = firstRoll === BOWLING.MAX_PINS;

    if (frameNumber < BOWLING.TOTAL_FRAMES) {
      if (isStrike) {
        frames.push([BOWLING.MAX_PINS]);
        rollIndex += 1;
      } else {
        const secondRoll = rolls[rollIndex + 1] ?? 0;
        frames.push([firstRoll, secondRoll]);
        rollIndex += 2;
      }
    } else {
      // Handle 10th frame with potential bonus rolls
      const secondRoll = rolls[rollIndex + 1] ?? 0;
      const hasBonus = isStrike || firstRoll + secondRoll === BOWLING.MAX_PINS;
      const thirdRoll = hasBonus ? rolls[rollIndex + 2] ?? 0 : undefined;

      const tenthFrame = [firstRoll, secondRoll];
      if (thirdRoll !== undefined) tenthFrame.push(thirdRoll);
      frames.push(tenthFrame);
    }
  }

  return frames.map((frame, index) => {
    const frameScore = frame.reduce((sum, pins) => sum + pins, 0);
    let type = FRAME_TYPE.NORMAL;

    if (frame[0] === BOWLING.MAX_PINS) {
      type = FRAME_TYPE.STRIKE;
    } else if (frameScore === BOWLING.MAX_PINS) {
      type = FRAME_TYPE.SPARE;
    }

    return {
      frameNumber: index + 1,
      frame,
      frameScore,
      type,
    };
  });
};

// -------------------------
// 🧮 Calculate Total Score
// -------------------------
const bowlingScore = (rolls) => {
  const frames = convertRollsToFrames(rolls);
  let totalScore = 0;

  for (let i = 0; i < frames.length; i++) {
    const { frame, type } = frames[i];
    let frameScore = frame.reduce((sum, pins) => sum + pins, 0);

    if (type === FRAME_TYPE.SPARE) {
      const nextRoll = frames[i + 1]?.frame[0] ?? 0;
      frameScore += nextRoll;
    } else if (type === FRAME_TYPE.STRIKE) {
      const nextRolls = [
        ...(frames[i + 1]?.frame ?? []),
        ...(frames[i + 2]?.frame ?? []),
      ];
      frameScore += (nextRolls[0] ?? 0) + (nextRolls[1] ?? 0);
    }

    totalScore += frameScore;
  }

  return totalScore;
};
