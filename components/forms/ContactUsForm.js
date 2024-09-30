import { useRef, useState } from 'react';
import {
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  TextareaAutosize,
} from '@mui/material';
import styled from '@emotion/styled';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import Axios from 'axios';
Axios.defaults.withCredentials = true;
import PhoneInput from 'react-phone-number-input';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { css } from '@emotion/css';
import Text from '../shared/Typography';

const StyledButton = styled(Button)`
  margin: 2rem auto;
  padding: 1rem 2rem;
  border-radius: 45px;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 0 15px;
  width: 44rem;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const VerticalDivider = styled.div`
  height: 0.75rem;
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  min-height: 10rem;
  border-radius: 8px;
  padding: 10px;
  font-family: inherit;
  background-color: transparent;
  opacity: 1;
  border: 1px solid #d8d8d8;
  color: #555555;

  &:focus {
    border: 1px solid #d8d8d8;
    outline: none;
  }
`;

function ContactUsForm() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [formMessage, setFormMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setValid] = useState({
    fulname: false,
    email: false,
    mobileNumber: false,
    formMessage: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    fulname: null,
    email: null,
    mobileNumber: null,
    formMessage: null,
  });

  const emailInputRef = useRef();
  const fullNameInputRef = useRef();

  const checkIsEmail = (event) => {
    var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(event.target.value)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['email']: 'Invalid email',
      }));
    } else {
      event.target.style.border = 'none';
      setErrorMessage((prevState) => ({
        ...prevState,
        ['email']: null,
      }));
      setValid((prevState) => ({
        ...prevState,
        ['email']: true,
      }));
    }
  };

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

  const handleSubmitForm = async (contactFormDetails) => {
    console.log('the client data', contactFormDetails);
    setMessage('Message sent successfully!');
    setOpen(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFullname = fullNameInputRef.current.value;

    if (
      enteredEmail &&
      isValid.email &&
      enteredFullname &&
      formMessage &&
      mobileNumber
    ) {
      isValid.form = true;
    }

    if (isValid.form) {
      const contactFormDetails = {
        email: enteredEmail,
        fullName: enteredFullname,
        mobileNumber: mobileNumber,
        formMessage: formMessage,
      };
      handleSubmitForm(contactFormDetails);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Container>
        <CssBaseline />
        <FormContainer>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={5}>
              <Grid item xs={16}>
                <Text>Full Name</Text>
                <VerticalDivider />
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  placeholder=""
                  name="fullName"
                  autoComplete="fullName"
                  inputRef={fullNameInputRef}
                />
                {errorMessage.fullName && (
                  <Error>{errorMessage.fullName}</Error>
                )}
              </Grid>
              <Grid item xs={12}>
                <Text>Email Address</Text>
                <VerticalDivider />
                <TextField
                  required
                  fullWidth
                  id="emailAddress"
                  placeholder=""
                  name="emailAddress"
                  autoComplete="email"
                  onKeyUp={checkIsEmail}
                  inputRef={emailInputRef}
                />
                {errorMessage.email && <Error>{errorMessage.email}</Error>}
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Text>Phone Number</Text>
                <VerticalDivider />
                <PhoneInput
                  defaultCountry="AE"
                  placeholder="e.g. 501234537"
                  value={mobileNumber}
                  onChange={checkMobileNumber}
                  className={css`
                    .PhoneInputInput {
                      border: 1px solid #d8d8d8;
                      border-radius: 8px;
                      padding: 1.25rem;
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
                      width: 4rem;
                    }
                    .PhoneInputCountryIcon {
                      width: 100%;
                      height: 2rem;
                      box-shadow: unset;
                    }
                  `}
                ></PhoneInput>
                {errorMessage.mobileNumber && (
                  <Error>{errorMessage.mobileNumber}</Error>
                )}
              </Grid>
              <Grid item xs={12}>
                <Text>Message</Text>
                <VerticalDivider />
                <StyledTextArea
                  rowsMin={3}
                  placeholder=""
                  id="formMessage"
                  name="formMessage"
                  maxLength={500}
                  onChange={(event) => {
                    const { value } = event.target;
                    setFormMessage(() => value);
                    if (value) {
                      setErrorMessage((prevState) => ({
                        ...prevState,
                        ['formMessage']: null,
                      }));
                    }
                  }}
                />
                {errorMessage.formMessage && (
                  <Error>{errorMessage.formMessage}</Error>
                )}
              </Grid>
            </Grid>
            <StyledButton>Submit</StyledButton>
          </Box>
        </FormContainer>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {message ?? 'Oops! All fields are required.'}
        </Box>
      </Modal>
    </>
  );
}

export default ContactUsForm;
