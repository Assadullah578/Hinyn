import styled from '@emotion/styled';

import Text from '../../shared/Typography';
import { useEffect, useState } from 'react';

import { Profile } from './Profile';
import { Email } from './Email';
import PasswordUpdate from './PasswordUpdate';
import Trust from './Trust';
import Account from './Account';

const Wraper = styled.div`
  height: auto;
  padding: 3rem 0 10rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wraper2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  width: 85%;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const CustomText = styled.div`
  display: flex;
  font-size: 17px;

  color: ${(props) => (props.hovered ? '#eb4c60' : '')};
  background: ${(props) => (props.hovered ? '#f7ebeb' : 'transparent')};
  transition: color 0.3s, background 0.3s;
  cursor: pointer;
  font-weight: ${(props) => (props.hovered ? 'bold' : '')};
  &:hover {
    color: #4aa398;
    background: #e8faf8;
  }
`;
const ContentBox2 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px 0;
  width: 24%;
  height: 30%;
  @media (max-width: 700px) {
    width: 85vw;
  }
`;

const TextCon = styled.div`
  width: 81%;
  margin: 0 0 10px 0;
`;
const VLine = styled.div`
  width: 6px;
  height: 100%;
  background: #eb4c60;
  margin: auto 0;
`;
const VLine2 = styled.div`
  width: 6px;
  height: 100%;
  background: white;
  margin: auto 0;
`;
const Cover = styled.div`
  display: flex;
  gap: 0 24px;

  height: 50px;
`;
const TextC = styled.div`
  margin: auto 0;
`;

function Settings() {
  const [selectedTab, setSelectedTab] = useState('Profile');
  const [accountType, setAccountType] = useState(false);
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const getStoredClient = async () => {
    const req = localStorage.getItem('hinyn-client-profile');
    return await JSON.parse(req);
  };
  const fetchData = async () => {
    // const clientId = await localStorage.getItem('hinyn-cid');

    let clientData = await getStoredClient();
    if (clientData) {
      console.log(clientData?.data.attributes.accountType);
      if (clientData?.data.attributes.accountType == 2) {
        setAccountType(true);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Wraper>
      <TextCon>
        <Text color="green" size="xl" font="bold">
          Settings
        </Text>
      </TextCon>
      <Wraper2>
        <ContentBox2 sx={{}}>
          <a onClick={() => handleTabClick('Profile')}>
            <CustomText hovered={selectedTab === 'Profile'}>
              <Cover>
                {selectedTab === 'Profile' ? (
                  <VLine></VLine>
                ) : (
                  <VLine2></VLine2>
                )}

                <TextC>Profile</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Email')}>
            <CustomText hovered={selectedTab === 'Email'}>
              <Cover>
                {selectedTab === 'Email' ? <VLine></VLine> : <VLine2></VLine2>}

                <TextC> Email & Notifications</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Password')}>
            <CustomText hovered={selectedTab === 'Password'}>
              <Cover>
                {selectedTab === 'Password' ? (
                  <VLine></VLine>
                ) : (
                  <VLine2></VLine2>
                )}

                <TextC> Password</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Trust')}>
            <CustomText hovered={selectedTab === 'Trust'}>
              <Cover>
                {selectedTab === 'Trust' ? <VLine></VLine> : <VLine2></VLine2>}

                <TextC> Trust & Verification</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Account')}>
            <CustomText hovered={selectedTab === 'Account'}>
              <Cover>
                {selectedTab === 'Account' ? (
                  <VLine></VLine>
                ) : (
                  <VLine2></VLine2>
                )}

                <TextC>Account</TextC>
              </Cover>
            </CustomText>
          </a>
        </ContentBox2>
        {selectedTab === 'Profile' ? (
          <Profile />
        ) : selectedTab === 'Email' ? (
          <Email />
        ) : selectedTab === 'Password' ? (
          <PasswordUpdate />
        ) : selectedTab === 'Trust' ? (
          <Trust />
        ) : selectedTab === 'Account' ? (
          <Account accountType={accountType} />
        ) : (
          ''
        )}
      </Wraper2>
    </Wraper>
  );
}

export default Settings;
