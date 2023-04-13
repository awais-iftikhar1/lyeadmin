import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { newPassword } from '../../../api/post/newPassword';
import { KTSVG } from '../../../../_metronic/helpers';
import { useAuth } from '../core/Auth';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        "Password and Confirm Password didn't match"
      ),
    }),
});

export function ChangePassword() {
  const { setIsPassUpdated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState<string>('');
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setHasErrors(undefined);
      try {
        await newPassword(values.password, values.confirmPassword);
        setHasErrors(false);
        setLoading(false);
        formik.setFieldValue('passwordCode', '');
        formik.setFieldValue('password', '');
        formik.setFieldValue('confirmPassword', '');
        setIsPassUpdated(true);
      } catch (error) {
        console.error(error);
        setResponseText(error as any);
        setHasErrors(true);
        setLoading(false);
        setIsPassUpdated(false);
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
          <h1 className='text-dark mb-3'>New Password</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>
            Enter new password to change your password.
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger text-center'>
            <div className='alert-text font-weight-bold'>{responseText}</div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded text-center'>
            <div className='text-info'>
              Password has been changed. You can now login with new password.
            </div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10 position-relative'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>
            Password
          </label>
          <input
            type={!showNewPass ? 'password' : 'text'}
            placeholder='Enter new password'
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
            onClick={() => setShowNewPass(!showNewPass)}
          >
            {showNewPass ? (
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

        {/* begin::Form group */}
        <div className='fv-row mb-10 position-relative'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>
            Confirm Password
          </label>
          <input
            type={!showConfirmPass ? 'password' : 'text'}
            placeholder='Confirm new password'
            autoComplete='off'
            {...formik.getFieldProps('confirmPassword')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid':
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword,
              },
              {
                'is-valid':
                  formik.touched.confirmPassword &&
                  !formik.errors.confirmPassword,
              }
            )}
          />
          <p
            className={`input-icon cursor-pointer text-hover-primary top-0 ${
              formik.errors.password && 'is--invalid'
            }`}
            onClick={() => setShowConfirmPass(!showConfirmPass)}
          >
            {showConfirmPass ? (
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
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.confirmPassword}</span>
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
        </div>
        {/* end::Form group */}
      </form>
    </>
  );
}
