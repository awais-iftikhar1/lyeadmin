import React, { useEffect, useState } from 'react';
import { KTSVG } from '../../../../../../_metronic/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { EnableTwoFactor, disableTwoFactor } from '../SettingsModel';
import { setTwoFAStatus } from '../../../../../api/post/setTwoFAStatus';
import { get2FAcredentials } from '../../../../../api/get/get2FAcredentials';
import QRCode from 'react-qr-code';
import Toast from '../../../../components/Toast';

const passwordFormValidationSchema = Yup.object().shape({
  verificationCode: Yup.number()
    .test(
      'len',
      'Length should be 6 number',
      (val) => !(val === undefined) && val.toString().length > 5
    )
    .integer()
    .positive()
    .required('Code is required'),
});

interface TwoFactorAuthProps {
  addClass?: string;
  twoFa: any;
  setTwoFa: any;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  twoFa,
}: TwoFactorAuthProps) => {
  const [passwordUpdateData, setPasswordUpdateData] = useState<EnableTwoFactor>(
    disableTwoFactor
  );

  const [requesting] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [checked, setChecked] = useState<boolean>(twoFa);
  const [twoFaEnabled, setTwoFaEnabled] = useState<boolean>(twoFa);

  const [toTpUri, setToTpUri] = useState<string>('');
  const [, setTwoFaKey] = useState<string>('');

  const [showCurrent, setShowCurrent] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');

  const twoFACredentials = async () => {
    try {
      const twoFaCred = await get2FAcredentials();
      setToTpUri(twoFaCred?.data?.totp_uri);
      setTwoFaKey(twoFaCred?.data?.two_fa_key);
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  useEffect(() => {
    twoFACredentials();
  }, []);

  useEffect(() => {
    (async () => {
      twoFACredentials();
      setTwoFaEnabled(twoFa);
      setChecked(twoFa);
    })();
  }, [twoFa, twoFaEnabled]);

  const twoFAStatus = async (code: string) => {
    try {
      await setTwoFAStatus(code);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(
        twoFaEnabled
          ? '2FA has been disabled successfully'
          : '2FA has been enabled successfully'
      );
      formik2.setFieldValue('verificationCode', '');
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  const formik2 = useFormik<EnableTwoFactor>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading2(true);
      twoFAStatus(values.verificationCode);
      setTimeout((values: React.SetStateAction<EnableTwoFactor>) => {
        setPasswordUpdateData(values);
        setLoading2(false);
      }, 1000);
    },
  });

  const handleChange = () => {
    setChecked(twoFaEnabled ? !checked : !checked);
  };

  return (
    <>
      <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed p-6'>
        <KTSVG
          path='/media/icons/duotune/general/gen048.svg'
          className='svg-icon-2tx svg-icon-primary me-4'
        />
        <div
          className={`d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap ${
            checked && 'align-items-start'
          }`}
        >
          <div className='d-flex flex-column'>
            <div className='mb-3 mb-md-0 fw-bold'>
              <h4 className='text-gray-800 fw-bolder'>Secure Your Account</h4>
              <div className='fs-6 text-gray-600 pe-7'>
                Two-factor authentication adds an extra layer of security to
                your account. To log in, in addition you'll need to provide a 6
                digit code
              </div>
            </div>

            {checked && (
              <div
                id='kt_signin_password_edit'
                className={'flex-row-fluid verification-box text-center pt-10'}
              >
                <form
                  onSubmit={formik2.handleSubmit}
                  id='kt_signin_change_password'
                  className='form'
                  noValidate
                >
                  <h4 className='text-800 text-primary fs-2 fw-bolder me-1'>
                    Status: {twoFa ? 'Active' : 'Inactive'}
                  </h4>
                  <div className='fs-6 text-gray-600'>
                    Scan the QR code with the two factor authentication app on
                    your phone.
                  </div>
                  {checked && !twoFa && (
                    <div className='qr-code-wrap py-10'>
                      {requesting ? (
                        <div>Loading</div>
                      ) : (
                        <>
                          <QRCode
                            value={toTpUri}
                            size={125}
                            fgColor={'#282020'}
                          />
                        </>
                      )}
                    </div>
                  )}
                  <div className='row mb-1'>
                    <div className='col-12 mt-5'>
                      <div className='fv-row mb-0 position-relative'>
                        <label
                          htmlFor='currentpassword'
                          className='form-label fs-6 fw-bolder mb-3'
                        >
                          Verification Code
                        </label>
                        <input
                          type={!showCurrent ? 'password' : 'text'}
                          className='form-control form-control-lg form-select-solid text-center'
                          id='verificationCode'
                          {...formik2.getFieldProps('verificationCode')}
                        />
                        <p
                          className={`input-icon cursor-pointer text-hover-primary ${
                            formik2.errors.verificationCode && 'is--invalid'
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
                        {formik2.touched.verificationCode &&
                          formik2.errors.verificationCode && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                {formik2.errors.verificationCode}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className='form-text'>
                    Code must be 6 character and contain symbols and numbers
                  </div>

                  <div className='d-flex justify-content-center mt-10'>
                    <button
                      id='kt_password_submit'
                      type='submit'
                      className='btn btn-primary me-2 px-6'
                    >
                      {!loading2 && 'Update'}
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
                      onClick={() => {}}
                      id='kt_password_cancel'
                      type='button'
                      className='btn btn-color-gray-400 btn-active-light-primary px-6'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div
            id='kt_signin_password_button'
            className={`ms-auto twofa-check-box ${checked && 'pt-6'}`}
          >
            <div className='d-flex justify-content-end'>
              <div className='form-check form-check-solid form-switch'>
                <input
                  className='form-check-input w-45px h-30px align-self-center'
                  type='checkbox'
                  id='input-switch'
                  disabled={twoFaEnabled ? true : false}
                  checked={twoFaEnabled ? checked : false ? !checked : checked}
                  onChange={() => handleChange()}
                />
                <label
                  className='form-check-label'
                  htmlFor='githubswitch'
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast
        showToast={showToast}
        state={boolState}
        setShowToast={setShowToast}
        message={stateMsg}
      />
    </>
  );
};

export { TwoFactorAuth };
