/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../../_metronic/layout/core';
import { PackagesListing } from '../../../../_metronic/partials/widgets';
import { getPackagesData } from '../../../api/get/getPackagesData';
import PackageRewardPercentage from './packages-list/packages-reward-percentage';
import PackagesAdd from './packages-list/packages-add';
import { getRewardPercentage } from '../../../api/get/getRewardPercentage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Pagination from 'rc-pagination';
import { KTCard, KTCardBody } from '../../../../_metronic/helpers';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Packages Management',
    path: '/packages-management/packages',
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

const PackagesPage = () => {
  const [packagesList, setPackagesList] = useState<string[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [percentData, setPercentData] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [packagesDetail, setPackagesDetail] = useState<any>('');
  const [packagesDaily, setPackagesDaily] = useState<any>('');

  const [tabIndex, setTabIndex] = useState(0);
  const [userCount, setUserCount] = useState<number>(0);

  const [perPage] = useState<number>(10);
  const [size, setSize] = useState<number>(perPage);
  const [current, setCurrent] = useState<number>(1);

  const PerPageChange = (value: number) => {
    setSize(value);
    const newPerPage = Math.ceil(userCount / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current: number, pageSize: number) => {
    // Normally you should get the data from the server
    // return data.slice((current - 1) * pageSize, current * pageSize);
    return packagesData(current, pageSize);
  };

  const PaginationChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setSize(pageSize);
    getData(pageSize, page);
  };

  const pageItems = (_current: any, type: string, originalElement: any) => {
    if (type === 'page') {
      return (
        <li className='page-item'>
          <p className='page-link'>{_current}</p>
        </li>
      );
    }
    if (type === 'prev') {
      return (
        <li className='page-item previous'>
          <p className='page-link'>
            <i className='previous'></i>
          </p>
        </li>
      );
    }
    if (type === 'next') {
      return (
        <li className='page-item next'>
          <p className='page-link'>
            <i className='next'></i>
          </p>
        </li>
      );
    }
    return originalElement;
  };

  const packagesData = async (pageSize: number, page: number) => {
    setIsLoading(true);
    try {
      const data: any = await getPackagesData(pageSize, page - 1);
      setPackagesList(data?.data);
      // setUserCount(data?.data.count);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  const RewardDetail = async () => {
    try {
      const rewardDetail = await getRewardPercentage();
      setPackagesDaily(
        rewardDetail.data[0].name === 'daily_reward_percentage'
          ? rewardDetail.data[0]
          : rewardDetail.data[1]
      );
      setPackagesDetail(
        rewardDetail.data[1].name === 'reward_percentage'
          ? rewardDetail.data[1]
          : rewardDetail.data[0]
      );
    } catch (error) {
      console.log('editPackage Error');
    }
  };

  // useEffect(() => {
  //   RewardDetail();
  // }, [percentData]);

  useEffect(() => {
    packagesData(size, current);
    setRefreshList(false);
  }, [refreshList]);

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='packages'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Packages</PageTitle>

              <Tabs
                selectedTabClassName='btn-primary'
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
              >
                <TabList>
                  <Tab className='btn btn-sm btn-light me-3'>
                    Packages Listing
                  </Tab>
                  <Tab className='btn btn-sm btn-light me-3'>Packages Add</Tab>
                  {/* <Tab className='btn btn-sm btn-light me-3'>
                    Packages Rewards Percentage
                  </Tab> */}
                </TabList>
                <TabPanel>
                  <KTCard>
                    <KTCardBody className='py-4'>
                      <PackagesListing
                        className='mb-5 mb-xl-8'
                        data={packagesList}
                        setRefreshList={setRefreshList}
                        loading={isloading}
                        percentData={
                          packagesDetail !== undefined
                            ? packagesDetail.value
                            : 0
                        }
                        dailyPercentData={
                          packagesDaily !== undefined ? packagesDaily.value : 0
                        }
                        setTabIndex={setTabIndex}
                      />
                      <Pagination
                        className='pagination pt-10'
                        showTotal={(total, range) =>
                          `Showing ${range[0]}-${range[1]} of ${total}`
                        }
                        onChange={PaginationChange}
                        total={userCount}
                        current={current}
                        pageSize={size}
                        showSizeChanger={false}
                        itemRender={pageItems}
                        onShowSizeChange={PerPageChange}
                      />
                    </KTCardBody>
                  </KTCard>
                </TabPanel>
                <TabPanel>
                  <PackagesAdd
                    setRefreshList={setRefreshList}
                    percentData={
                      packagesDetail !== undefined ? packagesDetail.value : 0
                    }
                    dailyPercentData={
                      packagesDaily !== undefined ? packagesDaily.value : 0
                    }
                    setTabIndex={setTabIndex}
                  />
                </TabPanel>
                <TabPanel>
                  <PackageRewardPercentage
                    setPercentData={setPercentData}
                    setRefreshList={setRefreshList}
                    percentData={
                      packagesDetail !== undefined ? packagesDetail.value : 0
                    }
                    dailyPercentData={
                      packagesDaily !== undefined ? packagesDaily.value : 0
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
        element={<Navigate to='/apps/package-management/packages' />}
      />
    </Routes>
  );
};

export default PackagesPage;
