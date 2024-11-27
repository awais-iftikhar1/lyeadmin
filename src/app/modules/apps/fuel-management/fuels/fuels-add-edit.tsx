import { useEffect, useState } from 'react';
import { FuelType } from '../types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addFuelType, editFuelType } from '../../../../api/fuelType.ts';

type Props = {
  data: FuelType|null;
  heading: boolean;
  setTabIndex:Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
};

const FuelsAddEdit = ({
  heading,
  data,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const fuelSchema = Yup.object().shape({
    typeName: Yup.string()
    .required('typeName is required'),
  });

  const initialValues = {
    typeName : data?.typeName ? data?.typeName : '',
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [actionType,setActionType] = useState('edit')
  useEffect(() => {
    if(!data){
      setActionType('add')
    }
  },[data])
  const formik = useFormik<FuelType>({
    initialValues,
    validationSchema: fuelSchema,
    onSubmit: (values,{resetForm}) => {
      setLoading(true);
      const formData = Object.assign(initialValues, values);
      editFuelHandler(formData);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const editFuelHandler = async (formData: FuelType) => {
    try {
      if(actionType === 'edit'){
        const updData =  {
          id: data?.id,
          ...formData
        }
        await editFuelType(updData);
      } else {
        await addFuelType(
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
                Fuel Type
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter fuel type'
                  name='typeName'
                  value={formik.values.typeName}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.typeName && formik.errors.typeName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.typeName}</div>
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
              {!loading && (data ? 'Edit Fuel' : 'Add Fuel')}
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

export default FuelsAddEdit;
