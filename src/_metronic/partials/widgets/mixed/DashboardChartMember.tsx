/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { getCSS, getCSSVariableValue } from '../../../assets/ts/_utils';
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';
import { KTSVG } from '../../../helpers';
import TabButtons from '../../tabs/TabButtons';
import moment from 'moment';

type Props = {
  className: string;

  timeline: number;
  setTimeline: Function;
  graphData: any;
  data: any;
};

const DashboardChartPatron: React.FC<Props> = ({
  className,
  timeline,
  setTimeline,
  graphData,
  data,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  const refreshMode = () => {
    if (!chartRef.current) {
      return;
    }

    const allEarning = graphData?.allEarnings?.map(
      (response: { total_earnings: number }) => {
        return response.total_earnings.toFixed(2);
      }
    );

    const excludingHighest = graphData?.allSales?.map(
      (response: { total_sale: number }) => {
        return response.total_sale.toFixed(2);
      }
    );

    const duration = graphData?.allSales?.map(
      (response: { createdAt: number }) => {
        if (timeline === 0) {
          return moment(response.createdAt).format('HH:mm:ss');
        } else if (timeline === 5 || timeline === 4 || timeline === 3) {
          return moment(response.createdAt).format('MMM-YYYY');
        } else {
          return moment(response.createdAt).format('DD-MMM');
        }
      }
    );

    const height = parseInt(getCSS(chartRef.current, 'height'));

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, excludingHighest, allEarning, duration)
    );
    if (chart) {
      chart.render();
    }

    return chart;
  };

  const btnDataRight = [
    {
      name: '24hr',
      title: '24H',
    },
    {
      name: '7days',
      title: '7D',
    },
    {
      name: '30days',
      title: '30D',
    },
    {
      name: '90day',
      title: '90D',
    },
    {
      name: '180days',
      title: '180D',
    },
    {
      name: '1year',
      title: '1Y',
    },
  ];

  useEffect(() => {
    const chart = refreshMode();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [graphData, chartRef, mode]);

  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>
              Recent Transactions
            </span>

            <span className='text-muted fw-semibold fs-7'>
              More than 1000 new records
            </span>
          </h3>

          {/* begin::Toolbar */}
          <TabButtons
            addClass='btn-right mt-0'
            dataElement={btnDataRight}
            setTimeline={setTimeline}
          />
          {/* end::Toolbar */}
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className='card-body'>
          {/* begin::Chart */}
          <div
            ref={chartRef}
            id='kt_charts_widget_3_chart'
            style={{ height: '350px' }}
          ></div>
          {/* end::Chart */}
        </div>
        {/* end::Body */}
      </div>
      <div className='card-body bg-white rounded-3 p-0'>
        {/* begin::Stats */}
        <div className='card-p mt-n15 position-relative'>
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7'>
              <KTSVG
                path='/media/icons/duotune/general/gen048.svg'
                className='svg-icon-3x svg-icon-warning d-block my-2'
              />
              <p className='text-warning fw-semibold fs-6'>Active Users</p>
              <span className='card-label fw-bold fs-3 d-block mb-1'>
                {data.activeUsers}
              </span>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7'>
              <KTSVG
                path='/media/icons/duotune/general/gen014.svg'
                className='svg-icon-3x svg-icon-primary d-block my-2'
              />
              <p className='text-primary fw-semibold fs-6'>Total Earning</p>
              <span className='card-label fw-bold fs-3 d-block mb-1'>
                {data.totalEarnings}
              </span>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7'>
              <KTSVG
                path='/media/icons/duotune/general/gen025.svg'
                className='svg-icon-3x svg-icon-warning d-block my-2'
              />
              <p className='text-warning fw-semibold fs-6'>Total Packages</p>
              <span className='card-label fw-bold fs-3 d-block mb-1'>
                {data.totalPackages}
              </span>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7'>
              <KTSVG
                path='/media/icons/duotune/general/gen051.svg'
                className='svg-icon-3x svg-icon-primary d-block my-2'
              />
              <p className='text-primary fw-semibold fs-6'>Total Sales</p>
              <span className='card-label fw-bold fs-3 d-block mb-1'>
                {data.totalSales}
              </span>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            {/* <div className="col bg-light-danger px-6 py-8 rounded-2 me-7">
                <KTSVG
                  path="/media/icons/duotune/abstract/abs027.svg"
                  className="svg-icon-3x svg-icon-danger d-block my-2"
                />
                <p className="text-danger fw-semibold fs-6 mt-2">Total Users</p>
                <span className="card-label fw-bold fs-3 d-block mb-1">
                  {data.totalUsers}
                </span>
              </div> */}
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-success px-6 py-8 rounded-2'>
              <KTSVG
                path='/media/icons/duotune/communication/com010.svg'
                className='svg-icon-3x svg-icon-success d-block my-2'
              />
              <p className='text-success fw-semibold fs-6 mt-2'>Total Users</p>
              <span className='card-label fw-bold fs-3 d-block mb-1'>
                {data.totalUsers}
              </span>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}
      </div>
    </>
  );
};

function getChartOptions(
  height: number,
  excludingHighest: any,
  allEarning: any,
  duration: any
): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');
  const baseColor = getCSSVariableValue('--kt-info');
  const lightColor = getCSSVariableValue('--kt-info-light');

  return {
    series: [
      {
        name: 'Net Profit',
        data: allEarning,
      },
      {
        name: 'Revenue',
        data: excludingHighest,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: duration,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands';
        },
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}

export { DashboardChartPatron };
