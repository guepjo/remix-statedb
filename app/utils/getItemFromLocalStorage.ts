type DefaultValueTypes = Record<string, unknown> | [] | '' | string | boolean | number | undefined;

/*
 * Helper function that return an item from local storage or a default value
 */
export const getItemfromLocalStorage = (key: string, defaultValue: DefaultValueTypes) => {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return defaultValue;
  }

  return JSON.parse(value);
};
