import React, { useState, useEffect } from 'react';
import Toast from '../../../components/Toast';
import SelectWinner from '../winnerDetails/SelectWinner';
import { SelectWinnerModal } from '../winnerDetails/selectWinnerModal';
import { getLotteryNumber } from '../../../../api/get/getLotteryNumber';
import { AsyncPaginate } from 'react-select-async-paginate';
import { components } from 'react-select';
import { ConfrimModal } from '../../../modals/confirmModal/confirmModal';
import { selectWinner } from '../../../../api/post/selectWinner';

type Props = {
  setRefreshList: Function;
};

interface SelectedProps {
  label: string;
  value: string;
  key: string;
}

export interface IWinners {
  lottery_no: 'string';
  prize: 'string';
  amount: number;
}

// const LotteryWinner: React.FC = () => {
const LotteryWinner = ({ setRefreshList }: Props) => {
  const [stateMsg, setStateMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [lotteryData, setLotteryData] = useState<any>('');
  const [, setApiError] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showSelectWinnerModal, setShowSelectWinnerModal] = useState<boolean>(
    false
  );
  const [updateList, setUpdateList] = useState<boolean>(false);
  const [showConfirmModal, setShowConfrimModal] = useState<boolean>(false);
  const [winners, setWinners] = useState<IWinners[]>([]);

  //==================== select api options ====================//

  const [, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState<SelectedProps | any>(null);
  const [menuOpen, setmenuOpen] = useState(false);

  // handle input change event
  const handleInputChange = (value: React.SetStateAction<string>) => {
    setInputValue(value);
  };

  // handle selection
  const handleChange = (value: React.SetStateAction<SelectedProps>) => {
    setSelectedValue(value);
    setShowSelectWinnerModal(true);
  };

  const DropdownIndicator = (props: any) => {
    const { menuIsOpen } = props.selectProps;
    menuIsOpen ? setmenuOpen(true) : setmenuOpen(false);
    return <components.DropdownIndicator {...props} />;
  };

  // load options using API call
  let loadOptions = async (
    inputValue: any,
    loadedOptions: any,
    { page }: any
  ) => {
    const response = await getLotteryNumber(10, page - 1, inputValue);
    const options = await response?.data?.lotteryNumbers?.map(
      (items: any, index: number) => {
        return {
          label: items?.userName,
          value: items?.lotteryNo,
          key: index,
        };
      }
    );

    return {
      options: options,
      hasMore: options.length > 1,
      additional: {
        page: page + 1,
      },
    };
  };

  //==================== End select api options ====================//

  const getLottoList = async (search: string) => {
    setLoading(true);
    try {
      const getlist = await getLotteryNumber(10, 0, search);
      setLotteryData(getlist?.data);
    } catch (error) {
      setBoolState('fail');
      setShowToast(true);
      setStateMsg(error as any);
    }
    setLoading(false);
  };

  const SuccessSelection = () => {
    setRefreshList(true);
    setUpdateList(true);
    setBoolState('success');
    setShowToast(true);
    setStateMsg('Winner has been Selected Successufully.');
  };

  const FailedSelection = async (error: any) => {
    setBoolState('fail');
    setShowToast(true);
    setStateMsg(error);
  };

  const winnerConfirm = () => {
    setWinner();
    // setTimeout(async () => {
    //   navigate(0);
    // }, 3000);
  };

  const setWinner = async () => {
    setLoading(true);
    try {
      await selectWinner(winners);
      setRefreshList(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLottoList('');
    setUpdateList(false);
  }, [updateList]);

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Select Lottery Winners</h3>
        </div>
      </div>

      <div className='form'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
              Select winners
            </label>

            <div className='col-lg-6 offset-lg-2 fv-row async-dropdown'>
              <AsyncPaginate
                additional={{
                  page: 1,
                }}
                isSearchable={true}
                className={`${menuOpen ? 'menu--open' : ''}`}
                value={selectedValue}
                loadOptions={loadOptions as any}
                onInputChange={handleInputChange}
                onChange={handleChange}
                // menuIsOpen={true}
                // components={{ DropdownIndicator, MenuList: SelectMenuButton }}
                components={{
                  DropdownIndicator,
                }}
                formatOptionLabel={(items: any) => (
                  <div
                    className={`options d-flex ${
                      items.value === selectedValue?.value && 'is--selected'
                    }`}
                  >
                    <p className={`pe-10 fw-bold fs-5 text-primary mb-0`}>
                      {items.value}
                    </p>
                    <p className={`fw-semibold fs-5 text-gray-600 mb-0`}>
                      {items.label}
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className='card-footer py-6 px-9'>
          <SelectWinner data={winners} />
        </div>

        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button
            type='button'
            className='btn btn-primary'
            disabled={loading}
            onClick={() => setShowConfrimModal(true)}
          >
            {!loading && 'Announce Winner'}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </div>

      <SelectWinnerModal
        show={showSelectWinnerModal}
        lotteryData={lotteryData}
        data={selectedValue}
        setApiError={setApiError}
        setRefreshList={setRefreshList}
        SuccessFunction={SuccessSelection}
        FailFunction={FailedSelection}
        setWinners={setWinners}
        winners={winners}
        handleClose={() => setShowSelectWinnerModal(false)}
      />

      <Toast
        showToast={showToast}
        state={boolState}
        setShowToast={setShowToast}
        message={stateMsg}
      />

      <ConfrimModal
        show={showConfirmModal}
        confirmProcess={winnerConfirm}
        modalTitle='Announce lottery winner'
        handleClose={() => setShowConfrimModal(false)}
      />
    </div>
  );
};

export default LotteryWinner;
