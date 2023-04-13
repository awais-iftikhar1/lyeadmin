import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../_metronic/helpers';
import RolesAndPrivileges from '../roles-privileges-list/user-roles-listing';

type Props = {
  show: boolean;
  data: any;
  modalId?: string;
  handleClose: () => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const ViewRoleModal = ({ show, data, modalId, handleClose }: Props) => {
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
        <h2>View Admin Role</h2>
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
        <RolesAndPrivileges Idata={data} />
        {/* end::body */}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { ViewRoleModal };
