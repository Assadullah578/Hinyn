import React from 'react';
import styled from '@emotion/styled';
import { BackIcon, EmailIcon } from '../components/shared/Icon';
import { useRouter } from 'next/router';
import Header from '../components/section/Header';
import Footer from '../components/section/Footer';

const Main = styled.div`
  background-color: #d3d3d3; /* light grey */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;
const StyledEmailIcon = styled(EmailIcon)`
  font-size: 20px;
  color: #ffffff;
`;
const Box = styled.div`
  background-color: #ffffff; /* white */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 60vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
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
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;
`;

const Text = styled.p`
  color: #525252; /* dark grey */
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Text2 = styled.p`
  color: #525252; /* dark grey */
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Button = styled.button`
  background-color: #eb4c60; /* pink */
  color: #ffffff; /* white */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff85c0;
  }
`;

function emailVerified() {
  // const router = useRouter();
  // const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleHome = () => {
  //   router.push('/');
  // };
  return (
    // <Main>
    // <Text2>HINYN</Text2>

    // <Box>
    <>
      <Header />
      <Inner>
        <EmailIconContainer>
          <StyledEmailIcon />
        </EmailIconContainer>

        <Text size="large">Your Email is verified</Text>
        {/* <Button onClick={handleHome}>Home</Button> */}
      </Inner>
      <Footer />
    </>
    // </Box>
    // </Main>
  );
}

export default emailVerified;
