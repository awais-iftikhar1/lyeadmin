import React from 'react';

type Props = {
  className: string;
  color: string;
  circleColor: string;
  title: string;
  titleColor?: string;
  ticketNumber?: string;
  description: string;
  descriptionColor?: string;
};

const SelectWinnerCard: React.FC<Props> = ({
  className,
  color,
  circleColor,
  title,
  titleColor,
  ticketNumber,
  description,
  descriptionColor,
}) => {
  return (
    <p className={`card bg-light-${color} hoverable ${className}`}>
      <div className='card-body d-flex align-items-center justify-content-center flex-column'>
        <h2 className={`text-${titleColor} fw-bold fs-1`}>{title}</h2>

        <span className='symbol symbol-50px mt-5'>
          <span
            className={`symbol-label rounded-circle fs-3 fw-bold bg-${circleColor} text-${color}`}
          >
            {ticketNumber}
          </span>
        </span>

        <div className={`fw-semibold fs-3 mt-5 text-${color}`}>
          {description}
        </div>
      </div>
    </p>
  );
};

export { SelectWinnerCard };
