// https://www.codewars.com/kata/514a024011ea4fb54200004b

/**
 * Extracts the domain name from a URL
 * @param {string} url - The URL to extract the domain from (e.g., "http://www.example.com/path")
 * @returns {string} The domain name without protocol, www prefix, or path (e.g., "example")
 * @example
 * domainName("http://github.com/carbonfive/raygun") // returns "github"
 * domainName("https://www.cnet.com") // returns "cnet"
 */
function domainName(url) {
  // Remove protocol and www prefix
  let cleanedUrl = url.replace(/^https?:\/\//, "").replace(/^www\./, "");

  // Extract domain before first dot
  const dotIndex = cleanedUrl.indexOf(".");
  if (dotIndex !== -1) {
    cleanedUrl = cleanedUrl.slice(0, dotIndex);
  }

  return cleanedUrl;
}
