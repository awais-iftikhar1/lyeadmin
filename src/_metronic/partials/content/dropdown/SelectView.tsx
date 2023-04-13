import React, { useState } from 'react';
import Select, {
  components,
  createFilter,
  MultiValueGenericProps,
} from 'react-select';
import { KTSVG } from '../../../helpers';

type Value = {
  value: string;
  label: string;
  image?: string;
  length?: number;
};

interface Props {
  addClass?: string;
  value?: Value | null;
  data: Value[] | undefined;
  isLotto?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  valueCallback?: Function;
  optionCallback?: Function;
  selectedValue?:
    | {
        value: any;
        label: string;
      }[]
    | [];
  hasDefaultVal?: boolean;
  searchEnable?: boolean;
  setInputValue?: Function;
  multiSelect?: boolean;
  onChange?: () => void;
}

const SelectView: React.FC<Props> = ({
  addClass,
  value,
  data,
  isLotto,
  isDisabled,
  placeholder,
  valueCallback,
  selectedValue,
  optionCallback,
  hasDefaultVal,
  setInputValue,
  searchEnable,
  multiSelect,
  onChange,
}) => {
  const filterOptions = {
    ignoreCase: true,
    ignoreAccents: false,
    trim: false,
    matchFromStart: true,
  };

  const { ignoreCase, ignoreAccents, trim, matchFromStart } = filterOptions;
  const filterConfig = {
    ignoreCase,
    ignoreAccents,
    trim,
    matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
  };
  const [menuOpen, setmenuOpen] = useState(false);

  let options = data;
  let selectedOptions = selectedValue;

  const DropdownIndicator = (props: any) => {
    const { menuIsOpen } = props.selectProps;
    menuIsOpen ? setmenuOpen(true) : setmenuOpen(false);

    return (
      <components.DropdownIndicator {...props}>
        <KTSVG
          path='/media/icons/duotune/arrows/arr072.svg'
          className='svg-icon-3'
        />
      </components.DropdownIndicator>
    );
  };

  const MultiValueContainer = (props: MultiValueGenericProps<any>) => {
    const { value: selectedValue } = props.selectProps;

    return (
      <components.MultiValueContainer {...props}>
        <p className='fw-semibold fs-5 text-gray-600 mb-0'>
          {selectedValue.length} items selected
        </p>
      </components.MultiValueContainer>
    );
  };

  if (data) {
    options = data?.map((items: any, index: number) => {
      return {
        label: items?.userName,
        value: items?.lotteryNo,
        key: index,
      };
    });
  }

  if (selectedValue) {
    selectedOptions = selectedValue?.map((items: any, index: number) => {
      return {
        label: items,
        value: items,
        key: index,
      };
    });
  }

  const onSelectOption = (value: any) => {
    onChange !== undefined && onChange();
    valueCallback !== undefined && valueCallback(value !== null && value.value);
    optionCallback !== undefined && optionCallback(value);
  };

  const handleInputChange = (value: any) => {
    setInputValue !== undefined && setInputValue(value);
  };

  return (
    <div className={addClass}>
      <Select
        isMulti={multiSelect}
        className={`${menuOpen ? 'menu--open' : ''}`}
        filterOption={createFilter(filterConfig)}
        isSearchable={searchEnable ? true : false}
        value={value}
        defaultValue={selectedValue?.length ? selectedOptions : null}
        // inputValue={data}
        // menuIsOpen={true}
        isDisabled={isDisabled}
        onInputChange={handleInputChange}
        onChange={onSelectOption}
        options={isLotto ? options : data}
        placeholder={placeholder}
        components={{ MultiValueContainer, DropdownIndicator }}
        formatOptionLabel={(items: any) => (
          <div
            className={`options capital-case ${isLotto ? 'd-flex' : ''}${
              items.value === value?.value && 'is--selected'
            }`}
          >
            {isLotto && (
              <p className={`pe-10 fw-bold fs-5 text-primary mb-0`}>
                {items.value}
              </p>
            )}
            <p className={`fw-semibold fs-5 text-gray-600 mb-0`}>
              {items.label}
            </p>
          </div>
        )}
      />
    </div>
  );
};

const OptionsOutsideSelectElement = (props: any) => {
  const { isMulti, value, onChange } = props;

  const handleRemoveValue = (e: { currentTarget: { name: any } }) => {
    if (!onChange) return;
    const { name: buttonName } = e.currentTarget;
    const removedValue = value.find(
      (val: { value: any }) => val.value === buttonName
    );
    if (!removedValue) return;
    onChange(
      value.filter((val: { value: any }) => val.value !== buttonName),
      { action: 'remove-value', removedValue }
    );
  };

  return (
    <>
      {value !== null && isMulti
        ? value?.map((val: any, index: number) => (
            <div
              key={index}
              className='position-relative border border-gray-300 border-dashed rounded min-w-150px py-4 px-4 me-6 mb-3'
            >
              <div
                key={val.value}
                className='fw-bold fs-6 text-gray-400 text-center'
              >
                <button
                  className='btn w-25px h-25px btn-icon btn-bg-color btn-round icon-close'
                  name={val.value}
                  onClick={handleRemoveValue}
                >
                  <KTSVG
                    className='svg-icon-1'
                    path='/media/icons/duotune/arrows/arr061.svg'
                  />
                </button>
                {val.label}
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export { SelectView, OptionsOutsideSelectElement };
