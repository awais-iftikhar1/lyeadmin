import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../app/modules/auth';
import ValantisLogo from '../../../../app/modules/components/svg/ValantisLogo';
import { KTSVG } from '../../../helpers';
import { useLayout } from '../../core';
import { Topbar } from './Topbar';

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout();
  const { aside } = config;

  const { userDetails } = useAuth();
  const Privileges = userDetails?.user?.adminRole?.privileges.map((element) => {
    return element.toLowerCase().split(/\s+/)[0];
  });

  return (
    <div
      id='kt_header'
      className={clsx(
        'header',
        classes.header.join(' '),
        'align-items-stretch'
      )}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div
            className='d-flex align-items-center d-lg-none ms-n3 me-1'
            title='Show aside menu'
          >
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG
                path='/media/icons/duotune/abstract/abs015.svg'
                className='svg-icon-2x mt-1'
              />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='aside-logo d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link
              to={`/${
                Privileges &&
                (Privileges[0] === 'dashbord'
                  ? 'dashbord'
                  : `${Privileges[0]}-management/${Privileges[0]}`)
              }`}
              className='d-lg-none'
            >
              <div className='h-35px logo'>
                <ValantisLogo />
              </div>
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <div className='aside-logo d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/' className='d-lg-none'>
              <div className='h-35px logo'>
                <ValantisLogo />
              </div>
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-end flex-lg-grow-1'>
          {/* begin::Navbar */}
          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  );
}
