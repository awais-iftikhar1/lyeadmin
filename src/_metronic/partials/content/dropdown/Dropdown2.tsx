import { FC } from 'react';

const Dropdown2: FC = () => {
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content fs-6 text-dark fw-bolder px-3 py-4'>
          Quick Actions
        </div>
      </div>

      <div className='separator mb-3 opacity-75'></div>

      <div className='menu-item px-3'>
        <p className='menu-link px-3'>New Ticket</p>
      </div>

      <div className='menu-item px-3'>
        <p className='menu-link px-3'>New Customer</p>
      </div>

      <div
        className='menu-item px-3'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='right-start'
        data-kt-menu-flip='left-start, top'
      >
        <p className='menu-link px-3'>
          <span className='menu-title'>New Group</span>
          <span className='menu-arrow'></span>
        </p>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <p className='menu-link px-3'>Admin Group</p>
          </div>

          <div className='menu-item px-3'>
            <p className='menu-link px-3'>Staff Group</p>
          </div>

          <div className='menu-item px-3'>
            <p className='menu-link px-3'>Member Group</p>
          </div>
        </div>
      </div>

      <div className='menu-item px-3'>
        <p className='menu-link px-3'>New Contact</p>
      </div>

      <div className='separator mt-3 opacity-75'></div>

      <div className='menu-item px-3'>
        <div className='menu-content px-3 py-3'>
          <p className='btn btn-primary  btn-sm px-4'>Generate Reports</p>
        </div>
      </div>
    </div>
  );
};

export { Dropdown2 };
