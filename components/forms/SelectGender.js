import { useEffect, useRef, useState } from 'react';
import { CssBaseline, Grid, Box, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField, {
  SimpleTextField,
  StyledTextField2,
} from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import DropdownO from '../shared/DropdownO';
import Select from 'react-select';
import { DateField } from '@mui/x-date-pickers/DateField';
import { getLanguages } from './formService';

const StyledButton = styled(Button)``;

const Genderdiv = styled.div`
  display: flex;
  width: 75%;

  /* margin-left: 60px; */
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  border-radius: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-left: 50px;
  margin-top: 60px;
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;
const BackCon = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
const FieldDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 30rem;
  /* background-color: red; */
  @media (max-width: 430px) {
    width: 25rem;
  }
`;
function SelectGender({ handleNextClick, handleBack }) {
  const [open, setOpen] = useState(false);
  const [dobValue, setDobValue] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  };

  const [languageOptions, setLanguageOptions] = useState([]);
  // const languageOptions = [
  //   { value: 'english', label: 'English' },
  //   { value: 'spanish', label: 'Spanish' },
  //   { value: 'french', label: 'French' },
  //   { value: 'german', label: 'German' },
  //   { value: 'chinese', label: 'Chinese' },
  //   { value: 'japanese', label: 'Japanese' },
  //   { value: 'korean', label: 'Korean' },
  //   { value: 'italian', label: 'Italian' },
  //   { value: 'portuguese', label: 'Portuguese' },
  //   { value: 'russian', label: 'Russian' },
  //   { value: 'arabic', label: 'Arabic' },
  //   { value: 'dutch', label: 'Dutch' },
  //   { value: 'swedish', label: 'Swedish' },
  //   { value: 'turkish', label: 'Turkish' },
  //   { value: 'polish', label: 'Polish' },
  //   { value: 'greek', label: 'Greek' },
  //   { value: 'hindi', label: 'Hindi' },
  //   { value: 'bengali', label: 'Bengali' },
  //   { value: 'punjabi', label: 'Punjabi' },
  //   { value: 'urdu', label: 'Urdu' },
  //   // Add more languages as needed
  // ];

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGenderId, setSelectedGenderId] = useState();
  const isMaleSelected = selectedGender === 'Male';
  const isFemaleSelected = selectedGender === 'Female';
  const StyledGenderM = styled.div`
    background: white;
    width: 50%;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    color: gray;
    font-weight: bold;
    text-align: center;
    border: 1px solid #ccd1d1;
    padding: 12px;
    margin: auto;
    font-size: 16px;
    cursor: pointer;
    ${isMaleSelected ? 'border: 1px solid #4AA398;' : ''}
    ${isMaleSelected ? 'color: #4AA398;' : ''}
  ${isMaleSelected ? 'background: #d8f0ed;' : ''}
  `;
  const StyledGenderF = styled.div`
    background: white;
    font-size: 16px;
    width: 50%;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    color: gray;
    font-weight: bold;
    text-align: center;
    border: 1px solid #ccd1d1;
    padding: 12px;
    margin: auto;
    cursor: pointer;
    ${isFemaleSelected ? 'border: 1px solid #EB4C60;' : ''}
    ${isFemaleSelected ? 'color: #EB4C60;' : ''}
  ${isFemaleSelected ? 'background: #fce6e9;' : ''}
  `;
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    console.log(gender);
    if (gender === 'Male') {
      setSelectedGenderId(1);
    } else if (gender === 'Female') {
      setSelectedGenderId(2);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkDOB = (dobdate) => {
    const dob = moment(moment(dobdate).format('YYYY-MM-DD'));
    const today = moment();
    const minAge = 16;

    if (dob.isValid() && today.diff(dob, 'years') >= minAge) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['dob']: null,
      }));
      setValid((prevState) => ({
        ...prevState,
        ['dob']: true,
      }));
      setDobValue(dob.format('YYYY-MM-DD'));
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['dob']: 'You must be at least 16 years old.',
      }));
      setValid((prevState) => ({
        ...prevState,
        ['dob']: false,
      }));
    }
  };
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguages();
        const formattedLanguages = response.data.data
          .map((language) => ({
            value: language.id,
            label: language.attributes.name,
          }))
          .sort((a, b) => a.value - b.value); // Sorting languages by id
        setLanguageOptions(formattedLanguages);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);
  const [isValid, setValid] = useState({
    languages: false,
    dob: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    languages: null,
    dob: null,
  });
  const languagesInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    console.log(selectedLanguages, 'lll');
    // const enteredLanguages = languagesInputRef.current.value;

    if (selectedLanguages && dobValue && selectedLanguages !== '') {
      isValid.form = true;
    }

    if (isValid.form) {
      const clientData = {
        dateOfBirth: dobValue,
        languages: selectedLanguages.map((language) => language.value),
        gender: selectedGenderId,
      };
      console.log(clientData, 'ggg');
      handleNextClick(clientData);
    } else {
      setOpen(true);
    }
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      border: state.isFocused ? '2px solid #4AA398' : '1px solid #ccc',
      borderRadius: '50px',
      padding: '8px',
      fontSize: '14px',
      boxShadow: 'none',
      zIndex: 10,
      '&:hover': {
        borderColor: '#4AA398',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d8f0ed' : 'white',
      color: state.isFocused ? '#4AA398' : 'black',
      '&:hover': {
        backgroundColor: '#d8f0ed',
      },
    }),
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          {/* <Typography component="h1" variant="h4">
            <b>Let&apos;s make your profile</b>
          </Typography> */}
          <Text fontWeight="bold" size="xxl">
            <b>Let&apos;s make your profile</b>
          </Text>
          <Text marginTop="8px">
            Fill out your profile for clients to better understand your
          </Text>
          <Text> services.</Text>
          <VerticalDivider />
          <Text color="green" marginBottom="8px">
            What languages do you speak?
          </Text>
          <Text>We will use this to help match you with employers who are</Text>
          <Text>fluent in these languages.</Text>
          <VerticalDivider />
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: '2rem',
              display: 'flex',
            }}
          >
            <Grid item xs={9} sx={{ zIndex: 100, margin: 'auto' }}>
              {/* <FieldDiv> */}
              <Select
                isMulti
                options={languageOptions}
                onChange={handleLanguageChange}
                value={selectedLanguages}
                styles={customStyles}
              />
              {/* </FieldDiv> */}
              {/* <StyledTextField
                  required
                  fullWidth
                  id="languages"
                  placeholder="example: English"
                  name="languages"
                  inputRef={languagesInputRef}
                />
                {errorMessage.languages && (
                  <Error>{errorMessage.languages}</Error>
                )} */}
            </Grid>
          </Grid>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{
              mt: 3,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Text color="green" align="center" marginBottom="8px">
              When were you born?
            </Text>
            <Text align="center">
              You need to be at least 16 years old to use the website. This
              information
            </Text>
            <Text align="center">
              will be used for verification and will be kept confidential.
            </Text>
            <VerticalDivider />
            {/* <Grid container spacing={2} sx={{ marginBottom: '2rem' }}> */}
            {/* <Grid item xs={9} sx={{ width: '100%' }}> */}
            <FieldDiv style={{ flexDirection: 'column' }}>
              {' '}
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="MM-DD-YYYY"
                  format={'MM-DD-YYYY'}
                  value={dobValue}
                  onChange={checkDOB}
                  renderInput={(params) => (
                    <StyledTextField {...params} sx={{ width: 'inherit' }} />
                  )}
                />
              </LocalizationProvider>
              {errorMessage.dob && <Error>{errorMessage.dob}</Error>}
            </FieldDiv>
            <VerticalDivider />
            {/* </Grid> */}
            {/* </Grid> */}
            <Text color="green" align="center" marginBottom="10px">
              Tell us your gender
            </Text>
            <VerticalDivider />
            <Genderdiv>
              <StyledGenderM onClick={() => handleGenderSelect('Male')}>
                Male
              </StyledGenderM>
              <StyledGenderF onClick={() => handleGenderSelect('Female')}>
                Female
              </StyledGenderF>
            </Genderdiv>
            <VerticalDivider />
            {/* <ButtonContainer>
              <Text>
                <BackIcon isabsolute={false} />
                <span style={{ marginLeft: '1rem' }}>Go Back</span>
              </Text>
              <StyledButton>NEXT</StyledButton>
            </ButtonContainer> */}
            <ButtonContainer>
              <BackCon onClick={handleBack}>
                <BackIcon
                  isabsolute={false}
                  style={{ margin: 'auto', fontSize: '16.5px' }}
                />
                <Text
                  style={{
                    marginLeft: '1rem',
                    fontSize: '12.5px',
                    marginTop: '4px',
                  }}
                >
                  Go Back
                </Text>
              </BackCon>
              <StyledButton>NEXT</StyledButton>
            </ButtonContainer>
          </Box>
        </FormContainer>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <div>Oops! All fields are required.</div>
      </Modal>
    </>
  );
}

export default SelectGender;
