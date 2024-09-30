import { useRef, useState } from 'react';
import { CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { BackIcon } from '../shared/Icon';
import { SquareTextField } from '../shared/Textfield';
import { router, useRouter } from 'next/router';

const StyledButton = styled(Button)`
  margin: 50px auto;
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

const BlackDivider = styled.div`
  background: #000000;
  width: 100%;
  height: 2rem;
`;

const TitleContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 0 5rem;
  margin-bottom: 1rem;
`;

const CardContainer = styled.div`
  position: relative;
  height: 300px;
`;

const Card = styled.div`
  background-color: #525252;
  box-shadow: 0px 10px 30px #31303077;
  border-radius: 12px;
  position: absolute;
  color: #ffffff;
  width: 400px;
  height: 230px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const Card1 = styled(Card)`
  left: 10%;
  top: 0;
  z-index: 2;
`;

const Card2 = styled(Card)`
  right: 10%;
  top: 15%;
  z-index: 1;
  padding: 30px 0 30px 15%;
`;

function VerifyPaymentForm1() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    firstName: 'Samanta',
    email: 'test@email.com',
  };

  const cardNumberInputRef = useRef();
  const monthValidityInputRef = useRef();
  const yearValidityInputRef = useRef();
  const cardNameInputRef = useRef();
  const cvvNumberInputRef = useRef();

  const [isValid, setValid] = useState({
    cardNumber: false,
    monthValidity: false,
    yearValidity: false,
    cardName: false,
    cvvNumber: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    cardNumber: null,
    monthValidity: null,
    yearValidity: null,
    cardName: null,
    cvvNumber: null,
  });

  function submitHandler(event) {
    event.preventDefault();
    router.push('/dashboard');
    // const enteredCardNumber = cardNumberInputRef.current.value;
    // const enteredMonthValidity = monthValidityInputRef.current.value;
    // const enteredYearValidity = yearValidityInputRef.current.value;
    // const enteredCardName = cardNameInputRef.current.value;
    // const enteredCvvNumber = cvvNumberInputRef.current.value;

    // if(enteredCardNumber && enteredCardNumber !== '' && enteredMonthValidity && enteredMonthValidity !== '' && enteredYearValidity && enteredYearValidity !== '' && enteredCardName && enteredCardName !== '' && enteredCvvNumber && enteredCvvNumber !== ''){
    //     isValid.form = true;
    // }

    // if(isValid.form){
    //   const clientData = {
    //     cardNumber: enteredCardNumber,
    //     monthValidity: enteredMonthValidity,
    //     yearValidity: enteredYearValidity,
    //     cardName: enteredCardName,
    //     cvvNumber: enteredCvvNumber,
    //     };
    //     router.push('/dashboard');
    // }else{
    //     setOpen(true)
    // }
  }

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
            <Grid item xs={12}>
              <TitleContainer>
                <span>Debit/Credit Card</span>
                <span>
                  <i>All major cards are accepted.</i>
                </span>
              </TitleContainer>
              <CardContainer>
                <Card1>
                  <span>Card Number</span>
                  <SquareTextField
                    required
                    fullWidth
                    id="cardNumber"
                    placeholder="**** **** **** ****"
                    type="number"
                    name="cardNumber"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 16);
                    }}
                    inputRef={cardNumberInputRef}
                  />
                  {errorMessage.cardNumber && (
                    <Error>{errorMessage.cardNumber}</Error>
                  )}
                  <Box
                    sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                    maxWidth="50%"
                  >
                    <SquareTextField
                      required
                      fullWidth
                      id="monthValidity"
                      placeholder="MM"
                      type="number"
                      name="monthValidity"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 2);
                      }}
                      inputRef={monthValidityInputRef}
                    />
                    {errorMessage.monthValidity && (
                      <Error>{errorMessage.monthValidity}</Error>
                    )}
                    <Typography
                      component="span"
                      align="center"
                      sx={{ color: '#ACCECA', fontSize: '2rem' }}
                    >
                      /
                    </Typography>
                    <SquareTextField
                      required
                      fullWidth
                      id="yearValidity"
                      placeholder="YY"
                      type="number"
                      name="yearValidity"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 2);
                      }}
                      inputRef={yearValidityInputRef}
                    />
                    {errorMessage.yearValidity && (
                      <Error>{errorMessage.yearValidity}</Error>
                    )}
                  </Box>
                  <SquareTextField
                    required
                    fullWidth
                    id="cardName"
                    placeholder="Name on card"
                    name="cardName"
                    inputRef={cardNameInputRef}
                  />
                  {errorMessage.cardName && (
                    <Error>{errorMessage.cardName}</Error>
                  )}
                </Card1>
                <Card2>
                  <BlackDivider />
                  <span>CVV</span>
                  <Box
                    sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                    maxWidth="30%"
                  >
                    <SquareTextField
                      required
                      fullWidth
                      id="cvvNumber"
                      placeholder="###"
                      type="number"
                      name="cvvNumber"
                      inputRef={cvvNumberInputRef}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 3);
                      }}
                    />
                    {errorMessage.cvvNumber && (
                      <Error>{errorMessage.cvvNumber}</Error>
                    )}
                  </Box>
                </Card2>
              </CardContainer>
            </Grid>
          </Grid>
          <Typography component="p" align="center">
            By clicking on verify, you agree to authorize the use of your card
            for future payments
          </Typography>
          <StyledButton>Verify Payment Method</StyledButton>
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

export default VerifyPaymentForm1;
