import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { login } from '../core/_requests';
import { useAuth } from '../core/Auth';
import { KTSVG } from '../../../../_metronic/helpers';

const validateEmailUsername = /^[\w-]{3,16}$|^[^@]+@[^@]+$/;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(validateEmailUsername, {
      message: 'Please enter a valid username / email format',
    })
    // .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser, setUserDetails } = useAuth();
  const [showCurrent, setShowCurrent] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.email, values.password);
        navigate('/auth');
        sessionStorage.setItem('jwt', auth.token);
        saveAuth(auth.token);
        setCurrentUser(auth.user);
        setUserDetails(auth);
        formik.setFieldValue('email', '');
        formik.setFieldValue('password', '');
      } catch (error) {
        const typedError = error as any;
        setStatus(typedError?.response?.data?.message);
        saveAuth(undefined);
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In to Valantis</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded d-none'>
          <div className='text-info'>
            Use account <strong>admin</strong> and password{' '}
            <strong>password</strong> to continue.
          </div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Enter email/username '
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='text'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10 position-relative'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>
              Password
            </label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{ marginLeft: '5px' }}
            >
              Forgot Password ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type={!showCurrent ? 'password' : 'text'}
          placeholder='Password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        <p
          className={`input-icon cursor-pointer text-hover-primary top-0 ${
            formik.errors.password && 'is--invalid'
          }`}
          onClick={() => setShowCurrent(!showCurrent)}
        >
          {showCurrent ? (
            <KTSVG
              path='/media/icons/duotune/custom/eye002.svg'
              className='svg-icon-3'
            />
          ) : (
            <KTSVG
              path='/media/icons/duotune/custom/eye001.svg'
              className='svg-icon-3'
            />
          )}
        </p>
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Login</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>

      {/* end::Action */}
    </form>
  );
}
