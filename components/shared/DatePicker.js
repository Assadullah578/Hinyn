import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';
import styled from '@emotion/styled';

const StyledTextField = styled(TextField)`
    width:100% !important;
`

export default function BasicDatePicker() {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Birth"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <StyledTextField {...params} />}
      />
    </LocalizationProvider>
  );
}