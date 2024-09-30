import React, { useState } from 'react';

import styled from 'styled-components';
import Select, { components } from 'react-select';

const DropDownContainer = styled.div`
  display: inline-flex;
  /* width: auto; */
  /* min-width: ${(props) =>
    props.setWidth === 'long'
      ? '224px'
      : props.setWidth === 'short'
      ? '164px'
      : '191px'}; */
  /* max-width: 100%;  */
  position: relative;
  font-size: 12px;
  flex-grow: 1;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: absolute;
  top: -7px;
  left: 10px;
  z-index: ${(props) => (props.isDropdownOpen ? 0 : 5)};
  font-size: 12px;
  padding: 0px 4px;
  color: ${(props) => props.color};
  font-weight: 700;
`;

const Wrap = styled.div``;
const CustomMultiValue = (props) => {
  return (
    <components.MultiValue {...props}>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        {props.children}
      </div>
    </components.MultiValue>
  );
};
const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      {/* You can leave this empty or add a custom icon if needed */}
    </components.DropdownIndicator>
  );
};

// Custom ClearIndicator to remove the cross icon in the dropdown
const CustomClearIndicator = () => null;
const AddCurrencyDropdown = (props) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  console.log(props.Data);
  const colourOptions =
    Array.isArray(props.Data) && typeof props.Data[0] === 'string'
      ? props.Data.map((item) => item.title)
      : props.Data;

  const getLabelColor = () => (props.check ? themeKeys.c13 : '#58606f');

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      whiteSpace: 'nowrap', // Prevents wrapping to the next line
      overflow: 'hidden',
      textOverflow: 'ellipsis', // Adds "..." when the content overflows
      backgroundColor: state.isDisabled ? 'transparent' : '#fff',
      border: state.isFocused ? '1px solid #157BEA' : '1px solid #464f604d',
      boxShadow: state.isFocused ? '0 0 0 1px none' : 'none',
      '&:hover': {
        border: state.isFocused ? '1px solid #157BEA' : '1px solid #464f604d',
      },
      minHeight: '44px',
      minWidth: '191px',
      flexGrow: 1,
      display: 'flex', // Ensure that the select element behaves as a flexbox child
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
    }),
    option: (provided, state) => {
      const isAddNewOption = state.data.value === 'addNew';
      return {
        ...provided,
        fontSize: '13px',
        color: isAddNewOption ? '#157BEA' : '#58606f', // Change color for "Add New"
        backgroundColor: isAddNewOption ? '#f0f8ff' : '#fff', // Optional: Change background color for "Add New"
        fontWeight: isAddNewOption ? 'bold' : 'normal',
        '&:hover': {
          backgroundColor: isAddNewOption ? '#e0f0ff' : '#e0f0ff', // Hover effect for "Add New"
        },
      };
    },
    multiValue: (provided, state) => ({
      ...provided,
      display: 'inline-flex',
      whiteSpace: 'nowrap',
      marginRight: '5px',
      borderRadius: 100,
      background: '#DFEDFD',
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: 'gray',
      fontSize: '11px',
      borderRadius: '10px',
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: 'gray',
      '&:hover': {
        backgroundColor: '#e0f0ff',
        color: '#157BEA',
      },
    }),
    menuList: (base) => ({
      ...base,
      '::-webkit-scrollbar': {
        width: '4px',
        height: '0px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#888',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#464f604d' : '#abafb7',
      fontSize: '13px',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#464f604d' : '#58606f',
      fontSize: '12px',
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      width: '33px',
      height: '33px',
      marginBottom: '3px',
      color: '#58606f',
    }),
    input: (provided, state) => ({
      ...provided,
      color: '#6a727f',
    }),
  };

  const value =
    typeof props.value === 'string'
      ? colourOptions.find((option) => option.value === props.value)
      : props.value;

  const handleChange = (selectedOption) => {
    console.log('Selected option in DropdownInput component:', selectedOption);

    if (props.onChange) {
      props.onChange(selectedOption);
    }
  };
  // const HandleClose = () => {
  //   setIsModalOpen(false);
  //   alert("Sorry your Currency is not Saved!");
  // };
  // const HandleSave = () => {
  //   setIsModalOpen(false);
  //   alert("Your Currency is Saved!");
  // };

  return (
    <>
      <DropDownContainer setWidth={props.setWidth}>
        <Title color={getLabelColor()}>{props.Name}</Title>
        <Wrap>
          <Select
            multiS
            className="basic-single"
            classNamePrefix="select"
            isDisabled={props.check}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={colourOptions}
            styles={customStyles}
            value={value}
            onChange={handleChange}
            isMulti
            components={{
              MultiValue: CustomMultiValue,
              DropdownIndicator: CustomDropdownIndicator,
              ClearIndicator: CustomClearIndicator,
            }} // Custom components
          />
        </Wrap>
      </DropDownContainer>
      {/* {isModalOpen && (
        <AddCurrencyModal CancelAction={HandleClose} SaveAction={HandleSave} />
      )} */}
    </>
  );
};

export default AddCurrencyDropdown;
