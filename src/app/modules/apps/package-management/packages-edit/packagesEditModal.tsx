import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../_metronic/helpers';
import PackagesEdit from './packages-edit';

type Props = {
  show: boolean;
  data: any;
  percentData: number;
  dailyPercentData?: number;
  setTabIndex:Function;
  setApiError: Function;
  setRefreshList: Function;
  gotoRewards: () => void;
  handleClose: () => void;
  SuccessFunction: () => void;
  FailFunction: (error: any) => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const PackageEditModal = ({
  show,
  data,
  percentData,
  dailyPercentData,
  setRefreshList,
  gotoRewards,
  setTabIndex,
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
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
    >
      <div className='modal-header'>
        <h2>Edit Package</h2>
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
        <PackagesEdit
          packageData={data}
          heading={false}
          percentData={percentData}
          dailyPercentData={dailyPercentData}
          handleClose={handleClose}
          setApiError={setApiError}
          setTabIndex={setTabIndex}
          gotoRewards={gotoRewards}
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

export { PackageEditModal };
