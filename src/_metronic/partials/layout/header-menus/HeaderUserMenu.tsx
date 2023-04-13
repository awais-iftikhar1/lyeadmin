import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../app/modules/auth';
import { Languages } from './Languages';
import ValantisLogo from '../../../../app/modules/components/svg/ValantisLogo';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <div className='h-50px logo bg-light p-2'>
              <ValantisLogo />
            </div>
          </div>

          <div className='d-flex flex-column'>
            <h4 className='fw-bold text-dark fw-bolder fs-4 mb-1'>
              {currentUser?.username}
            </h4>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.id} {currentUser?.id}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-2 mb-0'>
                {currentUser?.adminRole?.role}
              </span>
            </div>
          </div>
        </div>
        <p className='fw-bold text-muted text-hover-primary px-4 fs-7'>
          {currentUser?.email}
        </p>
      </div>

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <Link to='/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>

      <div className='menu-item px-5'>
        <p onClick={logout} className='menu-link px-5'>
          Sign Out
        </p>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
