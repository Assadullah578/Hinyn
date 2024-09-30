import { useRef, useState } from 'react';
import { CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { BackIcon, LockIcon } from '../shared/Icon';
import { useRouter } from 'next/router';

const StyledButton = styled(Button)`
  margin: 50px auto;
`;

const StyledLockIcon = styled(LockIcon)`
  font-size: 20px;
  color: #ffffff;
`;
const IconContainer = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #4aa398;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 10px #4aa39820;
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
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

function VerifyPaymentForm2({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <Typography component="h1" variant="h4" align="center">
          <b>Verify your payment method</b>
        </Typography>
        <Typography component="p" align="center">
          Your payment method is used to verify your identity and helps build
          trust.
        </Typography>
        <VerticalDivider />
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3, width: '100%' }}
        >
          <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
            <Grid item xs={4}>
              <PaymentContainer>
                <IconContainer>
                  <StyledLockIcon />
                </IconContainer>
                <Text color="green">Subscribe</Text>
                <Typography component="p" align="center">
                  Welcome to hinyn, start to value your talent
                </Typography>
              </PaymentContainer>
            </Grid>
            <Grid item xs={4}>
              <PaymentContainer>
                <IconContainer>
                  <StyledLockIcon />
                </IconContainer>
                <Text color="green">Rank Higher</Text>
                <Typography component="p" align="center">
                  Increase chances of ranking higher in bid lists and our
                  directory.
                </Typography>
              </PaymentContainer>
            </Grid>
            <Grid item xs={4}>
              <PaymentContainer>
                <IconContainer>
                  <StyledLockIcon />
                </IconContainer>
                <Text color="green">Free Trial Membership</Text>
                <Typography component="p" align="center">
                  Get access to a free one month trial for Plus Membership.
                </Typography>
              </PaymentContainer>
            </Grid>
          </Grid>
          <StyledButton onClick={handleNextClick}>
            Verify Payment Method
          </StyledButton>
          <ButtonContainer>
            <Text>
              <BackIcon isabsolute={false} />
              <span style={{ marginLeft: '1rem' }}>Go Back</span>
            </Text>
            <Text color="green">Skip</Text>
          </ButtonContainer>
        </Box>
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

export default VerifyPaymentForm2;
