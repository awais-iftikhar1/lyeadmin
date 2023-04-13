/* eslint-disable react-hooks/exhaustive-deps */
import { KTSVG } from '../../../../../../../_metronic/helpers';

type Props = {
  setSearch: Function;
  search: string;
};

// const UsersListSearchComponent = () => {
const UsersListSearchComponent: React.FC<Props> = ({ setSearch, search }) => {
  return (
    <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1 mt-4 mb-6'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-4'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Search by username'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { UsersListSearchComponent };
