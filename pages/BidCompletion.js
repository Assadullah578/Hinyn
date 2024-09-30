import React from 'react';
import styled from '@emotion/styled';
import { Router, useRouter } from 'next/router';

const Main = styled.div`
  background-color: #d3d3d3; /* light grey */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
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

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const BidCompletion = () => {
  const router = useRouter();
  const handleDash = () => {
    router.push('/dashboard');
  };
  return (
    <Main>
      <Text2>HINYN</Text2>
      <Box>
        <Inner>
          <Text>Congratulations! Your project is now completed.</Text>
          <Button onClick={handleDash}>Dashboard</Button>
        </Inner>
      </Box>
    </Main>
  );
};

export default BidCompletion;
