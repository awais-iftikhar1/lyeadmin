import React from 'react';
// import { KTSVG } from '../../../helpers';

type Props = {
  className: string;
  color: string;
  svgIcon: string;
  circleColor: string;
  title: string;
  titleColor?: string;
  description: string;
  descriptionColor?: string;
  ticketNumber?: string;
  country: string;
  prize: string;
};

const LotteryWinnerCard: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  circleColor,
  title,
  titleColor,
  description,
  descriptionColor,
  ticketNumber,
  country,
  prize,
}) => {
  return (
    <p className={`card bg-light-${color} hoverable text-center ${className}`}>
      <div className='card-body'>
        <h2 className={`text-${titleColor} fw-bold fs-1 mb-2 mt-5`}>{title}</h2>

        <span className='symbol symbol-50px mt-5 mb-5'>
          <span
            className={`symbol-label rounded-circle fs-3 fw-bold bg-${circleColor} text-${color}`}
          >
            {ticketNumber}
          </span>
        </span>

        <div className={`fw-semibold fs-2 text-${descriptionColor}`}>
          {description}
        </div>

        <div className={`fw-semibold fs-4 text-dark`}>{country}</div>

        <div className={`text-${titleColor} fw-bold fs-1 mb-2 mt-5`}>
          {prize}
        </div>
      </div>
    </p>
  );
};

export { LotteryWinnerCard };
