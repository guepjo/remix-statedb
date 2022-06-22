/**
 * @description
 * Browser localStorage key names used across the app.
 */
export const LS_KEY = {
  /**
   * @description
   * Store LDAP user in here
   */
  APP__AUTH_STATE: 'APP__AUTH_STATE',
  /**
   * @description
   * Store the current theme of the app.
   * Currently this is disables, but we may re-enabled again
   * in the future once Ant Design theme support is better.
   */
  APP__THEME: 'APP__THEME',
  /**
   * @description
   * Store App meta data here from one of our API calls.
   * To get a better idea of what this is, do a code search in the codebase
   * for this string & see how this is used.
   */
  APP__DATA_FAULTS_META_DATA: 'APP__DATA_FAULTS_META_DATA',
} as const;

/**
 * @description
 * Clears all local storage keys for the deadpool app.
 * @example
 * clearAppLocalStorageData()
 */
export const clearAppLocalStorageData = () => {
  const APP_LOCAL_STORAGE_KEYS = ['APP__AUTH_STATE', 'APP__THEME', 'APP__DATA_FAULTS_META_DATA'];

  APP_LOCAL_STORAGE_KEYS.forEach((key) => {
    window.localStorage.removeItem(key);
  });
};
