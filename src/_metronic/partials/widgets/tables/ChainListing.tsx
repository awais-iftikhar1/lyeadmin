import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { NetworkEditModal } from '../../../../app/modules/apps/deposit-management/network-edit/networkEditModal';
import { getNetworkDetail } from '../../../../app/api/get/getNetworkDetails';
import { deleteNetworks } from '../../../../app/api/delete/deleteNetworks';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { ChainStatus } from '../../../../app/api/put/chainStatus';

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setTabIndex: Function;
  data?: any;
  listing: [];
};

const ChainListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setTabIndex,
  data,
  listing,
}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [networkDetails, setNetworkDetails] = useState<string[]>([]);
  const [listingId, setListingId] = useState<string>('');
  const [itemId, setItemId] = useState<string>();

  const [isUserBlock, setIsUserBlock] = useState<boolean>();
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const NetworkDetail = async (detailId: string) => {
    try {
      const networkId = await getNetworkDetail(detailId);
      setNetworkDetails(networkId.data);
      setShowCreateAppModal(true);
    } catch (error) {
      console.log('editNetwork Error', error);
    }
  };

  const DeleteConfirm = () => {
    itemId && deleteNetwork(itemId);
  };

  const StatusConfirm = () => {
    itemId && changeStatus(itemId);
  };

  const changeStatus = async (networkId: string) => {
    setIsLoading(true);
    try {
      await ChainStatus(networkId);
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(
        `${
          isUserBlock
            ? 'Your networks has been inactive successfully.'
            : 'Your networks has been active successfully.'
        }`
      );
    } catch (error) {
      setStateMsg(apiError);
      setBoolState('fail');
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const deleteNetwork = async (deleteId: string) => {
    setIsLoading(true);
    try {
      await deleteNetworks(deleteId);
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your networks has been deleted successfully.');
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
    setStateMsg('Your networks has been edited successfully.');
  };

  const FailedEdit = async (error: string) => {
    setStateMsg(error);
    setBoolState('fail');
    setShowToast(true);
  };

  return (
    <>
      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>
                Network Listing
              </span>
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
                    <th className='ps-4 min-w-150px rounded-start'>
                      Network name
                    </th>
                    <th className='min-w-200px'>Provider</th>
                    <th className='min-w-100px'>Chain ID</th>
                    <th className='min-w-100px'>Currency</th>
                    <th className='min-w-250px'>Block explorer</th>
                    <th className='min-w-100px'>Status</th>
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
                        <tr key={index}>
                          <td className='ps-4'>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                  {item.chain}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.provider}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.chainId}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.native_currency}
                            </p>
                          </td>
                          <td>
                            <a
                              href={item.explorer_url}
                              target='_blank'
                              className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                              rel='noreferrer'
                            >
                              {item.explorer_url}
                            </a>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.is_active ? 'Active' : 'Inactive'}
                            </p>
                          </td>
                          <td>
                            <div className='d-flex justify-content-end flex-shrink-0'>
                              <p
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                id='pkg_edit_modal'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                                onClick={() => {
                                  setListingId(item._id);
                                  NetworkDetail(item._id);
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
                              <p
                                onClick={() => {
                                  setIsUserBlock(item.is_active);
                                  setItemId(item._id);
                                  setShowConfrimModal(true);
                                }}
                                className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                              >
                                {item.is_active ? (
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
                          </td>
                        </tr>
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
      <NetworkEditModal
        show={showCreateAppModal}
        data={networkDetails}
        listing={listing}
        listingId={listingId}
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

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={StatusConfirm}
        modalTitle={isUserBlock ? 'inactive' : 'active'}
        handleClose={() => setShowConfrimModal(false)}
      />
    </>
  );
};

export { ChainListing };
