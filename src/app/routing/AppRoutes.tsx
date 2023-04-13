/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { ErrorsPage } from '../modules/errors/ErrorsPage';
import {
  Logout,
  AuthPage,
  AuthLogin,
  useAuth,
  AuthResetPassword,
} from '../modules/auth';
import { App } from '../App';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

const AppRoutes: FC = () => {
  const { currentUser, userDetails, isVerified, isPassUpdated } = useAuth();
  const Privileges = currentUser?.adminRole?.privileges.map((element) => {
    return element.toLowerCase().split(/\s+/)[0];
  });

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />

          {currentUser?.is_one_time && !isPassUpdated ? (
            <>
              <Route path='auth/*' element={<AuthResetPassword />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          ) : userDetails?.user.enabled_twofa && !isVerified ? (
            <>
              <Route path='auth/*' element={<AuthLogin />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          ) : currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route
                index
                element={
                  <Navigate
                    to={`/${
                      Privileges &&
                      (Privileges[0] === 'dashbord'
                        ? 'dashbord'
                        : `${Privileges[0]}-management/${Privileges[0]}`)
                    }`}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
