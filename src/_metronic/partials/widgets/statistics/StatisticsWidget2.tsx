import React from 'react';
import { toAbsoluteUrl } from '../../../helpers';

type Props = {
  className: string;
  title: string;
  description: string;
  avatar: string;
};

const StatisticsWidget2: React.FC<Props> = ({
  className,
  title,
  description,
  avatar,
}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body d-flex align-items-center pt-3 pb-0'>
        <div className='d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2'>
          <p className='fw-bold text-dark fs-4 mb-2 text-hover-primary'>
            {title}
          </p>

          <span
            className='fw-semibold text-muted fs-5'
            dangerouslySetInnerHTML={{ __html: description }}
          ></span>
        </div>

        <img
          src={toAbsoluteUrl(avatar)}
          alt=''
          className='align-self-end h-100px'
        />
      </div>
      {/* end::Body */}
    </div>
  );
};

export { StatisticsWidget2 };
