import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { PackageEditModal } from '../../../../app/modules/apps/package-management/packages-edit/packagesEditModal';
import { getPackagesDetail } from '../../../../app/api/get/getPackagesDetails';
import { deletePackages } from '../../../../app/api/delete/deletePackages';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import moment from 'moment';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { PackagesDetails } from '../../../../app/modules/apps/package-management/packages-list/packagesModel';
import { editPackages } from '../../../../app/api/put/editPackages';
type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setTabIndex: Function;
  percentData: number;
  dailyPercentData: number;
  data?: any;
};

const PackagesListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  setTabIndex,
  percentData,
  dailyPercentData,
  data,
}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [showConfirmModalStatus, setShowConfrimModalStatus] = useState<boolean>(false);

  const [packageDetails, setPackageDetails] = useState<PackagesDetails|null>();
  const [itemId, setItemId] = useState<string>();

  const [isUserBlock, setIsUserBlock] = useState<boolean>();
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const PackageDetail = async (data: PackagesDetails|null) => {
    try {

      // const packageId = await getPackagesDetail(detailId);
      setPackageDetails(data);
      setShowCreateAppModal(true);
    } catch (error) {
      console.log('editPackage Error', error);
    }
  };

  const deletePackageHandler = () => {
    debugger
    // itemId && userStatus(itemId, isUserBlock);
    itemId && deletePackage(itemId);
  };
  const statusHandler =async () => {
    // const obj =  {
    //   id: itemId,
      
    //   ...data
    // }
    // await editPackages(obj);
  };

  const gotoRewards = () => {
    setTabIndex(2);
  };

  const deletePackage = async (deleteId: string) => {
    setIsLoading(true);
    try {
      const data = await deletePackages(deleteId);
      console.log(data);
      
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(data.message)
      // setStateMsg(
      //   `${
      //     isUserBlock
      //       ? 'Your packages has been inactive successfully.'
      //       : 'Your packages has been active successfully.'
      //   }`
      // );
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
    setStateMsg('Your packages has been edited successfully.');
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
                Packages Listing
              </span>
            </h3>
            {/* <button
              type={'button'}
              className='btn btn-success me-2'
              onClick={() => {
                PackageDetail(null);
              }}
            >
              Add
            </button> */}
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
                    <th className='ps-4 min-w-150px rounded-start'>Package Name</th>
                    <th className='min-w-200px'>Actual Package Price</th>
                    <th className='min-w-100px'>Engines</th>
                    <th className='min-w-100px'>Currency</th>
                    <th className='min-w-100px'>Discount</th>
                    <th className='min-w-200px'>Discounted Package Price</th>
                    <th className='min-w-200px'>Discount Expires Day</th>
                    <th className='min-w-100px'>Status</th>
                    <th className='min-w-200px'>Created At</th>
                    <th className='min-w-200px'>Updated At</th>                 
                    <th className='min-w-100px text-end pe-3'>Actions</th>
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
                                   {item.packageName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.actualPackagePrice}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.engines} 
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.currency} 
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.discount} %
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.discountedPackagePrice} 
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.discountExpiresDay} 
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.status === 1 ? 'Active' : 'Inactive'}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.createdAt).format(
                                'DD-MMM-YYYY, HH:mm:ss'
                              )}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.updatedAt).format(
                                'DD-MMM-YYYY, HH:mm:ss'
                              )}
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
                                  PackageDetail(item);
                                }}
                              >
                                <KTSVG
                                  path='/media/icons/duotune/art/art005.svg'
                                  className='svg-icon-3'
                                />
                              </p>
                              <p
                                onClick={() => {
                                  // setIsUserBlock(item.deleted_at === null);
                                  setItemId(item.id);
                                  setShowConfrimModal(true);
                                }}
                                className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                              > 
                                  <i className="bi bi-trash-fill"></i>
                              </p>
                              <p
                                onClick={() => {
                                  setIsUserBlock(item.deleted_at === null);
                                  setItemId(item._id);
                                  setShowConfrimModalStatus(true);
                                }}
                                className={`btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1`}
                              >
                                {item.deleted_at === null ? (
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
      <PackageEditModal
        show={showCreateAppModal}
        data={packageDetails}
        setApiError={setApiError}
        setRefreshList={setRefreshList}
        SuccessFunction={SuccessEdit}
        FailFunction={FailedEdit}
        percentData={percentData}
        setTabIndex={setTabIndex}
        dailyPercentData={dailyPercentData}
        gotoRewards={gotoRewards}
        handleClose={() => setShowCreateAppModal(false)}
      />
      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={deletePackageHandler}
        // modalTitle={isUserBlock ? 'inactive' : 'active'}
        modalTitle={'Delete Package'}
        handleClose={() => setShowConfrimModal(false)}
      />
       <ConfrimModal
        show={showConfirmModalStatus}
        confirmProcess={statusHandler}
        // modalTitle={isUserBlock ? 'inactive' : 'active'}
        modalTitle={'Update Status'}
        handleClose={() => setShowConfrimModalStatus(false)}
      />
    </>
  );
};

export { PackagesListing };
