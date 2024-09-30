import styled from '@emotion/styled';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import Text from '../components/shared/Typography';
import { BackIcon, EmailIcon } from '../components/shared/Icon';

import Logo from '../components/shared/Logo';
import Button from '../components/shared/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';

const MainBox = styled(Box)`
  background-color: #f0f0f0;
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow: auto;
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
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const StyledButton = styled(Button)`
  padding: 8px 18px;
  margin: 24px auto;
`;
const MainContainer = styled.div`
  background: white;
  height: 55rem;
  width: 60rem;
  border-radius: 60px 60px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  padding: 30px 0;
`;
const TopDiv = styled.div`
  display: flex;
  flex-diretion: row;

  margin: 0 90px;
`;
const HorizontalLine = styled.hr`
  border: 1px solid #d6d4d4;
  margin: 20px 0; /* Adjust the margin as needed */
`;

const TextDiv = styled.div``;
const SecondDiv = styled.div`
  margin: 40px 100px;
`;
const LinkCon = styled.div`
  background: #dff3fd;
  height: 80px;
  width: 45rem;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
`;
const LogoDiv = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 60px;
  height: 50px;
  width: 50px;
  margin: 0 30px 0 0;
`;

const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

const StyledEmailIcon = styled(EmailIcon)`
  font-size: 20px;
  color: #ffffff;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  margin: auto;
`;
const BackCon = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

function VerifiedEmail() {
  const router = useRouter();
  const { query } = useRouter();

  const name = query.name;
  const email = query.email;

  const handleVerify = () => {
    router.replace({
      pathname: '/registration',
      query: {
        name,
      },
    });
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextClick = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setOpen(false);
  };

  return (
    <>
      <MainBox>
        <Container maxWidth="xl" sx={{ padding: '1rem', marginLeft: '6rem' }}>
          <Logo />
        </Container>
        <MainContainer>
          <TopDiv>
            <LogoDiv>
              <Text
                color="red"
                fontSize="16px"
                marginLeft="19px"
                marginTop="12px"
              >
                H
              </Text>
            </LogoDiv>

            <TextDiv>
              <Text>hinyn.com</Text>
              <Text color="gray">norplay@hinyn.com</Text>
              <Text marginTop="23px" display="flex">
                <Text display="flex" color="gray">
                  Subject:
                </Text>
                Verify your email adress for account registartion.
              </Text>
            </TextDiv>
          </TopDiv>
          <HorizontalLine />
          <Container
            maxWidth="sm"
            sx={{ marginBottom: '2rem', marginTop: '5rem' }}
          >
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
                  <StyledButton onClick={handleVerify}>NEXT</StyledButton>
                </ButtonContainer>
              </Box>
            </FormContainer>
          </Container>
        </MainContainer>
      </MainBox>
    </>
  );
}
export default VerifiedEmail;
