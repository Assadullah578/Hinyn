import { useRef, useState, useMemo, useEffect } from 'react';
import { CssBaseline, Grid, Box, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import DropdownCountry from '../shared/DropdownCountry';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import countryList from 'react-select-country-list';
import DropdownCountry12 from '../shared/DropdownCountry12';
import {
  getCities,
  getCountries,
  getCountriesById,
  getCountriesByiso,
} from './formService';
import DropdownCountryAndCity from '../shared/DropdownCountryAndCity';

const StyledButton = styled(Button)``;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;
const GridDiv = styled.div`
  display: flex;
  /* background-color: red; */
  gap: 10px;
  margin-bottom: 2rem;
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
  width: 77%;
  margin: 4rem 4.5rem;
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
const FieldDiv2 = styled.div`
  display: flex;
  justify-content: center;
  width: 14.5rem;
  /* background-color: red; */
  @media (max-width: 430px) {
    width: 12rem;
  }
`;
function Location({ handleNextClick, handleBack, client }) {
  const defaultCountry = 'United Arab Emirates';
  const [open, setOpen] = useState(false);
  const [countryOption, setCountryOption] = useState([]);
  // const countryOption = useMemo(() => countryList().getLabels(), []);
  const [countrySelected, setCountrySelected] = useState('');
  // const [selectedCity, setSelectedCity] = useState(null);
  const [cityOption, setCityOption] = useState([]); // New state to store cities
  const [citySelected, setCitySelected] = useState('');
  const [stateSelected, setStateSelected] = useState('');
  const [states, setStates] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setValid] = useState({
    location: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    location: null,
  });
  const countryInputRef = useRef(defaultCountry);
  const stateInputRef = useRef();
  const zipcodeInputRef = useRef();
  const cityInputRef = useRef();
  const GetCountries = async () => {
    const result = await getCountries();
    if (result) {
      const locations = result.data.data.map((item) => ({
        title: item.id,
        value: item.attributes.name,
      }));
      console.log(result.data.data, 'LOCATIONS');
      setCountryOption(locations);
    }
  };
  const GetCities = async (country) => {
    console.log(country);

    // }
    getCountriesById(country).then((result) => {
      if (result.status) {
        const cities = result.data?.data[0].attributes.cities.data?.map(
          (item) => ({
            title: item.id,
            value: item.attributes.name,
          })
        );
        const states2 = result.data?.data[0].attributes.states.data?.map(
          (item) => ({
            title: item.id,
            value: item.attributes.name,
          })
        );
        setStates(states2);
        setCityOption(cities);
      }
    });
  };
  useEffect(() => {
    GetCountries();
  }, []);
  const setHandleOnChange = (item) => {
    setCountrySelected(item);
    countryInputRef.current = item;
    GetCities(item.title);
  };
  const setCityOnChange = (item) => {
    console.log(item);
    setCitySelected(item);
    cityInputRef.current = item;
  };
  const setStateOnChange = (item) => {
    console.log(item);
    setStateSelected(item);
    // cityInputRef.current = item;
  };
  const handleStateChange = (item) => {
    setStateSelected(item);
    // cityInputRef.current = item;
  };
  function submitHandler(event) {
    event.preventDefault();
    const selectedCountry = countryInputRef.current;
    // const selectedState = stateInputRef.current.value;
    const selectedZipcode = zipcodeInputRef.current.value;
    const selectedCity = cityInputRef.current.value;

    if (selectedCountry !== '') {
      isValid.form = true;
    } else {
      setOpen(true);
    }
    if (isValid.form) {
      const clientData = {
        city: citySelected.title,
        country: countrySelected.title,
        countryCode: selectedZipcode,
        state: stateSelected.title,
      };
      console.log(clientData);
      handleNextClick(clientData);
    } else {
      setOpen(true);
    }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text size="xxl">
            <b>Let&apos;s make your profile</b>
          </Text>
          {client ? null : (
            <>
              {' '}
              <Text>
                Fill out your profile for clients to better understand your
              </Text>
              <Text>services.</Text>
            </>
          )}

          <VerticalDivider />
          <Text color="green" marginBottom="8px">
            Where are you located?
          </Text>

          <Text fontSize="12px" align="center" maxWidth={'28rem'}>
            Please use your real address as this will be used for identity
            verification. Only your city and country will be shown publicly.
          </Text>
          {/* <Text fontSize="12px">
            Only your city and country will be shown publicly.
          </Text> */}
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
            {/* <Grid container spacing={2} sx={{ marginBottom: '2rem' }}> */}
            {/* <Grid item xs={9} sx={{ width: '100%', marginLeft: '70px' }}> */}
            <FieldDiv>
              {' '}
              <DropdownCountryAndCity
                setHandleOnChange={setHandleOnChange}
                hasLabel={true}
                label="Country"
                selectedValue={countrySelected}
                items={countryOption}
              />
              {errorMessage.location && <Error>{errorMessage.location}</Error>}
            </FieldDiv>
            <VerticalDivider />
            {/* </Grid> */}
            {/* </Grid> */}
            <GridDiv>
              {/* <Grid container spacing={2} sx={{}}> */}
              {/* <Grid item xs={9} sx={{ width: '100%', marginLeft: '70px' }}> */}
              <FieldDiv2>
                {/* <StyledTextField
                  required
                  fullWidth
                  id="locationOptions"
                  placeholder="State/Province"
                  inputRef={stateInputRef}
                  // name="languages"

                  // onChange={(event) => {
                  //   setSelectedCity(() => event.target.innerText);
                  // }}
                /> */}
                <DropdownCountryAndCity
                  setHandleOnChange={setStateOnChange}
                  hasLabel={true}
                  label="State"
                  selectedValue={stateSelected}
                  items={states} // Pass city options to the city dropdown
                />
                {/* <DropdownCountry12
                  setHandleOnChange={handleStateChange}
                  hasLabel={true}
                  label="State"
                  selectedValue={stateSelected}
                  items={states}
                /> */}
                {errorMessage.location && (
                  <Error>{errorMessage.location}</Error>
                )}
              </FieldDiv2>
              {/* </Grid> */}
              {/* </Grid> */}
              {/* <Grid container spacing={2} sx={{}}> */}
              {/* <Grid item xs={8} sx={{ width: '100%', marginLeft: '20px' }}> */}
              <FieldDiv2>
                <StyledTextField
                  required
                  fullWidth
                  id="locationOptions"
                  placeholder="zip code"
                  inputRef={zipcodeInputRef}
                  // name="languages"

                  // onChange={(event) => {
                  //   setSelectedLocation(() => event.target.innerText);
                  // }}
                />
                {errorMessage.location && (
                  <Error>{errorMessage.location}</Error>
                )}
              </FieldDiv2>
              {/* </Grid> */}
              {/* </Grid> */}
            </GridDiv>

            {/* <Grid container spacing={2} sx={{ marginBottom: '2rem' }}> */}
            {/* <Grid item xs={9} sx={{ width: '100%', marginLeft: '70px' }}> */}
            <FieldDiv>
              <DropdownCountryAndCity
                setHandleOnChange={setCityOnChange}
                hasLabel={true}
                label="City"
                selectedValue={citySelected}
                items={cityOption} // Pass city options to the city dropdown
              />
              {errorMessage.location && <Error>{errorMessage.location}</Error>}
              {/* </Grid> */}
              {/* </Grid> */}
            </FieldDiv>
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

export default Location;
