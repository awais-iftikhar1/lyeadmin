import { useState } from 'react';
import { PackagesRewardPercent } from './packagesModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { updateRewardPercent } from '../../../../api/post/updateRewardPercent';
import Toast from '../../../components/Toast';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';

type Props = {
  setPercentData: Function;
  setRefreshList: Function;
  percentData: number;
  dailyPercentData: number;
};

const updateRewardPercentSchema = Yup.object().shape({
  rewardPercentage: Yup.string()
    .min(1, 'Minimum 1 number')
    .required('Reward percentage is required'),
  dailyRewardPercentage: Yup.string()
    .min(1, 'Minimum 1 number')
    .required('Reward percentage is required'),
});

const PackageRewardPercentage = ({
  setPercentData,
  setRefreshList,
  percentData,
  dailyPercentData,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);

  const initialValues = {
    rewardPercentage: percentData.toString(),
    dailyRewardPercentage: dailyPercentData.toString(),
  };

  const [data, setData] = useState<PackagesRewardPercent>(initialValues);
  const formik = useFormik<PackagesRewardPercent>({
    initialValues,
    validationSchema: updateRewardPercentSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      submitPackages();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const submitPackages = async () => {
    try {
      await updateRewardPercent(
        parseFloat(data.rewardPercentage),
        parseFloat(data.dailyRewardPercentage)
      );
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Updated package reward percentage');
      setRefreshList(true);
      setPercentData(true);
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  return (
    <div className='card mb-5 mb-xl-10 position-relative'>
      <div
        className='card-header border-0'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Update Reward Percentage</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Daily Reward Percentage</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Daily Reward Percentage'
                  {...formik.getFieldProps('dailyRewardPercentage')}
                  onFocus={() =>
                    formik.setFieldValue('dailyRewardPercentage', '')
                  }
                />
                <h3 className='percentage-icon mb-0'>%</h3>
                {formik.touched.dailyRewardPercentage &&
                  formik.errors.dailyRewardPercentage && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        {formik.errors.dailyRewardPercentage}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Reward Percentage</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Reward Percentage'
                  {...formik.getFieldProps('rewardPercentage')}
                  onFocus={() => formik.setFieldValue('rewardPercentage', '')}
                />
                <h3 className='percentage-icon mb-0'>%</h3>
                {formik.touched.rewardPercentage &&
                  formik.errors.rewardPercentage && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        {formik.errors.rewardPercentage}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={loading}
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Updated Reward Percentage'}
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

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={formik.submitForm}
        modalTitle='updated reward percentage'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default PackageRewardPercentage;
