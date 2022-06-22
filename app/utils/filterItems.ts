import _ from "lodash";

/**
 * @description
 * Given an array of objects, filter out items that match the given search criteria
 * @param keys - List of keys that will be searched
 *
 * @example
 * const queryParamFilters = {name: 'bob',mass: '77'}
 * const data = [{name: 'bob', height: '172', mass: '77'},]
 * filterItems(data, queryParamFilters);
 *
 * const queryParamFilters = {name: 'bob',mass: '77'}
 * const data = [{name: 'bob', height: '172', mass: '77'},]
 * filterItems(data, queryParamFilters);
 *
 * // Callback example
 * const queryParamFilters = {name: 'bob',mass: '77'}
 * const data = [{name: 'bob', height: '172', mass: '77'},] // used for exact matches
 *
 * filterItems(data, queryParamFilters, (item, filter) => {
 *   // callback function is useful when you want more custom filterering rule
 *   const [filterKey, filterValue] = [filter[0], filter[1]];
 *
 *    if(filterKey === 'something' && item[filterKey] === 'something') return true
 *   //return item[filterKey] === 'whatever_condition_i_want'
 * });
 */
export const filterItemsByFilters = <T>(
  data: T[],
  filters: Record<string, any>,
  /**
   * @description
   * A custom filtering function to apply on each individual item
   * The filter function returns a boolean determining if the filter function was
   * met or not. Items that meet the filter criteria of the callback will ultimately
   * get returned back in the results array.
   *
   */
  filterFn?: (item: T, searchFilter: [string, any]) => boolean
): T[] => {
  if (Object.keys(filters).length === 0) return data;
  const filterLength = Object.keys(filters).length;

  const matches = data.filter((item) => {
    const searchFilters = Object.entries(filters); // [[FILTER_NAME, FILTER_VALUE]]
    const matchedPropertiesCount = searchFilters.filter((filter) => {
      if (filterFn) {
        return filterFn(item, filter);
      }

      // @ts-expect-error intentional casting for typescript ; TODO: figure out cleaner to resolve
      return filter[1] === item[filter[0]];
    }).length;
    const isMatchingItem = matchedPropertiesCount === filterLength;

    return isMatchingItem;
  });

  return matches;
};

export const getArrayofUniqueElements = <T>(array: T[] | []): T[] | [] => {
  return [...new Set(array)];
};

/**
 * @description
 * Removes any duplicated objects from an array and returns an array of Unique Objects
 *
 * Reference: https://iqcode.com/code/javascript/lodash-unique-array
 */
export const getArrayofUniqueObjects = <T>(arrayOfObjects: T[]): T[] => {
  const uniqueArrayofObjects = _.uniqWith(arrayOfObjects, _.isEqual);

  return uniqueArrayofObjects;
};
