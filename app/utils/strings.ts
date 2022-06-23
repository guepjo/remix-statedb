export const isValidLinkedInHostname = (hostname: string): boolean => {
  const isValidHostnameSuffix = hostname.endsWith(".linkedin.com");

  if (hostname && hostname.length && isValidHostnameSuffix) {
    return true;
  }

  return false;
};
