import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { SelectView } from '../../../../../_metronic/partials/content/dropdown/SelectView';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';
import { IWinners } from '../lottery-list/lottery-winner';

type Props = {
  data: string;
  lotteryData: any;
  setApiError: Function;
  handleClose: Function;
  setRefreshList: Function;
  SuccessFunction: Function;
  winners: IWinners[];
  setWinners: Function;
  FailFunction: Function;
};
type LotteryReward = {
  amount : number
  lottery : string
  type : string
}

const SelectLotteryWinner = ({
  data,
  lotteryData,
  setApiError,
  handleClose,
  setRefreshList,
  SuccessFunction,
  winners,
  setWinners,
  FailFunction,
}: Props) => {
  const [lotteryReward, setLotteryReward] = useState<LotteryReward>();
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  
  const winnerConfirm = () => {
    if (lotteryReward) {
      const winnersArr = winners.filter((item) => {
        return item?.lottery_no !== data && item.prize !== lotteryReward?.type;
      });
      setWinners([
        ...winnersArr,
        {
          lottery_no: data,
          prize: lotteryReward?.type,
          amount: lotteryReward?.amount,
        },
      ]);
      handleClose();
    }
  };

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='form'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
              Select Type
            </label>
            
            <div className='col-lg-6 offset-lg-2 fv-row'>
              {lotteryData?.lotteryRewards.map((item :LotteryReward , index : number) => (
                <button
                  type='button'
                  className={`btn prize-btn ${lotteryReward?.type === item.type ? ' btn-primary' : 'btn-secondary'}`}
                  onClick={() => setLotteryReward(item)}
                >
                  {item.type} Prize
                </button>  
                )
              )}
            </div>
          </div>
        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button
            type='button'
            className='btn btn-primary'
            disabled={!lotteryReward}
            onClick={() => setShowConfrimModal(true)}
          >
            {'Add Winner'}
          </button>
        </div>
      </div>

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={winnerConfirm}
        modalTitle='Select Winner'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default SelectLotteryWinner;
