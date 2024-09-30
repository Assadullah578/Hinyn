import { CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';

import { BackIcon, PhotoIcon, RightArrowIcon } from '../shared/Icon';

import Logo from '../shared/Logo';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const Item = styled.div`
  border: 1px solid #d8d8d8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: #fcfcfc;
  border-radius: 24px;
  column-gap: 2rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => (props.type === 'client' ? '#FDEAEF' : '#ECF6F5')};
    border: ${(props) =>
      props.type === 'client' ? '1px solid #EB4C60' : '1px solid #4AA398'};

    .right-arrow {
      opacity: 1;
    }
  }
`;

const StyledRightArrowIcon = styled(RightArrowIcon)`
  opacity: 0;
`;
const DivLogo = styled.div`
  margin-top: 12px;
`;
function AccountTypeForm({ accountType }) {
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem' }}>
        <BackIcon variant="red" />
        <CssBaseline />
        <FormContainer>
          <DivLogo></DivLogo>
          <Logo />

          <Text size="large" marginBottom="8px">
            <b>Select Account Type</b>
          </Text>
          <Typography component="x" align="center">
            Don&apos;t worry, this can be changed later.
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <Item onClick={() => accountType('client')} type="client">
                  <PhotoIcon variant="red" fontSize={'2.5rem'} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Text className="title">
                      <b>Client</b>
                    </Text>
                    <Text>I want to hire</Text>
                  </Box>
                  <StyledRightArrowIcon variant="red" className="right-arrow" />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <Item
                  onClick={() => accountType('professional')}
                  type="professional"
                >
                  <PhotoIcon variant="green" fontSize={'2.5rem'} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Text className="title">
                      <b>Professional</b>
                    </Text>
                    <Text>I want to work</Text>
                  </Box>
                  <StyledRightArrowIcon
                    variant="green"
                    className="right-arrow"
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
      </Container>
    </>
  );
}

export default AccountTypeForm;
