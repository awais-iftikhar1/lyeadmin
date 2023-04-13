import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../_metronic/helpers';
import LotteryEdit from './lottery-edit';

type Props = {
  show: boolean;
  data: any;
  modalId: string;
  listingId: string;
  setApiError: Function;
  setRefreshList: Function;
  handleClose: () => void;
  SuccessFunction: () => void;
  FailFunction: (error: any) => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const LotteryEditModal = ({
  show,
  data,
  modalId,
  listingId,
  setRefreshList,
  setApiError,
  handleClose,
  SuccessFunction,
  FailFunction,
}: Props) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return createPortal(
    <Modal
      id={modalId}
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
    >
      <div className='modal-header'>
        <h2>Edit Lottery</h2>
        {/* begin::Close */}
        <div
          className='btn btn-sm btn-icon btn-active-color-primary'
          onClick={handleClose}
        >
          <KTSVG
            className='svg-icon-1'
            path='/media/icons/duotune/arrows/arr061.svg'
          />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body p-0'>
        {/*begin::body */}
        <LotteryEdit
          idData={data}
          heading={false}
          packageId={listingId}
          handleClose={handleClose}
          setApiError={setApiError}
          SuccessFunction={SuccessFunction}
          FailFunction={FailFunction}
          setRefreshList={setRefreshList}
        />
        {/* end::body */}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { LotteryEditModal };
