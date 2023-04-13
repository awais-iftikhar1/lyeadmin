import React from 'react';
import { KTSVG } from '../../../helpers';

type Props = {
  className: string;
  color: string;
  svgIcon: string;
  iconColor: string;
  title: string;
  titleColor?: string;
  description: string;
  descriptionColor?: string;
};

const StatisticsWidget5: React.FC<Props> = ({
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
    <p className={`card bg-${color} hoverable ${className}`}>
      <div className='card-body'>
        <KTSVG
          path={svgIcon}
          className={`svg-icon-${iconColor} svg-icon-3x ms-n1`}
        />

        <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5`}>
          {title}
        </div>

        <div className={`fw-semibold text-${descriptionColor}`}>
          {description}
        </div>
      </div>
    </p>
  );
};

export { StatisticsWidget5 };
