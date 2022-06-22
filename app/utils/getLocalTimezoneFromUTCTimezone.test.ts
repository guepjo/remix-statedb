import { getLocalTimezoneFromUTCTimezone } from './getLocalTimezoneFromUTCTimezone';

describe('getLocalTimezoneFromUTCTimezone', () => {
  test(`should return a UTC timezone date as a local timezone date`, () => {
    const date = getLocalTimezoneFromUTCTimezone('Wed, 11 May 2022 04:42:47 UTC');

    expect(date).toBe('2022-05-10 21:42:47');
  });
});
