import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { usePathName } from '../../../app/hook/usePathName';
import { routes } from '../../../app/utils/constants';
import { KTSVG } from '../../helpers';
import { EngineType } from '../../../app/modules/apps/engine-management/types';
import { FuelType } from '../../../app/modules/apps/fuel-management/types';
import { Filter, FilterType } from '../../../app/modules/apps/filter-management/types';
import { ModelType } from '../../../app/modules/apps/model-management/types';

type Props = {
  show: boolean;
  data: FuelType|EngineType|Filter|FilterType|ModelType|null;
  handleClose: () => void;
  children:React.ReactNode
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const CustomModal = ({
  show,
  handleClose,
  data,
  children
}: Props) => {
  const {route} = usePathName()
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
        <h2>{data ? `Edit ${routes[route as keyof typeof routes] }` : `Add ${routes[route as keyof typeof routes]}`}</h2>
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
        {children}
        {/* <PackagesEdit
          data={data}
          heading={false}
          handleClose={handleClose}
          setApiError={setApiError}
          setTabIndex={setTabIndex}
          SuccessFunction={SuccessFunction}
          FailFunction={FailFunction}
          setRefreshList={setRefreshList}
        /> */}
        {/* end::body */}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CustomModal };
