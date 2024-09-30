import { Box } from '@mui/material';
import styled from '@emotion/styled';
import CategoryIcon from '../shared/categories/Category';
import { RightChevronIcon, AddIcon, Check } from './Icon';
import Category3 from './categories/Category3';
import { useState } from 'react';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 370px;
  background: #ffffff;
  border: 1px solid lightgray;
  border-radius: 0 0 20px 20px;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eb4c60;
  }
`;

const Row = styled.div`
  color: #939393;
  font-size: 16px;
  background-color: #ffffff;
  padding: 16px 32px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd30;

  &.header {
    color: #ffffff;
    background-color: #24796e;
    border-radius: 13px 13px 0 0;
  }

  &:hover:not(.header) {
    background-color: #fff4f5;
  }

  &.selected {
    background-color: #e0f7fa;
  }
`;

const TextWithIcon = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;

const ScrollDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 20px;
  background: #ffffff;
  border-radius: 0 0 20px 20px;
`;

const iconMap = {
  'right-arrow': <RightChevronIcon variant="green" />,
  'add-icon': <AddIcon variant="red" />,
  check: <Check variant="green" />,
};
const Main = styled.div`
  width: 26.5vw;
  @media (max-width: 440px) {
    width: 100%;
  }
  /* height: 30vw; */
`;
const ScrollableTable = ({
  data,
  title,
  startAdornment,
  endAdornment,
  type,
  onCategoryClick,
  onSkillClick,
  selectedCategories,
  selectedSkills,
}) => {
  return (
    <Main>
      <Row className="header">{title}</Row>
      {type && type === 'categories' ? (
        <StyledBox>
          {data &&
            data.map((category, idx) => (
              <Row
                key={'category-' + idx}
                onClick={() => onCategoryClick(idx)}
                className={
                  selectedCategories.includes(category) ? 'selected' : ''
                }
              >
                {startAdornment === 'icon' ? (
                  <TextWithIcon>
                    <Category3 data={category} />
                  </TextWithIcon>
                ) : (
                  <span> {category?.title} </span>
                )}
                {endAdornment && iconMap[endAdornment]}
              </Row>
            ))}
        </StyledBox>
      ) : type === 'category_skills' ? (
        <StyledBox>
          {data &&
            data.map((skill, idx) => (
              <Row
                key={'category-skill-' + idx}
                onClick={() => onSkillClick(skill)}
              >
                <span> {skill?.title} </span>
                {selectedSkills.includes(skill)
                  ? iconMap['check']
                  : iconMap['add-icon']}
              </Row>
            ))}
        </StyledBox>
      ) : (
        <StyledBox>
          {data &&
            data.map((skill, idx) => (
              <Row key={'skill-' + idx}>
                <span> {skill?.title} </span>
              </Row>
            ))}
        </StyledBox>
      )}
      <ScrollDiv></ScrollDiv>
    </Main>
  );
};

export default ScrollableTable;
