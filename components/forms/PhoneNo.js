import { useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { BackIcon } from '../shared/Icon';
import PhoneInput from 'react-phone-number-input';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { css } from '@emotion/css';
import { updateClientData } from './formService';

const StyledButton = styled(Button)``;

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
  width: 77%;
  margin-left: 3rem;
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
  margin-bottom: 13rem;
  flex-direction: column;
  /* background-color: red; */
  @media (max-width: 430px) {
    width: 25rem;
  }
`;
function PhoneNo({ handleNextClick, handleBack }) {
  const [open, setOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setValid] = useState({
    mobileNumber: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    mobileNumber: null,
  });

  const checkMobileNumber = (number) => {
    if (number) {
      const parsedNumber = parsePhoneNumber(number);

      if (parsedNumber) {
        if (
          (parsedNumber.country === 'AE' &&
            parsedNumber.nationalNumber.length > 8) ||
          (parsedNumber.country !== 'AE' && isPossiblePhoneNumber(number))
        ) {
          setValid((prevState) => ({
            ...prevState,
            ['mobileNumber']: true,
          }));
          setErrorMessage((prevState) => ({
            ...prevState,
            ['mobileNumber']: null,
          }));
          setMobileNumber(number);
        } else {
          setValid((prevState) => ({
            ...prevState,
            ['mobileNumber']: false,
          }));
          setErrorMessage((prevState) => ({
            ...prevState,
            ['mobileNumber']: 'Invalid Mobile Number',
          }));
        }
      }
    }
  };

  function submitHandler(event) {
    event.preventDefault();

    if (mobileNumber && mobileNumber !== null) {
      isValid.form = true;
    }

    if (isValid.form) {
      const clientData = {
        mobileNumber: mobileNumber.toString(),
      };
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
          <Text size="xxl" marginBottom="10px">
            <b>Let&apos;s make your profile</b>
          </Text>
          <Text>
            Fill out your profile for clients to better understand your
          </Text>
          <Text>services.</Text>
          <VerticalDivider />
          <Text color="green">What is your phone number?</Text>

          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{
              mt: 2,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* <Grid
              container
              spacing={2}
              sx={{ marginBottom: '13rem', marginLeft: '40px' }}
            >
              <Grid item xs={9.4} sx={{ width: '100%', marginLeft: '10px' }}> */}
            <FieldDiv>
              <PhoneInput
                defaultCountry="AE"
                placeholder="e.g. 501234537"
                value={mobileNumber}
                onChange={checkMobileNumber}
                className={css`
                  .PhoneInputInput {
                    border: 1px solid #00000040;

                    border-top-right-radius: 30px;
                    border-bottom-right-radius: 30px;
                    padding: 0.8rem;
                    line-height: 1.25rem;
                    font: inherit;
                    &:focus {
                      outline: 1.5px solid #1976d2;
                    }
                    &:hover {
                      border: 1px solid #00000090;
                    }
                  }
                  .PhoneInputCountry {
                    width: 8rem;
                    padding: 8px;
                    background: white;
                    border-top-left-radius: 30px;
                    border-bottom-left-radius: 30px;
                    border: 1px solid #b2babb;
                  }
                  .PhoneInputCountryIcon {
                    width: 100%;
                    height: 2rem;
                    box-shadow: unset;
                    background: white;
                  }
                `}
              ></PhoneInput>
              {errorMessage.mobileNumber && (
                <Error>{errorMessage.mobileNumber}</Error>
              )}
            </FieldDiv>
            {/* </Grid> */}
            {/* </Grid> */}

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
                    marginTop: '2px',
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

export default PhoneNo;
