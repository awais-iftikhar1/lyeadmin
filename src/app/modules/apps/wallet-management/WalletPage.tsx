import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../../_metronic/layout/core';
import { SelectView } from '../../../../_metronic/partials/content/dropdown/SelectView';
import { getSupportedChains } from '../../../api/get/getSupportedChains';
import { getWalletBalance } from '../../../api/get/getWalletBalance';
import { UsersListLoading } from '../user-management/users-list/components/loading/UsersListLoading';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Wallets Management',
    path: '/wallet-management/wallet',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];

export interface currency {
  balance: string;
  symbol: string;
}
interface WalletDataProps {
  nativeBalance: string;
  totalWithdrawals: [];
  totalDeposit: [];
  currentBalances: currency[];
}

interface chainListProps {
  chains: {
    chain: string;
  }[];
}

interface IOptionValue {
  key?: number;
  label: string;
  value: string;
}

const WalletsPage = () => {
  const [supportChainList, setSupportChainList] = useState<
    chainListProps | any
  >(null);
  const [walletData, setWalletData] = useState<WalletDataProps | any>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IOptionValue | null>(null);

  const AdminRoleData = async (chain: string) => {
    setIsLoading(true);
    try {
      const data = await getWalletBalance(chain);
      setWalletData(data?.data);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  const supportedChains = async () => {
    setIsLoading(true);
    try {
      const data = await getSupportedChains();
      setSupportChainList(data?.data);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  const listingData = supportChainList?.chains.map(
    (items: any, index: number) => {
      return {
        label: items?.chain,
        value: items?.chain,
        key: index,
      };
    }
  );

  useEffect(() => {
    setSelectedValue({
      label: supportChainList?.chains[0]?.chain,
      value: supportChainList?.chains[0]?.chain,
    });
    setValue(supportChainList?.chains[0]?.chain);
  }, [supportChainList]);

  useEffect(() => {
    AdminRoleData(value);
  }, [value]);

  useEffect(() => {
    supportedChains();
    AdminRoleData('');
  }, []);

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='wallet'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Wallets</PageTitle>

              <div className='card mb-5 mb-xl-10 position-relative'>
                <div
                  className='card-header border-0'
                  data-bs-toggle='collapse'
                  data-bs-target='#kt_account_profile_details'
                  aria-expanded='true'
                  aria-controls='kt_account_profile_details'
                >
                  <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Wallet Data and Details</h3>
                  </div>
                </div>

                <div id='kt_account_profile_details' className='collapse show'>
                  <div className='card-body border-top p-9'>
                    <div className='row mb-0'>
                      <div className='col-lg-7 col-form-label d-flex align-items-center'>
                        <p className='fw-bold fs-6 mb-0'>Wallet Address :</p>
                        <label className='ps-4 fs-6'>
                          {walletData?.walletAddress}
                        </label>
                      </div>

                      <label className='col-lg-5 col-form-label fw-bold fs-6'>
                        <SelectView
                          addClass={`dropdown--input card-title mb-0`}
                          data={listingData}
                          valueCallback={setValue}
                          placeholder='Select Chain...'
                          optionCallback={setSelectedValue}
                          value={selectedValue}
                        />
                      </label>

                      <div className='col-lg-12 fv-row'>
                        {/* begin::Body */}
                        <div className='card-body p-0 pt-5'>
                          {/* begin::Table container */}
                          <div className='table-responsive'>
                            {/* begin::Table */}
                            <table className='table align-middle gs-0 gy-4 mb-0'>
                              {/* begin::Table head */}
                              <thead>
                                <tr className='fw-bold text-muted bg-light'>
                                  <th className='ps-4 min-w-150px rounded-start'>
                                    Balance
                                  </th>
                                  <th className='min-w-200px'>
                                    Total Withdrawals
                                  </th>
                                  <th className='min-w-200px'>
                                    Total Deposits
                                  </th>
                                </tr>
                              </thead>
                              {/* end::Table head */}
                              {/* begin::Table body */}
                              <tbody>
                                {false ? (
                                  isloading ? (
                                    <tr className='table-loading'>
                                      <UsersListLoading />
                                    </tr>
                                  ) : (
                                    <tr className='table-noData'>
                                      <h4 className='no-data mb-0 mt-4'>
                                        No data found
                                      </h4>
                                    </tr>
                                  )
                                ) : (
                                  <>
                                    {isloading && (
                                      <tr className='listing-loading'>
                                        <UsersListLoading />
                                      </tr>
                                    )}
                                    <tr>
                                      <td className='ps-4'>
                                        <div className='d-flex align-items-center'>
                                          <p className='text-dark fw-bold mb-1 fs-6'>
                                            {walletData?.nativeBalance}
                                          </p>
                                        </div>
                                        {walletData?.currentBalances.map(
                                          (item: currency, index: number) =>
                                            +item.balance > 0 && (
                                              <p
                                                key={index}
                                                className='text-dark fw-bold d-block mb-1 fs-6'
                                              >
                                                <span className='me-5'>
                                                  {item?.symbol}
                                                </span>
                                                <span>
                                                  {Math.trunc(
                                                    +item?.balance * 1000
                                                  ) / 1000}
                                                </span>
                                              </p>
                                            )
                                        )}
                                      </td>
                                      <td>
                                        {walletData?.totalWithdrawals.length &&
                                          walletData?.totalWithdrawals.map(
                                            (item: any, key: any) => (
                                              <p className='text-dark fw-bold d-block mb-1 fs-6'>
                                                <span className='me-5'>
                                                  {item._id !== null
                                                    ? item._id
                                                    : 'unknown token'}{' '}
                                                </span>
                                                <span>
                                                  {Math.abs(+item.amount)}
                                                </span>
                                              </p>
                                            )
                                          )}
                                      </td>
                                      <td>
                                        {walletData?.totalDeposit.length &&
                                          walletData?.totalDeposit.map(
                                            (item: any, key: any) => (
                                              <p className='text-dark fw-bold d-block mb-1 fs-6'>
                                                <span className='me-5'>
                                                  {item._id !== null
                                                    ? item._id
                                                    : 'unknown token'}{' '}
                                                </span>
                                                <span>{item.amount}</span>
                                              </p>
                                            )
                                          )}
                                      </td>
                                    </tr>
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to='/apps/wallet-management/wallets' />}
      />
    </Routes>
  );
};

export default WalletsPage;
