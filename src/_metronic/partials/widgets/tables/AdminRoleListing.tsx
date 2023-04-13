import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { RoleEditModal } from '../../../../app/modules/apps/user-roles/role-edit/roleEditModal';
import { ViewRoleModal } from '../../../../app/modules/apps/user-roles/role-edit/viewRoleModal';
import { getRoleDetails } from '../../../../app/api/get/getRoleDetails';
import { deleteAdminRole } from '../../../../app/api/delete/deleteAdminRole';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import moment from 'moment';

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setTabIndex?: Function;
  data?: any;
  listing: [];
};

const AdminRoleListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setTabIndex,
  data,
  listing,
}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showRoles, setShowRoles] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [roleDetails, setRoleDetails] = useState<string[]>([]);
  const [listingId, setListingId] = useState<string>('');
  const [itemId, setItemId] = useState<string>();
  const [modalId, setModalId] = useState<string>('');

  const [isloading, setIsLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const RoleDetail = async (detailId: string) => {
    try {
      const roleId = await getRoleDetails(detailId);
      setRoleDetails(roleId.data);
      setShowCreateAppModal(true);
    } catch (error) {
      console.log('editToken Error', error);
    }
  };

  const DeleteConfirm = () => {
    itemId && deleteRole(itemId);
  };

  const deleteRole = async (deleteId: string) => {
    setIsLoading(true);
    try {
      await deleteAdminRole(deleteId);
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Admin role has been deleted successfully.');
    } catch (error) {
      setStateMsg(apiError);
      setBoolState('fail');
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const SuccessEdit = () => {
    setBoolState('success');
    setShowToast(true);
    setStateMsg('Admin Role has been edited successfully.');
  };

  const FailedEdit = async (error: string) => {
    setStateMsg(error);
    setBoolState('fail');
    setShowToast(true);
  };

  // Descending Order
  data.sort((item1: { createdAt: string }, item2: { createdAt: string }) => {
    const firstItem = item1.createdAt.toUpperCase();
    const secondItem = item2.createdAt.toUpperCase();
    return firstItem > secondItem ? -1 : 1;
  });

  return (
    <>
      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Role Listing</span>
            </h3>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-125px rounded-start'>Role</th>
                    <th className='min-w-150px'>Created Date</th>
                    <th className='min-w-125px text-end pe-3'>Actions</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {data?.length === 0 ? (
                    loading ? (
                      <tr className='table-loading'>
                        <UsersListLoading />
                      </tr>
                    ) : (
                      <tr className='table-noData'>
                        <h4 className='no-data mb-0 mt-4'>No data found</h4>
                      </tr>
                    )
                  ) : (
                    <>
                      {(loading || isloading) && (
                        <tr className='listing-loading'>
                          <UsersListLoading />
                        </tr>
                      )}
                      {data?.map((item: any, index: number) => (
                        <>
                          <tr key={index}>
                            <td className='ps-4'>
                              <div className='d-flex align-items-center'>
                                <div className='d-flex justify-content-start flex-column'>
                                  <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                    {item.role}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {moment(item.createdAt).format(
                                  'DD-MMM-YYYY, HH:mm:ss'
                                )}
                              </p>
                            </td>
                            <td>
                              <div className='d-flex justify-content-end flex-shrink-0'>
                                <p
                                  onClick={() => {
                                    setModalId(item._id);
                                    setShowRoles(true);
                                  }}
                                  className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/custom/eye001.svg'
                                    className='svg-icon-3'
                                  />
                                </p>
                                <p
                                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                  id='pkg_edit_modal'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  onClick={() => {
                                    setListingId(item._id);
                                    RoleDetail(item._id);
                                  }}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/art/art005.svg'
                                    className='svg-icon-3'
                                  />
                                </p>
                                <p
                                  onClick={() => {
                                    setItemId(item._id);
                                    setShowDeleteModal(true);
                                  }}
                                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen027.svg'
                                    className='svg-icon-3'
                                  />
                                </p>
                              </div>
                            </td>
                          </tr>

                          {modalId === item._id && (
                            <ViewRoleModal
                              show={showRoles}
                              data={item}
                              handleClose={() => setShowRoles(false)}
                            />
                          )}
                        </>
                      ))}
                    </>
                  )}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
        <Toast
          showToast={showToast}
          state={boolState}
          setShowToast={setShowToast}
          message={stateMsg}
        />
      </div>
      <RoleEditModal
        show={showCreateAppModal}
        data={roleDetails}
        listingId={listingId}
        listing={listing}
        setApiError={setApiError}
        setRefreshList={setRefreshList}
        SuccessFunction={SuccessEdit}
        FailFunction={FailedEdit}
        handleClose={() => setShowCreateAppModal(false)}
      />

      <ConfrimModal
        show={showDeleteModal}
        confirmProcess={DeleteConfirm}
        modalTitle={'delete'}
        handleClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export { AdminRoleListing };
