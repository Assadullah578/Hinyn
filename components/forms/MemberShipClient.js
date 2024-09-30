import { useRouter } from 'next/router';
import Text from '../shared/Typography';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { BackIcon } from '../shared/Icon';
import MemberShipCard from '../shared/MemberShipCard';
import { useEffect, useRef, useState } from 'react';
import {
  addBidData,
  getClientData,
  paymentForBid,
  subscription,
} from './formService';

const ContainersMain = styled.div`
  @media (max-width: 769px) {
    height: 100%;
    gap: 20px;
  }
  height: 35rem;
  margin: 60px 0 0 0;

  display: flex;
  gap: 0 16px;
  flex-direction: row;
  @media (max-width: 769px) {
    flex-direction: column;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 11rem;
`;

const TitleCon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BackCon = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  @media (max-width: 769px) {
    margin: 20px 0;
  }
`;

function MemberShipClient({ handleBack }) {
  const hasFetched = useRef(false);
  // const [accountType, setAccountType] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (hasFetched.current) return; // Prevents further executions
    hasFetched.current = true;
    const clientId = localStorage.getItem('hinyn-cid');
    const storedFormData = localStorage.getItem('projectFormData');
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      formData.client = clientId;
      // console.log(formData, clientId);
      addBidData(formData).then((res) => {
        // console.log('hasid');
        if (res.status === true) {
          console.log('bid posted');
          const bidId = res.data.id;
          console.log(res.data.id);
        }
      });
    }
  }, []);
  const handleTrialMembership = () => {
    const id = parseInt(localStorage.getItem('hinyn-cid'), 10);
    const Data = {
      subscription: 4,
      client: id,
    };
    subscription(Data).then((res) => {
      if (res.status === true) {
        console.log('Trial Membership Clicked');
        router.push({
          pathname: '/dashboard',
        });
      }
    });
  };

  const handleSignUpYearly = () => {
    const id = parseInt(localStorage.getItem('hinyn-cid'), 10);
    const Data = {
      subscription: 3,
      client: id,
    };
    subscription(Data).then((res) => {
      if (res.status === true) {
        console.log(res);
        console.log('payment', res.data.data.paymentUrl);
        const URL = res.data.data.paymentUrl;
        // window.location.href = URL;
        window.location.href = URL;
        // router.push({
        //   pathname: '/dashboard',
        // });
      }
    });
  };

  const handleSignUpMonthly = () => {
    const id = parseInt(localStorage.getItem('hinyn-cid'), 10);
    const Data = {
      subscription: 2,
      client: id,
    };
    subscription(Data).then((res) => {
      if (res.status) {
        console.log(res);
        console.log('payment', res.data.data.paymentUrl);
        const URL = res.data.data.paymentUrl;
        // window.location.href = URL;
        window.location.href = URL;
        // router.push({
        //   pathname: '/dashboard',
        // });
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: '2rem', marginTop: '4rem' }}>
      <TitleCon>
        <Text size="xxl" fontWeight="bold">
          Maximize your success earnings!
        </Text>
      </TitleCon>

      <TitleCon>
        <Text style={{ display: 'flex' }}>
          Try a{' '}
          <Text
            style={{
              display: 'flex',
              margin: '0 4px',
              fontWeight: 'bold',
              color: '#eb4c60',
            }}
          >
            HINYN
          </Text>
          Membership to enjoy greater benefits
        </Text>
      </TitleCon>

      <ContainersMain>
        <MemberShipCard
          Title="Trial Membership"
          Amount="0"
          Time="1 month"
          btn="false"
          btnText="Start Free Trial"
          onClick={handleTrialMembership}
        />
        <MemberShipCard
          Title="Professional"
          Amount="499"
          Time="year"
          btn="true"
          btnText="Sign up yearly"
          onClick={handleSignUpYearly}
        />
        <MemberShipCard
          Title="Professional"
          Amount="60"
          Time="month"
          btn="true"
          btnText="Sign up monthly"
          onClick={handleSignUpMonthly}
        />
      </ContainersMain>

      <ButtonContainer>
        <BackCon onClick={handleBack}>
          <BackIcon
            isabsolute={false}
            style={{ margin: 'auto', fontSize: '16.5px' }}
          />
          <Text
            style={{
              marginLeft: '1rem',
              fontSize: '12.5px',
              marginTop: '2px',
            }}
          >
            Go Back
          </Text>
        </BackCon>
      </ButtonContainer>
    </Container>
  );
}

export default MemberShipClient;
