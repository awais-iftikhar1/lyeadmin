import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { IOptionValue } from '../../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { routes, status, vehicleMachineTypes, vehicleTypes } from '../../../../utils/constants/index';
import { usePathName } from '../../../../hook/usePathName';
import FileInput from '../../../../../_metronic/layout/components/FileInput';
import styled from 'styled-components';
import { addVehicle, editVehicle, viewColor, viewMake, viewModel, viewVehicleType, viewYear } from '../../../../api/Vehicle.ts';
import { addGenerator, editGenerator, viewFuelSystem, viewFuelUsed } from '../../../../api/Generator.ts';
import { OilData } from '../types';
import { addOilManufacture, addOilType, editOilManufacture, editOilType } from '../../../../api/Oil';
import { ROUTES } from '../../../../utils/enum/routesEnum';

type Props = {
  data: OilData | null | any;
  heading: boolean;
  setTabIndex: Function;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;

};

const OilTypeAddEdit = ({
  heading,
  data:oilManifactureData,
  setTabIndex,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const { route } = usePathName()
  const editPackageSchema = Yup.object().shape({
    name: Yup.string()
    .required('name is required'),
  });
  

  const initialValues = {
    name: oilManifactureData?.name,
  };
  const tabName = ROUTES.OilType

  const [loading, setLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState('edit')


  useEffect(() => {
    if (!oilManifactureData) {
      setActionType('add')
    }
  }, [oilManifactureData])

  const formik = useFormik<OilData>({
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



  const editPackagesHandler = async (formData: OilData) => {
    console.log(formData);
    try {
      debugger
      if (actionType === 'edit') {
        const updData = {
          id: oilManifactureData?.id,
          ...formData
        }
        await editOilType(updData);
      } else {
        await addOilType(
          { ...formData }
        );
      }
      handleClose();
      SuccessFunction();
      // formik.resetForm();
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
            <h3 className='fw-bolder m-0'>Edit  {tabName} </h3>
          </div>
        </div>
      )}

      <div id='kt_account_profile_details' className='collapse show'>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className={`card-body p-9 ${heading && 'border-top'}`}>
 
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Oil Type
              </label>

              <div className='col-lg-8 fv-row position-relative'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter Oil Type'
                  name='name'
                  value={formik.values.name}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.name}</div>
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
                {!loading && (oilManifactureData ? `Edit ${tabName}` : `Add ${tabName}`)}
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


const Flex = styled.div`
display:flex
`
export default OilTypeAddEdit;
