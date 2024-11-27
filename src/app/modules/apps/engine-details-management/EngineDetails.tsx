/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import {  PageTitle } from '../../../../_metronic/layout/core';
import Pagination from 'rc-pagination';
import { KTCard, KTCardBody } from '../../../../_metronic/helpers';
import Toast from '../../components/Toast';
import { Tabs } from 'react-tabs';
import { breadCrumbsData, routes, vehicleTypes } from '../../../utils/constants';
import { usePathName } from '../../../hook/usePathName';
import { viewVehicle } from '../../../api/Vehicle.ts';
import { EngineDetailListing } from '../../../../_metronic/partials/widgets/tables/EngineDetailListing';
import { viewEngine } from '../../../api/EngineDetails.ts';



const EngineDetails = () => {
  const [filterList, setFilterList] = useState<any[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [stateMsg, setStateMsg] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [tabIndex, setTabIndex] = useState(0);
  const [userCount, setUserCount] = useState<number>(0);

  const [vehicleDropDown,setVehicleDropDown]  = useState([])


  const [value, setValue] = useState('Vehicle');
  // const [value, setValue] = useState(0);

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
    return filterData(value,current, pageSize);
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

  const filterData = async (filterType: string,pageSize: number, page: number) => {
    setIsLoading(true);
    try {
      // const data = await viewEngine(id,pageSize, page - 1);
      // console.log(data);
      const data = await viewVehicle(filterType,size, current - 1);
      //@ts-ignore
      // setFilterList(data);
      setFilterList(data?.data.rows);

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
    (async() => {
      const data = await viewVehicle('vehicle',size, current - 1);
      console.log(data);
      let vehicleData = data.data.rows.map((res:any) => {
        return {
          label:res.model.modelName,
          value: res.id
        }
      })
      // setValue(vehicleData?.[0].id)
      setVehicleDropDown(vehicleData)
    })()
  },[])

  useEffect(() => {
    filterData(value ,size, current);
    setRefreshList(false);
  }, [refreshList,value]);

  console.log(value);
    console.log(routes);
    console.log(route);
    
    

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='enginedetails'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbsData['Engine Detail']}>{routes[route as keyof typeof routes] }</PageTitle>

              <Tabs
                selectedTabClassName='btn-primary'
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
              >
              
                <KTCard>
                    <KTCardBody className='py-4'>
                      <EngineDetailListing
                      // filterDropDownData={vehicleDropDown}
                      filterDropDownData={vehicleTypes}

                        setValue={setValue}
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
              
              
              </Tabs>
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
        element={<Navigate to='/apps/vehicle-machine-management/vehiclemachine' />}
      />
    </Routes>
  );
};

export default EngineDetails;
