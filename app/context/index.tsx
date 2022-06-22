import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { QueryClient, QueryClientProvider } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient';
import { createWebStoragePersister } from 'react-query/createWebStoragePersister';
import { LOCAL_STORAGE_KEY_DARK_MODE } from 'components/ThemeSwitch';
import { AuthProvider, useAuth } from './authContext';

/**
 * @description
 * See: https://react-query.tanstack.com/devtools
 */
const ReactQueryDevTools = React.lazy(() =>
  import('react-query/devtools').then((module) => ({
    default: module.ReactQueryDevtools,
  })),
);

/**
 * @description
 * In order to use dev tools in prod, we to import the devtools
 * component out of the `/development` path.
 * https://react-query.tanstack.com/devtools
 * https://twitter.com/tannerlinsley/status/1392857647037091849
 */
const ReactQueryDevToolsProduction = React.lazy(() =>
  import(`react-query/devtools/development`).then((module) => ({
    default: module.ReactQueryDevtools,
  })),
);

const TWO_MINUTES_IN_MILLISECONDS = 1000 * 60 * 2;
const FIVE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 5;
const queryClient = new QueryClient({
  /**
   * @description
   * This is the global config for react query. These settings
   * can be overwritten on a per query basis inside our hooks.
   */
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: TWO_MINUTES_IN_MILLISECONDS,
      cacheTime: TWO_MINUTES_IN_MILLISECONDS,
      refetchInterval: FIVE_MINUTES_IN_MILLISECONDS,
    },
  },
});
const localStoragePersister = createWebStoragePersister({ storage: window.localStorage });

/**
 * @description
 * Cache API data in browser's localStorage. The advantage of using localStorage is that
 * localStorage data is persisted across web browser shutdown and page refreshes, whereas
 * if we used the in memory storage approach, the data is only persisted for the duration
 * of the user session.
 *
 * From a user & percieved performance point of view, having the data in localStorage is better in most cases.
 * 1. When we use localStorage & when a user refreshs or reopens their browser:
 *    - react-query will temporarily display the stale data using the localStorage data so the user sees data on screen faster (instead of a blank screen) & simulataneously
 *      do a background refetch of the data. Once the data refetech is complete, react-query will update the stale data in the UI seemesly with the refreshest data from the server.
 *      Users typically don't notice & background refetch happened).
 * 2. When we don't use localStorage strategy (not using `persisQueryClient` method below) and user refreshes the page:
 *    - react-query will need to wait for the server data to come back first before rendering any data. This differences from the localStorage approach which displays temporarily
 *      displays stale data while the server data is being fetched.
 *
 * See:
 * - https://react-query.tanstack.com/plugins/createWebStoragePersistor#_top
 * - also `interacting-with-react-query-cache.md` file in docs folder.
 */
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

/** See link below on how to setup 'react-css-theme-switcher'
 *  https://jfelix.info/blog/dynamic-themes-in-ant-design-how-to-change-between-light-and-dark-theme
 */
const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};
const checkTheme = () => window.localStorage.getItem(LOCAL_STORAGE_KEY_DARK_MODE) || 'light';

// eslint-disable-next-line react/prop-types
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [showProductionDevtools, setShowDevtools] = React.useState(false);

  /**
   * @description
   * Allow user to see react-query-devtools in production my opening their web console
   * and executing: window.toggleRQDevtools()
   * https://twitter.com/tannerlinsley/status/1392857647037091849
   */
  React.useEffect(() => {
    window.toggleRQDevtools = () => {
      setShowDevtools((isOpen) => !isOpen);
    };
  }, []);

  return (
    <>
      <ConfigProvider locale={enUS}>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={checkTheme()}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Router>{children}</Router>
            </AuthProvider>
            {process.env.NODE_ENV === 'development' && (
              <React.Suspense fallback={null}>
                <ReactQueryDevTools position="bottom-right" />
              </React.Suspense>
            )}

            {/* To see the react-query devtools in production environment
                such as staging, corp or prod, open your browser javascript console & invoke this method below: window.toggleRQDevtools()
             */}
            {showProductionDevtools ? (
              <React.Suspense fallback={null}>
                <ReactQueryDevToolsProduction position="bottom-right" />
              </React.Suspense>
            ) : null}
          </QueryClientProvider>
        </ThemeSwitcherProvider>
      </ConfigProvider>
    </>
  );
};

export { AuthProvider, AppProviders, useAuth };
