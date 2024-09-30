import styled from '@emotion/styled';

const Button = styled.button`
  outline: none;
  background: ${(props) =>
    props.variant === 'outlined'
      ? 'transparent'
      : 'linear-gradient(104deg, #FF5A5F 0%, #A52226 100%)'};
  color: ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#ffffff')};
  border-radius: 21px;
  border: ${(props) =>
    props.variant === 'outlined' ? ' 1px solid #EB4C60' : 'none'};
  font-family: 'DM Sans', sans-serif;
  font-size: ${(props) => (props.size === 'small' ? '10px' : '14px')};
  cursor: ${(props) =>
    props.disabled === 'disabled' ? 'not-allowed' : 'pointer'};
  text-decoration: none;
  display: block;
  padding: ${(props) =>
    props.variant === 'outlined'
      ? '0.5rem 3rem'
      : props.size === 'small'
      ? '1rem 2rem'
      : '0.75rem 1rem'};
  pointer-events: ${(props) => (props.disabled === 'disabled' ? 'none' : '')};
  text-align: center;
  transition: all 0.5s ease-in-out;
  width: ${(props) => props.width ?? 'auto'};

  &:hover {
    border: ${(props) =>
      props.variant === ' outlined' ? '1px solid #0F7669' : 'none'};
    box-shadow: ${(props) =>
      props.variant === 'outlined'
        ? ''
        : '0px 0px 11px rgba(235, 76, 96, 0.9)'};
    background: ${(props) =>
      props.variant === 'outlined'
        ? '#0F7669'
        : 'linear-gradient(to right, #A52226, #FF5A5F)'};
    color: #ffffff;
  }
  &:active {
  }
`;
export const ButtonSmall = styled.button`
  outline: none;
  background: ${(props) =>
    props.variant === 'outlined'
      ? 'transparent'
      : 'linear-gradient(104deg, #FF5A5F 0%, #A52226 100%)'};
  color: ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#ffffff')};
  border-radius: 21px;
  border: ${(props) =>
    props.variant === 'outlined' ? ' 1px solid #EB4C60' : 'none'};
  font-family: 'DM Sans', sans-serif;
  font-size: ${(props) => (props.size === 'small' ? '10px' : '12px')};
  cursor: ${(props) =>
    props.disabled === 'disabled' ? 'not-allowed' : 'pointer'};
  text-decoration: none;
  display: block;
  padding: ${(props) =>
    props.variant === 'outlined'
      ? '0.5rem 3rem'
      : props.size === 'small'
      ? '1rem 2rem'
      : '0.6rem 0.3rem'};
  pointer-events: ${(props) => (props.disabled === 'disabled' ? 'none' : '')};
  text-align: center;
  transition: all 0.5s ease-in-out;
  width: ${(props) => props.width ?? 'auto'};

  &:hover {
    border: ${(props) =>
      props.variant === ' outlined' ? '1px solid #0F7669' : 'none'};
    box-shadow: ${(props) =>
      props.variant === 'outlined'
        ? ''
        : '0px 0px 11px rgba(235, 76, 96, 0.9)'};
    background: ${(props) =>
      props.variant === 'outlined'
        ? '#0F7669'
        : 'linear-gradient(to right, #A52226, #FF5A5F)'};
    color: #ffffff;
  }
  &:active {
  }
`;
export const GreenButton = styled.button`
  outline: none;
  background: ${(props) =>
    props.variant === 'outlined'
      ? 'transparent'
      : 'linear-gradient(96deg, #4AA398 0%, #12584F 100%)'};
  color: ${(props) => (props.variant === 'outlined' ? '#4AA398' : '#ffffff')};
  border-radius: 21px;
  border: 1px solid
    ${(props) => (props.variant === 'outlined' ? '#4AA398' : '#4AA398')};
  font-family: 'DM Sans', sans-serif;
  font-size: ${(props) => (props.size === 'small' ? '10px' : '14px')};
  cursor: ${(props) =>
    props.disabled === 'disabled' ? 'not-allowed' : 'pointer'};
  text-decoration: none;
  display: block;
  padding: ${(props) =>
    props.variant === 'outlined'
      ? '0.75rem 2.5rem'
      : props.size === 'small'
      ? '0.75rem 1.5rem'
      : '0.75rem 3.5rem'};
  pointer-events: ${(props) => (props.disabled === 'disabled' ? 'none' : '')};
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 2px #4aa398);
  }
  &:active {
  }

  &.disabled {
    pointer-events: none;
    opacity: 1;
  }
`;

export const GrayButton = styled(Button)`
  background: ${(props) =>
    props.variant === 'outlined'
      ? 'transparent'
      : 'linear-gradient(96deg, #4AA398 0%, #12584F 100%)'};
  color: ${(props) => (props.variant === 'outlined' ? '#707070' : '#ffffff')};
  border: 1px solid
    ${(props) => (props.variant === 'outlined' ? '#707070' : '#4AA398')};
  font-size: ${(props) => (props.size === 'small' ? '10px' : '12px')};

  &:hover {
    box-shadow: 0 0 3px #707070;
    background: white;
    color: ${(props) => (props.variant === 'outlined' ? '#707070' : '#ffffff')};
    border: 1px solid
      ${(props) => (props.variant === 'outlined' ? '#707070' : '#4AA398')};
  }
  &:active {
  }
`;

export const RedButton = styled(Button)`
  background: ${(props) =>
    props.variant === 'outlined' ? 'transparent' : '#EB4C60'};
  padding: ${(props) => (props.width === 'more' ? '0.75rem 1.5rem' : '')};
  color: ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#ffffff')};
  border: 1px solid #eb4c60;
  font-size: ${(props) => (props.size === 'small' ? '10px' : '13.5px')};
  font-weight: bold;
  &:hover {
    box-shadow: 0 0 3px #eb4c60;
    background: white;
    border: 1px solid
      ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#EB4C60')};
    color: ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#EB4C60')};
  }
  &:active {
  }
`;
export const RedButton2 = styled(Button)`
  background: ${(props) =>
    props.variant === 'outlined' ? 'transparent' : '#EB4C60'};
  padding: ${(props) => (props.width === 'more' ? '0.6rem 1rem' : '')};
  color: ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#ffffff')};
  border: 1px solid #eb4c60;
  font-size: ${(props) => (props.size === 'small' ? '10px' : '12.5px')};
  font-weight: bold;
  height: 3rem;
  min-width: 6.8rem;
  /* &:hover {
    box-shadow: 0 0 3px #eb4c60;
    background: white;
    border: 1px solid
      ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#EB4C60')};
    color: ${(props) => (props.variant === 'outlined' ? '#EB4C60' : '#EB4C60')};
  }
  &:active {
  } */
`;
export default Button;
