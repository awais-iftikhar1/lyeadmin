/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import {  PageTitle } from '../../../../_metronic/layout/core';
import Pagination from 'rc-pagination';
import { KTCard, KTCardBody } from '../../../../_metronic/helpers';
import Toast from '../../components/Toast';
import { viewOilGrade, viewOilManufacture } from '../../../api/Oil';
import { YearListing } from '../../../../_metronic/partials/widgets/tables/YearListing';
import { viewYear } from '../../../api/Year';
import { breadCrumbsData, routes } from '../../../utils/constants';
import { usePathName } from '../../../hook/usePathName';
import { ColorListing } from '../../../../_metronic/partials/widgets/tables/ColorListing';
import { getColour } from '../../../api/Colors';
import { BusinessDetailListing } from '../../../../_metronic/partials/widgets/tables/BusinessDetailListing';
import { viewBusinessType } from '../../../api/Business';



const BusinessDetail = () => {
  const [filterList, setFilterList] = useState<string[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [stateMsg, setStateMsg] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [tabIndex, setTabIndex] = useState(0);
  const [userCount, setUserCount] = useState<number>(0);
  const {route} = usePathName()

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
    return filterData(current, pageSize);
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

  const filterData = async (pageSize: number, page: number) => {
    setIsLoading(true);
    try {
      const data = await viewBusinessType();
      console.log(data);
      
      setFilterList(data?.data);
      // setUserCount(data?.data.count);
    } catch (error) {
      console.log('Error', error);
      setBoolState('fail');
        setShowToast(true);
        setStateMsg(error as any);
    }
    setIsLoading(false);
  };


  
  useEffect(() => {
    filterData(size, current);
    setRefreshList(false);
  }, [refreshList]);

  return (
    <Routes>
    <Route element={<Outlet />}>
      <Route
        path='business'
        element={
          <>
          
            <PageTitle breadcrumbs={breadCrumbsData['Business Type']}>{routes[route as keyof typeof routes] }</PageTitle>

      

            
              <KTCard>
                  <KTCardBody className='py-4'>
                    <BusinessDetailListing
                      className='mb-5 mb-xl-8'
                      data={filterList}
                      setRefreshList={setRefreshList}
                      loading={isloading}
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
            
            <Toast
              showToast={showToast}
              state={boolState}
              setShowToast={setShowToast}
              message={stateMsg}
            />
          </>
          
        }
      />
    </Route>
    <Route
      index
      element={<Navigate to='/apps/business-management/business' />}
    />
  </Routes>
  );
};

export default BusinessDetail;
