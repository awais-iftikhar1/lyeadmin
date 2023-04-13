/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ReferenceListing } from '../../../../../../_metronic/partials/widgets/tables/ReferenceListing';
import { KTCardBody } from '../../../../../../_metronic/helpers';
import { getUserReferrals } from '../../../../../api/get/getUserReferrals';
import Pagination from 'rc-pagination';
import { IReferralProps } from './type';
import useDebouncedChangeHandler from '../../../../../hook/useDebouncedChangeHandler';

const ReferralSection: React.FC<IReferralProps> = ({
  pushReference,
  pageStack,
  popReference,
}) => {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [userData, setUserData] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [, debounceSearch] = useDebouncedChangeHandler(search, (value) => _search(value))

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
    const lastElement = pageStack.slice(-1)[0];
    try {
      const data: any = await getUserReferrals(
        lastElement.id,
        pageSize,
        page - 1,
        search,
        ''
      );
      setUserData(data?.data.totalReferrals);
      setUserCount(data?.data.totalReferralCount);
    } catch (error) {
      console.error('Error', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    lotteryData(size, current);
    setRefreshList(false);
  }, [refreshList, pageStack]);

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
      <button
        type='button'
        className='btn text-dark fw-bold text-hover-primary px-0'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        data-kt-menu-flip='top-end'
        onClick={() => {
          popReference();
        }}
      >
        Back
      </button>
      <ReferenceListing
        className='mb-xl-8'
        data={userData}
        setRefreshList={setRefreshList}
        loading={isloading}
        setSearch={setSearch}
        search={search}
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

export { ReferralSection };
