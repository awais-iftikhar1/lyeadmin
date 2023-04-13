import { useEffect, useState } from 'react';
import { AddUser, IOptionValue } from './rolesPrivilegesModel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Toast from '../../../components/Toast';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { createAdmin } from '../../../../api/post/createAdmin';
import { getRoles } from '../../../../api/get/getRoles';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';

type Props = {
  dataList: [];
  setRefreshList: Function;
};

interface AdminRoleListProps {
  roles: [];
  filter: any;
}

interface RoleListProps {
  privileges: [];
}

const EmailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/);
const UserNameRegex = RegExp(/^\d*[a-zA-Z][a-zA-Z\d]*$/);

const AddAdminRole = ({ dataList, setRefreshList }: Props) => {
  const initialValues = {
    username: '',
    email: '',
    role: '',
  };

  const addLotterySchema = Yup.object().shape({
    username: Yup.string()
      .matches(UserNameRegex, {
        message: 'Please enter a valid username format',
      })
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('username is required'),
    email: Yup.string()
      .matches(EmailRegex, {
        message: 'Please enter a valid email format',
      })
      .min(2, 'Minimum 2 Characters')
      .required('Email is required'),
  });

  const [data, setData] = useState<AddUser>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue | null>(null);
  const [adminRoleList, setAdminRoleList] = useState<AdminRoleListProps>();
  const [roleList, setRolesList] = useState<RoleListProps | any>();
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);

  const formik = useFormik<AddUser>({
    initialValues,
    validationSchema: addLotterySchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const updatedData = Object.assign(data, values);
      setData(updatedData);
      addNewAdmin();
      resetForm();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const addNewAdmin = async () => {
    try {
      await createAdmin(value, data.email, data.username);
      setSelectedValue(null);
      setRolesList(null);
      formik.setFieldValue('email', '');
      formik.setFieldValue('username', '');

      setBoolState('success');
      setShowToast(true);
      setStateMsg('Admin has been added successfully.');

      setRefreshList(true);
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  const listingData = dataList.map((items: any, index: number) => {
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
    if (selectedValue !== null) {
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
      <div
        className='card-header border-0'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Add Admin</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6 position-relative'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Username</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
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
                  type='text'
                  className='form-control form-control-lg form-control-solid pe-12'
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
              disabled={loading || selectedValue === null || roleList?.length === 0 || formik.getFieldProps('username').value === '' || formik.getFieldProps('email').value === '' }
              onClick={() => setShowConfrimModal(true)}
            >
              {!loading && 'Add New Admin'}
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
        modalTitle='add admin'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default AddAdminRole;
