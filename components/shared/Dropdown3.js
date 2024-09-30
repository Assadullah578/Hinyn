import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MenuItem, FormControl, Select } from '@mui/material';

const DropdownC = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.span`
  padding: 0.5rem 1rem;
  color: #949494;
  cursor: pointer;
  &:hover {
    border: 1px solid #0f7669;
    background: #0f76691a;
    color: #0f7669;
    border-radius: 19px;
  }
`;
const Option = styled(MenuItem)`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
`;
const CustomSelect = styled(Select)`
  font-family: 'DM Sans', sans-serif !important;
  background: ${(props) =>
    props.type === 'standard'
      ? '#ffffff'
      : props.color === 'red'
      ? '#FADBD8 '
      : 'transparent'};
  color: ${(props) => (props.color === 'red' ? 'red' : '#0F7669')};
  border-bottom: 1px solid #b3c4c2;
  padding: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.type === 'standard' || props.type === 'outlined' ? '7px' : 'none'};
  &:before {
    border-bottom: 0;
  }
  &:hover {
    background: ${(props) => (props.hovercolor === 'pink' ? '#FADBD8' : '')};
  }
`;

export default function Dropdown3({
  hasLabel,
  label,
  items,
  width,
  type,
  setHandleOnChange,
  color,
  bgcolor,
  defaultLabel,
  selected,
}) {
  const [isOpen, setIsOpen] = useState(false); // Initialize isOpen state
  const [selectedValue, setSelectedValue] = useState(selected);

  useEffect(() => {
    setSelectedValue(selected);
  }, [selected]);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedValue(selected);
    if (setHandleOnChange) setHandleOnChange(selected);
  };

  return (
    <DropdownC>
      {hasLabel && <Label onClick={() => setIsOpen(!isOpen)}>{label}</Label>}
      <FormControl variant="standard" sx={{ m: 1, minWidth: { width } }}>
        {items ? (
          <CustomSelect
            labelId="dropdown-select-label"
            id="dropdown-select"
            open={isOpen} // Open state controlled by isOpen
            onClose={() => setIsOpen(false)} // Close the dropdown
            onOpen={() => setIsOpen(true)} // Open the dropdown
            value={selectedValue || 'all'}
            onChange={handleChange}
            label={label ?? ''}
            type={type}
            color={color}
            bgcolor={bgcolor}
            disableUnderline={true}
            placeholder="asdjh"
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            {items &&
              items.map((item, idx) => (
                <Option
                  key={(item?.key ?? item?.value) + '-' + idx}
                  value={item?.key ?? item?.value}
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
