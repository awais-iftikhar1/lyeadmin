/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  AddUser,
  IOptionValue,
} from '../roles-privileges-list/rolesPrivilegesModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { editAdmin } from '../../../../api/put/editAdmin';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';
import { getRoles } from '../../../../api/get/getRoles';

type Props = {
  idData: IdDataProps;
  listing: [];
  adminId: string;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  FailFunction: Function;
};

interface IdDataProps {
  adminFound: {
    username: string;
    email: string;
    role: string;
  };
}

interface AdminRoleListProps {
  roles: [];
  filter: any;
}

interface RoleListProps {
  privileges: [];
}

const EditAdmin = ({
  idData,
  listing,
  adminId,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  FailFunction,
}: Props) => {
  const initialValues = {
    username: idData?.adminFound?.username,
    email: idData?.adminFound?.email,
    role: '',
  };

  const addLotterySchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('username is required'),
    email: Yup.string()
      .min(2, 'Minimum 2 Characters')
      .required('Email is required'),
  });

  const [data, setData] = useState<AddUser>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>(idData.adminFound.role);
  const [selectedValue, setSelectedValue] = useState<IOptionValue | any>({
    label: idData?.adminFound?.role,
    value: idData?.adminFound?.role,
  });
  const [adminRoleList, setAdminRoleList] = useState<AdminRoleListProps>();
  const [roleList, setRolesList] = useState<RoleListProps | any>();

  const formik = useFormik<AddUser>({
    initialValues,
    validationSchema: addLotterySchema,
    onSubmit: (values) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      editPrivileges();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const editPrivileges = async () => {
    try {
      await editAdmin(value, adminId);
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
      label: items?.role,
      value: items?.role,
      key: index,
    };
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getRoles();
        setAdminRoleList(data?.data?.roles);
      } catch (error) {
        console.error('Error', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedValue?.value !== undefined) {
      setRolesList(
        adminRoleList?.filter(
          (filterItem: { role: string }) =>
            filterItem.role === selectedValue?.value && filterItem
        )
      );
    }
  }, [adminRoleList, selectedValue]);

  return (
    <div className='card mb-5 mb-xl-10 position-relative'>
      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6 position-relative'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Username</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter username'
                  {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      {formik.errors.username}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6 position-relative'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  readOnly
                  type='text'
                  className='form-control form-control-lg form-control-solid form-control-readonly pe-12'
                  placeholder='Enter email'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Select Role
              </label>

              <div className='col-lg-8 fv-row'>
                <SelectView
                  addClass={`dropdown--input card-title mb-0`}
                  data={listingData}
                  placeholder='Select Role...'
                  valueCallback={setValue}
                  optionCallback={setSelectedValue}
                  value={selectedValue}
                />
                {formik.touched.role && formik.errors.role && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.role}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1'>
                <div className='d-flex flex-wrap'>
                  {roleList &&
                    roleList[0]?.privileges.map(
                      (items: string, index: number) => (
                        <div
                          key={index}
                          className='position-relative border border-gray-300 border-dashed rounded min-w-150px py-4 px-4 me-6 mb-3'
                        >
                          <div className='fw-bold fs-6 text-gray-400 text-center'>
                            {items}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={!loading && value === idData.adminFound.role}
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Edit Admin'}
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

export default EditAdmin;
