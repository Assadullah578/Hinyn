import styled from '@emotion/styled';
import Image from 'next/image';
import LogoImage from '/public/assets/img/temp/logo-normal2.svg';
import WhiteLogoImage from '/public/assets/img/logo-hinyn-white.svg';
import { useRouter } from 'next/router';

const LogoContainer = styled.div`
  position: relative;
  width: 8rem;
  height: 3.5rem;
  cursor: pointer;
`;
const Logo2 = ({ type }) => {
  const router = useRouter();

  return (
    <LogoContainer onClick={() => router.push('/')}>
      <Image src={LogoImage} layout="responsive" alt="logo-img" />
    </LogoContainer>
  );
};

export default Logo2;
