import styled from '@emotion/styled';
import { Container, InputAdornment, IconButton } from '@mui/material';
import { SearchIcon } from '../Icon';
import StyledTextField, { StyledTextFieldBrowse } from '../Textfield';

const IconBG = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props?.iconColor === 'red'
      ? 'linear-gradient(135deg, #FF5A5F 0%, #A52226 100%)'
      : 'linear-gradient(111deg, #4AA398 0%, #12584F 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    color: #ffffff;
    font-size: 16px;
  }
`;

const SimpleSearchBar = ({
  handleSearchValue,
  placeholderText,
  iconColor,
  handleFilter,
}) => {
  return (
    <Container maxWidth="large">
      <StyledTextFieldBrowse
        required
        fullWidth
        id="searchInput"
        label=""
        name="searchInput"
        placeholder={placeholderText}
        onChange={handleSearchValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleFilter}>
                <IconBG iconColor={iconColor}>
                  <SearchIcon className="icon" />
                </IconBG>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default SimpleSearchBar;
