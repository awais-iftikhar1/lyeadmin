import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../_metronic/helpers';
import { DashboardChart } from '../../../_metronic/partials/widgets';
import { getGraphData } from '../../api/get/getGraphData';
import { getLoginDetails } from '../../api/get/getLoginDetails';
import { useAuth } from '../../modules/auth';

type Props = {
  data: any;
  graphItem: any;
};

const DashboardPage: FC<Props> = ({ data, graphItem }: Props) => {
  const { userDetails } = useAuth();
  const [timeline, setTimeline] = useState<number>(2);
  const [chartUserData, setChartUserData] = useState(null);
  const [interval, setInterval] = useState<string>(graphItem[2].interval);
  const [totalIntervals, setTotalIntervals] = useState<number>(
    graphItem[2].totalIntervals
  );
  const [privileges, setPrivileges] = useState(
    userDetails?.user?.adminRole?.privileges.map((element) => {
      return element.toLowerCase().split(/\s+/)[0];
    })
  );

  useEffect(() => {
    setInterval(graphItem[timeline].interval);
    setTotalIntervals(graphItem[timeline].totalIntervals);
  }, [graphItem, timeline]);

  useEffect(() => {
    (async () => {
      try {
        const chartData = await getGraphData(interval, totalIntervals);
        setChartUserData(chartData?.data);
      } catch (error) {
        console.log('editLottery Error');
      }
    })();
  }, [interval, totalIntervals]);

  useEffect(() => {
    (async () => {
      const { user } = await getLoginDetails();
      setPrivileges(
        user?.adminRole?.privileges.map((element: string) => {
          return element.toLowerCase().split(/\s+/)[0];
        })
      );
    })();
  }, []);

  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        <div className='col-12'>
          <DashboardChart
            className='mb-xl-8'
            timeline={1}
            setTimeline={setTimeline}
            graphData={chartUserData}
          />

          <div className='card-body bg-white rounded-3 p-0'>
            {/* begin::Stats */}
            <div className='card-p mt-n15 position-relative'>
              {/* begin::Row */}
              <div className='row g-0'>
                {/* begin::Col */}
                <Link
                  style={{
                    cursor: `${
                      !privileges?.includes('user') ? 'auto' : 'pointer'
                    }`,
                  }}
                  to={
                    privileges?.includes('user') ? '/user-management/user' : ''
                  }
                  className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7'
                >
                  <KTSVG
                    path='/media/icons/duotune/general/gen048.svg'
                    className='svg-icon-3x svg-icon-warning d-block my-2'
                  />
                  <p className='text-warning fw-semibold fs-6'>Active Users</p>
                  <span className='card-label fw-bold fs-3 d-block mb-1'>
                    {data.activeUsers}
                  </span>
                </Link>
                {/* end::Col */}
                {/* begin::Col */}
                <Link
                  style={{
                    cursor: `${
                      !privileges?.includes('user') ? 'auto' : 'pointer'
                    }`,
                  }}
                  to={
                    privileges?.includes('user') ? '/wallet-management/wallet' : ''
                  }
                  className='col bg-light-primary px-6 py-8 rounded-2 mb-7'
                >
                  <KTSVG
                    path='/media/icons/duotune/custom/dollarbag001.svg'
                    className='svg-icon-3x svg-icon-primary d-block my-2'
                  />
                  <p className='text-primary fw-semibold fs-6'>Total Earning</p>
                  <span className='card-label fw-bold fs-3 d-block mb-1'>
                    {data.totalEarnings}
                  </span>
                </Link>
                {/* end::Col */}
              </div>
              {/* end::Row */}
              {/* begin::Row */}
              <div className='row g-0'>
                {/* begin::Col */}
                <Link
                  style={{
                    cursor: `${
                      !privileges?.includes('packages') ? 'auto' : 'pointer'
                    }`,
                  }}
                  to={
                    privileges?.includes('packages')
                      ? '/packages-management/packages'
                      : ''
                  }
                  className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7'
                >
                  <KTSVG
                    path='/media/icons/duotune/custom/dollarpouch001.svg'
                    className='svg-icon-3x svg-icon-warning d-block my-2'
                  />
                  <p className='text-warning fw-semibold fs-6'>
                    Total Packages
                  </p>
                  <span className='card-label fw-bold fs-3 d-block mb-1'>
                    {data.totalPackages}
                  </span>
                </Link>
                {/* end::Col */}
                {/* begin::Col */}
                <Link
                  style={{
                    cursor: `${
                      !privileges?.includes('user') ? 'auto' : 'pointer'
                    }`,
                  }}
                  to={
                    privileges?.includes('user') ? '/wallet-management/wallet' : ''
                  }
                  className='col bg-light-primary px-6 py-8 rounded-2 mb-7'
                >
                  <KTSVG
                    path='/media/icons/duotune/custom/globalmoney001.svg'
                    className='svg-icon-3x svg-icon-primary d-block my-2'
                  />
                  <p className='text-primary fw-semibold fs-6'>Total Sales</p>
                  <span className='card-label fw-bold fs-3 d-block mb-1'>
                    {data.totalSales}
                  </span>
                </Link>
                {/* end::Col */}
              </div>
              {/* end::Row */}
              {/* begin::Row */}
              <div className='row g-0'>
                {/* begin::Col */}
                <Link
                  style={{
                    cursor: `${
                      !privileges?.includes('user') ? 'auto' : 'pointer'
                    }`,
                  }}
                  to={
                    privileges?.includes('user') ? '/user-management/user' : ''
                  }
                  className='col bg-light-success px-6 py-8 rounded-2'
                >
                  <KTSVG
                    path='/media/icons/duotune/custom/mutiuser001.svg'
                    className='svg-icon-3x svg-icon-success d-block my-2'
                  />
                  <p className='text-success fw-semibold fs-6 mt-2'>
                    Total Users
                  </p>
                  <span className='card-label fw-bold fs-3 d-block mb-1'>
                    {data.totalUsers}
                  </span>
                </Link>
                {/* end::Col */}
              </div>
              {/* end::Row */}
            </div>
            {/* end::Stats */}
          </div>
        </div>
      </div>
      {/* end::Row */}
    </>
  );
};

export { DashboardPage };
