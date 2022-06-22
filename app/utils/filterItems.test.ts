import { filterItemsByFilters, getArrayofUniqueElements, getArrayofUniqueObjects } from './filterItems';

describe('filterItemsByFilters', () => {
  test(`should return matched search results`, () => {
    const queryParamFilters = { name: 'bob', mass: '77' };
    const user1 = { name: 'anna', height: '152', mass: '55' };
    const user2 = { name: 'bob', height: '172', mass: '77' };
    const data = [user1, user2];

    const result = filterItemsByFilters(data, queryParamFilters);

    expect(result).toEqual([user2]);
  });
  test(`should return matched search results when using custom filter function`, () => {
    const urlQueryParamFilters = { status: 'open', cm_id: 123 };
    const ticket1 = { name: 'Ticket1', status: 'CREATED', cm_id: 123 };
    const ticket2 = { name: 'Ticket2', status: 'CLOSED', cm_id: 123 };
    const data = [ticket1, ticket2];

    const result = filterItemsByFilters(data, urlQueryParamFilters, (item, filter) => {
      const [filterKey, filterValue] = [filter[0], filter[1]];

      // @ts-expect-error - we are testing the custom filter function
      const isExactValueMatch = item[filterKey] === filterValue;

      if (isExactValueMatch) {
        return isExactValueMatch;
      } else if (filterKey === 'status') {
        // Demonstrating that our filter callback function can be used to write custom logic
        // for determining  if a given item is a match or not. By default, we use the filters
        // object that is passed in, but we can decide to overwrite that logic with this custom callback
        // Example use case:
        //    - frontend sends `status: 'open'` to the backend, but the data model for the object
        //      contains `status: 'CREATED'` inside.
        if (filterKey === 'status' && item[filterKey] === 'CREATED') return true;
      }

      return false;
    });

    expect(result).toEqual([ticket1]);
  });
});

describe('getArrayofUniqueElements', () => {
  test(`should return matched search results`, () => {
    const data1 = ['test'];
    const data2 = ['test', 2, '2', 'test'];
    const data3 = ['test', 2, '2', 'Test'];
    const data4 = ['test1', 'test2', 'test3', 'test1'];
    const data5 = [''];

    const result1 = getArrayofUniqueElements(data1);
    const result2 = getArrayofUniqueElements(data2);
    const result3 = getArrayofUniqueElements(data3);
    const result4 = getArrayofUniqueElements(data4);
    const result5 = getArrayofUniqueElements(data5);

    expect(result1.length).toEqual(1);
    expect(result2.length).toEqual(3);
    expect(result3.length).toEqual(4);
    expect(result4.length).toEqual(3);
    expect(result5.length).toEqual(1);
  });
});

describe('getArrayofUniqueObjects', () => {
  test(`should return matched search results`, () => {
    const data1 = [
      { id: 1, key: 'test1' },
      { id: 1, key: 'test2' },
    ];
    const data2 = [
      { id: 1, key: 'test1' },
      { id: 1, key: 'test1' },
    ];
    const data3 = [
      { id: 1, key: 'test1' },
      { id: 1, key: 'test2' },
      { id: 1, differentKey: 'test2' },
      { id: 1, key: 'test2' },
    ];
    const data4 = [
      { id: 1, key: 'test1' },
      { id: 1, key: 'test2' },
      { id: 1, differentKey: 'test2' },
      { id: 1, key: 'test2', differentKey: 'test2' },
    ];

    const result1 = getArrayofUniqueObjects(data1);
    const result2 = getArrayofUniqueObjects(data2);
    const result3 = getArrayofUniqueObjects(data3);
    const result4 = getArrayofUniqueObjects(data4);

    expect(result1.length).toEqual(2);
    expect(result2.length).toEqual(1);
    expect(result3.length).toEqual(3);
    expect(result4.length).toEqual(4);
  });
});
