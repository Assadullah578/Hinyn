import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Text from '../../shared/Typography';
import { RedButton } from '../../shared/Button';
import { getClientData } from '../../forms/formService';
import { RedButton2 } from '../../shared/Button';
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
  align-items: center;
`;
const TextDivV = styled.div`
  display: flex;
  gap: 22px;
`;
const VerWrap = styled.div`
  gap: 20px;
`;
const Div12 = styled.div`
  @media (max-width: 700px) {
    max-width: 7.7rem;
  }
`;
const Trust = () => {
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [doc, setDoc] = useState(false);
  const [score, setScore] = useState('');
  const getClient = async () => {
    const id = localStorage.getItem('hinyn-cid');
    if (id) {
      const clientData = {
        id: id,
      };

      const res = await getClientData(clientData);
      if (res.status) {
        console.log(res.data.data.attributes.isEmailVerified);
        const temp = res.data.data.attributes;
        if (temp) {
          setEmail(temp.isEmailVerified);
          setPhone(temp.isPhoneVerified);
          setDoc(temp.isDocumentVerified);
        }
        setEmail(temp.isEmailVerified);
      }
    }
  };
  useEffect(() => {
    getClient();
  }, []);
  useEffect(() => {
    let scoreValue = 25;
    const verifiedCount = [email, phone, doc].filter(Boolean).length;
    if (verifiedCount === 3) {
      scoreValue = 75;
    } else if (verifiedCount === 2) {
      scoreValue = 50;
    }
    setScore(scoreValue);
  }, [email, phone, doc]);
  return (
    <ContentBox4>
      <Text color="red" size="large" font="bold">
        Trust & Verification
      </Text>
      <Line></Line>
      <Text color="green" size="large" marginTop="30px">
        What is a trust score?
      </Text>
      <Text color="gray" marginTop="30px" size="smd">
        The Trust score typically refers to a numerical value or rating assigned
        to an entity, such as a user, website, or transaction, to indicate the
        level of trustworthiness or reliability associated with that entity.
        Trust scores are often used in various online platforms and systems to
        assess the credibility and trustworthiness of users or entities based on
        their behavior, history, and other relevant factors.
      </Text>
      <Score>
        <Text size="smd" color="green" font="bold" marginY="auto">
          Your Trust Score
        </Text>
        <ScoreDiv>
          <Text color="green" size="xl" font="bold">
            {score >= 25 ? score : '0'}
          </Text>{' '}
        </ScoreDiv>
      </Score>
      <VerWrap>
        <Verdiv>
          <Text size="smd">Phone Number</Text>{' '}
          <TextDivV>
            {phone ? (
              <Text marginY="auto" color="green" size="smd">
                VERIFIED
              </Text>
            ) : (
              <Text marginY="auto" color="red" size="smd">
                NOT VERIFIED
              </Text>
            )}
            <RedButton2>25 POINTS</RedButton2>
          </TextDivV>
        </Verdiv>
        <Verdiv>
          <Text size="smd">Email</Text>{' '}
          <TextDivV>
            {email ? (
              <Text marginY="auto" color="green" size="smd">
                VERIFIED
              </Text>
            ) : (
              <Text marginY="auto" color="red" size="smd">
                NOT VERIFIED
              </Text>
            )}
            <RedButton2>25 POINTS</RedButton2>
          </TextDivV>
        </Verdiv>
        <Verdiv>
          <Text size="smd">Identity Document</Text>{' '}
          <TextDivV>
            {doc ? (
              <Text marginY="auto" color="green" size="smd">
                VERIFIED
              </Text>
            ) : (
              <Text marginY="auto" color="red" size="smd">
                NOT VERIFIED
              </Text>
            )}
            <RedButton2>25 POINTS</RedButton2>
          </TextDivV>
        </Verdiv>
        <Verdiv>
          <Div12>
            <Text size="smd">Credit Card / Debit Card</Text>
          </Div12>

          <TextDivV>
            <Text marginY="auto" color="red" size="smd">
              NOT VERIFIED
            </Text>{' '}
            <RedButton2>25 POINTS</RedButton2>
          </TextDivV>
        </Verdiv>
      </VerWrap>
    </ContentBox4>
  );
};

export default Trust;
