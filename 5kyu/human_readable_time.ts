// https://www.codewars.com/kata/52685f7382004e774f0001f7

// Number of seconds in common time units
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

/**
 * Pads a number with leading zeros so it always has 2 digits.
 * Example: 5 → "05", 12 → "12"
 */
function formatTwoDigits(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Converts a number of seconds into a human-readable string
 * formatted as "HH:MM:SS".
 *
 * @param totalSeconds - Total time in seconds.
 * @returns Time string in "HH:MM:SS" format.
 *
 * Example:
 * humanReadable(3661) → "01:01:01"
 */
export function humanReadable(totalSeconds: number): string {
  let remainingSeconds = totalSeconds;

  // Calculate hours
  const hours = Math.floor(remainingSeconds / SECONDS_PER_HOUR);
  remainingSeconds -= hours * SECONDS_PER_HOUR;

  // Calculate minutes
  const minutes = Math.floor(remainingSeconds / SECONDS_PER_MINUTE);
  remainingSeconds -= minutes * SECONDS_PER_MINUTE;

  // Remaining seconds after extracting hours and minutes
  const seconds = remainingSeconds;

  // Return formatted string
  return `${formatTwoDigits(hours)}:${formatTwoDigits(
    minutes
  )}:${formatTwoDigits(seconds)}`;
}
