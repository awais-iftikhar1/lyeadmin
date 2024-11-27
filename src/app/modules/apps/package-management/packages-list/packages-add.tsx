import { useState } from 'react';
import { PackagesDetails } from './packagesModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createPackages } from '../../../../api/post/createPackages';
import Toast from '../../../components/Toast';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';

type Props = {
  setRefreshList: Function;
  setTabIndex: Function;
  percentData: number;
  dailyPercentData: number;
};

const addPackageSchema = Yup.object().shape({
    packageName: Yup.string()
    .required('PackageName is required'),
    actualPackagePrice: Yup.number()
    .min(1, 'actualPackagePrice is required')
    .required('actualPackagePrice is required'),
    engines: Yup.number()
    .min(1, 'engines is required')
    .required('engines is required'),
    currency: Yup.string()
    .min(1, 'currency is required')
    .required('currency is required'),
    discount: Yup.number()
    .min(1, 'discount is required')
    .required('discount is required'),
    discountedPackagePrice: Yup.number()
    .min(1, 'discountedPackagePrice is required')
    .required('discountedPackagePrice is required'),
    discountExpiresDay: Yup.number()
    .min(1, 'discountExpiresDay is required')
    .required('discountExpiresDay is required'),
  // amount: Yup.number()
  //   .typeError('Enter a valid number')
  //   .test(
  //     'len',
  //     'Minimum 1 number',
  //     (val) => !(val === undefined) && val.toString().length >= 1
  //   )
  //   .integer()
  //   .positive()
  //   .required('Amount is required'),
});

const PackagesAdd = ({
  setRefreshList,
  setTabIndex,
  percentData,
  dailyPercentData,
}: Props) => {
  console.log(addPackageSchema);
  
  const initialValues = {
    packageName : '',
    actualPackagePrice:0,
    engines:0,
    currency:'',
    discount:0,
    discountedPackagePrice:0,
    discountExpiresDay:0
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [data, setData] = useState<PackagesDetails>(initialValues);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);

  const formik = useFormik<PackagesDetails>({
    initialValues,
    validationSchema: addPackageSchema,
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
  console.log(formik.errors);
  

  const gotoRewards = () => {
    setTabIndex(2);
  };
  // const execFunc = () => {
  //   debugger
  //   // dailyPercentData === 0 || percentData === 0 ? () => gotoRewards(): formik.submitForm
  //   console.log('hel');
  //   if( dailyPercentData === 0 || percentData === 0){
  //     gotoRewards()
  //   } else {
  //     formik.submitForm()
  //   }
    
  // }

  const submitPackages = async () => {
    try {
      debugger
      await createPackages(
        {...data}
      );
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your packages has been added successfully.');
      // formik.setFieldValue('amount', 0);
      // formik.setFieldValue('rewardAmount', 0);
      setRefreshList(true);
      setTabIndex(0);
    } catch (error) {
      console.log(error);
      
      // if (dailyPercentData === 0 || percentData === 0) {
      //   setShowConfrimModal(true);
      // } else {
        setBoolState('fail');
        setShowToast(true);
        setStateMsg(error as any);
      // }
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
          <h3 className='fw-bolder m-0'>Add New Package</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Package Name
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Package Name'
                  // maxLength={7}
                  name='packageName'
                  // value={formik.values.amount}
                  onChange={(event) => {
                    formik.handleChange(event);
                    // formik.setFieldValue(
                    //   'packageName',
                    //   event.target.value.replace(/[^0-9]/gi, '')
                    // );
                  }}
                  // {...formik.getFieldProps('amount')}
                />
                {formik.touched.packageName && formik.errors.packageName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.packageName}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                No of Engine
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Engine'
                  // maxLength={7}
                  name='engines'
                  // value={formik.values.amount}
                  onChange={(event) => {
                    formik.handleChange(event);
                    // formik.setFieldValue(
                    //   'packageName',
                    //   event.target.value.replace(/[^0-9]/gi, '')
                    // );
                  }}
                  // {...formik.getFieldProps('amount')}
                />
                {(formik.touched.engines && formik.errors.engines) && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.engines}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Currency </span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid form-control-readonly'
                  placeholder='Enter Currency'
                  name='currency'
                  // value={formik.values.rewardAmount}
                  onChange={(event) => {
                    formik.handleChange(event);
                    // formik.setFieldValue(
                    //   'currency',
                    //   event.target.value
                    // );
                  }}
                  // {...formik.getFieldProps('rewardAmount')}
                />
                <h3 className='percentage-icon mb-0'>Naira</h3>
                {formik.touched.currency && formik.errors.currency && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.currency}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Actual Package Price
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Amount'
                  // maxLength={7}
                  name='actualPackagePrice'
                  onChange={(event) => {
                    formik.handleChange(event);
                    // formik.setFieldValue(
                    //   'actualPackagePrice',
                    //   event.target.value.replace(/[^0-9]/gi, '')
                    // );
  
                  }}
                  // {...formik.getFieldProps('amount')}
                />
                {formik.touched.actualPackagePrice && formik.errors.actualPackagePrice && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.actualPackagePrice}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Discount</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter Reward Percentage'
                  name='discount'
                  onChange={(event) => {
                    formik.handleChange(event);
                    // formik.setFieldValue(
                    //   'discount',
                    //   event.target.value.replace(/[^0-9]/gi, '')
                    // );
  
                  }}
                  // value={percentData}
                  // {...formik.getFieldProps('rewardPercentage')}
                />
                <h3 className='percentage-icon mb-0'>%</h3>
                {(formik.touched.discount && formik.errors.discount) && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.discount}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Discounted Package Price</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid form-control-readonly'
                  placeholder='Enter Reward Amount'
                  name='discountedPackagePrice'
                  // value={formik.values.rewardAmount}
                  onChange={(event) => {
                    formik.handleChange(event);

                    // formik.setFieldValue(
                    //   'discountedPackagePrice',
                    //   event.target.value.replace(/[^0-9]/gi, '')
                    // );
                  }}
                  // {...formik.getFieldProps('rewardAmount')}
                />
                {formik.touched.discountedPackagePrice && formik.errors.discountedPackagePrice && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.discountedPackagePrice}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Discounted Expiry Day</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid form-control-readonly'
                  placeholder='Enter Reward Amount'
                  name='discountExpiresDay'
                  // value={formik.values.rewardAmount}
                  onChange={(event) => {
                    formik.handleChange(event);

                    // formik.setFieldValue(
                    //   'discountExpiresDay',
                    //   event.target.value.replace(/[^0-9]/gi, '')
                    // );
                  }}
                  // {...formik.getFieldProps('rewardAmount')}
                />
                {formik.touched.discountExpiresDay && formik.errors.discountExpiresDay && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.discountExpiresDay}
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
              // onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Add Packages'}
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
{/* 
      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={execFunc}
        modalTitle={`${
          dailyPercentData === 0 || percentData === 0
            ? 'Rewards'
            : 'add packages'
        }`}
        handleClose={() => setShowConfrimModal(false)}
      /> */}
    </div>
  );
};

export default PackagesAdd;
