import {
  removeDomainFromURL,
  isValidLinkedInHostname,
  sortStringsAlphabeticallyComparator,
  sortDatesNumericallyComparitor,
} from './strings';

describe('removeSuffixFromHostname', () => {
  test(`should return the correct result per the given input`, () => {
    const inputs = [
      'lva1-something.corp.linkedin.com',
      'lva1-something.prod.linkedin.com',
      'lva1-something.stg.linkedin.com',
    ];
    const expectedResults = ['lva1-something.corp', 'lva1-something.prod', 'lva1-something.stg'];
    const results = inputs.map((value) => {
      return removeDomainFromURL(value);
    });

    expect(results).toEqual(expectedResults);
  });
});

describe('sortStringsAlphabeticallyComparator', () => {
  test(`should return the correct result per the given input`, () => {
    const results1 = sortStringsAlphabeticallyComparator('zebra', 'apple');
    const results2 = sortStringsAlphabeticallyComparator('apple', 'zebra');

    expect(results1).toBe(1);
    expect(results2).toBe(-1);
  });
});

describe('sortDatesNumericallyComparitor', () => {
  test(`should return the correct result per the given input`, () => {
    const date1 = '2022-03-23 13:48:09';
    const date2 = '2022-04-19 09:50:46';
    const results1 = sortDatesNumericallyComparitor(date1, date2);
    const results2 = sortDatesNumericallyComparitor(date2, date1);

    expect(results1).toBeLessThan(0);
    expect(results2).toBeGreaterThan(0);
  });
});

describe('isValidLinkedInHostname', () => {
  test(`should return the correct result per the given input`, () => {
    const validInputs = [
      'lva1-something.corp.linkedin.com',
      'lva1-something.prod.linkedin.com',
      'lva1-something.stg.linkedin.com',
    ];
    const invalidValidInputs = [
      '',
      'lva1-something1.invalid.linkedin.co',
      'lva1-something2.invalid.linkedin',
      'lva1-something3.invalid',
    ];
    const result1 = validInputs.every((val) => isValidLinkedInHostname(val));
    const result2 = invalidValidInputs.every((val) => isValidLinkedInHostname(val) === false);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });
});
