import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';
import { addFuelType, editFuelType } from '../../../../api/fuelType.ts/index.js';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { EngineTypeEnum } from '../../../../utils/enum/DropDowns';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { EngineType } from '../types.js';
import { addEngineType, editEngineType } from '../../../../api/engineType.ts/index';
import { routes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';

type Props = {
  data: EngineType | null;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
};

const EngineAddEdit = ({
  heading,
  data,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const {route} = usePathName()
  const editPackageSchema = Yup.object().shape({
    typeName: Yup.string()
      .required('typeName is required'),
    noOfCylinders: Yup.number()
      .min(1, 'field is required')
      .required('field is required')
  });

  const initialValues = {
    typeName: data?.typeName ? data.typeName : '',
    noOfCylinders: data?.noOfCylinders
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
        'typeName',
        selectedValue.value
      );
    } else if(data?.typeName){
      setSelectedValue({
        label:data.typeName,
        value:data.typeName
      })
      formik.setFieldValue(
        'typeName',
        data?.typeName
      );
    }

  },[selectedValue])
  const formik = useFormik<EngineType>({
    initialValues,
    validationSchema: editPackageSchema,
    onSubmit: (values) => {
      console.log(values);      
      setLoading(true);
      const formData = Object.assign(initialValues, values);
      editPackagesHandler(formData);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  // const eng = [
  //   EngineType.generator,
  //   EngineType.motorcycle,
  //   EngineType.vehilcle
  // ]
  const engineTypeData = [
    {
      label: EngineTypeEnum.vehilcle,
      value: EngineTypeEnum.vehilcle,

    },
    {
      label: EngineTypeEnum.motorcycle,
      value: EngineTypeEnum.motorcycle,
    },
    {
      label: EngineTypeEnum.generator,
      value: EngineTypeEnum.generator,
    }
  ]
  // const [enginetype,setEngineType] = useState<engineType[]>([{
  //   generator:EngineType.generator,
  //   vehicle:EngineType.vehilcle,
  //   mototcycle:EngineType.motorcycle,
  // }])

  const editPackagesHandler = async (formData: EngineType) => {
    try {
      if (actionType === 'edit') {
        const updData = {
          id: data?.id,
          ...formData
        }
        await editEngineType(updData);
      } else {
        await addEngineType(
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
                Engine Type
              </label>

              <div className='col-lg-8 fv-row '>

              {/* <Field
                name="typeName"
              
                render={(props:any) => {                  
                 return (
                  <SelectView
                  
                  addClass={`dropdown--input card-title mb-0`}
                  data={engineTypeData}
                  formProps={props.form}
                  name={props.field.name}
                  placeholder='Select Type...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                 )
                }}
              /> */}

{/*                 
                <Field
                name="typeName"
                placeholder="Single Select"
                // onChange={(event) => {
                //   formik.handleChange(event);
                // }}
                as="select"

                component={(
                  <SelectView
                  
                  addClass={`dropdown--input card-title mb-0`}
                  data={engineTypeData}
                  name="typeName"
                  placeholder='Select Type...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                )}
                /> */}
             <SelectView
                  
                  addClass={`dropdown--input card-title mb-0`}
                  data={engineTypeData}
                  placeholder='Select Type...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                 
             
                {formik.touched.typeName && formik.errors.typeName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.typeName}</div>
                  </div>
                )}
              </div>



            </div>
            <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                no of cylinders
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='no of cylinders'
                  name='noOfCylinders'
                  value={formik.values.noOfCylinders}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.noOfCylinders && formik.errors.noOfCylinders && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.noOfCylinders}</div>
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

export default EngineAddEdit;
