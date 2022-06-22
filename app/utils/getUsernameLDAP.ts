import { LS_KEY } from './localStorageKey';

/**
 * @description
 * Get the LDAP username from the browser localStorage.
 * You can also view the value by opening the browser developer tools
 * and inspecting the localStorage data
 */
export const getUsernameLDAP = () => {
  const userData = window.localStorage.getItem(LS_KEY.APP__AUTH_STATE) || '';
  const parsedData = userData ? JSON.parse(userData) : '';

  return parsedData ? (parsedData.username as string) : undefined;
};
