/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Toast from '../../../../components/Toast';
import { IUpdatedLink } from '../SettingsModel';
import { getTelegramLink } from '../../../../../api/get/getTelegramLink';
import { updateTelegramLink } from '../../../../../api/post/updateTelegramLink';

const SetUpLink: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [currLink, setcurrLink] = useState<string>('');

  const validateUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const linkSchema = Yup.object().shape({
    newUrl: Yup.string()
      .matches(validateUrl, {
        message: 'Please enter a valid Link',
      })
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Link is required'),
  });

  const initialValues = {
    currentUrl: currLink,
    newUrl: '',
  };

  const [data, setData] = useState<IUpdatedLink>(initialValues);
  const formik = useFormik<IUpdatedLink>({
    initialValues,
    validationSchema: linkSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      updateLink(data.newUrl);
      resetForm();

      setTimeout(() => {
        getLink();
        setLoading(false);
      }, 1000);
    },
  });

  const updateLink = async (link: string) => {
    try {
      await updateTelegramLink(link);
      formik.setFieldValue('newUrl', '');
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your link has been updated successfully.');
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  const getLink = async () => {
    try {
      const link = await getTelegramLink();
      setcurrLink(link.data.value);
      formik.setFieldValue('currentUrl', link.data.value);
    } catch (error) {
      console.log('link-error', error);
    }
  };

  useEffect(() => {
    getLink();
  }, []);

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Telegram Link</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Current Telegram Link</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter New Link'
                  {...formik.getFieldProps('currentUrl')}
                />
                {formik.touched.currentUrl && formik.errors.currentUrl && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.currentUrl}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Update Telegram Link</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter New Link'
                  onFocus={() =>
                    formik.setFieldValue(
                      'newUrl',
                      formik.values.newUrl === ''
                        ? 'https://'
                        : formik.values.newUrl
                    )
                  }
                  {...formik.getFieldProps('newUrl')}
                />
                {formik.touched.newUrl && formik.errors.newUrl && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.newUrl}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              {!loading && 'Update'}
              {loading && (
                <span
                  className='indicator-progress'
                  style={{ display: 'block' }}
                >
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
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

export default SetUpLink;
