import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_metronic/layout/core';
import { getDashboardData } from '../../api/get/getDashboardData';
import { INTERVAL_ENUM } from '../../utils/enum';
import { DashboardPage } from './DashboardPage';

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  const [dashboardData, setDashboardData] = useState<string[]>([]);

  const graphItem = [
    {
      interval: INTERVAL_ENUM.HOURLY,
      totalIntervals: 24,
    },
    {
      interval: INTERVAL_ENUM.DAILY,
      totalIntervals: 7,
    },
    {
      interval: INTERVAL_ENUM.DAILY,
      totalIntervals: 30,
    },
    {
      interval: INTERVAL_ENUM.WEEKLY,
      totalIntervals: 13,
    },
    {
      interval: INTERVAL_ENUM.MONTHLY,
      totalIntervals: 6,
    },
    {
      interval: INTERVAL_ENUM.MONTHLY,
      totalIntervals: 12,
    },
  ];

  const lotteryDetail = async () => {
    try {
      const dashboardData = await getDashboardData();
      setDashboardData(dashboardData?.data);
    } catch (error) {
      console.log('editLottery Error');
    }
  };

  useEffect(() => {
    lotteryDetail();
  }, []);

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      </PageTitle>
      <DashboardPage data={dashboardData} graphItem={graphItem} />
    </>
  );
};

export { DashboardWrapper };
