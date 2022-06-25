import { type Moment } from 'moment';

/**
 * @description
 * Determines if a value is an empty.
 * This is different than checking if a value is truthy in javascript.
 *
 * Some example use cases of why we use it in the codebase:
 * - ...
 */
export const isEmptyValue = (value: string | number | string[] | [] | undefined | null | Moment[] | any): boolean => {
  // if empty Array
  if (Array.isArray(value) && value.length === 0) {
    return true;
  } else if (value === undefined || value === null || value === '') {
    return true;
  } else if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};
