import React, { useState } from 'react';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';
import { LotteryEditModal } from '../../../../app/modules/apps/lottery-management/lottery-edit/lotteryEditModal';
import { getLotteryDetail } from '../../../../app/api/get/getLotteryDetails';
import { deleteLottery } from '../../../../app/api/delete/deleteLottery';
import { KTSVG } from '../../../helpers';
import Toast from '../../../../app/modules/components/Toast';
import moment from 'moment';
import { ConfrimModal } from '../../../../app/modules/modals/confirmModal/confirmModal';
import { LotteryDetailModal } from '../../../../app/modules/apps/lottery-management/lotteryDetails/lotteryDetailModal';
import { LotteryWinnerModal } from '../../../../app/modules/apps/lottery-management/winnerDetails/lotteryWinnerModal';

type Props = {
  className: string;
  loading: boolean;
  setRefreshList: Function;
  data?: any;
};

const LotteryListing: React.FC<Props> = ({
  className,
  loading,
  setRefreshList,
  data,
}) => {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [lotteryDetails, setLotteryDetails] = useState<string[]>([]);
  const [listingId, setListingId] = useState<string>('');
  const [itemId, setItemId] = useState<string>();
  const [modalId, setModalId] = useState<string>('');

  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [stateMsg, setStateMsg] = useState<string>('');
  const [, setApiError] = useState<string>('');

  const deleteLotto = async (deleteId: string) => {
    try {
      await deleteLottery(deleteId);
      setRefreshList(true);
      setBoolState('success');
      setShowToast(true);
      setStateMsg('Your lottery has been deleted successfully.');
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
  };

  const lotteryDetail = async (detailId: string) => {
    try {
      const lottoId = await getLotteryDetail(detailId);
      setLotteryDetails(lottoId.data);
      setShowCreateAppModal(true);
    } catch (error) {
      console.log('editLottery Error');
    }
  };

  const DeleteConfirm = () => {
    itemId && deleteLotto(itemId);
  };

  const SuccessEdit = () => {
    setBoolState('success');
    setShowToast(true);
    setStateMsg('Your lottery has been edited successfully.');
  };

  const FailedEdit = (error: any) => {
    setBoolState('fail');
    setShowToast(true);
    setStateMsg(error);
  };

  // Descending Order
  data.sort((item1: { start_date: string }, item2: { start_date: string }) => {
    const firstItem = item1?.start_date;
    const secondItem = item2?.start_date;
    return firstItem > secondItem ? -1 : 1;
  });

  return (
    <>
      <div className='position-relative'>
        <div className={`card ${className}`}>
          {/* beg::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>
                Lottery Listing
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
                    <th className='ps-4 min-w-100px rounded-start'>Price</th>
                    <th className='min-w-125px'>Ticket Per User</th>
                    <th className='min-w-200px'>Lottery Start At</th>
                    <th className='min-w-200px'>Lottery End At</th>
                    <th className='min-w-200px'>Announcement Date</th>
                    <th className='min-w-100px'>First Prize</th>
                    <th className='min-w-125px'>Second Prize</th>
                    <th className='min-w-100px'>Third Prize</th>
                    <th className='min-w-50px'>Status</th>
                    <th className='min-w-200px text-end pe-3'>Actions</th>
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
                      {data?.map((item: any, index: number) => {
                        return (
                          <>
                            <tr key={index}>
                              <td className='ps-4'>
                                <div className='d-flex align-items-center'>
                                  <div className='d-flex justify-content-start flex-column'>
                                    <p className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                      VT {item.price}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  {item.per_user_ticket}
                                </p>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  {moment(item.start_date).format(
                                    'DD-MMM-YYYY, HH:mm:ss'
                                  )}
                                </p>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  {moment(item.end_date).format(
                                    'DD-MMM-YYYY, HH:mm:ss'
                                  )}
                                </p>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  {moment(item.announcement_date).format(
                                    'DD-MMM-YYYY, HH:mm:ss'
                                  )}
                                </p>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  VT {item.lotteryRewards[0]?.amount}
                                </p>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  VT {item.lotteryRewards[1]?.amount}
                                </p>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  VT {item.lotteryRewards[2]?.amount}
                                </p>
                              </td>
                              <td>
                                <p className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                                  {new Date().toISOString() < item.start_date
                                    ? 'upcoming'
                                    : new Date().toISOString() >=
                                      item.announcement_date
                                    ? 'expired'
                                    : 'active'}
                                </p>
                              </td>
                              <td>
                                <div className='d-flex justify-content-end flex-shrink-0'>
                                  {!(
                                    item.start_date > new Date().toISOString()
                                  ) && (
                                    <p
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                      id='pkg_edit_modal'
                                      data-bs-toggle='modal'
                                      data-bs-target={`#${item._id}`}
                                      onClick={() => {
                                        setModalId(item._id);
                                        setShowDetailModal(true);
                                      }}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/custom/enlarge001.svg'
                                        className='svg-icon-3'
                                      />
                                    </p>
                                  )}
                                  {new Date().toISOString() >=
                                    item.announcement_date && (
                                    <p
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                      id='pkg_edit_modal'
                                      data-bs-toggle='modal'
                                      data-bs-target={`#${item._id}`}
                                      onClick={() => {
                                        setModalId(item._id);
                                        setShowWinnerModal(true);
                                      }}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/custom/cup001.svg'
                                        className='svg-icon-3'
                                      />
                                    </p>
                                  )}
                                  {item.start_date >
                                    new Date().toISOString() && (
                                    <>
                                      <p
                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 cursor-pointer'
                                        id='pkg_edit_modal'
                                        data-bs-toggle='modal'
                                        data-bs-target='#kt_modal_create_app'
                                        onClick={() => {
                                          setListingId(item._id);
                                          lotteryDetail(item._id);
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
                                          setShowConfrimModal(true);
                                        }}
                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                      >
                                        <KTSVG
                                          path='/media/icons/duotune/general/gen027.svg'
                                          className='svg-icon-3'
                                        />
                                      </p>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                            {modalId === item._id && (
                              <LotteryDetailModal
                                modalId={item._id}
                                show={showDetailModal}
                                sold={item.totaldSold}
                                earn={item.totalEarned}
                                handleClose={() => setShowDetailModal(false)}
                              />
                            )}

                            {modalId === item._id && (
                              <LotteryWinnerModal
                                modalId={item._id}
                                show={showWinnerModal}
                                data={item.lotteryRewards}
                                handleClose={() => setShowWinnerModal(false)}
                              />
                            )}
                          </>
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
      <LotteryEditModal
        modalId={modalId}
        show={showCreateAppModal}
        data={lotteryDetails}
        listingId={listingId}
        setApiError={setApiError}
        setRefreshList={setRefreshList}
        SuccessFunction={SuccessEdit}
        FailFunction={FailedEdit}
        handleClose={() => setShowCreateAppModal(false)}
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

export { LotteryListing };
