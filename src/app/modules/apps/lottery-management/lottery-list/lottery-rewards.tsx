import { useState } from 'react';
import { LotteryReward } from './lotteryModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { lotteryRewards } from '../../../../api/post/lotteryRewards';
import Toast from '../../../components/Toast';

type Props = {
  setRefreshList: Function;
};

const addLotterySchema = Yup.object().shape({
  lotteryId: Yup.string()
    .typeError('Enter a valid Id')
    .min(10, 'Minimum 10 characters')
    .required('lottery id is required'),
  lotteryType: Yup.string()
    .min(5, 'Minimum 5 characters')
    .required('lottery type is required'),
  lotteryAmount: Yup.number()
    .typeError('Enter a valid number')
    .test(
      'len',
      'Minimum 1 number',
      (val) => !(val === undefined) && val.toString().length >= 1
    )
    .integer()
    .positive()
    .required('Number is required'),
});

const initialValues = {
  lotteryId: '',
  lotteryType: '',
  lotteryAmount: 0,
};

const LotteryRewards = ({ setRefreshList }: Props) => {
  const [data, setData] = useState<LotteryReward>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');

  const formik = useFormik<LotteryReward>({
    initialValues,
    validationSchema: addLotterySchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      selectWinnerId(data.lotteryId, data.lotteryType, data.lotteryAmount);
      resetForm();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const selectWinnerId = async (id: string, type: string, amount: number) => {
    try {
      const addLotteryReward = await lotteryRewards(id, type, amount);
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your lottery reward has been added successfully');
      formik.setFieldValue('lotteryId', 0);
      formik.setFieldValue('lotteryType', 'first');
      formik.setFieldValue('lotteryAmount', 0);
      setRefreshList(true);
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
          <h3 className='fw-bolder m-0'>Add New Rewards</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Lottery ID
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Enter Lottery Id'
                  {...formik.getFieldProps('lotteryId')}
                />
                {formik.touched.lotteryId && formik.errors.lotteryId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.lotteryId}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Lottery Type
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Enter Lottery Type'
                  {...formik.getFieldProps('lotteryType')}
                />
                {formik.touched.lotteryType && formik.errors.lotteryType && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.lotteryType}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Lottery Add Rewards
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Enter Rewards'
                  {...formik.getFieldProps('lotteryAmount')}
                />
                {formik.touched.lotteryAmount && formik.errors.lotteryAmount && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.lotteryAmount}
                    </div>
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
              {!loading && 'Add Rewards'}
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

export default LotteryRewards;
