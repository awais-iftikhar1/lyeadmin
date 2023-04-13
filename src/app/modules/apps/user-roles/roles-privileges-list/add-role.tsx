/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { UserDetails, IOptionValue } from './rolesPrivilegesModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Toast from '../../../components/Toast';
import {
  SelectView,
  OptionsOutsideSelectElement,
} from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { createRole } from '../../../../api/post/createRole';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';

type Props = {
  dataList: [];
  setRefreshList: Function;
};

const AddRoles = ({ dataList, setRefreshList }: Props) => {
  const initialValues = {
    name: '',
    privileges: '',
  };

  const addLotterySchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('name is required'),
    privileges: Yup.array()
      .min(1, 'Select atleast one privilege')
      .required('privileges is required'),
  });

  const [data, setData] = useState<UserDetails>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [, setValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<[] | null>(null);
  const [selectedValue, setSelectedValue] = useState<IOptionValue | any | null>(
    null
  );
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);

  const formik = useFormik<UserDetails>({
    initialValues,
    validationSchema: addLotterySchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      resetForm();
      addRoles();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });
  

  const addRoles = async () => {
    try {
      await createRole(data.name, multiValue);
      setSelectedValue(null);
      formik.setFieldValue('name', '');

      setBoolState('success');
      setShowToast(true);
      setStateMsg('Admin Role has been added successfully.');

      setRefreshList(true);
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  const listingData = dataList.map((items: any, index: number) => {
    return {
      label: items?.privilege,
      value: items?.privilege,
      key: index,
    };
  });

  useEffect(() => {
    selectedValue !== null &&
      setMultiValue(
        selectedValue?.map((items: { value: string }) => {
          return items?.value;
        })
      );
  }, [selectedValue]);

  useEffect(() => {
    formik.setFieldValue('privileges', multiValue);
  }, [multiValue]);

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
          <h3 className='fw-bolder m-0'>Admin Privileges</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6 position-relative'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Role name</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
                  placeholder='Enter role name'
                  {...formik.getFieldProps('name')}

                />
                {formik.touched.name && formik.errors.name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Select Privileges
              </label>

              <div className='col-lg-8 fv-row'>
                <SelectView
                  multiSelect={true}
                  addClass={`dropdown--input card-title mb-0`}
                  data={listingData}
                  placeholder='Select Privileges...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                {formik.touched.privileges && formik.errors.privileges && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.privileges}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1'>
                <div className='d-flex flex-wrap'>
                  <OptionsOutsideSelectElement
                    onChange={setSelectedValue}
                    isMulti
                    value={selectedValue}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={loading || selectedValue === null || multiValue?.length === 0 || formik.getFieldProps('name').value === ''}
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Add Privileges'}
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
        modalTitle='add role'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default AddRoles;
