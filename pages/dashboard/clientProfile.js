import DashboardHeader from '../../components/section/DashboardHeader';
import { Box, Container, Grid } from '@mui/material';
import ContentBox from '../../components/shared/ContentBox';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text, { GrayText } from '../../components/shared/Typography';
import {
  LocationIcon,
  AwardIcon,
  RoundChatIcon,
  CheckSquareIcon,
} from '../../components/shared/Icon';
import StarRating from '../../components/shared/StarRating';
import Footer from '../../components/section/Footer';
import { PillWithIcon } from '../../components/shared/Pill';
import moment from 'moment';
import ReviewBox from '../../components/shared/ReviewBox';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getClientData,
  getClientDataBids,
  getStrapiMedia,
} from '../../components/forms/formService';
import ImageSlider from '../../components/shared/ImageSlider';

const Row = styled(Box)`
  display: flex;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 7.7rem;
  height: 7.7rem;
  position: relative;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
  margin: 0 20px 0 12px;
  @media (max-width: 700px) {
    width: 5rem;
    height: 5rem;
  }
`;

const Name = styled(Text)`
  font-size: 32px;
  @media (max-width: 700px) {
    font-size: 27px;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;
const LeftBorder = styled.div`
  margin: 0 16px;
  border-left: 1px solid #e96e3f;
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

const ReviewsContainer = styled(Box)`
  max-height: 30rem;
  overflow-y: auto;
`;

const VerticalDivider = styled.div`
  height: 2rem;
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
  /* cursor: pointer; */
  /* border-bottom: 1px solid #eb4c60; */
`;
const GrayText2 = styled(Text)`
  color: #a6a6a6;
  @media (max-width: 700px) {
    max-width: 54vw;
  }
  /* padding-horizontal: 10px; */
`;
const GrayText3 = styled(Text)`
  color: #a6a6a6;
  @media (max-width: 700px) {
    display: none;
    /* max-width: 54vw; */
  }
  /* padding-horizontal: 10px; */
`;
const DivCon = styled.div``;
const ClientProfile = () => {
  const router = useRouter();
  let imgPath = '/assets/img/avatars/';
  const [clientData, setClientData] = useState({});
  const [accountType, setAccountType] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [firstName, setFirstName] = useState();
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);
  const [identity, setIdentity] = useState(false);
  const [payment, setPayment] = useState(false);
  const { fid } = router.query;

  const projectDetails = {
    attachments: [
      'project-temp-1.jpeg',
      'project-temp-2.jpeg',
      'project-temp-3.jpeg',
      'project-temp-4.jpeg',
      'project-temp-5.jpeg',
      'project-temp-6.jpeg',
      'project-temp-7.jpeg',
    ],
  };

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

  useEffect(() => {
    const clientData = fid
      ? { id: fid }
      : { id: localStorage.getItem('hinyn-cid') };

    getClientDataBids(clientData).then((res) => {
      if (res?.data?.data) {
        setClientData(res?.data?.data?.attributes);
        console.log('eeee', res.data.data.attributes);
        setAccountType(res?.data?.data?.attributes.accountType);
        setFirstName(res?.data?.data?.attributes.firstName);
        setPhone(res?.data?.data?.attributes.isPhoneVerified);
        setEmail(res?.data?.data?.attributes.isEmailVerified);
      }
    });
  }, []);

  const handleChangeTab = (val) => {
    setCurrentTab(val);
    router.push('/dashboard');
  };

  return (
    <Box sx={{ height: 'auto', background: '#D7DBDD ' }}>
      <DashboardHeader
        setTabChange={handleChangeTab}
        currentTab={currentTab}
        account={accountType}
        firstName={firstName}
        userData={clientData}
      />

      <Container maxWidth="xxl">
        <Grid
          container
          spacing={4}
          sx={{
            padding: '5rem 0 7rem 0',
            justifyContent: 'center',
            '@media (max-width: 600px)': { flexDirection: 'column' },
          }}
        >
          <Grid item xs={7.5}>
            <ContentBox mobileWidth={true}>
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
                <Column>
                  <Row sx={{ gap: '14px', alignItems: 'center' }}>
                    <Name color="red">
                      <b>
                        {clientData?.firstName} {clientData?.lastName}
                      </b>
                    </Name>
                    <GrayText3 size="large">
                      {' '}
                      {clientData?.instagramProfile ??
                        '@' + clientData?.firstName}
                    </GrayText3>
                  </Row>
                  <Row sx={{ gap: '16px', alignItems: 'center' }}>
                    <StarRating data={clientData?.rating ?? 0} sz="xl" />
                    {/* <GrayText>
                      {' '}
                      {clientData?.jobsCompleted} 32 Projects Completed
                    </GrayText> */}
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
                        {moment(clientData?.createdAt).format('MMMM YYYY')}{' '}
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
                    <GrayText2>{clientData?.description ?? '-'}</GrayText2>
                  </Row>
                </Column>
              </Row>
            </ContentBox>
            <VerticalDivider />
            {/* <ContentBox
              hasHeader={true}
              headerTitle="Business Profile"
              headerColor="red"
            > */}
            {/* <Text color="red">Name of Business</Text>
              <GrayText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                non orci vestibulum, congue est et, lacinia neque. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Aliquam non orci
                vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </GrayText>
              <VerticalDivider />
              <Row>
                <ImageSlider images={projectDetails?.attachments} />
              </Row> */}
            {/* No attachments */}
            {/* </ContentBox> */}
            <VerticalDivider />
            <ContentBox
              hasHeader={true}
              headerTitle="Reviews"
              headerColor="red"
              isScrollable={true}
              mobileWidth={true}
            >
              {/* <Column sx={{ rowGap: '1rem', margin: '1.5rem 0' }}>
                {reviews &&
                  reviews.map((review, idx) => {
                    return (
                      <ReviewBox borderColor="green" key={'review-' + idx}>
                        <i>
                          <Text>{review?.desc}</Text>
                        </i>
                        <GrayText component="span" sx={{ marginRight: '1rem' }}>
                          {review?.user}
                        </GrayText>
                        <Text color="red" component="span">
                          {review?.project}
                        </Text>
                      </ReviewBox>
                    );
                  })}
              </Column> */}
              No Reviews
            </ContentBox>
            <VerticalDivider />
          </Grid>
          <Grid item xs={2.9}>
            <ContentBox
              hasHeader={true}
              headerTitle="Verifications"
              headerColor="red"
              mobileWidth={true}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {/* {verifications.map((item, idx) => {
                  return (
                    <Row
                      key={'verification-' + idx}
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <GrayText>{item}</GrayText>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                        }}
                      >
                        <CheckSquareIcon variant="green" />
                        <Text color="green">Verified</Text>
                      </Box>
                    </Row>
                  );
                })} */}
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
                      <VerifyText>Unverified</VerifyText>
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
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ClientProfile;
