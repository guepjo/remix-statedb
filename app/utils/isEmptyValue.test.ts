import { isEmptyValue } from './isEmptyValue';

describe('isEmptyValue', () => {
  it(`should determine if value is `, () => {
    const emptyValuesList = [{}, [], '', undefined, null];
    const results = emptyValuesList.every((value) => {
      return isEmptyValue(value);
    });

    expect(results).toEqual(true);
  });
});
