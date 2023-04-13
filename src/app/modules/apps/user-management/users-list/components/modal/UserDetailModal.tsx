import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../../../_metronic/helpers';
import { UserDetails } from '../../table/UserDetails';

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const UserDetailModal = ({ show, data, handleClose }: Props) => {
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
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
    >
      <div className='modal-header'>
        <h2>User Details</h2>
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

      <div className='modal-body p-0 pt-5'>
        {/*begin::body */}
        <UserDetails userData={data} />
        {/* end::body */}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { UserDetailModal };
