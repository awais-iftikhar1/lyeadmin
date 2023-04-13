/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../../_metronic/layout/core';
import {
  ChainListing,
  TokenListing,
} from '../../../../_metronic/partials/widgets';
import { getSupportedChains } from '../../../api/get/getSupportedChains';
import { getNetworkList } from '../../../api/get/getNetworkList';
import { getTokenList } from '../../../api/get/getTokenList';
import NetworkAdd from './network-list/network-add';
import TokenAdd from './network-list/token-add';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Deposit Management',
    path: '/deposit-management/deposit',
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

interface chainListProps {
  chains: [];
}

interface tokenListProps {
  tokens: string[];
}

const DepositPage = () => {
  const [supportChainList, setSupportChainList] = useState<chainListProps>();
  const [chainList, setChainList] = useState<chainListProps>();
  const [tokennList, setTokenList] = useState<tokenListProps>();
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [, setTabIndex] = useState(0);
  // const [userCount] = useState<number>(0);

  const [perPage] = useState<number>(10);
  const [size] = useState<number>(perPage);
  const [current] = useState<number>(1);

  // const PerPageChange = (value: number) => {
  //   setSize(value);
  //   const newPerPage = Math.ceil(userCount / value);
  //   if (current > newPerPage) {
  //     setCurrent(newPerPage);
  //   }
  // };

  // const getData = (current: number, pageSize: number) => {
  //   return chainData(current, pageSize);
  // };

  // const PaginationChange = (page: number, pageSize: number) => {
  //   setCurrent(page);
  //   setSize(pageSize);
  //   getData(pageSize, page);
  // };

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

  const chainData = async (pageSize: number, page: number) => {
    setIsLoading(true);
    try {
      const data = await getNetworkList();
      setChainList(data?.data);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  const tokenData = async (pageSize: number, page: number) => {
    setIsLoading(true);
    try {
      const data = await getTokenList(10, 0, '');
      setTokenList(data?.data);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    supportedChains();
    chainData(size, current);
    tokenData(size, current);
    setRefreshList(false);
  }, [refreshList]);

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='deposit'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Deposit</PageTitle>

              <Tabs selectedTabClassName='btn-primary'>
                <TabList>
                  <Tab className='btn btn-sm btn-light me-3'>Network</Tab>
                  <Tab className='btn btn-sm btn-light me-3'>Tokens</Tab>
                  <Tab className={`btn btn-sm btn-light me-3`}>
                    Deposit Listing
                  </Tab>
                </TabList>
                <TabPanel>
                  <NetworkAdd
                    setRefreshList={setRefreshList}
                    listing={chainList !== undefined ? chainList.chains : []}
                  />
                </TabPanel>
                <TabPanel>
                  <TokenAdd
                    setRefreshList={setRefreshList}
                    listing={
                      supportChainList !== undefined
                        ? supportChainList.chains
                        : []
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <ChainListing
                    className='mb-5 mb-xl-8'
                    data={
                      supportChainList !== undefined && supportChainList.chains
                    }
                    setRefreshList={setRefreshList}
                    loading={isloading}
                    setTabIndex={setTabIndex}
                    listing={chainList !== undefined ? chainList.chains : []}
                  />
                  <TokenListing
                    className='mb-5 mb-xl-8'
                    data={tokennList !== undefined && tokennList.tokens}
                    setRefreshList={setRefreshList}
                    loading={isloading}
                    setTabIndex={setTabIndex}
                    listing={
                      supportChainList !== undefined
                        ? supportChainList.chains
                        : []
                    }
                  />
                </TabPanel>
              </Tabs>
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to='/apps/deposit-management/deposit' />}
      />
    </Routes>
  );
};

export default DepositPage;
