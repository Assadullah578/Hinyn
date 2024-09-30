import DashboardHeader from '../../components/section/DashboardHeader';
import { Box, Container, Grid, Button as CustomButton } from '@mui/material';
import ContentBox from '../../components/shared/ContentBox';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text, { GrayText } from '../../components/shared/Typography';
import {
  LocationIcon,
  AwardIcon,
  RoundChatIcon,
  Dots,
  AddIcon,
  CheckBig,
  CrossForModal,
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
  uploadPortfolio,
} from '../../components/forms/formService';
import ImageSlider from '../../components/shared/ImageSlider';
import ReviewBox from '../../components/shared/ReviewBox';
import {
  CheckSquareIcon,
  UserImagePro,
  UploadIcon,
} from '../../components/shared/Icon';
import moment from 'moment';

import BidFreelancerForm2 from '../../components/forms/BidFreelancerForm2';
import Modal2 from '../../components/shared/Modal2';
import Settings from '../../components/section/settings/Settings';
import Wallet from '../../components/section/Wallet';
import ModalChat from '../../components/shared/ModalChat';
import ChatContent from '../../components/shared/chatContent/ChatContent';
import ChatContent2 from '../../components/shared/chatContent/ChatContent2';
import { ChatScreen } from '../../components/section/ChatScreen';
import PortfolioContentBox from '../../components/shared/PortfolioContentBox';
import Button from '../../components/shared/Button';
import MyDropzone from '../../components/shared/DropZone';
import Modal from '../../components/shared/Modal';
// import ChatContent2 from '../../components/shared/chatContent/ChatContent2';

const Row = styled(Box)`
  display: flex;
`;
const Row2 = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px 20px;
  overflow-x: auto;
  width: 58vw;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4aa398;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background color of the scrollbar track */
    border-radius: 10px;
    width: 10px;
  }
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
  @media (max-width: 700px) {
    width: 5rem;
    height: 5rem;
  }
`;
const PortfolioImageContainer = styled.div`
  width: 12rem;
  height: 10rem;
  min-width: 10rem;
  position: relative;
  background: #ffffff;
  border-radius: 5%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
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
const PortfolioImage = styled(Image)`
  border-radius: 5%;
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
  @media (max-width: 700px) {
    width: 8rem;
  }
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
const UploadButton = styled(CustomButton)`
  border: 1px solid #0f7669;
  color: #0f7669;
  border-radius: 5px;
  background: #cce0de;
  width: 29rem;

  font-size: 12px;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;

  &:hover {
    background: #cce0de;
    color: #0f7669;
    border: 1px solid #0f7669;
  }
`;
const StyledUploadIcon = styled(UploadIcon)`
  font-size: 24px;
  font-weight: 600;
  color: #0f7669;
`;
const GrayText33 = styled(Text)`
  color: #a6a6a6;
  padding-horizontal: 10px;
  @media (max-width: 700px) {
    display: none;
  }
`;
const ProfessionalProfile = () => {
  const router = useRouter();
  let imgPath = '/assets/img/avatars/';
  const [clientData, setClientData] = useState([]);
  const [clientBids, setClientBids] = useState([]);
  const [selectedClientBid, setSelectedClientBid] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [openBidSentModal, setOpenBidSentModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hover, setHover] = useState(false);
  const [accountType, setAccountType] = useState();
  const [files, setFiles] = useState();
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);
  const [skills, setSkills] = useState([]);
  const [identity, setIdentity] = useState(false);
  const [payment, setPayment] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [reload, setReload] = useState(false);
  const [professionalId, setProfessionalId] = useState();
  const [name, setName] = useState();
  const [photoDisplay, setPhotoDisplay] = useState();
  const [professionalName, setProfessionalName] = useState();
  const [chat, setChat] = useState([]);
  const [filename, setFilename] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [filetype, setFiletype] = useState('');
  const [dataForm, setDataForm] = useState(null);
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
  const fetchData = async () => {
    const clientData = fid
      ? {
          id: fid,
        }
      : { id: localStorage.getItem('hinyn-cid') };
    const client = {
      id: localStorage.getItem('hinyn-cid'),
    };

    await getClientData(clientData).then((res) => {
      setProfessionalId(clientData.id);
      if (res?.data?.data) {
        setClientData(res?.data?.data?.attributes);
        setPhone(res?.data?.data?.attributes.isPhoneVerified);
        setEmail(res?.data?.data?.attributes.isEmailVerified);
        setIdentity(res?.data?.data?.attributes.isDocumentVerified);
        setProfessionalName(res?.data?.data?.attributes.firstName);
        console.log('qwe', res?.data?.data?.attributes.city);
        const skillsData = res?.data?.data?.attributes?.skills;
        const titles = skillsData.data.map((skill) => skill.attributes.title);
        console.log(titles);
        setSkills(titles);
      }
    });
    await getClientData(client).then((res) => {
      if (res?.data?.data) {
        console.log(res.data.data.attributes);
        console.log(res.data.data.attributes.files);
        let temp = res.data.data.attributes.files.data?.map((x) => {
          return x.attributes.url;
        });
        setFiles(temp);
        console.log(temp);
        setAccountType(res.data.data.attributes.accountType);
        setPhone(res?.data?.data?.attributes.isPhoneVerified);
        setEmail(res?.data?.data?.attributes.isEmailVerified);
        setName(res?.data?.data?.attributes.firstName);
        setPhotoDisplay(res?.data?.data?.attributes.displayPhoto);
        console.log('asd');
        // let list = [];
        // res.data.data.map((item) => {
        //   let obj = { id: item?.id, ...item?.attributes };
        //   list = [...list, obj];
        //   setSkills(list);
        // });
      }
    });
    await getClientDataBids(client).then((res) => {
      if (res) {
        setClientBids(() => []);
        const Bids = res.data.data.attributes.bids.data;

        Bids.map((x, id) => {
          const temp = { id: x.id };
          setClientBids((prev) =>
            prev.concat({
              ...x?.attributes,
              ...temp,
            })
          );
          if (id === 0) {
            setSelectedClientBid(x?.attributes.title);
          }
        });
      }
    });
  };
  useEffect(() => {
    fetchData();
    // const clientId = localStorage.getItem('hinyn-cid');
    // const requestData = async () => {
    //   await getMyMessages(clientId).then((res) => {
    //     if (res?.data?.data) {
    //       let temp = res?.data?.data;
    //       console.log('aft', temp);
    //       if (temp) {
    //         const newChat = temp.map((item) => ({ ...item })); // Clone each item

    //         setChat([...newChat]); // Update chat state with the cloned array
    //         // console.log('after', chat);
    //         // {
    //         //   chat !== null ? setUnread(true) : setUnread(false);
    //         // }
    //       }
    //     }
    //   });
    // };
    // requestData();
  }, [reload]);

  const handleChangeTab = (val) => {
    setCurrentTab(val);
    router.push('/dashboard');
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleBidSubmit = () => {
    setOpen(() => false);
    setOpenBidSentModal(true);
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
  const handleAdd = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setReload(!reload);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(file);
      setSelectedImage(URL.createObjectURL(file));
      setFilename(file.name);
      setFiletype(file.type);
      const formData = new FormData();
      formData.append('files', file);
      formData.append('ref', 'api::client.client');
      formData.append('refId', localStorage.getItem('hinyn-cid')); // assuming 'hinyn-cid' is the client ID
      formData.append('field', 'files');
      setDataForm(formData);
    }
  };

  const handleUpload = async () => {
    if (dataForm) {
      const res = await uploadPortfolio(dataForm);
      if (res.status) {
        setOpenModal(false);
        fetchData();
        console.log('Upload successful:', res.data);
      } else {
        console.error('Upload failed:', res.data);
      }
    }
  };
  const closeSuccess = () => {
    setOpenBidSentModal(false);
  };
  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <DashboardHeader
        setTabChange={handleChangeTab}
        currentTab={currentTab}
        account={accountType}
        firstName={name}
        userData={clientData}
        photoDisplay={photoDisplay}
      />
      {val == 0 || val == null ? (
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
                        <GrayText33 size="large">
                          {' '}
                          {clientData?.instagramProfile ??
                            '@' + clientData?.firstName}
                        </GrayText33>
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
                      <StarRating data={clientData?.rating ?? 0} sz="xl" />
                      <GrayText33>
                        {' '}
                        {clientData?.jobsCompleted ?? 0} jobs Completed
                      </GrayText33>
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
              <PortfolioContentBox
                hasHeader={true}
                headerTitle="Portfolio"
                headerColor="green"
                padding={1}
                headerIcon={<AddIcon color={'white'} />}
                handleAdd={handleAdd}
                userType={accountType}
                mobileWidth={true}
              >
                {/* <VerticalDivider /> */}
                <Row2>
                  {files
                    ? files.map((file, index) => {
                        return (
                          <>
                            <PortfolioImageContainer>
                              <PortfolioImage
                                key={index}
                                src={getStrapiMedia(file)}
                                layout="fill"
                                alt="avatar-img"
                              />
                            </PortfolioImageContainer>
                          </>
                        );
                      })
                    : 'No files attached'}
                  {/* <div style={{}}>sdf</div> */}
                </Row2>{' '}
              </PortfolioContentBox>
              <VerticalDivider />
              <ContentBox
                hasHeader={true}
                headerTitle="Reviews"
                headerColor="green"
                isScrollable={false}
                mobileWidth={true}
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
                mobileWidth={true}
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
              <ContentBox
                hasHeader={true}
                headerTitle="Skills"
                headerColor="green"
                mobileWidth={true}
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
          <Modal
            handleClose={closeSuccess}
            // handleSubmit={handleSubmit}
            isOpen={openBidSentModal}
            hasHeader={false}
            hasFooter={false}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <div
                style={{
                  background: '#EAECEE',
                  borderRadius: 100,
                  width: 70,
                  height: 70,
                }}
              >
                <CheckBig variant="green" />
              </div>
              <Text
                color="red"
                style={{ fontWeight: 'bold', fontSize: '20px' }}
              >
                Bid sent successfully.
              </Text>
              <div
                style={{
                  position: 'absolute',
                  top: 13,
                  right: 23,
                  cursor: 'pointer',
                }}
                onClick={closeSuccess}
              >
                <CrossForModal />
              </div>
              {/* <Text
                color="grey"
                style={{ width: '80%', textAlign: 'center', fontSize: '14px' }}
              >
                You are logged in! you can now post your project.
              </Text> */}
            </div>
          </Modal>
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
      <Modal2
        handleClose={handleCloseModal}
        Widthmax={true}
        title={'Add pictiures of your work'}
        // handleSubmit={handleSubmit}
        isOpen={openModal}
        hasHeader={true}
        hasFooter={false}
      >
        <MyDropzone CancelAction={handleCloseModal} />
        {/* <div>
          <Text size={'large'}>Add picture of your work</Text>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 100,
              borderStyle: 'dotted',
              borderWidth: '2px',
              borderColor: 'grey',
              padding: 50,
              borderRadius: 10,
            }}
          >
            <UploadButton
              component="label"
              variant="outlined"
              sx={{}}
              startIcon={<StyledUploadIcon />}
            >
              {
                // loading ? (
                //   <CircularProgress size={20} />
                // ) :
                filename ? (
                  <>
                    {filename} <br />
                    <Image
                      src={selectedImage}
                      width="50px"
                      height="50px"
                      style={{ borderRadius: '10rem', marginTop: '10px' }}
                      alt="thumbnail"
                    />
                  </>
                ) : (
                  'Drag or click to upload your Picture'
                )
              }
              <input
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleFileUpload}
                multiple
              />
            </UploadButton>
          </div>
          <div style={{ position: 'absolute', right: 30, bottom: 20 }}>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        </div> */}
      </Modal2>
    </Box>
  );
};

export default ProfessionalProfile;
