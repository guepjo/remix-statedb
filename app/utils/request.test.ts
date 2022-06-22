import { request } from './request';

/**
 * NOTE:
 * The reason these API call works in the test environment is because we have MSW (`msw` package)
 * setup & configured in `src/setupTests.ts` file.
 * The `msw` package is a mock server for the API calls.
 * @notes
 * - Docs: https://mswjs.io/docs/api/setup-server
 * - Also see __mocks__ folder
 */

describe('request', () => {
  test(`it should return JSON data if API call is successfull`, async () => {
    const data = await request('/handler/faults');

    expect(data).toBeDefined();
  });

  test(`it should support POST requests`, async () => {
    const data = await request('/handler/faults', {
      method: 'POST',
      body: {},
    });

    expect(data).toBeDefined();
  });

  test(`it should support PUT requests`, async () => {
    const data = await request('/handler/faults/1', {
      method: 'PUT',
      body: {},
    });

    expect(data).toBeDefined();
  });
});
