import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { PackageEditModal } from '../../../../app/modules/apps/package-management/packages-edit/packagesEditModal';
import { deletePackages } from '../../../../app/api/delete/deletePackages';
import Toast from '../../../../app/modules/components/Toast';
import moment from 'moment';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  percentData: number;
  data?: any;
};

const DeletePackagesListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  percentData,
  data,
}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [packageDetails] = useState<string[]>([]);
  const [listingId] = useState<string>('');
  const [itemId] = useState<string>();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const deletePackage = async (deleteId: string) => {
    try {
      await deletePackages(deleteId);
    } catch (error) {
      console.log('deletePackages Error');
    }
  };

  const DeleteConfirm = () => {
    itemId && deletePackage(itemId);
    setRefreshList(true);
    setBoolState('success');
    setShowToast(true);
    setStateMsg('Your packages has been inactive successfully.');
  };

  const SuccessEdit = () => {
    setBoolState('success');
    setShowToast(true);
    setStateMsg('Your packages has been edited successfully.');
  };

  const FailedEdit = () => {
    setBoolState('fail');
    setShowToast(true);
    setStateMsg(apiError);
  };

  return (
    <>
      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>
                Deleted Listing
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
                    <th className='ps-4 min-w-150px rounded-start'>Amount</th>
                    <th className='min-w-150px'>Reward Amount</th>
                    <th className='min-w-200px'>Daily Reward Percentage</th>
                    <th className='min-w-200px'>Created At</th>
                    <th className='min-w-200px'>Updated At</th>
                    {/* <th className='min-w-100px text-end pe-3'>Actions</th> */}
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
                      {loading && (
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
                                  VT {item.amount}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              VT {item.reward_amount}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {item.reward_percentage} %
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
        setTabIndex={()=>{}} 
        show={showCreateAppModal}
        data={packageDetails}
        setApiError={setApiError}
        setRefreshList={setRefreshList}
        SuccessFunction={SuccessEdit}
        FailFunction={FailedEdit}
        percentData={percentData}
        handleClose={() => setShowCreateAppModal(false)}
        gotoRewards={function (): void {
          throw new Error('Function not implemented.');
        }}
      />

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={DeleteConfirm}
        modalTitle='delete'
        handleClose={() => setShowConfrimModal(false)}
      />
    </>
  );
};

export { DeletePackagesListing };
