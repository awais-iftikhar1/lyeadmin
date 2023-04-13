import { FC } from 'react';
import { useLayout } from '../core';

const Footer: FC = () => {
  const { classes } = useLayout();
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1'>
          <span className='text-muted fw-bold me-2'>
            {new Date().getFullYear()} &copy;
          </span>
          <p className='text-gray-800 text-hover-primary'>valantis</p>
        </div>
        {/* end::Copyright */}
      </div>
      {/* end::Container */}
    </div>
  );
};

export { Footer };
