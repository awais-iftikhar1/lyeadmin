import Select from 'react-select';

const OptionsOutsideSelect = (props: any) => {
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
      // eslint-disable-next-line no-restricted-globals
      { name, action: 'remove-value', removedValue }
    );
  };

  return (
    <div>
      <div>
        {isMulti
          ? value.map((val: any) => (
              <div key={val.value}>
                {val.label}
                <button name={val.value} onClick={handleRemoveValue}>
                  ✕
                </button>
              </div>
            ))
          : null}
      </div>
      <Select {...props} controlShouldRenderValue={!isMulti} />
    </div>
  );
};

export default OptionsOutsideSelect;
