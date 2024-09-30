import styled from '@emotion/styled';
import Image from 'next/image';
import LogoImage from '/public/assets/img/logo-normal.svg';
import WhiteLogoImage from '/public/assets/img/logo-hinyn-white.svg';
import { useRouter } from 'next/router';

const LogoContainer = styled.div`
  position: relative;
  width: 9rem;
  height: 4rem;
  cursor: pointer;
`;
const Logo = ({ type }) => {
  const router = useRouter();

  return (
    <LogoContainer onClick={() => router.push('/')}>
      <Image
        src={type === 'white' ? WhiteLogoImage : LogoImage}
        layout="responsive"
        alt="logo-img"
      />
    </LogoContainer>
  );
};

export default Logo;
