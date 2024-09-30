import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { Cross } from './Icon';
import Text from './Typography';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 20px 30px;
  height: 370px;
  background: #ffffff;
  border-radius: 0 0 20px 20px;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }
`;

const Row = styled.div`
  color: #939393;
  font-size: 16px;
  background: white;
  padding: 30px 0 0 50px;
  display: flex;
  border-radius: 20px 20px 0 0;
  align-items: center;
  border-bottom: 1px solid #dddddd30;
`;

const TextWithIcon = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;

const BoxDiv = styled.div`
  padding: 0 0 0 10px;
`;

const MainDiv = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 20px;
  width: 26.5vw;
  @media (max-width: 440px) {
    width: 100%;
  }
`;

const TitleText = styled.span`
  color: #24796e;
  margin: 0 8px 0 0;
  font: bold;
`;
const Row2 = styled.div`
  display: inline-flex; /* Allows the width to adjust based on content */
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px; /* Keeps a small, rounded look */
  padding: 2px 6px; /* Minimal padding for a compact look */
  margin: 2px;
  background-color: #f8f8f8;
  font-size: 12px;
`;

const IconDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin-left: 6px;
  background-color: transparent;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    color: #525151;
  }
`;

const TextDiv = styled.div`
  font-size: 11px;
  color: #939393;
  font-weight: 400;
  white-space: nowrap; /* Prevents the text from breaking into multiple lines */
`;

const ScrollableTable2 = ({
  data,
  title,
  onSkillRemove,
  onCategoryRemove,
  text,
  data2,
}) => {
  return (
    <>
      <MainDiv>
        <Row>
          {/* <TitleText>{title}</TitleText>  */}
          {text}
        </Row>
        <StyledBox>
          {' '}
          {data.length > 0 ? <TitleText>Selected Categories</TitleText> : null}
          <BoxDiv style={{ height: '9rem' }}>
            {data &&
              data.map((skill, idx) => (
                <Row2 key={'skill-' + idx}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      // padding: 5,
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    <TextDiv>{skill?.title}</TextDiv>
                    <IconDiv onClick={() => onCategoryRemove(skill)}>
                      <Cross />
                    </IconDiv>
                  </div>
                </Row2>
              ))}
          </BoxDiv>{' '}
          {data2.length > 0 ? <TitleText>Selected Skills</TitleText> : null}
          <BoxDiv>
            {data2 &&
              data2.map((skill, idx) => (
                <Row2 key={'skill-' + idx}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      // padding: 5,
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    <TextDiv>{skill?.title}</TextDiv>
                    <IconDiv onClick={() => onSkillRemove(skill)}>
                      <Cross />
                    </IconDiv>
                  </div>
                </Row2>
              ))}
          </BoxDiv>
        </StyledBox>
      </MainDiv>
    </>
  );
};

export default ScrollableTable2;
