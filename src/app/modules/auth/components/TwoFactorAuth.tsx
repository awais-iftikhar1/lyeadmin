import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { verifyTwoFA } from '../../../api/post/verifyTwoFA';
import { useAuth } from '../core/Auth';

const authCodeSchema = Yup.object().shape({
  authCode: Yup.string()
    .min(3, 'Minimum 6 characters')
    .max(6, 'Maximum 6 characters')
    .required('Code is required'),
});

const initialValues = {
  authCode: '',
};

export function TwoFactorAuth() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const { saveAuth, setIsVerified } = useAuth();

  const setVeifyTwoFA = async (code: string) => {
    try {
      await verifyTwoFA(code);
      setIsVerified(true);
    } catch (error) {
      setIsVerified(false);
      alert('Error');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: authCodeSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      try {
        setVeifyTwoFA(values.authCode);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('Code is incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Two Factor Authentication ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>
            Enter your Auth Code to continue.
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try
              again.
            </div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>
            Authentication Code
          </label>
          <input
            type='password'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('authCode')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.authCode && formik.errors.authCode,
              },
              {
                'is-valid': formik.touched.authCode && !formik.errors.authCode,
              }
            )}
          />
          {formik.touched.authCode && formik.errors.authCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.authCode}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Submit</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  );
}
