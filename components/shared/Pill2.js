import styled from '@emotion/styled';

const Pill = styled.div`
  background: transparent;
  border-radius: 28px;
  border: 1px solid #4aa398;
  color: ${(props) => (props.color === 'green' ? '#4AA398' : '#EB4C60;')};
  padding: 1rem 1.7rem;
  width: 100%;

  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  @media (max-width: 700px) {
    min-width: 10.4rem;
    padding: 15px 10px;
    font-size: 13px;
  }
  &:hover {
    // background: #4aa398;
  }

  &.active {
  }
`;

const Pill2 = ({ title, color }) => {
  return <Pill color={color}>{title}</Pill>;
};

export default Pill2;
