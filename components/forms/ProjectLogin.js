import styled from '@emotion/styled';
import React from 'react';
import Footer from '../section/Footer';
import Header from '../section/Header';
import Header2 from '../section/Header2';
const Main = styled.div``;
const ProjectLogin = () => {
  return (
    <Main>
      <Header2 />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '22rem',
          color: 'white',
        }}
      >
        To complete the process, please log in to your account. If you dont/.
        have an account, you can create one quickly and easily.
      </div>
      <Footer />
    </Main>
  );
};

export default ProjectLogin;
