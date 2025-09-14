// https://www.codewars.com/kata/5544c7a5cb454edb3c000047

/**
 * Calculates how many times a bouncing ball will be seen through a window.
 *
 * A ball is dropped from a height `h`. Each time it bounces, it rebounds to
 * a fraction (`bounce`) of its previous height. The ball is only visible
 * from the window when it passes in front of it.
 *
 * Rules:
 * - Return -1 if input values are invalid:
 *   - `h` must be > 0
 *   - `0 < bounce < 1`
 *   - `window` must be lower than `h`
 *
 * @param h - Initial height of the drop
 * @param bounce - Bounce coefficient (0 < bounce < 1)
 * @param window - Height of the window
 * @returns Number of times the ball is visible from the window, or -1 if invalid
 */
export function bouncingBall(
  h: number,
  bounce: number,
  window: number
): number {
  // Input validation
  if (h <= 0 || bounce <= 0 || bounce >= 1 || window >= h) {
    return -1;
  }

  let visibleCount = 1; // Ball is seen once when falling from the initial drop

  // Each bounce makes the ball rise to a smaller height
  while ((h *= bounce) > window) {
    // Seen once when going up past the window, and again when coming back down
    visibleCount += 2;
  }

  return visibleCount;
}
