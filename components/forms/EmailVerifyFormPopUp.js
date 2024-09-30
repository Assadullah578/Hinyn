import styled from '@emotion/styled';
import Text from '../shared/Typography';

import Logo from '../shared/Logo';
import Button from '../shared/Button';
import { emailVerify } from './formService';
const StyledButton = styled(Button)`
  padding: 8px 18px;
  margin: 24px auto;
`;
const MainContainer = styled.div`
  background: white;
  height: 55rem;
  width: 60rem;
  border-radius: 60px 60px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  padding: 30px 0;
`;
const TopDiv = styled.div`
  display: flex;
  flex-diretion: row;

  margin: 0 90px;
`;
const HorizontalLine = styled.hr`
  border: 1px solid #d6d4d4;
  margin: 20px 0; /* Adjust the margin as needed */
`;

const TextDiv = styled.div``;
const SecondDiv = styled.div`
  margin: 40px 100px;
`;
const LinkCon = styled.div`
  background: #dff3fd;
  height: 80px;
  width: 45rem;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
`;
const LogoDiv = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 60px;
  height: 50px;
  width: 50px;
  margin: 0 30px 0 0;
`;
function EmailVerifyFormPopUp({ handleNextClick, name, email }) {
  const handleVerify = () => {
    // emailVerify(email).then((res) => {
    //   if (res) {
    //     console.log(res);
    handleNextClick;
    //   } else {
    //     console.log('verfication NOT');
    //   }
    // });
  };
  return (
    <MainContainer>
      <TopDiv>
        <LogoDiv>
          <Text color="red" fontSize="16px" marginLeft="19px" marginTop="12px">
            H
          </Text>
        </LogoDiv>

        <TextDiv>
          <Text>hinyn.com</Text>
          <Text color="gray">norplay@hinyn.com</Text>
          <Text marginTop="23px" display="flex">
            <Text display="flex" color="gray">
              Subject:
            </Text>
            Verify your email adress for account registartion.
          </Text>
        </TextDiv>
      </TopDiv>
      <HorizontalLine />
      <SecondDiv>
        <Logo />
        <Text fontWeight="bold" marginTop="13px" fontSize="15px">
          Hi {name},
        </Text>
        <Text marginTop="13px">
          We Hinyn To learn more about Next.js, take a look at the following
          resourcesTo learn more about Next.js, take a look. resourcesTo learn
          more about below:
        </Text>
        <StyledButton onClick={() => handleNextClick}>
          Verify your Email
        </StyledButton>
        <Text marginLeft="15rem">Button didnot work? Try link below</Text>
        <LinkCon onClick={handleVerify}>
          <Text color="green" paddingY="24px" paddingX="55px">
            https//link&sca_esv=566849429&hl=en&sxsrf=AM9HkKm0Fs9fQYJXl9NN_
          </Text>
        </LinkCon>
        <Text marginTop="30px">
          We Hinyn To learn more about Next.js, take a look at the following
          resourcesTo learn more about
          <Text color="red" fontWeight="bold">
            support@hinyn.com
          </Text>
          <Text marginTop="30px">Regards,</Text>
          <Text fontWeight="bold" marginTop="8px">
            Hinyn Team
          </Text>
        </Text>
      </SecondDiv>
    </MainContainer>
  );
}
export default EmailVerifyFormPopUp;
