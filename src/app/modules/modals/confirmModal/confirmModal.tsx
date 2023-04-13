import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../_metronic/helpers';

type Props = {
  show: boolean;
  modalTitle: string;
  confirmProcess: () => void;
  handleClose: () => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const ConfrimModal = ({
  show,
  modalTitle,
  confirmProcess,
  handleClose,
}: Props) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-400px'
      show={show}
      onHide={handleClose}
    >
      <div className='modal-header border-0 pb-0'>
        {/* begin::Close */}
        <div
          className='btn btn-sm btn-icon btn-active-color-primary w-100 h-auto justify-content-end'
          onClick={handleClose}
        >
          <KTSVG
            className='svg-icon-1'
            path='/media/icons/duotune/arrows/arr061.svg'
          />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body text-center pt-0'>
        {/*begin::body */}
        <KTSVG
          path='/media/icons/duotune/general/gen044.svg'
          className={`d-block svg-icon-3tx svg-icon-${
            modalTitle === 'delete' ? 'danger' : 'warning'
          } mb-5`}
        />
        <h2 className='me-auto mb-3 text-capitalize'>{modalTitle}</h2>
        <p className='mb-0'>{`${
          modalTitle === 'Rewards'
            ? 'You have to add reward percentage in order to add Packages'
            : modalTitle === 'Select Winner'
            ? 'Are you sure you want to set prize for this lottery ticket'
            : `Are you sure you want to ${modalTitle}`
        }`}</p>
        {/* end::body */}
      </div>
      <div className='modal-footer justify-content-center border-0 pt-0'>
        <button
          type={`${modalTitle === 'delete' ? 'button' : 'submit'}`}
          className='btn btn-success me-2'
          onClick={() => {
            confirmProcess();
            handleClose();
          }}
        >
          Confirm
        </button>
        <button
          type='button'
          className='btn btn-danger ms-2'
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { ConfrimModal };
