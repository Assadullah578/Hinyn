import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Text = styled(Typography)`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) =>
    props.color === 'red'
      ? '#EB4C60'
      : props.color === 'green'
      ? '#4AA398'
      : props.color === 'gray' // New condition for gray color
      ? '#a6a6a6'
      : props.color === 'white'
      ? 'white'
      : props.color === 'black'
      ? 'black'
      : '#525252'};
  font-size: ${(props) =>
    props.size === 'large'
      ? '20px'
      : props.size === 'small'
      ? '10px'
      : props.size === '12'
      ? '12px'
      : props.size === 'smd'
      ? '16px'
      : props.size === 'md'
      ? '18px'
      : props.size === 'l2'
      ? '24px'
      : props.size === 'xl'
      ? '32px'
      : props.size === 'xxl'
      ? '34px'
      : '14px'};
  text-align: ${(props) => (props.align === 'center' ? 'center' : 'left')};
  font-weight: ${(props) => (props.font === 'bold' ? '600' : '300')};
`;

export const SmallText = styled(Text)`
  font-size: 10px;
`;

export const GrayText = styled(Text)`
  color: #a6a6a6;
  padding-horizontal: 10px;
`;

export default Text;
