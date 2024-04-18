import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import moment from 'moment';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { ROUTES } from '../../../../app/utils/enum/routesEnum';
import { approveRequest } from '../../../../app/api/Corporate';

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  setTabIndex: Function;
  data?: any;
};

const CorporateRequestListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  data,
}) => {
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [item, setItem] = useState<any>();
  const tabName = ROUTES.corporateRequest

  
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

 
  const approveHandler = async () => {
    if(!item) return
    setIsLoading(true);
    try {
      const paymentFromMonth = item.paymentFromMonth ? new Date(item.paymentFromMonth) : null
      const paymentTillMonth = item.paymentTillMonth ? new Date(item.paymentTillMonth) : null

      const data = await approveRequest({
        customerId:item?.customerId,
        packageId:item?.package.id,
        paymentFromMonth: paymentFromMonth,
        paymentTillMonth:paymentTillMonth
      });
      
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg(data.message)
    } catch (error) {
      setStateMsg(apiError);
      setBoolState('fail');
      setShowToast(true);
    }
    setIsLoading(false);
  };



  return (
    <>
      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>
              {tabName} Listing
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
                    <th className='ps-4 min-w-150px rounded-start'>Account Type</th>
                    <th className='min-w-200px'>Package Name</th>
                    <th className='min-w-150px'>Curreny</th>
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
                                   {item.accountType}
                                </p>
                              </div>
                            </div>
                          </td>

                          
                      
                        
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.package.packageName }
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                {item.package.currency }
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.createdAt).format(
                                'DD-MMM-YYYY'
                              )}
                            </p>
                          </td>
                          <td>
                            <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {moment(item.updatedAt).format(
                                'DD-MMM-YYYY'
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
                                  setItem(item);
                                  setShowConfrimModal(true);
                                }}
                              >
                                  <KTSVG
                                    path='/media/icons/duotune/communication/com013.svg'
                                    className='svg-icon-3'
                                  />
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



      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={approveHandler}
        modalTitle={`Approve ${tabName} `}
        handleClose={() => setShowConfrimModal(false)}
      />
    </>
  );
};

export { CorporateRequestListing };
