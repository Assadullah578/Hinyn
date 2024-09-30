import Text from '../shared/Typography';
import styled from '@emotion/styled';
import { LockIcon } from '../shared/Icon';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

const ContainerBox = styled.div`
  height: 30rem;
  background: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 35px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmailIconContainer = styled.div`
  margin-bottom: 1rem;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  background: ${(props) => (props.active ? '#eb4c60' : '#4aa398')};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 10px #4aa39820;
`;

const StyledEmailIcon = styled(LockIcon)`
  font-size: 20px;
  color: #ffffff;
`;

const StyledCheckIcon = styled(BsFillCheckCircleFill)`
  color: #4aa398;
  font-size: 16px;
`;
const StyledCrossIcon = styled(BsFillXCircleFill)`
  color: lightgray;
  font-size: 16px;
`;
const TitleText = styled(Text)`
  color: #4aa398;
  font-size: 15px;
  font-weight: semibold;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const PriceText = styled(Text)`
  font-weight: bold;
`;

const PeriodText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 6px;
`;

const FeaturesList = styled.div`
  margin-top: 1rem;
  width: 100%;
  /* background-color: red; */
  @media (max-width: 430px) {
    width: fit-content;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
`;

const StyledButton = styled.div`
  margin-top: 1rem;
  width: 11.5rem;
  background: ${(props) =>
    props.primary
      ? 'linear-gradient(104deg, #ff5a5f 0%, #a52226 100%)'
      : 'white'};
  color: ${(props) => (props.primary ? 'white' : '#eb4c60')};
  border: ${(props) => (props.primary ? 'none' : '1px solid #eb4c60')};
  border-radius: 40px;
  cursor: pointer;
  text-align: center;
`;

const ButtonText = styled.div`
  padding: 11px 5px;
`;

export default function MemberShipCard({
  onClick,
  Title,
  Amount,
  Time,
  btn,
  btnText,
  data,
}) {
  return (
    <ContainerBox>
      <EmailIconContainer>
        <StyledEmailIcon />
      </EmailIconContainer>
      <TitleText size="large">{Title}</TitleText>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PriceText size="large">{Amount} AED</PriceText>
        <PeriodText>/ {Time}</PeriodText>
      </div>
      <FeaturesList>
        {data.map((feature, index) => (
          <FeatureItem key={index}>
            {btn === 'false' && index >= data.length - 2 ? (
              <StyledCrossIcon />
            ) : (
              <StyledCheckIcon />
            )}
            <Text marginLeft="8px">{feature}</Text>
          </FeatureItem>
        ))}
      </FeaturesList>
      <StyledButton primary={btn === 'true'} onClick={onClick}>
        {btn === 'true' ? (
          <ButtonText>
            <a style={{ color: 'inherit', textDecoration: 'none' }}>
              {btnText}
            </a>
          </ButtonText>
        ) : (
          <ButtonText>Start Free Trial</ButtonText>
        )}
      </StyledButton>
    </ContainerBox>
  );
}
