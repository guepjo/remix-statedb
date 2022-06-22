import { getItemfromLocalStorage } from '.';

describe('getItemFromLocalStorage', () => {
  describe('if item does not exist in localStorage', () => {
    beforeAll(() => {
      window.localStorage.removeItem('TEST');
    });
    test('should return an empty string', () => {
      const result = getItemfromLocalStorage('TEST', '');

      expect(result).toStrictEqual('');
    });
    test('should return an empty object', () => {
      const result = getItemfromLocalStorage('TEST', {});

      expect(result).toStrictEqual({});
    });
    test('should return an empty array', () => {
      const result = getItemfromLocalStorage('TEST', []);

      expect(result).toStrictEqual([]);
    });
    test('should return false', () => {
      const result = getItemfromLocalStorage('TEST', false);

      expect(result).toStrictEqual(false);
    });
    test('should return 1', () => {
      const result = getItemfromLocalStorage('TEST', 1);

      expect(result).toStrictEqual(1);
    });
    test('should return undefined', () => {
      const result = getItemfromLocalStorage('TEST', undefined);

      expect(result).toBeUndefined();
    });
  });

  describe('if item does exist in localStorage', () => {
    beforeAll(() => {
      window.localStorage.removeItem('TEST');
      window.localStorage.setItem('STRING__TEST', JSON.stringify('hello world'));
      window.localStorage.setItem('OBJECT__TEST', JSON.stringify({ username: 'testUser' }));
      window.localStorage.setItem('ARRAY__TEST', JSON.stringify(['a', 'b']));
      window.localStorage.setItem('BOOLEAN__TEST', JSON.stringify(true));
      window.localStorage.setItem('NUMBER__TEST', JSON.stringify(1234));
    });
    afterAll(() => {
      window.localStorage.removeItem('STRING__TEST');
      window.localStorage.removeItem('OBJECT__TEST');
      window.localStorage.removeItem('ARRAY__TEST');
      window.localStorage.removeItem('BOOLEAN__TEST');
      window.localStorage.removeItem('NUMBER__TEST');
    });
    test('should return a string', () => {
      const result = getItemfromLocalStorage('STRING__TEST', undefined);

      expect(result).not.toBeUndefined();
      expect(typeof result).toBe('string');
      expect(result).toStrictEqual('hello world');
    });
    test('should return an object', () => {
      const result = getItemfromLocalStorage('OBJECT__TEST', undefined);

      expect(result).not.toBeUndefined();
      expect(typeof result).toBe('object');
      expect(result).toStrictEqual({ username: 'testUser' });
    });
    test('should return an array', () => {
      const result = getItemfromLocalStorage('ARRAY__TEST', undefined);

      expect(result).not.toBeUndefined();
      expect(typeof result).toStrictEqual('object');
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toStrictEqual(['a', 'b']);
    });
    test('should return true', () => {
      const result = getItemfromLocalStorage('BOOLEAN__TEST', undefined);

      expect(result).not.toBeUndefined();
      expect(typeof result).toBe('boolean');
      expect(result).toBeTruthy();
    });
    test('should return 1', () => {
      const result = getItemfromLocalStorage('NUMBER__TEST', undefined);

      expect(result).not.toBeUndefined();
      expect(typeof result).toBe('number');
      expect(result).toStrictEqual(1234);
    });
  });
});
