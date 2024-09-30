import styled from '@emotion/styled';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1.2rem;
  border: 1px solid #ebebeb;
  border-radius: 30px;

  /* margin: auto; */
  padding: 10px 55px;
  opacity: ${(props) => (props.isExpanded ? 0 : 1)};
  @media (min-width: 768px) {
    display: none;
  }
  &:hover {
    cursor: pointer;
  }
`;
const SearchIconContainer = styled.div`
  background: linear-gradient(135deg, #ff5a5f 0%, #a52226 100%);
  box-shadow: 0px 3px 6px #eb4c6072;
  border-radius: 50%;
  padding: 4px 4px 0;
`;
const CustomSearchIcon = styled(FiSearch)`
  color: #ffffff;
`;
const PhoneSearch = ({ ExpandBar }) => {
  return (
    <SearchBar onClick={() => ExpandBar()}>
      <SearchIconContainer>
        <CustomSearchIcon />
      </SearchIconContainer>
      I am looking for?
    </SearchBar>
  );
};

export default PhoneSearch;
