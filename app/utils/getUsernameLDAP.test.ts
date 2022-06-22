import { getUsernameLDAP } from './getUsernameLDAP';
import { LS_KEY } from './localStorageKey';

describe('getUsernameLDAP', () => {
  test(`should return username string if there is a value in local storage`, () => {
    window.localStorage.setItem(LS_KEY.APP__AUTH_STATE, JSON.stringify({ username: 'test_username' }));
    const expectedResult = 'test_username';

    expect(getUsernameLDAP()).toEqual(expectedResult);
    window.localStorage.clear();
  });
});
