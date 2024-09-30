import Header from '../components/section/Header';
import Footer from '../components/section/Footer';
import styled from '@emotion/styled';
import { Grid, Container, Box } from '@mui/material';
import Text, { GrayText } from '../components/shared/Typography';
import { RightArrowIcon } from '../components/shared/Icon';
import Image from 'next/image';
import Button from '../components/shared/Button';
import Header2 from '../components/section/Header2';

const Row = styled(Box)`
  display: flex;
`;
const Row2 = styled(Box)`
  display: flex;
  width: 60rem;
`;
const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;

// const Title = styled.div`
//   font-size: 56px;
//   font-weight: 600;
//   line-height: 1.25;
//   color: gray;

//   // background: linear-gradient(104deg, #ff5a5f 0%, #a52226 100%);
//   // -webkit-background-clip: text;
//   // background-clip: text;
//   color: transparent;
//   display: inline;

//   .red {
//     color: #eb4c60;
//   }

//   .green {
//     color: #4aa398;
//   }
//   .reg-gradient {
//     background: linear-gradient(104deg, #ff5a5f 0%, #a52226 100%);
//     -webkit-background-clip: text;
//     background-clip: text;
//   }
// `;
const Title = styled(Text)`
  font-size: 56px;
  font-weight: 600;
  line-height: 1.25;

  .red {
    color: #eb4c60;
    // // background: linear-gradient(104deg, #ff5a5f 0%, #a52226 100%);
    // // -webkit-background-clip: text;
    // // background-clip: text;
    // color: linear-gradient(104deg, #ff5a5f 0%, #a52226 100%);
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 1rem 0.8rem;
  width: 22rem;
  height: 13rem;
  background: #ffffff;
  border-radius: 13px;
  filter: drop-shadow(0px 3px 30px #9393931a);
  flex-basis: 35%;

  &.projects-card {
    padding: 0;

    &:hover {
      box-shadow: 0px 3px 20px #0000004b;
    }
  }
`;
const Card2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 1.5rem;
  width: 16rem;
  height: auto;
  background: #ffffff;
  border-radius: 13px;
  filter: drop-shadow(0px 3px 30px #9393931a);
  flex-basis: 35%;

  &.projects-card {
    padding: 0;

    &:hover {
      box-shadow: 0px 3px 20px #0000004b;
    }
  }
`;

const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 45rem;
  height: 48rem;
  position: relative;
  overflow: hidden;

  &.about-us-img1-box {
    width: 42rem;
  }

  &.projects-img-box {
    width: 100%;
    height: 14rem;
    border-radius: 16px 16px 0 0;
    box-shadow: none;
  }

  &.avatar-img-box {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
`;

const BGBox = styled(Box)`
  background: ${(props) => (props.color === 'white' ? '#ffffff' : '#f7f7f7')};
  padding: 5rem 0 7rem 0;
  width: 100%;
  height: 100%;
`;
const RoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ecf6f5;
  border-radius: 50%;
  padding: 3rem;
  width: 22rem;
  height: 22rem;
`;

const BrokenLine = styled.div`
  &.upper {
    width: 12rem;
    height: 5rem;
    margin-top: 8rem;
    background: transparent;
    border: none;
    border-top: dashed 2px #eb4c60;
    border-radius: 50%;
  }

  &.lower {
    width: 12rem;
    height: 5rem;
    background: transparent;
    border: none;
    border-bottom: dashed 2px #eb4c60;
    border-radius: 0 0 50% 50%;
    margin-top: 10rem;
  }
`;

const CustomButton = styled(Button)`
  font-size: 18px;
  padding: 1rem 1.5rem;
  border-radius: 30px;
`;
const ContainerDiv = styled.div`
  width: 84%;
  margin: auto;
`;
const Title2 = styled.div`
  color: #525252;
  font-size: 56px;
  font-weight: 600;
`;
const Title3 = styled.div`
  color: #4aa398;
  font-size: 19px;
  font-weight: '100px';
  margin-bottom: 10px;
`;
const Title6 = styled.div`
  color: #4aa398;
  font-size: 15px;
  font-weight: 100px;
  margin-bottom: 10px;
`;
const Title5 = styled.div`
  color: #4aa398;
  font-size: 15px;
`;

const TextBold = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  // line-height: 1.25;
`;
const cardData = [
  {
    icon: 'icon-fastBids.svg',
    title: 'Fast Bids',
    desc: 'Post a project according to your specific needs in terms of professional type, location and budget.',
  },
  {
    icon: 'icon-qualityWork.svg',
    title: 'Quality work',
    desc: 'All specific professionals will receive and reply to your proposition, then select the best one to work on your project!',
  },
  {
    icon: 'icon-fastBids.svg',
    title: 'Track Progress with Safe Payment',
    desc: 'Payment stays on the platform until validity from the client and the professional of the work done',
  },
  {
    icon: 'icon-portfolio.svg',
    title: 'Browse Portfolio',
    desc: 'You can browse all the portfolios and send a proposition directly to the professional you like',
  },
];

const professionalData = [
  {
    title: 'More Visibility',
    desc: 'Everyone can see your work according to your specification, location and rating. Finding you is made easy!',
  },
  {
    title: 'Safe Payment System',
    desc: 'The client has to pay before the project is happening and the money stays on the platform until you deliver the good work.',
  },
  {
    title: 'Shareable Portfolio',
    desc: 'Easy to share your Portfolio for your own clients. Show your work to the world, by easily sharing your portfolio. Your profile is your own website.',
  },
];

const projectsData = [
  {
    title: 'Essential Oils',
    desc: 'John Doe',
    img: 'about-us-projects1.png',
  },
  {
    title: 'Flat Lay',
    desc: 'John Doe',
    img: 'about-us-projects2.png',
  },
  {
    title: 'Parfum',
    desc: 'John Doe',
    img: 'about-us-projects3.png',
  },
  {
    title: 'Bridal Make-up',
    desc: 'John Doe',
    img: 'about-us-projects4.png',
  },
];

const hiringData = [
  {
    title: 'Post your project',
    desc: 'As a client, Create a bid that will be sent to the concerned professionals according to your location and budget',
  },
  {
    title: 'Enrollment',
    desc: 'Select the best professional you would like to work with and pay on the platform where your money stays safe until the project is accomplished.',
  },
  {
    title: 'Payment Release',
    desc: 'Project is happening, everything is delivered and client release the payment and rate the work done.',
  },
];

function whyHinyn() {
  let imgpath = '/assets/img/';
  return (
    <>
      <Header2 />
      <BGBox>
        <ContainerDiv>
          <Grid container>
            <Grid item xs={7}>
              <Column>
                <Text color="red">
                  <b>FOR CLIENTS</b>
                </Text>
                {/* <Title>
                  <Title2>Find and book your</Title2>
                  Media Professional
                </Title> */}
                <Title>
                  Find and book your
                  <br />
                  <span class="red">Media Professional</span>
                </Title>
                <Box maxWidth="sm">
                  <Subtitle>
                    Made easy according to your preferences, your location, your
                    budget, and so on…
                  </Subtitle>
                </Box>
                <Row2
                  sx={{ flexWrap: 'wrap', gap: '1.25rem', marginTop: '2.5rem' }}
                >
                  {cardData &&
                    cardData.map((item, idx) => {
                      return (
                        <Card key={'why-card-' + idx}>
                          <IconContainer>
                            <Image
                              src={imgpath + 'icons/' + item?.icon}
                              layout="fill"
                              className="icon-img"
                              alt="icon-img"
                            />
                          </IconContainer>
                          <Title5 color="green">{item?.title}</Title5>
                          <Text align="center"> {item?.desc} </Text>
                        </Card>
                      );
                    })}
                </Row2>
              </Column>
            </Grid>
            <Grid item xs={5}>
              <Row
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '1rem',
                }}
              >
                <ImageContainer className="about-us-img1-box">
                  <Image
                    src={imgpath + 'about-us-img1.png'}
                    layout="fill"
                    className="about-us-img1"
                    alt="icon-img"
                  />
                </ImageContainer>
              </Row>
            </Grid>
          </Grid>
        </ContainerDiv>
      </BGBox>
      <BGBox color="white">
        <Container maxWidth="xl">
          <Row sx={{ justifyContent: 'center' }}>
            <Title2>Hiring made easy</Title2>
          </Row>
          <Row sx={{ justifyContent: 'center' }}>
            <Box maxWidth="md">
              <Subtitle>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                Pellentesque tempus arcu et ipsum cursus dignissim.
              </Subtitle>
            </Box>
          </Row>
          <Row
            sx={{
              justifyContent: 'center',
              marginTop: '5rem',
              position: 'relative',
              gap: '0',
            }}
          >
            {hiringData &&
              hiringData.map((item, idx) => {
                return (
                  <>
                    <RoundContainer key={'hiring-desc-' + idx}>
                      <Title3>{item?.title}</Title3>
                      <Text align="center">{item?.desc}</Text>
                    </RoundContainer>
                    {idx === 0 ? <BrokenLine className="upper" /> : ''}
                    {idx === 1 ? <BrokenLine className="lower" /> : ''}
                  </>
                );
              })}
          </Row>
          <Row sx={{ justifyContent: 'center', marginTop: '5rem' }}>
            <CustomButton>Hire A Professional</CustomButton>
          </Row>
        </Container>
      </BGBox>
      <BGBox>
        <ContainerDiv>
          <Row sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Get inspired with projects made with us</Title>
            <Text color="red">
              Browse more
              <RightArrowIcon color="red" />
            </Text>
          </Row>
          <Row sx={{ gap: '2rem', margin: '2rem 0' }}>
            {projectsData &&
              projectsData.map((item, idx) => {
                return (
                  <Card2 key={'project-card-' + idx} className="projects-card">
                    <ImageContainer className="projects-img-box">
                      <Image
                        src={imgpath + item?.img}
                        layout="fill"
                        alt="project-img"
                      />
                    </ImageContainer>
                    <Row
                      sx={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '0 2rem 1rem',
                      }}
                    >
                      <Column sx={{ justifyContent: 'center' }}>
                        <ImageContainer className="avatar-img-box">
                          <Image
                            src={imgpath + 'avatars/img-avatar1.png'}
                            layout="fill"
                            className="avatar-img"
                            alt="avatar-img"
                          />
                        </ImageContainer>
                      </Column>
                      <Column sx={{ width: '100%', padding: '1.25rem' }}>
                        <TextBold>{item?.title}</TextBold>
                        <GrayText>by {item?.desc}</GrayText>
                      </Column>
                    </Row>
                  </Card2>
                );
              })}
          </Row>
        </ContainerDiv>
      </BGBox>
      <BGBox color="white">
        <ContainerDiv>
          <Grid container>
            <Grid item xs={6}>
              <Row>
                <ImageContainer className="icon-img-box">
                  <Image
                    src={imgpath + 'about-us-img2.png'}
                    layout="fill"
                    className="icon-img"
                    alt="icon-img"
                  />
                </ImageContainer>
              </Row>
            </Grid>
            <Grid item xs={6}>
              <Column>
                <Text color="green">
                  <b>FOR PROFESSIONALS</b>
                </Text>
                <Title>
                  A platform for
                  <br />
                  <span class="green">Media Freelancers</span>
                </Title>
                <Box maxWidth="sm">
                  <Subtitle>
                    More visibility, More Contracts, More Money! Be your own
                    boss
                  </Subtitle>
                </Box>
                <Column sx={{ marginTop: '2.5rem', gap: '3rem', width: '80%' }}>
                  {professionalData &&
                    professionalData.map((item, idx) => {
                      return (
                        <Row
                          key={'project-desc-' + idx}
                          sx={{ gap: '2rem', alignItems: 'center' }}
                          maxWidth="sm"
                        >
                          <Column>
                            <Title6>
                              <b>{item?.title}</b>
                            </Title6>
                            <Text> {item?.desc} </Text>
                          </Column>
                        </Row>
                      );
                    })}
                </Column>
                <Row sx={{ marginTop: '4rem' }}>
                  <CustomButton>Get Hired Today</CustomButton>
                </Row>
              </Column>
            </Grid>
          </Grid>
        </ContainerDiv>
      </BGBox>
      <Footer />
    </>
  );
}

export default whyHinyn;
