import React from 'react';
import { KTSVG } from '../../../helpers';

type Props = {
  className: string;
  color: string;
  svgIcon: string;
  iconColor: string;
  title: string;
  titleColor?: string;
  description: number;
  descriptionColor?: string;
};

const LotteryDetailCard: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
}) => {
  return (
    <p className={`card bg-light-${color} hoverable ${className}`}>
      <div className='card-body'>
        <div className='d-flex'>
          <KTSVG
            path={svgIcon}
            className={`svg-icon-${iconColor} svg-icon-3x ms-n1 me-3`}
          />
          <div className={`text-${titleColor} fw-semibold fs-3 mt-3`}>
            {title}
          </div>
        </div>

        <div className={`fw-bold fs-1 mb-2 mt-5 text-${descriptionColor}`}>
          {description}
        </div>
      </div>
    </p>
  );
};

export { LotteryDetailCard };
