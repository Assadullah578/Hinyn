import Header from '../components/section/Header';
import Footer from '../components/section/Footer';
import styled from '@emotion/styled';
import { Grid, Container, Box } from '@mui/material';
import Text from '../components/shared/Typography';
import {
  EmailIcon,
  LocationIcon,
  TelephoneIcon,
} from '../components/shared/Icon';
import ContactUsForm from '../components/forms/ContactUsForm';
import Header2 from '../components/section/Header2';

const Row = styled(Box)`
  display: flex;
  width: 48rem;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Text)`
  font-size: 56px;
  font-weight: 600;
  line-height: 1.25;

  .red {
    color: #eb4c60;
  }

  .green {
    color: #4aa398;
  }
`;

const Subtitle = styled(Text)`
  font-size: 16px;
  margin-top: 1.5rem;
  letter-spacing: 0.75px;
`;

const BGBox = styled(Box)`
  background: ${(props) => (props.color === 'white' ? '#ffffff' : '#f7f7f7')};
  padding: 5rem 0 7rem 7.8rem;
  width: 100%;
  height: 100%;
`;

const contactDetails = [
  {
    desc: 'info@hinyn.com',
  },
  {
    desc: '123 Main Street, Business Bay, Dubai, United Arab Emirates.',
  },
  {
    desc: '+971 50 123 4567',
  },
];

function contactUs() {
  return (
    <>
      <Header2 />
      <BGBox>
        <Container maxWidth="xl">
          <Grid container>
            {/* <GridCon> */}
            <Grid item xs={5}>
              <Column>
                <Text color="red">
                  <b>CONTACT US</b>
                </Text>
                <Title>
                  We&apos;re <span class="red">excited</span> to <br />
                  hear from you!
                </Title>
                <Box maxWidth="sm">
                  <Subtitle>
                    Hey there! We&apos;d love to hear from you - go ahead and
                    fill out our
                    <br /> form, and we promise to get back to you within 24
                    hours
                  </Subtitle>
                </Box>
                <Row
                  sx={{ flexWrap: 'wrap', gap: '1.25rem', marginTop: '2.5rem' }}
                >
                  <Column sx={{ marginTop: '2.5rem', gap: '1.5rem' }}>
                    {contactDetails &&
                      contactDetails.map((item, idx) => {
                        return (
                          <Row
                            key={'project-desc-' + idx}
                            sx={{ gap: '1rem', alignItems: 'center' }}
                            maxWidth="sm"
                          >
                            <Text sx={{ fontSize: '25px !important' }}>
                              {idx === 0 ? (
                                <EmailIcon variant="red" />
                              ) : idx === 1 ? (
                                <LocationIcon variant="red" />
                              ) : (
                                <TelephoneIcon variant="red" />
                              )}
                            </Text>
                            <Text> {item?.desc} </Text>
                          </Row>
                        );
                      })}
                  </Column>
                </Row>
              </Column>
            </Grid>
            <Grid item xs={5}>
              <Row
                sx={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #D8D8D8',
                }}
              >
                <ContactUsForm />
              </Row>
            </Grid>
          </Grid>
          {/* </GridCon> */}
        </Container>
      </BGBox>
      <Footer />
    </>
  );
}

export default contactUs;
