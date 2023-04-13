import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../../_metronic/layout/core';
import { LotteryListing } from '../../../../_metronic/partials/widgets';
import { getLotteryData } from '../../../api/get/getLotteryData';
import LotteryAdd from './lottery-list/lottery-add';
import LotteryWinner from './lottery-list/lottery-winner';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Lottery Management',
    path: '/lottery-management/lottery',
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

const LotteryPage = () => {
  const [lotteryList, setLotteryList] = useState<string[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const lotteryData = async () => {
    setIsLoading(true);
    try {
      const data: any = await getLotteryData();
      setLotteryList(data?.data);
    } catch (error) {
      console.log('Error');
    }
    setIsLoading(false);
  };

  const announcementDate = lotteryList?.map((items: any, index: number) => {
    const isAnnouncement = items?.is_close ? null : items;
    return { isAnnouncement };
  });

  const isAnnounced = announcementDate
    .filter((item) => item.isAnnouncement !== null && item)
    .map((item: any) =>
      new Date() >= new Date(item?.isAnnouncement?.announcement_date)
        ? true
        : false
    );

  useEffect(() => {
    setIsDisabled(isAnnounced[0]);
  }, [isAnnounced]);

  useEffect(() => {
    lotteryData();
    setRefreshList(false);
  }, [refreshList]);

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='lottery'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Lottery</PageTitle>

              <Tabs selectedTabClassName='btn-primary'>
                <TabList>
                  <Tab className='btn btn-sm btn-light me-3'>User Lottery</Tab>
                  <Tab className='btn btn-sm btn-light me-3'>
                    Lottery LIsting
                  </Tab>
                  <Tab
                    className={`btn btn-sm btn-light me-3 ${
                      !isDisabled && 'is--disabled'
                    }`}
                    disabled={!isDisabled}
                  >
                    Lottery Winners
                  </Tab>
                </TabList>
                <TabPanel>
                  <LotteryAdd setRefreshList={setRefreshList} />
                </TabPanel>
                <TabPanel>
                  <LotteryListing
                    className='mb-5 mb-xl-8'
                    data={lotteryList}
                    setRefreshList={setRefreshList}
                    loading={isloading}
                  />
                </TabPanel>
                <TabPanel>
                  <LotteryWinner setRefreshList={setRefreshList} />
                </TabPanel>
              </Tabs>
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to='/apps/lottery-management/lottery' />}
      />
    </Routes>
  );
};

export default LotteryPage;
