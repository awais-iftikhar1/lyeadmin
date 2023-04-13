import { useEffect, useState } from 'react';
import { PackagesDetails } from '../packages-list/packagesModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { editPackages } from '../../../../api/put/editPackages';
import { createPackages } from '../../../../api/post/createPackages';

type Props = {
  packageData: PackagesDetails;
  heading: boolean;
  setTabIndex:Function;
  percentData: number;
  dailyPercentData: number | undefined;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  gotoRewards: Function;
  FailFunction: Function;
};

const PackagesEdit = ({
  heading,
  packageData,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const editPackageSchema = Yup.object().shape({
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
  });

  const initialValues = {
    packageName : packageData?.packageName,
    actualPackagePrice:packageData?.actualPackagePrice,
    engines:packageData?.engines,
    currency:packageData?.currency,
    discount:packageData?.discount,
    discountedPackagePrice:packageData?.discountedPackagePrice,
    discountExpiresDay:packageData?.discountExpiresDay
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [actionType,setActionType] = useState('edit')
  useEffect(() => {
    if(!packageData){
      setActionType('add')
    }
  },[packageData])
  const formik = useFormik<PackagesDetails>({
    initialValues,
    validationSchema: editPackageSchema,
    onSubmit: (values,{resetForm}) => {
      setLoading(true);
      const formData = Object.assign(initialValues, values);
      editPackagesHandler(formData);
      resetForm()
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const editPackagesHandler = async (formData: PackagesDetails) => {
    try {
      if(actionType === 'edit'){
        const data =  {
          id: packageData.id,
          ...formData
        }
        await editPackages(data);
      } else {
        await createPackages(
          {...formData}
        );
      }
      handleClose();
      SuccessFunction();
      formik.resetForm();
      setRefreshList(true);
      setTabIndex(0);
    } catch (error) {
      setApiError(error);
      FailFunction(error);
    }
  };



  return (
    <div className={`card mb-0 mb-xl-5 ${heading && 'mb-5'}`}>
      {heading && (
        <div
          className='card-header border-0'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Edit Package</h3>
          </div>
        </div>
      )}

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className={`card-body p-9 ${heading && 'border-top'}`}>
          <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Package Name
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Package Name'
                  name='packageName'
                  value={formik.values.packageName}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.packageName && formik.errors.packageName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.packageName}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>No of Engine</span>
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter Engine'
                  name='engines'
                  onChange={(event) => {      
                    formik.handleChange(event);            
                  }}
                  value={formik.values.engines}
                />
                  {formik.touched.engines && formik.errors.engines && (
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
                  value={formik.values.currency}
                  onChange={(event) => {
                    formik.handleChange(event);

                  }}
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
                  name='actualPackagePrice'
                  value={formik.values.actualPackagePrice}

                  onChange={(event) => {
                     formik.handleChange(event);

  
                  }}
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
                  value={formik.values.discount}

                  onChange={(event) => {
                    formik.handleChange(event);

  
                  }}
      
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
                  value={formik.values.discountedPackagePrice}

                  className='form-control form-control-lg form-control-solid form-control-readonly'
                  placeholder='Enter Reward Amount'
                  name='discountedPackagePrice'
                  onChange={(event) => {
                    formik.handleChange(event);

                  }}
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
                  value={formik.values.discountExpiresDay}

                  className='form-control form-control-lg form-control-solid form-control-readonly'
                  placeholder='Enter Reward Amount'
                  name='discountExpiresDay'
                  onChange={(event) => {
                    formik.handleChange(event);

                  }}
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
            >
              {!loading && (packageData ? 'Edit Packages' : 'Add Packages')}
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
    </div>
  );
};

export default PackagesEdit;
