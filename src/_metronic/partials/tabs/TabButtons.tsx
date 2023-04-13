import React, { useState } from 'react';

interface TabButtonsProps {
  addClass?: string;
  dataElement: any;
  setTimeline: Function;
}

// interface ObjectProps {
//   name: string;
//   title: string;
// }

const TabButtons: React.FC<TabButtonsProps> = ({
  addClass,
  dataElement,
  setTimeline,
}: TabButtonsProps) => {
  const [isActive, setIsActive] = useState<string>('30days');
  const handleClick = (e: any) => {
    setIsActive(e.currentTarget.name);
  };

  return (
    <div className={`card-toolbar ${addClass}`} data-kt-buttons='true'>
      {dataElement.map((item: any, index: number) => (
        <button
          key={index}
          data-index={index}
          id='kt_charts_widget_3_year_btn'
          name={item.name}
          className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
            isActive === `${item.name}` ? 'active' : ''
          }`}
          onClick={(e) => {
            handleClick(e);
            setTimeline(e.currentTarget.getAttribute('data-index'));
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
