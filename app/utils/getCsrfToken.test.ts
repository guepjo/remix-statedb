import { getCsrfToken } from './getCsrfToken';

describe('getCsrfToken', () => {
  it(`should return csrf token if value exists in cookies`, () => {
    document.cookie = 'deadpool-ui-fe-csrf-token=test_csrf_token';
    const expectedResult = 'test_csrf_token';

    expect(getCsrfToken()).toEqual(expectedResult);
    document.cookie = '';
  });
});
