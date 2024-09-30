import { useState } from 'react';
import styled from '@emotion/styled';
import {
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';

const DropdownContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  padding: 0.5rem 1rem;
  color: gray;
`;

const Option = styled(MenuItem)`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
  background: transparent;
  background: ${(props) =>
    props.bgcolor === 'transparent' ? 'transparent' : ''};
`;

const CustomSelect = styled(Select)`
  font-family: 'DM Sans', sans-serif !important;
  background: ${(props) =>
    props.type === 'standard'
      ? '#ffffff'
      : props.color === 'red'
      ? 'transparent'
      : 'transparent'};
  background: ${(props) =>
    props.bgcolor === 'transparent' ? 'transparent' : ''};
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#4aa398')};
  border: ${(props) =>
    props.type === 'outlined' ? '1px solid #94949470' : 'none'};
  border-bottom: ${(props) =>
    props.type === 'standard' ? 'none' : '1px solid #94949470'};
  padding: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.type === 'standard' || props.type === 'outlined' ? '4px' : 'none'};

  &:before {
    border-bottom: 0;
  }

  &:hover {
    background: ${(props) =>
      props.type === 'standard' ? '#ffffff' : 'transparent'};
  }
`;

export default function DropdownO({
  hasLabel,
  label,
  items,
  width,
  type,
  setHandleOnChange,
  color,
  selected = [],
  bgcolor,
  defaultLabel,
  setHandleId,
}) {
  const handleChange = (event) => {
    const value = event.target.value;
    console.log('event', value);
    if (setHandleOnChange) setHandleOnChange(value);
  };

  return (
    <DropdownContainer>
      {hasLabel && <Label>{label}</Label>}
      <FormControl variant="standard" sx={{ m: 1, minWidth: { width } }}>
        {items ? (
          <CustomSelect
            labelId="dropdown-select-label"
            id="dropdown-select"
            multiple
            value={selected}
            onChange={handleChange}
            label={label ?? ''}
            type={type}
            color={color}
            bgcolor={bgcolor}
            disableUnderline={true}
            renderValue={(selected) =>
              items
                .filter((item) => selected.includes(item.id))
                .map((item) => item.title)
                .join(', ')
            }
          >
            {items.map((item) => (
              <Option
                key={item.id}
                value={item.id}
                color={color}
                bgcolor={bgcolor}
              >
                <Checkbox checked={selected.includes(item.id)} />
                <ListItemText primary={item.title} />
              </Option>
            ))}
          </CustomSelect>
        ) : null}
      </FormControl>
    </DropdownContainer>
  );
}
