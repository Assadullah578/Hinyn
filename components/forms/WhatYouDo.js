import { useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  TextareaAutosize,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon } from '../shared/Icon';
import { updateClientData } from './formService';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

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
  width: 80%;
  margin-top: 3rem;
  /* margin-left: 50px; */
  cursor: pointer;
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  min-height: 10rem;
  border-radius: 15px;
  border-color: #ccc;
  padding: 10px;
  font-family: inherit;
`;
const BackCon = styled.div`
  display: flex;
  flex-direction: row;
`;
const FieldDiv = styled.div`
  display: flex;
  width: 30rem;
  @media (max-width: 430px) {
    width: 25rem;
  }
`;
function WhatYouDo({ handleNextClick, handleBack }) {
  const [open, setOpen] = useState(false);
  const [enteredBroadDescription, setBroadDescription] = useState('');
  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setValid] = useState({
    description: false,
    broadDescription: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    description: null,
    broadDescription: null,
  });
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredDescription = descriptionInputRef.current.value;

    if (
      enteredDescription &&
      enteredBroadDescription &&
      enteredDescription !== '' &&
      enteredBroadDescription !== ''
    ) {
      isValid.form = true;
    }

    if (isValid.form) {
      const clientData = {
        description: enteredBroadDescription,
        headline: enteredDescription,
      };
      handleNextClick(clientData);
    } else {
      setOpen(true);
    }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '6rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text size="xxl" marginBottom="10px">
            <b>Let&apos;s make your profile</b>
          </Text>
          <Text align="center">
            Fill out your profile for clients to better understand your
            services.
          </Text>

          <VerticalDivider />
          <Text color="green" marginBottom="8px">
            What do you do?{' '}
          </Text>
          <Text>Write a one line description about yourself</Text>
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
            {/* <Grid
              container
              spacing={2}
              sx={{
                marginBottom: '2rem',
                marginLeft: '3.5rem',
                // maxWidth: '50rem',
              }}
            >
              <Grid item xs={9}> */}
            <FieldDiv>
              <StyledTextField
                required
                fullWidth
                id="description"
                placeholder="example: photographer"
                name="description"
                inputRef={descriptionInputRef}
              />
            </FieldDiv>
            {errorMessage.description && (
              <Error>{errorMessage.description}</Error>
            )}
            {/* </Grid> */}
            {/* </Grid> */}
            <VerticalDivider />
            <Text color="green" align="center" marginBottom="8px">
              Describe yourself{' '}
            </Text>
            <Text align="center" maxWidth={'28rem'}>
              Describe your top skills, strengths and experiences. Provide more
              details on the services you offer, things you’re interested in
              working on, and what you like to do.
            </Text>
            <VerticalDivider />
            {/* <Text align="center">
              details on the services you offer, things you’re interested in
              working on,
            </Text>

            <Text align="center" marginBottom="20px">
              and what you like to do.
            </Text> */}
            {/* <Grid
              container
              spacing={2}
              sx={{ marginBottom: '2rem', marginLeft: '3.5rem' }}
            >
              <Grid item xs={9}> */}
            <FieldDiv>
              <StyledTextArea
                placeholder="write your description"
                defaultValue={enteredBroadDescription}
                id="broadDescription"
                name="broadDescription"
                onChange={(event) => {
                  const { value } = event.target;
                  setBroadDescription(() => value);
                }}
              />
              {errorMessage.broadDescription && (
                <Error>{errorMessage.broadDescription}</Error>
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
              <StyledButton onClick={submitHandler}>NEXT</StyledButton>
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

export default WhatYouDo;
