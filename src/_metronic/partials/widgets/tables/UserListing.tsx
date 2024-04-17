import React, { useState } from 'react';
import { UsersListSearchComponent } from '../../../../app/modules/apps/user-management/users-list/components/header/UsersListSearchComponent';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { UserDetailModal } from '../../../../app/modules/apps/user-management/users-list/components/modal/UserDetailModal';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { userBlockUnblock } from '../../../../app/api/put/blockUnblockUser';
import { getUserDetails } from '../../../../app/api/get/getUserDetails';
import Toast from '../../../../app/modules/components/Toast';
import { SelectView } from '../../content/dropdown/SelectView';
import { KTSVG } from '../../../helpers';
import moment from 'moment';

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setSearch: Function;
  search: string;
  data: any;
  filterData?: any;
  setFilter?: Function;
  pushReference: (id: string, offset: number) => void;
};

interface IOptionValue {
  key?: number;
  label: string;
  value: string;
}

const UserListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setSearch,
  search,
  data,
  filterData,
  setFilter,
  pushReference,
}) => {
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<string[]>([]);
  const [isUserBlock, setIsUserBlock] = useState<boolean>();
  const [itemId, setItemId] = useState<string>();

  const [isloading, setIsLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue | null>({
    label: filterData[0].label,
    value: filterData[0].value,
  });

  const userStatus = async (deleteId: string, status: any) => {
    setIsLoading(true);
    try {
      await userBlockUnblock(deleteId, status);
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(
        status ? 'User has been block successfully.' : 'User is now active.'
      );
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(apiError);
    }
    setIsLoading(false);
  };

  const getUserInfo = async (detailId: string) => {
    try {
      const userId = await getUserDetails(detailId);
      setUserDetails(userId.data);
      setShowCreateAppModal(true);
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(apiError);
    }
  };

  const BlockConfirm = () => {
    itemId && userStatus(itemId, isUserBlock);
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>
            User Listing
          </span>
        </h3>
        {/* <UsersListSearchComponent setSearch={setSearch} search={search} /> */}
        <SelectView
          data={filterData}
          placeholder='Select Filter...'
          addClass={`card-title`}
          valueCallback={setFilter}
          optionCallback={setSelectedValue}
          value={selectedValue}
        />
      </div>

      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Body */}
          <div className='card-body p-0'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-200px rounded-start'>Name</th>
                    <th className='min-w-300px'>Email</th>
                    <th className='min-w-200px'>Created Date</th>
                    <th className='min-w-175px'>Country</th>
                    <th className='min-w-125px'>Status</th>
                    {/* <th className='min-w-100px'>Referrals</th> */}
                    {/* <th className='min-w-100px'>Actions</th> */}
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {data.length === 0 ? (
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

                      {data?.map((item: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td className='ps-4'>
                              <div className='d-flex align-items-center'>
                                <div className='d-flex justify-content-start flex-column'>
                                  <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                    {item.fname}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.email}
                              </p>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {moment(item.createdAt).format('DD-MMM-YYYY')}
                              </p>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.country}
                              </p>
                            </td>
                            <td>
                              <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.status === 0
                                  ? 'Block'
                                  : 'Active'}
                              </p>
                            </td>
                            {/* <td>
                              <p
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                id='pkg_edit_modal'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                                onClick={() => {
                                  pushReference(item._id, 0);
                                }}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/communication/com014.svg'
                                  className='svg-icon-3'
                                />
                              </p>
                            </td> */}
                            {/* <td>
                              <div className='d-flex justify-content-end flex-shrink-0'>
                                <p
                                  className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer ${
                                    !item.is_verified && 'is--disabled'
                                  }`}
                                  id='pkg_edit_modal'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  onClick={() => {
                                    getUserInfo(item._id);
                                  }}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/communication/com013.svg'
                                    className='svg-icon-3'
                                  />
                                </p>
                                <p
                                  onClick={() => {
                                    setIsUserBlock(!item.is_blocked);
                                    setItemId(item._id);
                                    setShowConfrimModal(true);
                                  }}
                                  className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 ${
                                    !item.is_verified && 'is--disabled'
                                  }`}
                                >
                                  {!item.is_blocked ? (
                                    <KTSVG
                                      path='/media/icons/duotune/custom/toggle001.svg'
                                      className='svg-icon-3'
                                    />
                                  ) : (
                                    <KTSVG
                                      path='/media/icons/duotune/custom/toggle002.svg'
                                      className='svg-icon-3'
                                    />
                                  )}
                                </p>
                              </div>
                            </td> */}
                          </tr>
                        );
                      })}
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
      <UserDetailModal
        show={showCreateAppModal}
        data={userDetails}
        handleClose={() => setShowCreateAppModal(false)}
      />
      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={BlockConfirm}
        modalTitle={isUserBlock ? 'block' : 'unblock'}
        handleClose={() => setShowConfrimModal(false)}
      />
    </>
  );
};

export { UserListing };
