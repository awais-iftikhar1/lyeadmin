import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {  FormikProvider, useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { ModelType } from '../types';
import { routes, vehicleTypes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';
import { addModel, editModel } from '../../../../api/Model.ts';
import { getMake } from '../../../../api/Make.ts';

type Props = {
  data: ModelType | null;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
  filterDropDownData:any,
  defaultvehicleType:string

};

const ModelAddEdit = ({
  heading,
  data,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
  filterDropDownData,
  defaultvehicleType
}: Props) => {
  const {route} = usePathName()
  const editPackageSchema = Yup.object().shape({
 
    makeId: Yup.string()
    .required('MakeName is required'),
    modelName: Yup.string()
      .required('modelName is required')
  });

  const initialValues = {
    makeId: data?.makeId,
    modelName: data?.modelName,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState('edit')
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue>();

  console.log(defaultvehicleType);
  
  const [vehicleType, setVehicleType] = useState<string>(vehicleTypes[0].value);
  const [selectedVehicleValue, setSelectedVehicleValue] = useState<IOptionValue>();

  const [makeList,setMakeList] = useState([])

  useEffect(() => {
    if (!data) {
      setActionType('add')
    }
  }, [data])

  console.log(vehicleType);
  
  useEffect(() => {
    (async() => {
      let vehicle = actionType === 'add' ? vehicleType : defaultvehicleType
      const data = await getMake(vehicle,0, 0);
      console.log(data);
      const mappedData = data.data.map((res:any) => {
        return {
          label:res.makeName,
          value:res.id
        }
      })
      setMakeList(mappedData);
       
    })()
  },[vehicleType])

  console.log(makeList);
  
  useEffect(()=>{
    if(actionType === 'edit'){
      setSelectedVehicleValue({
        label:defaultvehicleType,
        value:defaultvehicleType
      })
    } else {
      setSelectedVehicleValue({
        label:vehicleType,
        value:vehicleType
      })
    }
     
  },[])
  useEffect(() => {

    if(selectedValue && Object.keys(selectedValue).length > 0){
      formik.setFieldValue(
        'makeId',
        selectedValue.value
      );
    } 
    else if(data?.makeId){
      debugger
      setSelectedValue({
        label:filterDropDownData.find((obj:any) => obj.value === data.makeId)?.label!,
        value:data.makeId
      })
      formik.setFieldValue(
        'makeId',
        data?.makeId
      );
    }

  },[selectedValue])
  const formik = useFormik<ModelType>({
    initialValues,
    validationSchema: editPackageSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);      
      setLoading(true);
      const formData = Object.assign(initialValues, values);
      editPackagesHandler(formData);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });



  const editPackagesHandler = async (formData: ModelType) => {
    try {
      debugger
      if (actionType === 'edit') {
        const updData = {
          id: data?.id,
          ...formData
        }
        await editModel(updData);
      } else {
        await addModel(
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
                Machine Type
              </label>

              <div className='col-lg-8 fv-row '>
             <SelectView
                  addClass={`dropdown--input card-title mb-0`}
                  data={vehicleTypes}
                  placeholder='Select Type...'
                  valueCallback={setVehicleType}
                  optionCallback={setSelectedVehicleValue}
                  value={selectedVehicleValue}
                />
                 
             
                
              </div>



            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Make Name
              </label>

              <div className='col-lg-8 fv-row '>
             <SelectView
                  
                  addClass={`dropdown--input card-title mb-0`}
                  data={makeList}
                  placeholder='Select Type...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                 
             
                {formik.touched.makeId && formik.errors.makeId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.makeId}</div>
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
                  placeholder='Enter modelName'
                  name='modelName'
                  value={formik.values.modelName}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.modelName && formik.errors.modelName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.modelName}</div>
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

export default ModelAddEdit;
