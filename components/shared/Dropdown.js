import { useState } from 'react';
import styled from '@emotion/styled';
import { MenuItem, FormControl, Select } from '@mui/material';
// import { Box } from '@mui/system';

const DropdownC = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.span`
  padding: 0.5rem 1rem;
  color: #949494;
`;
const Option = styled(MenuItem)`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
`;
const CustomSelect = styled(Select)`
  .MuiSelect-icon {
    color: ${(props) => (props.color === 'green' ? '#4AA398' : '')};
  }
  font-family: 'DM Sans', sans-serif !important;
  background: ${(props) =>
    props.type === 'standard'
      ? '#ffffff'
      : props.color === 'green'
      ? '#ddf0ed'
      : '#e6e6e6'}; /* Change this line to set the background color */

  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
  border: ${(props) =>
    props.type === 'outlined' ? '1px solid #94949470' : ''};
  border-bottom: ${(props) =>
    props.type === 'standard' || props.typology === 'okok'
      ? 'none'
      : '1px solid #94949470'};
  padding: 0.6rem 1rem;
  border-radius: ${(props) =>
    props.type === 'standard' || props.type === 'outlined'
      ? '7px'
      : props.typology === 'okok'
      ? '9px 0 0 9px'
      : '7px'};

  &:before {
    border-bottom: 0;
  }

  &:hover {
    background: ${(props) => (props.hovercolor === 'pink' ? '#FADBD8' : '')};
  }
`;

export default function Dropdown({
  hasLabel,
  label,
  items,
  width,
  type,
  setHandleOnChange,
  color,
  selected,
  bgcolor,
  typology,
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
            value={selected ? selected : ''}
            onChange={handleChange}
            label={handleChange}
            type={type}
            typology={typology}
            color={color}
            bgcolor={bgcolor}
            disableUnderline={true}
          >
            {items &&
              items.map((item, idx) => (
                <Option
                  key={item.key}
                  value={item.value}
                  color={color}
                  bgcolor={bgcolor}
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
