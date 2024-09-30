import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';
import LoginVerifyForm from '../components/forms/LoginVerifyForm';
import { useRouter } from 'next/router';
import { resendEmail } from '../components/forms/formService';
import Header from '../components/section/Header';
import Footer from '../components/section/Footer';
import Modal2 from '../components/shared/Modal2';
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 15rem 0;
`;
const Text = styled.div`
  font-size: 18px;
  color: gray;
  font-weight: 600;
`;
const Text2 = styled.div`
  font-size: 15px;
  color: gray;
  font-weight: 600;
`;
const StyledButton = styled(Button)`
  padding: 8px 18px;
  margin: 24px auto;
  cursor: pointer;
`;

const VerifyEmailPage = () => {
  // const router = useRouter();
  const { query } = useRouter();
  const name = query.name;
  //   const email = query.email;
  const id = query.id;
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  // const handleVerify = () => {
  //   console.log('as');
  //   setOpen(true);
  // };
  const handleResend = () => {
    resendEmail(id).then((res) => {
      console.log(res);
      if (res.status) {
        setOpen(true);
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <Header />
      <div style={{}}>
        <Wrap>
          <Text>Please verify your email to proceed</Text>
          <div>
            <Text2>If you have not received email click below</Text2>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <StyledButton onClick={handleResend}>Resend Email</StyledButton>
            </div>
          </div>
          <Text2>If you have verified your email you can login</Text2>
        </Wrap>
      </div>
      <Footer />
      <Modal2
        isOpen={open}
        handleClose={handleClose}
        hasHeader={false}
        hasFooter={false}
        popupWidth={true}
        Widthmax={true}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Text
            color="green"
            style={{ fontWeight: 'bold', fontSize: '30px', marginTop: 90 }}
          >
            Verfication email sent!
          </Text>
          {/* <CustomCheckIcon variant="red" /> */}
        </div>
      </Modal2>
    </>
  );
};

export default VerifyEmailPage;
