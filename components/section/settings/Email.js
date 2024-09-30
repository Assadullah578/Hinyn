import React, { useRef } from 'react';
import styled from '@emotion/styled';
import Text from '../../shared/Typography';
import { SimpleTextField2 } from '../../shared/Textfield';
import Pill2 from '../../shared/Pill2';
import Switch from '../../shared/Switch';
import { emailChange } from '../../forms/formService';
import { GreenButton } from '../../shared/Button';

const ContentBox4 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 35px 45px;
  width: 72%;
  @media (max-width: 700px) {
    width: 85vw;
    padding: 25px 15px;
  }
`;

const Line = styled.div`
  background: #f0f3f4;
  height: 1.5px;
  margin: 18px 0;
`;

const PillDiv = styled.div`
  width: 24%;
  @media (max-width: 700px) {
    width: 55vw;
  }
`;
const SwitchWrapper = styled.div`
  gap: 40px;
  display: flex;
  margin: 20px 0;
`;
const FieldWrap = styled.div`
  display: flex;
  gap: 20px;
`;
export const Email = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitEmail = async () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const id = localStorage.getItem('hinyn-cid');
    const Data = {
      email: email,
      password: password,
    };

    emailChange({ Data, id }).then((res) => {
      console.log(id);
      if (res) {
        console.log(res);
      }
    });
  };
  return (
    <ContentBox4>
      <Text color="red" size="large" font="bold">
        Email
      </Text>
      <Line></Line>
      <FieldWrap>
        <div style={{ width: '100%' }}>
          <Text color="green" size="md">
            Email
          </Text>
          <SimpleTextField2
            height="more"
            placeholder="Enter email"
            inputRef={emailInputRef}
          />
        </div>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <Text color="green" size="md">
            Password
          </Text>
          <SimpleTextField2
            height="more"
            placeholder="Enter password"
            inputRef={passwordInputRef}
          />
        </div>
      </FieldWrap>
      {/* <GreenButton onClick={submitEmail}>Update Email Address</GreenButton> */}
      <PillDiv onClick={submitEmail}>
        {' '}
        <Pill2 title="Update Email Address" color="green" />
      </PillDiv>

      <Text color="red" size="large" font="bold" sx={{ marginTop: '50px' }}>
        Notifications
      </Text>
      <Line></Line>
      <SwitchWrapper>
        <Switch />
        <Text size="large">Messages</Text>
      </SwitchWrapper>
      <SwitchWrapper>
        <Switch />
        <Text size="large">Bid updates</Text>
      </SwitchWrapper>
      <SwitchWrapper>
        <Switch />
        <Text size="large">Projects that match my skills</Text>
      </SwitchWrapper>
      <SwitchWrapper>
        <Switch />
        <Text size="large">Marketing Emails</Text>
      </SwitchWrapper>
    </ContentBox4>
  );
};
