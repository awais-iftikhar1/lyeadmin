/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { PageLink, PageTitle } from '../../../../_metronic/layout/core';
import Pagination from 'rc-pagination';
import { KTCard, KTCardBody } from '../../../../_metronic/helpers';
import { FuelListing } from '../../../../_metronic/partials/widgets/tables/FuelListing';
import { getFuelType } from '../../../api/get/getFuelType';
import Toast from '../../components/Toast';
import { EngineListing } from '../../../../_metronic/partials/widgets/tables/EngineListing';
import { getEngineType } from '../../../api/engineType.ts';
import { FilterListing } from '../../../../_metronic/partials/widgets/tables/FilterListing';
import { getFilterType } from '../../../api/filterType.ts';
import { getFilters } from '../../../api/filters.ts';
import { IOptionValue } from '../user-roles/roles-privileges-list/rolesPrivilegesModel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FilterTypeListing } from '../../../../_metronic/partials/widgets/tables/FilterTypeListing';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Filters Management',
    path: '/filter-management/filters',
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

const FilterType = () => {
  const [filterList, setFilterList] = useState<string[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [stateMsg, setStateMsg] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [boolState, setBoolState] = useState<string>('');
  const [tabIndex, setTabIndex] = useState(0);
  const [userCount, setUserCount] = useState<number>(0);

  const [value, setValue] = useState<string>('1');


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
      const data = await getFilterType(pageSize, page - 1);
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
  }, [refreshList,value]);

  console.log(value);
  

  return (

           <>
                  <FilterTypeListing
                    className='mb-5 mb-xl-8'
                    data={filterList}
                    setRefreshList={setRefreshList}
                    loading={isloading}
                    setTabIndex={setTabIndex}
                  />
              
              <Toast
                showToast={showToast}
                state={boolState}
                setShowToast={setShowToast}
                message={stateMsg}
              />
            
           </>
          
    
     
  );
};

export default FilterType;
