import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Text from '../../shared/Typography';
import { PhotoIcon, RightArrowIcon } from '../../shared/Icon';
import { Box } from '@mui/material';
import Pill2 from '../../shared/Pill2';

import Modal2 from '../../shared/Modal2';
import { updateClientData } from '../../forms/formService';
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

const TypeDiv = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
  width: 70%;
  @media (max-width: 700px) {
    width: 78vw;
  }
`;
const PillDiv = styled.div`
  width: 24%;
  @media (max-width: 700px) {
    width: 55vw;
  }
`;
const ParaDiv = styled.div`
  background: #f7f5f5;
  border-radius: 12px;
  padding: 23px 34px;
  margin: 40px 0;
`;
const StyledRightArrowIcon = styled(RightArrowIcon)`
  opacity: 0;
`;
const getStoredClient = async () => {
  const req = localStorage.getItem('hinyn-client-profile');
  return await JSON.parse(req);
};
const Account = () => {
  // console.log(accountType, 'ppp');
  // const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const clientId = await localStorage.getItem('hinyn-cid');

    let clientData = await getStoredClient();
    console.log(clientData);

    const newData = {
      accountStatus: 0,
      id: clientData.id,
    };
    clientData = {
      ...clientData.attributes,
      ...newData,
    };

    updateClientData(clientData, clientId)
      .then(async (result) => {
        console.log(clientData);
        if (result?.data) {
          setOpen(true);
          console.log('Account Deleted');
        }
      })
      .catch((e) => console.log('request update', e));
  };
  useEffect(() => {
    const get = async () => {
      let clientData = await getStoredClient();
      console.log(clientData?.data.attributes.accountType, 'yeah');
      setAccount(clientData?.data.attributes.accountType);
    };
    get();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ContentBox4>
        <Text color="red" size="large" font="bold">
          Account
        </Text>
        <Line></Line>
        <Text color="green" size="l2" marginTop="30px">
          Account Type
        </Text>
        <TypeDiv>
          {account === 2 ? (
            <Item type="client">
              <PhotoIcon variant="red" fontSize={'2.5rem'} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Text className="title">
                  <b>Client</b>
                </Text>
                <Text>I want to hire</Text>
              </Box>
              <StyledRightArrowIcon variant="red" className="right-arrow" />
            </Item>
          ) : (
            <Item type="professional">
              <PhotoIcon variant="green" fontSize={'2.5rem'} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Text className="title">
                  <b>Professional</b>
                </Text>
                <Text>I want to work</Text>
              </Box>
              <StyledRightArrowIcon variant="green" className="right-arrow" />
            </Item>
          )}
        </TypeDiv>
        <Text color="red" size="large" font="bold">
          Deactivate or Delete Account
        </Text>
        <Line></Line>
        <ParaDiv>
          <Text size="smd" font="bold">
            Deactivate
          </Text>
          <Text color="gray" sx={{ marginY: '16px' }}>
            Deactivating your account will cause your profile and listings to
            disappear, and you will not receive any notifications from us. This
            can be undone later.
          </Text>
          <PillDiv>
            <Pill2 title="Deactivate my account" color="green" />
          </PillDiv>
        </ParaDiv>
        <ParaDiv>
          <Text size="smd" font="bold">
            Delete
          </Text>
          <Text color="gray" sx={{ marginY: '16px' }}>
            Delete your account will cause your profile and listings to
            disappear, and you will not receive any notifications from us. This
            can be undone later.
          </Text>
          <PillDiv onClick={handleDelete}>
            <Pill2 title="Delete my account" color="green" />
          </PillDiv>
        </ParaDiv>
      </ContentBox4>
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
            Account Deleted!
          </Text>
          {/* <CustomCheckIcon variant="red" /> */}
        </div>
      </Modal2>
    </>
  );
};

export default Account;
