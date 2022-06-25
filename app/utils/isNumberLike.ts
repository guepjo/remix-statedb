/**
 * @description
 * Determines if a value is a number like value
 * @example
 * isNumberLike('1') // true
 * isNumberLike(1) // true
 */
export const isNumberLike = (val: any) => !!(val || val === 0) && !Number.isNaN(Number(val.toString()));
