import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  IUpdatePassword,
  IUpdateEmail,
  updatePassword,
  updateEmail,
} from '../SettingsModel';
import { changePassword } from '../../../../../api/post/changePassword';
import { TwoFactorAuth } from './TwoFactorAuth';
import { useAuth } from '../../../../auth';
import Toast from '../../../../components/Toast';
import { KTSVG } from '../../../../../../_metronic/helpers';

const emailFormValidationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  confirmPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const SignInMethod: React.FC = () => {
  const [emailUpdateData, setEmailUpdateData] = useState<IUpdateEmail>(
    updateEmail
  );
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(
    updatePassword
  );
  const { currentUser } = useAuth();

  const [, setShowEmailForm] = useState<boolean>(false);
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false);
  const [twoFa, setTwoFa] = useState<boolean | undefined>(
    currentUser?.enabled_twofa
  );

  const [, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const changePass = async (
    oldPass: string,
    NewPass: string,
    ConfrimPass: string
  ) => {
    try {
      await changePassword(oldPass, NewPass, ConfrimPass);
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your password has been changed successfully.');
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  useFormik<IUpdateEmail>({
    initialValues: {
      ...emailUpdateData,
    },
    validationSchema: emailFormValidationSchema,
    onSubmit: (values) => {
      setLoading1(true);
      setTimeout((values: React.SetStateAction<IUpdateEmail>) => {
        setEmailUpdateData(values);
        setLoading1(false);
        setShowEmailForm(false);
      }, 1000);
    },
  });

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading2(true);
      changePass(
        values.currentPassword,
        values.newPassword,
        values.passwordConfirmation
      );
      setTimeout((values: React.SetStateAction<IUpdatePassword>) => {
        setPasswordUpdateData(values);
        setLoading2(false);
        setPasswordForm(false);
      }, 1000);
    },
  });

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Sign-in Method</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div
              id='kt_signin_password'
              className={' ' + (showPasswordForm && 'd-none')}
            >
              <div className='fs-6 fw-bolder mb-1'>Password</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0 position-relative'>
                      <label
                        htmlFor='currentpassword'
                        className='form-label fs-6 fw-bolder mb-3'
                      >
                        Current Password
                      </label>
                      <input
                        type={!showCurrent ? 'password' : 'text'}
                        className='form-control form-control-lg form-control-solid pe-10'
                        id='currentpassword'
                        {...formik2.getFieldProps('currentPassword')}
                      />
                      <p
                        className={`input-icon cursor-pointer text-hover-primary ${
                          formik2.errors.currentPassword && 'is--invalid'
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
                      {formik2.touched.currentPassword &&
                        formik2.errors.currentPassword && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              {formik2.errors.currentPassword}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0 position-relative'>
                      <label
                        htmlFor='newpassword'
                        className='form-label fs-6 fw-bolder mb-3'
                      >
                        New Password
                      </label>
                      <input
                        type={!showNewPass ? 'password' : 'text'}
                        className='form-control form-control-lg form-control-solid pe-10'
                        id='newpassword'
                        {...formik2.getFieldProps('newPassword')}
                      />
                      <p
                        className={`input-icon cursor-pointer text-hover-primary ${
                          formik2.errors.newPassword && 'is--invalid'
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
                      {formik2.touched.newPassword &&
                        formik2.errors.newPassword && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              {formik2.errors.newPassword}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0 position-relative'>
                      <label
                        htmlFor='confirmpassword'
                        className='form-label fs-6 fw-bolder mb-3'
                      >
                        Confirm New Password
                      </label>
                      <input
                        type={!showConfirmPass ? 'password' : 'text'}
                        className='form-control form-control-lg form-control-solid pe-10'
                        id='confirmpassword'
                        {...formik2.getFieldProps('passwordConfirmation')}
                      />
                      <p
                        className={`input-icon cursor-pointer text-hover-primary ${
                          formik2.errors.passwordConfirmation && 'is--invalid'
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
                      {formik2.touched.passwordConfirmation &&
                        formik2.errors.passwordConfirmation && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              {formik2.errors.passwordConfirmation}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Password must be at least 8 character and contain symbols
                </div>

                <div className='d-flex justify-content-end'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Change Password'}
                    {loading2 && (
                      <span
                        className='indicator-progress'
                        style={{ display: 'block' }}
                      >
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm(false);
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true);
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Reset Password
              </button>
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

          <TwoFactorAuth twoFa={twoFa} setTwoFa={setTwoFa} />
        </div>
      </div>
      <Toast
        showToast={showToast}
        state={boolState}
        setShowToast={setShowToast}
        message={stateMsg}
      />
    </div>
  );
};

export { SignInMethod };
