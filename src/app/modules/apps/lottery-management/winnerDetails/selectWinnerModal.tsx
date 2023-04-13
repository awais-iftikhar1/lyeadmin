import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../_metronic/helpers';
import SelectLotteryWinner from './selectLotteryWinner';
import { IWinners } from '../lottery-list/lottery-winner';

type Props = {
  show: boolean;
  data: any;
  lotteryData: any;
  setApiError: Function;
  setRefreshList: Function;
  setWinners: Function;
  winners: IWinners[];
  handleClose: () => void;
  SuccessFunction: () => void;
  FailFunction: (error: any) => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const SelectWinnerModal = ({
  show,
  data,
  lotteryData,
  setApiError,
  setRefreshList,
  setWinners,
  winners,
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
        <h2>Select Prize Type</h2>
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
        <SelectLotteryWinner
          data={data && data.value}
          lotteryData={lotteryData}
          handleClose={handleClose}
          setApiError={setApiError}
          SuccessFunction={SuccessFunction}
          FailFunction={FailFunction}
          setWinners={setWinners}
          winners={winners}
          setRefreshList={setRefreshList}
        />
        {/* end::body */}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { SelectWinnerModal };
