import React from 'react';

import styled from '@emotion/styled';
import Text from '../components/shared/Typography';
import { useRouter } from 'next/router';
import { ChatIcon, Check, CheckIcon } from '../components/shared/Icon';
import Button, { GreenButton } from '../components/shared/Button';
import { BsArrowLeft } from 'react-icons/bs';
const StyledEmailIcon = styled(Check)`
  font-size: 40px;
  color: #ffffff;
`;

const EmailIconContainer = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #eb4c60;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 10px #4aa39820;
`;

const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25vh;
`;
const StyledButton = styled(Button)`
  margin: auto;
  width: 10rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10rem;
`;
const SuccessPayment = () => {
  const router = useRouter();
  const handleDashboard = () => {
    router.replace('/dashboard');
  };
  return (
    <Container>
      <EmailIconContainer>
        <StyledEmailIcon />
      </EmailIconContainer>
      <VerticalDivider />
      <Text size="xl">
        <b>Payment Successfull!</b>
      </Text>
      <Wrapper onClick={handleDashboard}>
        <div style={{ cursor: 'pointer' }}>
          <BsArrowLeft fontSize={25} color={'#eb4c60'} />
        </div>
        <StyledButton>Dashboard</StyledButton>
      </Wrapper>
      <VerticalDivider />
    </Container>
  );
};

export default SuccessPayment;
