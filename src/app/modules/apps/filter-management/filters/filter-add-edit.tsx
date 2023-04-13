import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';
import { addFuelType, editFuelType } from '../../../../api/fuelType.ts/index';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { EngineTypeEnum, FiltersEnum } from '../../../../utils/enum/DropDowns';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { addEngineType, editEngineType } from '../../../../api/engineType.ts/index';
import { routes } from '../../../../utils/constants';
import { usePathName } from '../../../../hook/usePathName';
import { addFilters, editFilters } from '../../../../api/filters.ts';
import { Filter } from '../types';

type Props = {
  data: Filter | null;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
  filterDropDownData:any
};

const FilterAddEdit = ({
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

  const editItemSchema = Yup.object().shape({
    filterTypeId: Yup.number()
      .required('filterTypeId is required'),
      manufactureName: Yup.string()
      .required('field is required'),
      partNo: Yup.number()
      .min(1, 'field is required')
      .required('field is required'),
      price: Yup.number()
      .min(1, 'field is required')
      .required('field is required')
  });

  const initialValues: Filter= {
    filterTypeId: data?.filterTypeId ? data.filterTypeId : 0,
    manufactureName: data?.manufactureName,
    partNo: data?.partNo,
    price: data?.price,
    type:data?.type
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
  const dropdownData = [
    {
      label: FiltersEnum.OILFILTER,
      value: '1',

    },
    {
      label: FiltersEnum.FUELFILTER,
      value: '3',
    },
    {
      label: FiltersEnum.AIRFILTER,
      value: '4',
    },
    {
      label: FiltersEnum.SPARKFILTER,
      value: '5',
    }
  ]

  useEffect(() => {
    if(selectedValue && Object.keys(selectedValue).length > 0){
      formik.setFieldValue(
        'filterTypeId',
        +selectedValue.value
      );
    } else if(data?.filterTypeId){
      setSelectedValue({
        label:filterDropDownData.find((obj:any) => obj.value === data.filterTypeId)?.label!,
        value:data.filterTypeId.toString()
      })
      formik.setFieldValue(
        'filterTypeId',
        data?.filterTypeId.toString()
      );
    }

  },[selectedValue])
  const formik = useFormik<Filter>({
    initialValues,
    validationSchema: editItemSchema,
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

  // const eng = [
  //   EngineType.generator,
  //   EngineType.motorcycle,
  //   EngineType.vehilcle
  // ]

  const editPackagesHandler = async (formData: Filter) => {
    try {
      if (actionType === 'edit') {
        const updData = {
          id: data?.id,
          ...formData
        }
        await editFilters(updData);
      } else {
        await addFilters(
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
                Filter Type
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
                 
             
                {formik.touched.filterTypeId && formik.errors.filterTypeId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.filterTypeId}</div>
                  </div>
                )}
              </div>



            </div>
            <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
            manufactureName
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter manufactureName'
                  name='manufactureName'
                  value={formik.values.manufactureName}
                  onChange={(event) => {
                    
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.manufactureName && formik.errors.manufactureName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.manufactureName}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
            partNo
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='string'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter partNo'
                  name='partNo'
                  value={formik.values.partNo}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.partNo && formik.errors.partNo && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.partNo}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
            price
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='number'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter price'
                  name='price'
                  value={formik.values.price}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.price}</div>
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

export default FilterAddEdit;
