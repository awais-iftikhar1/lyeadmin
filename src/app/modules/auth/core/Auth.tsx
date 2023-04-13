/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import { AuthModel, UserModel, UserDetails } from './_models';
import * as authHelper from './AuthHelpers';
import { WithChildren } from '../../../../_metronic/helpers';
import { getLoginDetails } from '../../../api/get/getLoginDetails';

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  userDetails: UserDetails | undefined;
  isVerified: boolean | undefined;
  isPassUpdated: boolean | undefined;
  setIsVerified: Function;
  setIsPassUpdated: Function;
  setUserDetails: Dispatch<SetStateAction<UserDetails | undefined>>;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  userDetails: undefined,
  isVerified: undefined,
  isPassUpdated: undefined,
  setIsPassUpdated: () => {},
  setIsVerified: () => {},
  setUserDetails: () => {},
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [isVerified, setIsVerified] = useState<boolean | undefined>();
  const [isPassUpdated, setIsPassUpdated] = useState<boolean | undefined>();
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser,
        userDetails,
        setUserDetails,
        setCurrentUser,
        isPassUpdated,
        setIsPassUpdated,
        isVerified,
        setIsVerified,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { user } = await getLoginDetails();
          if (user && !user.is_blocked) {
            setCurrentUser(user);
          } else {
            logout();
          }
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth) {
      requestUser();
    } else {
      logout();
      setShowSplashScreen(false);
    }
  }, [auth]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
