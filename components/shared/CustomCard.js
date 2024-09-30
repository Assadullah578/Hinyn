import styled from '@emotion/styled';
import breakpoint from '../utils/Breakpoints';
import Image from 'next/image';
import { LocationIcon } from '../shared/Icon';
import StarRating from './StarRating';
import Button from './Button';
import { useRouter } from 'next/router';
import { getStrapiMedia } from '../forms/formService';

const StyledCard = styled.div`
  min-height: 24rem;
  box-shadow: 1px 1px 10px #aaaaaa20;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 4rem 0 2rem;
  row-gap: 0.2rem;
  background-repeat: no-repeat;
  background-position: bottom right;
  user-select: none;
  height: 100%;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  @media ${breakpoint.device.lg} {
    margin: 0 1rem;
  }
  @media ${breakpoint.device.sm} {
    margin: 0;
  }
  &:hover,
  &:focus {
    box-shadow: 1px 1px 10px #0f766950;
    transition: all 0.3s ease-in-out;
  }
`;
const ImageContainer = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
  background: #ffffff;
  border: 5px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
`;
const StyledImage = styled(Image)`
  border-radius: 50%;
`;
const Title = styled.span`
  font-size: 17px;
  text-transform: capitalize;
`;
const Label = styled.span`
  font-size: 13px;
  color: ${(props) => (props.variant === 'green' ? '#0F7669' : '#525252')};
  display: flex;
  column-gap: 5px;
`;
const Label2 = styled.span`
  font-size: 13px;
  color: ${(props) => (props.variant === 'green' ? '#0F7669' : '#525252')};
  /* display: flex; */
  /* column-gap: 5px; */
  width: 90%;
  text-align: center;
`;
const StyledButton = styled(Button)`
  font-size: 13px;
  margin-top: 1.5rem;
  transition: all 0.3s ease-in-out;
`;
const HeaderBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 5.5rem;
  top: 0;
`;

function CustomCard({ data, cardText, handleButtonClick, logged }) {
  // let imgsrc = data?.displayPhoto
  //   ? '/assets/img/avatars/' + data.displayPhoto
  //   : '/assets/img/avatars/img-avatar1.png';
  const defaultImg = require('../../public/assets/img/bg@1x.png');
  const defaultAvatar = require('../../public/assets/img/avatars/avataruser-1.jpg');
  const router = useRouter();
  // const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  const handleClick = (data) => {
    if (cardText == 'Hire me') {
      router.push('/dashboard/professionalProfile?fid=' + data.id);
    } else if (cardText == 'Hire me2') {
      if (logged) {
        router.push('/dashboard/professionalProfile2?fid=' + data.id);
      } else {
        console.log('please login');
      }
    } else {
      handleButtonClick(data);
    }
  };
  // const imgPath = '../../public/assets/img/avatars/';
  return (
    <StyledCard>
      <HeaderBackground>
        <Image
          alt=""
          src={data.displayPhoto ? data.displayPhoto : defaultImg}
          layout="fill"
        />
      </HeaderBackground>
      <ImageContainer>
        {/* <StyledImage src={data.imgsrc} layout="fill" alt="icon-img" /> */}
        <StyledImage
          src={
            data?.attributes.displayPhoto
              ? getStrapiMedia(data?.attributes.displayPhoto)
              : defaultAvatar
          }
          layout="fill"
          alt="icon-img"
        />
      </ImageContainer>
      <Title>{`${data?.attributes.firstName} ${data?.attributes.lastName}`}</Title>

      <Label2 variant="green">{data?.attributes.headline}</Label2>

      <StarRating data={data?.attributes.rating ?? 5} />

      <Label>
        <LocationIcon />
        <div>{data?.attributes.city?.data?.attributes?.name ?? 'Null'}</div>
        <div>{data?.attributes.country?.data?.attributes?.name ?? 'Null'}</div>
      </Label>

      <StyledButton variant="outlined" onClick={() => handleClick(data)}>
        {cardText == 'Hire me' ? 'Hire me' : 'Hire me'}
      </StyledButton>
    </StyledCard>
  );
}

export default CustomCard;
