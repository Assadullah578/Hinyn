import styled from '@emotion/styled';
import { MenuItem, FormControl, Select } from '@mui/material';

const DropdownC = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 40rem;
  width: 100%;
  padding: 0.5rem 1.5rem;
  height: 3.8rem;
  border: 1px solid #ccc;
`;

const Label = styled.span`
  padding: 0rem 1rem;
  color: grey;
  background-color: #ffffff;
  border-radius: 40rem;
  width: 100%;
  align-items: center;
`;

const Option = styled(MenuItem)`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
`;

const CustomSelect = styled(Select)`
  font-family: 'DM Sans', sans-serif !important;
  background: '#ffffff';
  color: '#0F7669';
  padding: 0.6rem 1rem;

  &:before {
    border-bottom: 0;
  }
`;

export default function DropdownCountry12({
  hasLabel,
  label,
  items,
  width,
  setHandleOnChange,
  color,
  bgcolor,
  selectedValue,
}) {
  const handleChange = (event) => {
    const selectedOption = items.find(
      (item) => item.value === event.target.value
    );
    if (setHandleOnChange) setHandleOnChange(selectedOption);
  };

  return (
    <DropdownC>
      {hasLabel && <Label>{selectedValue?.title ?? label}</Label>}{' '}
      {/* Only show the label outside */}
      <FormControl variant="standard" sx={{ m: 1, minWidth: { width } }}>
        {items ? (
          <CustomSelect
            labelId="dropdown-select-label"
            id="dropdown-select"
            value="" // Keep the select empty to avoid duplication
            onChange={handleChange}
            disableUnderline={true}
          >
            {items.map((item, idx) => (
              <Option
                key={item.key || idx}
                value={item.value}
                color={color}
                bgcolor={bgcolor}
              >
                {item.title}
              </Option>
            ))}
          </CustomSelect>
        ) : null}
      </FormControl>
    </DropdownC>
  );
}
