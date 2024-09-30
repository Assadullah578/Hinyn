import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import Logo from '../components/shared/Logo';
import ProgressBar from '../components/shared/ProgressBar';
import { useEffect, useState } from 'react';
import FirstLastName from '../components/forms/FirstLastName';
import SelectGender from '../components/forms/SelectGender';
import Location from '../components/forms/Location';
import PhoneNo from '../components/forms/PhoneNo';
import UploadDoc from '../components/forms/UploadDoc';
import MemberShipClient from '../components/forms/MemberShipClient';
import {
  getMeData,
  updateClientData,
  updateUserData,
} from '../components/forms/formService';

const MainBox = styled(Box)`
  background-color: #f0f0f0;
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow: auto;
`;

function Client() {
  const initActiveForm = 8;
  const progressRate = 100 / initActiveForm;
  const [currentActiveForm, setCurrentActiveForm] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAccountVerified, setIsAccountVerified] = useState('');
  const [currClientData, setCurrClientData] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    getMeData().then(async (result) => {
      if (result?.status) {
        setEmail(result.data?.email);
        setName(result.data?.username);
        setCurrentActiveForm(result?.data?.step);
        setProgressPercent(() => progressRate * result?.data?.step);
      }
    });
  }, []);

  const handleNextClick = () => {
    setProgressPercent(() => progressRate * (currentActiveForm + 1));
    setCurrentActiveForm(currentActiveForm + 1);
  };
  const goBack = () => {
    setCurrentActiveForm(currentActiveForm - 1);
    setProgressPercent(() => progressRate * (currentActiveForm - 1));
  };

  const requestUpdate = async (item) => {
    const clientId = await localStorage.getItem('hinyn-cid');
    const userId = await localStorage.getItem('hinyn-uid');
    let clientData = await getStoredClient();

    handleNextClick();

    const newData = {
      ...item,
      id: clientData.id,
    };
    clientData = {
      ...clientData.attributes,
      ...newData,
    };

    const userData = {
      user: userId,
      cid: clientId,
      step: currentActiveForm + 1,
    };
    updateUserData(userData).then((res) => {
      if (res.status === true) {
        console.log(res);
      }
    });

    updateClientData(clientData, clientId)
      .then(async (result) => {
        if (result?.data) {
          const res = result?.data?.attributes;
          setIsAccountVerified(
            res?.data?.isEmailVerified == null
              ? false
              : res?.data?.isEmailVerified
          );
          setCurrClientData(res);
          localStorage.setItem(
            'hinyn-clientData',
            JSON.stringify(result?.data)
          );
        }
      })
      .catch((e) => console.log('request update', e));
  };

  const getStoredClient = async () => {
    const req = localStorage.getItem('hinyn-clientData');
    return await JSON.parse(req);
  };
  const skip = () => {
    handleNextClick();
  };
  return (
    <>
      <MainBox>
        <Container maxWidth="xl" sx={{ padding: '1rem', marginLeft: '6rem' }}>
          <Logo />
        </Container>
        <ProgressBar progress={progressPercent} />
        {currentActiveForm === 3 && (
          <FirstLastName handleNextClick={requestUpdate} />
        )}
        {currentActiveForm === 4 && (
          <SelectGender handleNextClick={requestUpdate} handleBack={goBack} />
        )}
        {currentActiveForm === 5 && (
          <Location
            handleNextClick={requestUpdate}
            handleBack={goBack}
            client={true}
          />
        )}
        {currentActiveForm === 6 && (
          <PhoneNo handleNextClick={requestUpdate} handleBack={goBack} />
        )}

        {currentActiveForm === 7 && (
          <UploadDoc
            handleNextClick={requestUpdate}
            handleBack={goBack}
            handleSkip={skip}
          />
        )}
        {currentActiveForm === 8 && (
          <MemberShipClient
            handleNextClick={requestUpdate}
            handleBack={goBack}
          />
        )}
      </MainBox>
    </>
  );
}

export default Client;
