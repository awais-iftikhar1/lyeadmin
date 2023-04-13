import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

type Props = {
  addClass?: string;
};

const CustomTabs: FC<Props> = ({ addClass }) => {
  const location = useLocation();

  return (
    <div className={`container ${addClass}`}>
      <div className='d-flex overflow-auto h-55px'>
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
          <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '/pages/profile/overview' && 'active')
              }
              to='#'
            >
              Overview
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '/pages/profile/projects' && 'active')
              }
              to='#'
            >
              Projects
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '/pages/profile/campaigns' && 'active')
              }
              to='#'
            >
              Campaigns
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '/pages/profile/documents' && 'active')
              }
              to='#'
            >
              Documents
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '/pages/profile/connections' && 'active')
              }
              to='#'
            >
              Connections
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { CustomTabs };
