import styled from '@emotion/styled';
import { SimpleTextField } from '../shared/Textfield';
import Text from '../shared/Typography';
import { useEffect, useState } from 'react';
import { GreenButton, RedButton } from '../shared/Button';
import Switch from '../shared/Switch';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { getUserWallet } from '../forms/formService';
import { PhotoIcon, RightArrowIcon } from '../shared/Icon';
import Pill2 from '../shared/Pill2';

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
  padding: 0 30px;
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
  border-radius: 16px;
  padding: 20px 0;
  width: 24%;
  height: 30%;
  @media (max-width: 700px) {
    width: 85vw;
  }
`;
const ContentBox3 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 35px 45px;
  width: 72%;
  @media (max-width: 700px) {
    width: 85vw;
    padding: 15px 15px;
  }
`;
const ContentBox4 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 35px 45px;
  width: 72%;
  @media (max-width: 700px) {
    width: 85vw;
    padding: 15px 15px;
  }
`;
const InnerView = styled.div`
  margin: 40px 0 0 0;
`;
const Line = styled.div`
  background: #f0f3f4;
  height: 1.5px;
  margin: 18px 0;
`;
const FieldWrap = styled.div`
  display: flex;
  gap: 20px;
  margin: ${(props) => (props.marginTop ? '50px 0' : '')};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const Bdiv = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
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
const SwitchWrapper = styled.div`
  gap: 40px;
  display: flex;
  margin: 20px 0;
`;
const ConInput = styled.div`
  margin: 10px;
`;
const Score = styled.div`
  background: #d8e8e6;
  border-radius: 11px;
  margin: 30px auto;
  display: flex;
  width: 23rem;
  padding: 7px 18px;
  gap: 11px;
`;
const ScoreDiv = styled.div`
  border-radius: 4px;
  display: flex;
  background: white;
  padding: 6px 30px;
  color: #c5e8e4;
  gap: 8px;
  font-size: 17px;
  align-items: center;
`;
const Verdiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const TextDivV = styled.div`
  display: flex;
  gap: 22px;
`;
const VerWrap = styled.div`
  gap: 20px;
`;
const Item = styled.div`
  border: 1px solid #d8d8d8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: #fcfcfc;
  border-radius: 24px;
  column-gap: 2rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => (props.type === 'client' ? '#FDEAEF' : '#ECF6F5')};
    border: ${(props) =>
      props.type === 'client' ? '1px solid #EB4C60' : '1px solid #4AA398'};

    .right-arrow {
      opacity: 1;
    }
  }
`;
const StyledRightArrowIcon = styled(RightArrowIcon)`
  opacity: 0;
`;
const TypeDiv = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
  width: 70%;
`;
const PillDiv = styled.div`
  width: 24%;
`;
const ParaDiv = styled.div`
  background: #f7f5f5;
  border-radius: 12px;
  padding: 23px 34px;
  margin: 40px 0;
`;
const HeadDiv = styled.div`
  background: linear-gradient(
    180deg,
    #4aa398 0%,
    #5eada4 30%,
    #73bab1 60%,
    #89ccc4 80%,
    #89ccc4 100%
  );
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  align-items: center;
`;
const HeadDiv2 = styled.div`
  background: linear-gradient(
    180deg,
    #4aa398 0%,
    #5eada4 30%,
    #73bab1 60%,
    #89ccc4 80%,
    #89ccc4 100%
  );
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 30%;
`;
const WithDraw = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
function Wallet() {
  const [selectedTab, setSelectedTab] = useState('Profile');
  const [wallet, setWallet] = useState([]);
  const [pwValues, setPWValues] = useState({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  });
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const handleClickShowConfirmPassword = () => {
    setPWValues({
      ...pwValues,
      showConfirmPassword: !pwValues.showConfirmPassword,
    });
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const Wallet = async () => {
    const clientId = localStorage.getItem('hinyn-cid');
    await getUserWallet(clientId).then((res) => {
      if (res) {
        const temp = res.data.data;
        setWallet(temp[0]?.attributes?.balance);
        console.log(temp[0]?.attributes.balance);
      }
    });
  };

  useEffect(() => {
    Wallet();
  }, []);

  return (
    <Wraper>
      <TextCon>
        <Text color="green" size="xl" font="bold">
          My Wallet
        </Text>
      </TextCon>
      <Wraper2>
        <ContentBox2 sx={{}}>
          <a onClick={() => handleTabClick('Profile')}>
            <CustomText hovered={selectedTab === 'Profile'}>
              <Cover>
                <TextC>Overview</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Email')}>
            <CustomText hovered={selectedTab === 'Email'}>
              <Cover>
                <TextC> Withdraw Funds</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Password')}>
            <CustomText hovered={selectedTab === 'Password'}>
              <Cover>
                <TextC>Deposit Funds</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Trust')}>
            <CustomText hovered={selectedTab === 'Trust'}>
              <Cover>
                <TextC> Transaction History</TextC>
              </Cover>
            </CustomText>
          </a>
          <a onClick={() => handleTabClick('Account')}>
            <CustomText hovered={selectedTab === 'Account'}>
              <Cover>
                <TextC>Banking Information</TextC>
              </Cover>
            </CustomText>
          </a>
        </ContentBox2>
        {selectedTab === 'Profile' ? (
          <ContentBox3 sx={{}}>
            <HeadDiv>
              <Text color="white" size="smd">
                Available Funds
              </Text>
              <div style={{ display: 'flex' }}>
                <Text color="white" size="large" marginX="10px">
                  AED
                </Text>
                <Text color="white" font="bold" size="large">
                  {wallet ? wallet : '0.00'}
                </Text>
              </div>
            </HeadDiv>
            <FieldWrap marginTop={true}>
              <div style={{ width: '100%' }}>
                <Text color="green" size="large" font="bold">
                  Transaction History
                </Text>
              </div>
              <div style={{ width: '75%', display: 'flex', gap: '15px' }}>
                <Pill2 title="Request Withdrawl" color="green" />
                <Pill2 title="Request Desposit" color="green" />
              </div>
              <div style={{}}></div>
            </FieldWrap>
          </ContentBox3>
        ) : selectedTab === 'Email' ? (
          <ContentBox4>
            <WithDraw>
              <Text color="green" size="xl" font="bold">
                Withdraw Funds
              </Text>
              <HeadDiv2>
                <Text color="white" size="smd">
                  Available Funds
                </Text>
                <div style={{ display: 'flex' }}>
                  <Text color="white" size="large">
                    AED
                  </Text>
                  <Text color="white" font="bold" size="large">
                    0s.00
                  </Text>
                </div>
              </HeadDiv2>
            </WithDraw>

            <div
              style={{
                display: 'flex',
                marginBottom: '20px',
                marginTop: '40px',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <div>
                <Text size="md">AMOUNT:</Text>
              </div>
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    background: '#e6faf8',
                    padding: '20px',
                    borderRadius: '10px',
                  }}
                >
                  <Text color="green">AED 0.00</Text>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: '20px',

                alignItems: 'center',
                gap: '40px',
              }}
            >
              <div>
                <Text size="md">ACCOUNT:</Text>
              </div>
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    background: '#e6faf8',
                    padding: '20px',
                    borderRadius: '10px',
                  }}
                >
                  <Text color="green">3520123408343234234</Text>
                </div>
              </div>
            </div>
            <Text color="gray" marginY="60px">
              Disclaimer Text : To change the linear gradient from left to right
              to top to bottom, you can adjust the gradient direction by
              changing the angle from 96deg to 180deg. Here the modified code.
            </Text>
            <Bdiv>
              <GreenButton>Request Withdraw</GreenButton>
            </Bdiv>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text color="green">Cancel</Text>
            </div>
          </ContentBox4>
        ) : selectedTab === 'Password' ? (
          <ContentBox4>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text color="green" size="xl" font="bold">
                Deposit Funds
              </Text>
              <HeadDiv2>
                <Text color="white" size="smd">
                  Available Funds
                </Text>
                <div style={{ display: 'flex', gap: 7 }}>
                  <Text color="white" size="large">
                    AED
                  </Text>
                  <Text color="white" font="bold" size="large">
                    {' '}
                    {wallet ? wallet : 0}.00
                  </Text>
                </div>
              </HeadDiv2>
            </div>

            <div
              style={{
                display: 'flex',
                marginBottom: '20px',
                marginTop: '40px',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <div>
                <Text size="md">AMOUNT:</Text>
              </div>
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    background: '#e6faf8',
                    padding: '20px',
                    borderRadius: '10px',
                  }}
                >
                  <Text color="green">$ 100,000,00.00</Text>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: '20px',

                alignItems: 'center',
                gap: '40px',
              }}
            >
              <div>
                <Text size="md">ACCOUNT:</Text>
              </div>
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    background: '#e6faf8',
                    padding: '20px',
                    borderRadius: '10px',
                  }}
                >
                  <Text color="green">Wallet</Text>
                </div>
              </div>
            </div>
            <Text color="gray" marginY="60px">
              Disclaimer Text : To change the linear gradient from left to right
              to top to bottom, you can adjust the gradient direction by
              changing the angle from 96deg to 180deg. Here the modified code.
            </Text>
            <Bdiv>
              <GreenButton>Request a deposit</GreenButton>
            </Bdiv>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text color="green">Cancel</Text>
            </div> */}
          </ContentBox4>
        ) : selectedTab === 'Trust' ? (
          <ContentBox4>
            <Text color="green" size="xl" font="bold">
              Transaction History
            </Text>
          </ContentBox4>
        ) : selectedTab === 'Account' ? (
          <ContentBox4></ContentBox4>
        ) : (
          ''
        )}
      </Wraper2>
    </Wraper>
  );
}

export default Wallet;
