import Footer from '../components/section/Footer';
import Header from '../components/section/Header';
import Header2 from '../components/section/Header2';

import Text from '../components/shared/Typography';
import styled from '@emotion/styled';

const HeaderContainer = styled.div`
  background: #4aa398;
  color: #ffffff;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  display: flex;
  flex-direction: column;
  min-height: 19rem;
`;
const MyContainer = styled.div`
  /* height: 90rem; */
  width: 80%;

  background: white;
  border-radius: 20px;
  position: absolute;
  top: 13rem;
  left: 11rem;
`;
const MainDiv = styled.div`
  background: #ededed;
  height: 110rem;
`;
const ActualCon = styled.div`
  /* height: 92rem; */
  width: 85%;
  margin: 50px 87px;
`;
function UserAgreement() {
  return (
    <>
      <Header2 />
      <MainDiv>
        <HeaderContainer></HeaderContainer>
        <MyContainer>
          <ActualCon>
            <Text color="red" size="xl" font="bold">
              User Agreement
            </Text>
            <Text marginTop="25px" fontSize="15px">
              A user agreement primary function is to set the conditions for
              which a user may use a program or software service. This limits
              the legal obligations of the website owner, restricts abuse of
              software, explains how the software is licensed, and clarifies the
              conditions under which the agreement can be terminated.
            </Text>
            <Text marginTop="10px" fontSize="15px">
              A user agreemet primary function is to set the conditions for
              which a user may use a program or software service. This limits
              the legal obligations of the website owner, restricts abuse of
              software, explains how the software is licensed, and clarifies.
            </Text>
            <Text marginTop="10px" fontSize="15px">
              A user agreement primary function is to set the conditions for
              which a user may use a program or software service. This limits
              the legal obligations of the website owner, restricts abuse of
              software, explains how the software is licensed, and clarifies the
              conditions under which the agreement.
            </Text>

            <Text color="green" marginTop="30px" fontStyle="italic">
              very important Note : When dealing with cancellations on a booking
              platform where both clients and freelancers can initiate
              cancellations, it important to have a clear refund policy that
              addresses both scenarios.
            </Text>
            <Text color="red" size="xl" font="bold" marginTop="25px">
              Cancellation Policy
            </Text>
            <Text marginTop="20px" fontSize="15px">
              Clearly state when cancellations are allowed, such as within a
              specific timeframe after ordering Specific timeframe after
              ordering and are allowed.
            </Text>
            <Text marginTop="12px" fontSize="15px">
              Specify if there will be any fees associated with cancellations,
              including percentages or fixed fees.
            </Text>
            <Text marginTop="12px" fontSize="15px">
              Clearly state when cancellations are allowed, such as within a
              specific timeframe after ordering.
            </Text>
            <Text marginTop="12px" fontSize="15px">
              Specify if there will be any fees associated with cancellations,
              including percentages or fixed fees.
            </Text>
            <Text marginTop="12px" fontSize="15px">
              Specify if there will be any fees associated with cancellations,
              including percentages or fixed fees.
            </Text>
            <Text color="red" size="xl" font="bold" marginTop="25px">
              Refund Policy
            </Text>
            <Text marginTop="20px" fontSize="15px">
              Refund are excluding Hinyn fees and bidding fees.{' '}
            </Text>

            <Text color="green" marginTop="20px" fontSize="15px">
              If Client cancel on booking:
            </Text>
            <Text marginTop="20px">
              If a client initiates a cancellation, specify the conditions under
              which a refund may be issued.
            </Text>
            <Text marginTop="20px">
              Explain whether the refund will be full or partial, depending on
              factors like the timing of the cancellation and any work already
              completed.
            </Text>
            <Text marginTop="20px">
              If a client initiates a cancellation, specify the conditions under
              which a refund may be issued.
            </Text>
            <Text marginTop="20px">
              Explain whether the refund will be full or partial, depending on
              factors like the timing of the cancellation and any work already
              completed.
            </Text>
            <Text color="green" marginTop="20px" fontSize="15px">
              If freelancer cancel on booking:
            </Text>
            <Text marginTop="20px">
              If a client initiates a cancellation, specify the conditions under
              which a refund may be issued.
            </Text>
            <Text marginTop="20px">
              Explain whether the refund will be full or partial, depending on
              factors like the timing of the cancellation and any work already
              completed.
            </Text>
            <Text marginTop="20px">
              If a client initiates a cancellation, specify the conditions under
              which a refund may be issued.
            </Text>
            <Text marginTop="20px">
              Explain whether the refund will be full or partial, depending on
              factors like the timing of the cancellation and any work already
              completed.
            </Text>
            <Text color="red" size="xl" font="bold" marginTop="25px">
              Contact Us
            </Text>
            <Text>contact@Hinyn.com</Text>
            <Text>+2341234009</Text>
          </ActualCon>
        </MyContainer>
      </MainDiv>
      <Footer />
    </>
  );
}

export default UserAgreement;
