import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { getLoginDetails } from '../../../api/get/getLoginDetails';

const Error404: FC = () => {
  const [privileges, setPrivileges] = useState();

  useEffect(() => {
    (async () => {
      const { user } = await getLoginDetails();
      setPrivileges(
        user?.adminRole?.privileges.map((element: string) => {
          return element.toLowerCase().split(/\s+/)[0];
        })
      );
    })();
  }, []);

  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-center flex-column-fluid p-10'>
        {/* begin::Illustration */}
        <img
          src={toAbsoluteUrl('/media/illustrations/sketchy-1/18.png')}
          alt=''
          className='mw-100 mb-10 h-lg-450px'
        />
        {/* end::Illustration */}
        {/* begin::Message */}
        <h1 className='fw-bold mb-10' style={{ color: '#A3A3C7' }}>
          Seems there is nothing here
        </h1>
        {/* end::Message */}
        {/* begin::Link */}
        <Link
          // to={`/${
          //   privileges &&
          //   (privileges[0] === 'dashbord'
          //     ? 'dashbord'
          //     : `${privileges[0]}-management/${privileges[0]}`)
          // }`}
          to={`/auth`}
          className='btn btn-primary'
          onClick={()=>localStorage.clear()}
        >
          Return Home
        </Link>
        {/* end::Link */}
      </div>
    </div>
  );
};

export { Error404 };
