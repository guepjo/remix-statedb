/**
 * @description
 * Grabs the CSRF token from the browser's cookie storage.
 */
export const getCsrfToken = (): string => {
  const token = document.cookie.match(/(^| )deadpool-ui-fe-csrf-token=([^;]+)/);

  return (token && token[2]) || '';
};
