import styled from '@emotion/styled';
import Image from 'next/image';
import { Box } from '@mui/material';

const categories = {
  data: [
    {
      key: 'photographer',
      icon: 'icn-photographer.svg',
      title: 'Photographer',
    },
    {
      key: 'videographer',
      icon: 'icn-videographer.svg',
      title: 'Videographer',
    },
    {
      key: 'editor',
      icon: 'icn-editor.svg',
      title: 'Editor',
    },
    {
      key: 'stylist',
      icon: 'icn-stylist.svg',
      title: 'Stylist',
    },
    {
      key: 'makeup-artist',
      icon: 'icn-makeupArtist.svg',
      title: 'Makeup Artists',
    },
    {
      key: 'hair-stylist',
      icon: 'icn-makeupArtist-1.svg',
      title: 'Hair Stylists',
    },
    {
      key: 'model',
      icon: 'icn-hairStylist.svg',
      title: 'Models',
    },
    {
      key: 'studio-location',
      icon: 'icn-models.svg',
      title: 'Studio/Location',
    },
    {
      key: 'drone',
      icon: 'icn-drone.svg',
      title: 'Drone Operator',
    },
  ],
};

const Icon = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;

  .icon-img {
    filter: grayscale(100%) sepia(100%) hue-rotate(90deg);
  }
`;

const Pill = styled.div`
  background: ${(props) => (props.color === 'green' ? '#CCE0DE' : '#ffffff')};
  border-radius: 13px;
  display: flex;
  color: ${(props) => (props.color === 'green' ? '#4AA398' : '#EB4C60;')};
  padding: 0.25rem 0.5rem;
  column-gap: 1rem;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
  }

  &.active {
  }
`;

export const StaticPill = styled.div`
  background-color: ${(props) =>
    props.bg === 'green' ? '#ECF6F5' : '#ffffff'};
  border: ${(props) =>
    props.color === 'green' ? '1px solid #4AA398' : 'none'};
  border-radius: 13px;
  display: flex;
  color: ${(props) => (props.color === 'green' ? '#4AA398' : '#525252')};
  padding: 0.5rem 1.25rem;
  font-size: 12px;
  font-weight: bold;
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 32px;
  padding: ${(props) => (!props.noPadding ? '0.5rem 2.2rem' : '0')};
  font-size: 12px;
  background-color: ${(props) =>
    props.bg === 'green' ? '#ECF6F5' : '#ffffff'};
  border: ${(props) =>
    props.color === 'green' ? '1px solid #4AA398' : 'none'};
  color: ${(props) =>
    props.color === 'green'
      ? '#4AA398'
      : props.color === 'gray'
      ? '#BABABA'
      : '#525252'};
`;

export const PillWithIcon = ({ color, bg, category, noPadding }) => {
  const iconPath = '/assets/img/categories/';
  // const data = categories.data.find((item) => item.key === category);
  return (
    <IconWrapper color={color} bg={bg} noPadding={noPadding}>
      <Icon>
        <Image
          src={iconPath + category?.icon}
          alt="hinyn logo"
          layout="fill"
          class="icon-img"
        />
      </Icon>
      {category?.title}
    </IconWrapper>
  );
};

export default Pill;
