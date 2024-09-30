import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { UserIcon } from './Icon';

const Container = styled.div`
  margin-bottom: 1rem;
  width: ${(props) => (props.setWidth ? '32rem' : '')};
  @media (max-width: 769px) {
    width: ${(props) => (props.mobileWidth ? '92vw' : '100%')};
  }
`;

const Header = styled.div`
  background: ${(props) =>
    props.headerColor === 'gray'
      ? '#DEDEDE'
      : props.headerColor === 'red'
      ? '#FF5A5F'
      : '#4AA398'};
  background: ${(props) => props.headerColor === 'darkGray' && '#949494'};
  color: ${(props) => (props.headerColor === 'gray' ? '#555555' : '#ffffff')};
  font-weight: 600;
  border-radius: 13px 13px 0 0;
  padding: 18px 32px;
  display: flex;
  column-gap: 16px;
`;

const Main = styled.div`
  background: #ffffff;
  border-radius: ${(props) => (props.hasHeader ? '0 0 13px 13px' : '13px')};
  padding: ${(props) =>
    props.padding === true
      ? '0 0 5px 40px'
      : props.padding === 1
      ? '5px'
      : '32px'};
  border: 1px solid #eeeeee;
  max-height: ${(props) => (props?.isScrollable ? '30rem' : 'auto')};
  overflow: ${(props) => (props?.isScrollable ? 'auto' : 'hidden')};
  @media (max-width: 700px) {
    padding: ${(props) => (props.mobileWidth ? '10px' : '32px')};
  }
  &.no-padding {
    padding: 0;
  }
`;

const UserIconContainer = styled.div`
  border-radius: 50%;
  @media (max-width: 769px) {
    width: 22px;
    height: 22px;
  }
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #949494 0%, #4a4a4a 100%);

  .icon {
    font-size: 16px;
    color: #ffffff;
  }
`;

const ContentBox = ({
  hasHeader,
  headerColor,
  headerTitle,
  headerIcon,
  hasBodyIcon,
  isScrollable,
  noPadding,
  padding,
  children,
  giveh,
  setWidth,
  mobileWidth,
}) => {
  return (
    <Container
      isScrollable={isScrollable}
      giveh={giveh}
      setWidth={setWidth}
      mobileWidth={mobileWidth}
    >
      {hasHeader && (
        <Header headerColor={headerColor}>
          {headerIcon ?? headerIcon}
          {headerTitle}
        </Header>
      )}
      <Main
        hasHeader={hasHeader}
        padding={padding}
        className={noPadding === true ? 'no-padding' : ''}
        isScrollable={isScrollable}
        mobileWidth={mobileWidth}
      >
        <Grid container>
          {hasBodyIcon ? (
            <>
              <Grid item xs={1}>
                <UserIconContainer>
                  <UserIcon className="icon" />
                </UserIconContainer>
              </Grid>
              <Grid item xs={11}>
                {children}
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              {children}
            </Grid>
          )}
        </Grid>
      </Main>
    </Container>
  );
};

export default ContentBox;
