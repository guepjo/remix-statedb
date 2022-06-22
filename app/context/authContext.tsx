import { Loader } from "~/components/Loader";
import { useGetCurrentUser } from "~/hooks";
import React from "react";
import { LDAPUser } from "~/types";
import { LS_KEY } from "~/utils";

type AuthContextProps = {
  currentUser: LDAPUser;
  login: () => void;
  logout: () => void;
};

const defaultAuthContextValue = {} as AuthContextProps;
const AuthContext = React.createContext<AuthContextProps>(
  defaultAuthContextValue
);

AuthContext.displayName = "AuthContext";

/**
 * @description
 * This provider is responsible for bootstrapping the app data.
 * If the user's authentication data is already in localStorage
 * then we simply retrieve the user's data, otherwise we fetch the data.
 *
 * Normally your provider components render the context provider with a value
 * but we postpone rendering any of the children until after we've determined
 * whether or not we have a user token and if we do, then we render a spinner
 * while we go retrieve that user's information.
 * More info: https://kentcdodds.com/blog/authentication-in-react-applications
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const localStorageUser = window.localStorage.getItem(LS_KEY.APP__AUTH_STATE);
  const authenticatedUser = localStorageUser
    ? JSON.parse(localStorageUser)
    : null;
  const {
    data: user,
    isFetching: isGetCurrentUserRequestInProgress,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser({
    enabled: !authenticatedUser,
  });
  const [currentUser, setCurrentUser] = React.useState(
    authenticatedUser || user
  );

  /**
   * @description
   * Logs the user out by removing them from the global AuthContext and removing their information
   * out of localstorage.
   */
  const logout = () => {
    window.localStorage.removeItem(LS_KEY.APP__AUTH_STATE);
    setCurrentUser(null);
  };
  const login = () => {
    refetchCurrentUser();
  };

  if (isGetCurrentUserRequestInProgress) {
    return <Loader />;
  }
  const values: AuthContextProps = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

/**
 * @description
 * A hook responsible for interacting with and retrieving data from AuthContext.
 * @example
 * const {user, login, logout} = useAuth();
 */
const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
};

export { AuthProvider, useAuth };
