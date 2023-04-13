/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { UserListing } from '../../../../../../_metronic/partials/widgets/tables/UserListing';
import { KTCardBody } from '../../../../../../_metronic/helpers';
import { getUserData } from '../../../../../api/get/getUserData';
import Pagination from 'rc-pagination';
import { filterList } from './utils';
import { IUserProps } from './type';
import useDebouncedChangeHandler from '../../../../../hook/useDebouncedChangeHandler';


const UserSection : React.FC<IUserProps>= ({pushReference}) => {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [userData, setUserData] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const [userCount, setUserCount] = useState<number>(0);

  const [perPage] = useState<number>(10);
  const [size, setSize] = useState<number>(perPage);
  const [current, setCurrent] = useState<number>(1);
  const [, debounceSearch] = useDebouncedChangeHandler(search, (value) => _search(value))




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
    return lotteryData(current, pageSize);
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

  const lotteryData = async (pageSize: number, page: number) => {
    setIsLoading(true);
    try {
      const data: any = await getUserData(pageSize, page - 1, search, filter);
      setUserData(data?.data.users);
      setUserCount(data?.data.count);
    } catch (error) {
      console.error('Error', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    lotteryData(size, current);
    setRefreshList(false);
  }, [refreshList]);

  useEffect(() => {
    lotteryData(size, 1);
  }, [filter]);

  const _search = (value : string) => {
    search.length >= 3 && lotteryData(size, 1);
    search.length === 0 && lotteryData(size, current);
  }

  useEffect(() => {
    // run the debounce function when searchString is changed
    debounceSearch(search)
  }, [search])

  return (
    <KTCardBody className='py-4'>
      <UserListing
        className='mb-xl-8'
        data={userData}
        setRefreshList={setRefreshList}
        loading={isloading}
        setSearch={setSearch}
        search={search}
        filterData={filterList}
        setFilter={setFilter}
        pushReference={pushReference}
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
  );
};

export { UserSection };
