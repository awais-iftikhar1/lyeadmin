/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  UserDetails,
  IOptionValue,
} from '../roles-privileges-list/rolesPrivilegesModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  SelectView,
  OptionsOutsideSelectElement,
} from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { editAdminRole } from '../../../../api/put/editAdminRole';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';

type Props = {
  idData: IdDataProps;
  listing: [];
  heading: boolean;
  adminRoleId: string;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
};

interface IdDataProps {
  role: {
    privileges: [];
    role: string;
  };
}

const EditRoles = ({
  heading,
  idData,
  listing,
  adminRoleId,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const initialValues = {
    name: idData?.role?.role,
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

  const optionData = idData?.role?.privileges.map(
    (items: string, index: number) => {
      return {
        key: index,
        label: items,
        value: items,
      };
    }
  );

  const [data, setData] = useState<UserDetails>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [, setValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<[]>(idData?.role?.privileges);
  const [selectedValue, setSelectedValue] = useState<IOptionValue | any>(
    optionData
  );

  const formik = useFormik<UserDetails>({
    initialValues,
    validationSchema: addLotterySchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      resetForm();
      editRoles();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const editRoles = async () => {
    try {
      await editAdminRole(data.name, multiValue, adminRoleId);
      handleClose();
      SuccessFunction();
      formik.resetForm();
      setRefreshList(true);
    } catch (error) {
      setApiError(error);
      FailFunction(error);
    }
  };

  const listingData = listing.map((items: any, index: number) => {
    return {
      label: items?.privilege,
      value: items?.privilege,
      key: index,
    };
  });

  useEffect(() => {
    if (selectedValue !== undefined) {
      setMultiValue(
        selectedValue?.map((items: { value: any }) => {
          return items?.value;
        })
      );
    }
  }, [selectedValue]);

  useEffect(() => {
    formik.setFieldValue('privileges', multiValue);
  }, [multiValue]);

  const compareValue = selectedValue.map(function (item: { value: string }) {
    return item.value;
  });

  return (
    <div className='card mb-5 mb-xl-10 position-relative'>
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
                  selectedValue={idData?.role?.privileges}
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
              disabled={
                !loading &&
                JSON.stringify(compareValue.sort()) ===
                  JSON.stringify(idData?.role?.privileges.sort()) &&
                formik.values.name === idData?.role?.role
              }
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Edit Privileges'}
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

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={formik.submitForm}
        modalTitle='edit'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default EditRoles;
