export const removeDomainFromURL = (hostname: string): string => {
  if (hostname === undefined || hostname === null || hostname.trim() === '') return '';
  const newHostname = hostname.replace(/.linkedin.com/g, '');

  return newHostname;
};

// Compares string to help sort strings alphabetically
export const sortStringsAlphabeticallyComparator = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export const sortDatesNumericallyComparitor = (a: string, b: string) => {
  const d1 = Date.parse(a);
  const d2 = Date.parse(b);

  return d1 - d2;
};

export const isValidLinkedInHostname = (hostname: string): boolean => {
  const isValidHostnameSuffix = hostname.endsWith('.linkedin.com');

  if (hostname && hostname.length && isValidHostnameSuffix) {
    return true;
  }

  return false;
};

/**
/**
 * @description
 * Given an incoming data value that is either in string or number format, return a string representation that will be used for
 * our user interface
 * @param date
 * Sometimes the data that is coming in may be in string format like this: "2022-03-23 13:48:58" or in number format like this: 1527058800
 *
 * @examples
 * Some example inputs from our API:
 * - created: "2022-03-23 13:48:58"
 * - warranty_start: 1527058800
 * - warranty_expiration: 1621753200
 */
export const getDateString = (date: string | number) => {
  if (!date) {
    return;
  }

  const dateNumber = Number(date) * 1000;
  const newDate = new Date(dateNumber);

  // Using en-GB gives us the date format  'YYYY-MM-DD'
  return newDate.toLocaleDateString('en-GB').split('/').reverse().join('-');
};
