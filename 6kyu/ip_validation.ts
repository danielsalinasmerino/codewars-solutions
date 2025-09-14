// https://www.codewars.com/kata/515decfd9dcfc23bb6000006

// An IPv4 address consists of exactly 4 octets
const IP_VALID_OCTETS_LENGTH = 4;

// Regex to validate a single IPv4 octet (0–255, no leading zeros unless "0")
const OCTET_REGEX = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

/**
 * Check if a single IPv4 octet is valid
 *
 * @param fragment - A string representing a single octet
 * @returns true if valid, false otherwise
 */
function isValidOctet(fragment: string): boolean {
  return OCTET_REGEX.test(fragment);
}

/**
 * Check if a given string is a valid IPv4 address.
 *
 * Rules:
 * - Must contain exactly 4 octets separated by "."
 * - Each octet must be in the range 0–255
 * - No leading zeros unless the octet is exactly "0"
 *
 * @param str - The IPv4 address string to validate
 * @returns true if the string is a valid IPv4 address, false otherwise
 */
export function isValidIP(str: string): boolean {
  const octets = str.split(".");

  // Must have exactly 4 octets
  if (octets.length !== IP_VALID_OCTETS_LENGTH) return false;

  // All octets must be valid
  return octets.every(isValidOctet);
}
