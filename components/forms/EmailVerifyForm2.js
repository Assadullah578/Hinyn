import { useState } from 'react';
import { CssBaseline, Grid, Box, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';

import { BackIcon, EmailIcon } from '../shared/Icon';

const StyledButton = styled(Button)``;

const StyledEmailIcon = styled(EmailIcon)`
  font-size: 20px;
  color: #ffffff;
`;
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const EmailIconContainer = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #4aa398;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 10px #4aa39820;
`;
const FieldVerify = styled.div`
  background: white;
  border: 1px solid #d8d8d8;
  border-radius: 40px;
  width: 25rem;
  color: cyan;
  justify-content: center;
  height: 40px;
  margin: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  margin: auto;
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
function EmailVerifyForm2({ handleNextClick, handleBack, name, email }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text size="xl">
            <b>Thanks, {name}!</b>
          </Text>
          <VerticalDivider />
          <EmailIconContainer>
            <StyledEmailIcon />
          </EmailIconContainer>
          <VerticalDivider />
          <Text size="large">Your email is verified</Text>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <FieldVerify>
                  <Text marginTop="8px" marginLeft="20px" color="green">
                    {email}
                  </Text>
                </FieldVerify>
              </Grid>
            </Grid>
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
              <StyledButton onClick={handleNextClick}>NEXT</StyledButton>
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

export default EmailVerifyForm2;
