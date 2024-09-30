import DashboardHeader from '../../components/section/DashboardHeader';
import { Box, Container, Grid } from '@mui/material';
import ContentBox from '../../components/shared/ContentBox';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text, { GrayText } from '../../components/shared/Typography';
import Header from '../../components/section/Header';
import {
  LocationIcon,
  AwardIcon,
  RoundChatIcon,
  Dots,
} from '../../components/shared/Icon';
import StarRating from '../../components/shared/StarRating';
import Footer from '../../components/section/Footer';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  getClientData,
  getClientDataBids,
  getMyMessages,
  getStrapiMedia,
} from '../../components/forms/formService';
import ImageSlider from '../../components/shared/ImageSlider';
import ReviewBox from '../../components/shared/ReviewBox';
import { CheckSquareIcon } from '../../components/shared/Icon';
import moment from 'moment';

import BidFreelancerForm2 from '../../components/forms/BidFreelancerForm2';
import Modal2 from '../../components/shared/Modal2';
import Settings from '../../components/section/settings/Settings';
import Wallet from '../../components/section/Wallet';
import ModalChat from '../../components/shared/ModalChat';
import ChatContent from '../../components/shared/chatContent/ChatContent';
import ChatContent2 from '../../components/shared/chatContent/ChatContent2';
import { ChatScreen } from '../../components/section/ChatScreen';
// import ChatContent2 from '../../components/shared/chatContent/ChatContent2';

const Row = styled(Box)`
  display: flex;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  position: relative;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;

const Name = styled(Text)`
  font-size: 32px;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const LargeIcon = styled.div`
  font-size: 20px !important;

  svg {
    color: #4aa398;
  }

  .chatIcon {
    font-size: 18px;
  }
`;

const VerticalDivider = styled.div`
  height: 2rem;
`;
const ButtonSkills = styled.div`
  background: #e2f2f0;
  border-radius: 30px;
  padding: 4px 7px;
  font-size: 12.3px;
  color: #4aa398;
  /* width: 50px; */
  display: flex;
`;
const DivB = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
`;
const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 80px 0 0;
`;
const LoginHoverBox = styled.div`
  background: white;
  position: absolute;
  width: 16rem;
  visibility: ${(props) => (props.hover ? '' : 'hidden')};
  opacity: ${(props) => (props.hover ? '1' : '0.6')};
  transition: 0.3s;
  padding: 2px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  cursor: pointer;
`;

const CustomText = styled.div`
  padding: 13px 20px;
  color: ${(props) => (props.hovered ? '#eb4c60' : '')};
  background: ${(props) => (props.hovered ? '#f5f5f5' : 'transparent')};
  transition: color 0.3s, background 0.3s;

  &:hover {
    color: #eb4c60;
    background: #ffedef;
  }
`;
const ColumnCon = styled.div`
  width: 100%;
`;
const ConDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IconDIv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
const VerifyText = styled.div`
  color: #eb4c60;
`;
const DivCon = styled.div``;
const ProfessionalProfile2 = () => {
  const router = useRouter();
  let imgPath = '/assets/img/avatars/';
  const [clientData, setClientData] = useState([]);
  const [clientBids, setClientBids] = useState([]);
  const [selectedClientBid, setSelectedClientBid] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [accountType, setAccountType] = useState();
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);
  const [skills, setSkills] = useState([]);
  const [identity, setIdentity] = useState(false);
  const [payment, setPayment] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [professionalId, setProfessionalId] = useState();
  const [name, setName] = useState();
  const [professionalName, setProfessionalName] = useState();
  const [chat, setChat] = useState([]);

  // const [senderId, setSenderId] = useState(ClientId);
  const { fid, val } = router.query;

  const reviews = [
    {
      user: 'Danny Woods',
      project: 'Danny and Kaylas Wedding',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
    {
      user: 'Kayla Woods',
      project: 'Danny and Kaylas Wedding',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
    {
      user: 'Danny Woods',
      project: 'Baby Shower',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
  ];

  const projectDetails = {
    attachments: [
      'project-temp-1.jpeg',
      'project-temp-2.jpeg',
      'project-temp-3.jpeg',
      'project-temp-4.jpeg',
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const clientData = {
        id: fid,
      };

      await getClientData(clientData).then((res) => {
        setProfessionalId(clientData.id);
        if (res?.data?.data) {
          setClientData(res?.data?.data?.attributes);
          setPhone(res?.data?.data?.attributes.isPhoneVerified);
          setEmail(res?.data?.data?.attributes.isEmailVerified);
          setProfessionalName(res?.data?.data?.attributes.firstName);

          const skillsData = res?.data?.data?.attributes?.skills;
          const titles = skillsData.data.map((skill) => skill.attributes.title);
          console.log(titles);
          setSkills(titles);
        }
      });
    };
    fetchData();
  }, [fid]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleBidSubmit = () => {
    setOpen(() => false);
  };
  const loginHover = () => {
    setHover(true);
  };

  const loginHoverOut = () => {
    setHover(false);
  };
  const loginHoverBoxEnter = () => {
    setHover(true);
  };

  const loginHoverBoxLeave = () => {
    setHover(false);
  };
  const handleChat = () => {
    setOpenChat(true);
  };
  const handleCloseMessage = () => {
    setOpenChat(false);
  };
  // const ClientId = localStorage.getItem('hinyn-cid');
  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <Header />
      {val == 0 || val == null ? (
        <Container maxWidth="xxl">
          <Grid
            container
            spacing={4}
            sx={{
              padding: '5rem 0 7rem 0',

              justifyContent: 'center',
            }}
          >
            <Grid item xs={7.5}>
              <ContentBox>
                <Row sx={{ gap: '2rem' }}>
                  <Column>
                    <ImageContainer>
                      <StyledImage
                        src={
                          clientData?.displayPhoto
                            ? getStrapiMedia(clientData.displayPhoto)
                            : imgPath + 'avataruser-1.jpg'
                        }
                        layout="fill"
                        alt="avatar-img"
                      />
                    </ImageContainer>
                  </Column>
                  <ColumnCon>
                    <DivButton>
                      <Row
                        sx={{
                          gap: '14px',
                          alignItems: 'center',
                        }}
                      >
                        <Name color="green">
                          <b>
                            {clientData?.firstName} {clientData?.lastName}
                          </b>
                        </Name>
                        <GrayText size="large">
                          {' '}
                          {clientData?.instagramProfile ??
                            '@' + clientData?.firstName}
                        </GrayText>
                      </Row>
                      {/* <Button onClick={handleOpen}>Send Bid</Button> */}
                      {fid ? (
                        <DivCon>
                          <Dots
                            color="red"
                            onMouseEnter={loginHover}
                            onMouseLeave={loginHoverOut}
                          />
                          <LoginHoverBox
                            hover={hover}
                            onMouseEnter={loginHoverBoxEnter}
                            onMouseLeave={loginHoverBoxLeave}
                          >
                            {' '}
                            <CustomText hover={hover}>
                              Add to My Freelancers
                            </CustomText>
                            <a onClick={handleOpen}>
                              <CustomText hover={hover}>send a bid</CustomText>
                            </a>
                            <a onClick={handleChat}>
                              <CustomText hover={hover}>
                                send a message
                              </CustomText>
                            </a>
                            <CustomText hover={hover}>Report</CustomText>
                          </LoginHoverBox>
                        </DivCon>
                      ) : (
                        ''
                      )}
                    </DivButton>
                    <Row sx={{ gap: '16px', alignItems: 'center' }}>
                      <StarRating data={clientData?.rating ?? 3} sz="xl" />
                      <GrayText>
                        {' '}
                        {clientData?.jobsCompleted ?? 0} jobs Completed
                      </GrayText>
                    </Row>
                    <Column sx={{ rowGap: '10px', margin: '1.5rem 0' }}>
                      <Row sx={{ gap: '8px' }}>
                        <LargeIcon>
                          <LocationIcon />
                        </LargeIcon>
                        <GrayText>
                          {' '}
                          {clientData?.city?.data?.attributes?.name ?? '-'}{' '}
                          {clientData?.country?.data?.attributes?.name ?? '-'}{' '}
                        </GrayText>
                      </Row>
                      <Row sx={{ gap: '8px' }}>
                        <LargeIcon>
                          <AwardIcon />
                        </LargeIcon>
                        <GrayText>
                          {' '}
                          Member Since{' '}
                          {moment(clientData?.createdAt).format(
                            'MMMM YYYY'
                          )}{' '}
                        </GrayText>
                      </Row>
                      <Row sx={{ gap: '8px' }}>
                        <LargeIcon>
                          <RoundChatIcon className="chatIcon" />
                        </LargeIcon>
                        {clientData?.languages?.data?.length > 0 ? (
                          clientData.languages.data.map((itm, index) => (
                            <GrayText key={index}>
                              {itm.attributes.name !== null
                                ? itm.attributes.name
                                : 'no languages selected'}
                            </GrayText>
                          ))
                        ) : (
                          <GrayText>No languages available</GrayText>
                        )}
                      </Row>
                    </Column>
                    <Row>
                      <GrayText>{clientData?.description}</GrayText>
                    </Row>
                  </ColumnCon>
                </Row>
              </ContentBox>
              <VerticalDivider />
              <ContentBox
                hasHeader={true}
                headerTitle="Portfolio"
                headerColor="green"
              >
                <VerticalDivider />
                <Row>
                  {/* <ImageSlider images={projectDetails?.attachments} /> */}
                  No attachments Available
                </Row>
              </ContentBox>
              <VerticalDivider />
              <ContentBox
                hasHeader={true}
                headerTitle="Reviews"
                headerColor="green"
                isScrollable={false}
              >
                <Column sx={{ rowGap: '1rem', margin: '1.5rem 0' }}>
                  {/* {reviews &&
                    reviews.map((review, idx) => {
                      return (
                        <ReviewBox borderColor="green" key={'review-' + idx}>
                          <i>
                            <Text>{review?.desc}</Text>
                          </i>
                          <GrayText
                            component="span"
                            sx={{ marginRight: '1rem' }}
                          >
                            {review?.user}
                          </GrayText>
                          <Text color="red" component="span">
                            {review?.project}
                          </Text>
                        </ReviewBox>
                      );
                    })} */}
                  No reviews on this profile
                </Column>
              </ContentBox>
              <VerticalDivider />
            </Grid>
            <Grid item xs={2.9}>
              <ContentBox
                hasHeader={true}
                headerTitle="Verifications"
                headerColor="green"
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <ConDiv>
                    <GrayText>Identity</GrayText>
                    <IconDIv
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                    >
                      {identity ? (
                        <>
                          <CheckSquareIcon variant="green" />
                          <Text color="green">Verified</Text>
                        </>
                      ) : (
                        <VerifyText>Unverfied</VerifyText>
                      )}
                    </IconDIv>
                  </ConDiv>
                  <ConDiv>
                    <GrayText>Payment Method</GrayText>
                    <IconDIv
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                    >
                      {payment ? (
                        <>
                          <CheckSquareIcon variant="green" />
                          <Text color="green">Verified</Text>
                        </>
                      ) : (
                        <VerifyText>Unverified</VerifyText>
                      )}
                    </IconDIv>
                  </ConDiv>
                  <ConDiv>
                    <GrayText>Phone</GrayText>
                    <IconDIv
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                    >
                      {phone ? (
                        <>
                          <CheckSquareIcon variant="green" />
                          <Text color="green">Verified</Text>
                        </>
                      ) : (
                        <VerifyText>Unverified</VerifyText>
                      )}
                    </IconDIv>
                  </ConDiv>
                  <ConDiv>
                    <GrayText>Email</GrayText>
                    <IconDIv
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                      }}
                    >
                      {email ? (
                        <>
                          <CheckSquareIcon variant="green" />
                          <Text color="green">Verified</Text>
                        </>
                      ) : (
                        <VerifyText>Unverified</VerifyText>
                      )}
                    </IconDIv>
                  </ConDiv>
                </Box>
              </ContentBox>
              <ContentBox
                hasHeader={true}
                headerTitle="Skills"
                headerColor="green"
              >
                <DivB>
                  {skills?.map((x, i) => (
                    <ButtonSkills key={i}>
                      {skills ? x : 'No skills mentioned'}
                    </ButtonSkills>
                  ))}
                </DivB>
              </ContentBox>
            </Grid>
          </Grid>
          <ModalChat
            handleClose={handleCloseMessage}
            isOpen={openChat}
            hasHeader={false}
            hasFooter={false}
            Widthmax={true}
          >
            <ChatContent
              clientid={199}
              // filtered={chat}
              chatId={professionalId}
              name={professionalName}
            />
          </ModalChat>
          <Modal2 handleClose={handleClose} isOpen={open} maxWidth="md">
            <BidFreelancerForm2
              handleBidSubmit={handleBidSubmit}
              data={clientData}
              bidData={clientBids}
              selectedBid={selectedClientBid}
              Id={fid}
            />
          </Modal2>
        </Container>
      ) : val == 1 ? (
        <Settings />
      ) : val == 2 ? (
        <Wallet />
      ) : val == 4 ? (
        <ChatScreen />
      ) : (
        ''
      )}
      {val == 4 ? null : <Footer />}
    </Box>
  );
};

export default ProfessionalProfile2;
