import { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Registration } from './components/Registration';
import { ForgotPassword } from './components/ForgotPassword';
import { TwoFactorAuth } from './components/TwoFactorAuth';
import { ResetPassword } from './components/ResetPassword';
import { Login } from './components/Login';
import ValantisLogo from '../components/svg/ValantisLogo';
import { ChangePassword } from './components/ChangePassword';

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body');
    return () => {
      document.body.classList.remove('bg-body');
    };
  }, []);

  return (
    <div className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'>
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <p className='mb-12'>
          <ValantisLogo />
        </p>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
    </div>
  );
};

const AuthResetPassword = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route index element={<ChangePassword />} />
    </Route>
  </Routes>
);

export { AuthResetPassword };

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };

const AuthLogin = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route index element={<TwoFactorAuth />} />
    </Route>
  </Routes>
);

export { AuthLogin };
