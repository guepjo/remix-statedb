import { isNumberLike } from './isNumberLike';

describe('isNumberLike', () => {
  it(`should return the correct value per the given input`, () => {
    const validValues = ['1', 1, '.1', 'Infinity'];
    const invalidValues = [[], undefined, null, {}, function test() {}, '', 'test'];
    const result1 = validValues.every((val) => isNumberLike(val));
    const result2 = invalidValues.every((val) => isNumberLike(val));

    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });
});
