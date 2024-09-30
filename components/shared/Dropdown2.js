import { useState } from 'react';
import styled from '@emotion/styled';
import { MenuItem, FormControl, Select } from '@mui/material';
// import { Box } from '@mui/system';

const DropdownC = styled.div`
  display: flex;

  align-items: center;
`;
// const ContainerDrop = styled.div``;
const Label = styled.span`
  padding: 0.5rem 1rem;
  color: #949494;
`;
const Option = styled.div`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s, padding 0.3s; /* Add transition properties */

  &:hover {
    background-color: ${(props) =>
      props.color === 'red'
        ? '#FFEEEF'
        : '#0f7669'}; /* Change background color on hover */
    color: ${(props) =>
      props.color === 'red'
        ? '#FF5A5F'
        : 'white'}; /* Change text color on hover */

    cursor: pointer; /* Show pointer cursor on hover */
  }
`;
const CustomSelect = styled(Select)`
  font-family: 'DM Sans', sans-serif !important;
  background: ${(props) =>
    props.type === 'standard'
      ? '#ffffff'
      : props.color === 'red'
      ? '#FFEEEF'
      : 'transparent'};

  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
  //
  // props.type === 'outlined' ? '1px solid #94949470' : 'none'};
  border-bottom: ${(props) =>
    props.type === 'standard' ? 'none' : '1px solid #94949470'};
  padding: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.type === 'standard' || props.type === 'outlined' ? '40px' : 'none'};

  &:before {
    border-bottom: 0;
  }

  &:hover {
    background: ${(props) =>
      props.type === 'standard' ? '#ffffff' : 'transparent'};
  }
`;

export default function Dropdown2({
  hasLabel,
  label,
  items,
  width,
  type,
  setHandleOnChange,
  color,
  selected,
  bgcolor,
}) {
  const handleChange = (event) => {
    console.log('event', event.target.value);
    if (setHandleOnChange) setHandleOnChange(event.target.value);
  };

  return (
    <DropdownC>
      {hasLabel && <Label>{label}</Label>}
      <FormControl variant="standard" sx={{ m: 1, minWidth: { width } }}>
        {items ? (
          <CustomSelect
            labelId="dropdown-select-label"
            id="dropdown-select"
            value={
              (selected
                ? selected
                : items[0].key
                ? items[0].key
                : items[0].value) ?? ''
            }
            onChange={handleChange}
            label={label ?? ''}
            type={type}
            color={color}
            bgcolor={bgcolor}
            disableUnderline={true}
          >
            {items &&
              items.map((item, idx) => (
                <Option
                  key={item.key}
                  value={item.value}
                  color="green"
                  bgcolor="green"
                >
                  {item?.title ?? item}
                </Option>
              ))}
          </CustomSelect>
        ) : null}
      </FormControl>
    </DropdownC>
  );
}
