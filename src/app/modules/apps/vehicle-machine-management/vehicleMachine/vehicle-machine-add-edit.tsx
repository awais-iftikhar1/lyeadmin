import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {  FormikProvider, useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { VehicleType } from '../types';
import { routes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';
import { addVehicleMachineType, editVehicleMachineType } from '../../../../api/vehicleMachineType.ts/index';

type Props = {
  data: VehicleType | null;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
  filterDropDownData:any

};

const VehicleMachineAddEdit = ({
  heading,
  data,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
  filterDropDownData
}: Props) => {
  const {route} = usePathName()
  const editPackageSchema = Yup.object().shape({
    type: Yup.string()
      .required('type is required'),
    vehicleType: Yup.string()
      .required('vehicleType is required')
  });

  const initialValues = {
    type: data?.type ? data.type : '',
    vehicleType: data?.vehicleType,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState('edit')
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue>();
  useEffect(() => {
    if (!data) {
      setActionType('add')
    }
  }, [data])

  useEffect(() => {
    if(selectedValue && Object.keys(selectedValue).length > 0){
      formik.setFieldValue(
        'type',
        selectedValue.value
      );
    } else if(data?.type){
      debugger
      setSelectedValue({
        label:filterDropDownData.find((obj:any) => obj.value === data.type)?.label!,
        value:data.type
      })
      formik.setFieldValue(
        'type',
        data?.type
      );
    }

  },[selectedValue])
  const formik = useFormik<VehicleType>({
    initialValues,
    validationSchema: editPackageSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);      
      setLoading(true);
      const formData = Object.assign(initialValues, values);
      editPackagesHandler(formData);
      resetForm()
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });



  const editPackagesHandler = async (formData: VehicleType) => {
    try {
      debugger
      if (actionType === 'edit') {
        const updData = {
          id: data?.id,
          ...formData
        }
        await editVehicleMachineType(updData);
      } else {
        await addVehicleMachineType(
          { ...formData }
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
            <h3 className='fw-bolder m-0'>Edit  {routes[route as keyof typeof routes] } </h3>
          </div>
        </div>
      )}

      <div id='kt_account_profile_details' className='collapse show'>
        <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className={`card-body p-9 ${heading && 'border-top'}`}>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Type
              </label>

              <div className='col-lg-8 fv-row '>
             <SelectView
                  
                  addClass={`dropdown--input card-title mb-0`}
                  data={filterDropDownData}
                  placeholder='Select Type...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                 
             
                {formik.touched.type && formik.errors.type && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.type}</div>
                  </div>
                )}
              </div>



            </div>
            <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Vehicle Type
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='string'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Vehicle type'
                  name='vehicleType'
                  value={formik.values.vehicleType}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.vehicleType && formik.errors.vehicleType && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.vehicleType}</div>
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
              {!loading && (data ? `Edit ${routes[route as keyof typeof routes] }` : `Add ${routes[route as keyof typeof routes]}`)}
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
        </form >
        </FormikProvider>
      </div>
    </div>
  );
};

export default VehicleMachineAddEdit;
