import { Box, Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MdKeyboardBackspace } from 'react-icons/md';
import Text, { SmallText, GrayText } from '../shared/Typography';
import { GreenButton, RedButton } from '../shared/Button';
import {
  CheckSquareIcon,
  XSquareIcon,
  LocationIcon,
  CheckIcon,
  BackIconForDetails,
} from '../shared/Icon';
import StarRating from '../shared/StarRating';
import Details from '../shared/projectDetails/Details';
import Proposals from '../shared/projectDetails/Proposals';
import Link from 'next/link';
import {
  deleteBidData,
  getBidData,
  getLoggedInUserData,
  getProposalsOfClientOnABid,
  updateBidData,
} from '../forms/formService';
import { useRouter } from 'next/router';
import moment from 'moment';
import Modal from '../shared/Modal';
import BidOnProjectForm from '../forms/BidOnProjectForm';

const HeaderContainer = styled.div`
  background: #4aa398;
  color: #ffffff;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  display: flex;
  flex-direction: column;
  min-height: 19rem;
`;

const BackText = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin: 4.2px 0 0 0;
  cursor: pointer;
`;

const VerticalDivider = styled.div`
  height: 1rem;
`;
const ContentBoxWrapper = styled(Box)`
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  top: -12rem;

  @media (max-width: 769px) {
    top: -15.5rem;
  }
`;

const ContentBox = styled.div`
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 15px;

  &.title-wrapper {
    border-radius: 15px 15px 0 0;
    border-bottom: 1px solid #4aa398;
  }

  &.main-wrapper {
    border-radius: 0 0 15px 15px;
  }
`;

const TitleWrapper = styled.div`
  @media (max-width: 769px) {
    padding: 2.5rem 1.7rem 0 1.7rem;
  }
  padding: 2.5rem 5rem 0 5rem;

  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SideboxWrapper = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const BidBoxWrapper = styled.div`
  padding: 1.3rem;
  display: flex;
  flex: 1 2;
`;

const Row = styled(Box)`
  display: flex;

  &.green-bg {
    background: #ecf6f5;
    padding: 10px 20px;
    border-radius: 10px;
  }
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  gap: 20px;
  position: relative;
`;

const TabItem = styled.div`
  cursor: pointer;
  padding: 0 1rem 1rem;

  &.active {
    border-bottom: 2px solid #4aa398;
    color: #4aa398;
  }
`;

const IconContainer = styled.div`
  background: #ffeeef;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconContainerGreen = styled.div`
  background: rgba(74, 163, 152, 0.2);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CustomCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
`;

const CancelButton = styled(RedButton)`
  background: #fdeaef;
  color: #eb4c60;
  &:hover {
    border: none;
  }
`;

const CustomCheckSquareIcon = styled(CheckSquareIcon)`
  font-size: 1.5rem;
  color: #e96e3f;
`;

const CustomXSquareIcon = styled(XSquareIcon)`
  font-size: 1.5rem;
  color: #e96e3f;
`;

const Title = styled(Text)`
  font-size: 32px;
  @media (max-width: 700px) {
    max-width: 13.2rem;
  }

  /* background-color: red; */
`;

const CustomLocationIcon = styled(LocationIcon)`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const CustomGreenButton = styled(GreenButton)`
  &.disabled {
    pointer-events: none;
    opacity: 0.7;
  }
`;
const CustomRedButton = styled(RedButton)`
  &.disabled {
    pointer-events: none;
    opacity: 0.7;
  }
`;
const ContainerCustom = styled.div`
  width: 95%;
  margin: auto;
`;
const ContainerBack = styled.div`
  display: flex;
  // cursor: pointer;
  color: white;
  padding: 0 0 20px 0;
  width: 86.4%;
  font: 12px;
  margin: auto;
`;
const StyledGrid = styled.div`
  @media (min-width: 769px) {
    display: none;
  }

  flex-direction: column;
`;
const StyledGrid2 = styled(Grid)`
  @media (max-width: 769px) {
    display: none;
  }
`;
const Grid2 = styled(Grid)`
  @media (max-width: 769px) {
    width: 100%;
  }
`;
const Row2 = styled.div``;
const ProjectDetailsSection = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [bidData, setBidData] = useState([]);
  const [clientData, setClientData] = useState({});
  const [userHasProposal, setUserHasProposal] = useState(false);
  const { project } = router.query;
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isDirectBidAssignment, setIsDirectBidAssignment] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isBidOwner, setIsBidOwner] = useState(false);
  const [openCancelProject, setOpenCancelProject] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const [openSuccessCancelModal, setOpenSuccessCancelModal] = useState(false);
  const [accountType, setAccountType] = useState(0);
  const [bidId, setBidId] = useState();
  const loggedInCid = localStorage.getItem('hinyn-cid');

  useEffect(() => {
    getLoggedInUserData().then((res) => {
      if (res.data) {
        setAccountType(res.data?.client?.accountType);
      }
    });
    getProposalsOfClientOnABid(project).then((res) => {
      if (res?.data?.data) {
        // const temp = res.data.data;
        // console.log('directbid', temp.id);
        if (res?.data?.data.length > 0) setUserHasProposal(() => true);
        if (res?.data?.data?.attributes?.isDirectBidAssignment)
          // console.log(
          //   'erer',
          //   res?.data?.data?.attributes?.isDirectBidAssignment
          // );
          setIsDirectBidAssignment(() => true);
      }
    });
    getBidData(project).then((res) => {
      // console.log(res?.data?.data?.attributes?.proposals.data.lenght,'qqqq');
      if (res?.data?.data) {
        const temp = {
          id: res?.data?.data?.id,
          ...res?.data?.data?.attributes,
        };

        setBidData(() => temp);
        setBidId(res?.data?.data?.id);

        if (temp?.status === 3) {
          setCompleted(true);
        }
        if (temp?.client?.data?.id === parseInt(loggedInCid))
          setIsBidOwner(() => true);
        setClientData(() => temp?.client?.data?.attributes);
      }
    });
  }, [reload]);

  const handleClose = (e, reason) => {
    if (open) setOpen(false);
    if (openCancelProject) setOpenCancelProject(() => false);
    if (openSuccessCancelModal) setOpenSuccessCancelModal(() => false);
  };
  const handleCloseSuccess = () => {
    setReload((prevValue) => !prevValue);
    setOpenSuccess(false);
  };
  const handleSubmit = (isSuccess) => {
    if (isSuccess) {
      setOpen(false);
      setOpenSuccess(true);
      // setOpenFinishModal(true);
    }
  };
  // const handleCancelProject = () => {
  //   if (deleteBidData(project))
  //     // const statusData = {
  //     //   status: 99,
  //     // };
  //     // updateBidData(statusData, bidData?.id).then((result) => {
  //     //   if (result?.data) {
  //     setOpenSuccessCancelModal(() => true);
  //   //   }
  //   // });
  // };
  const handleCancelProject = () => {
    const statusData = {
      status: 2,
    };
    updateBidData(statusData, bidData?.id).then((result) => {
      if (result?.data) {
        setOpenSuccessCancelModal(() => true);
      }
    });
  };
  const listAllProjects = () => {
    router.push('/dashboard');
  };

  const tabs = ['Details', 'Proposals'];

  const userDetails = {
    isLoggedIn: true,
    isProposedProject: false,
    paymentStatus: 'On-hold',
    paymentDescription:
      'HINYN have received the payment from the client and we will release it to your account once the client confirmed that the project is complete.',
  };
  return (
    <Box sx={{ background: '#fff', height: 'auto' }}>
      <HeaderContainer></HeaderContainer>
      <ContentBoxWrapper>
        <ContainerCustom>
          <ContainerBack>
            <BackIconForDetails
              style={{
                marginRight: '14px',
                marginBottom: '2px',
                cursor: ' pointer',
              }}
            />
            <BackText>
              <Link href="/dashboard">
                <a>Back to Project</a>
              </Link>
            </BackText>
          </ContainerBack>
          <StyledGrid2
            container
            columnSpacing={3}
            sx={{ justifyContent: 'center' }}
          >
            <Grid2 item xs={8} sx={{}}>
              <ContentBox className="title-wrapper">
                <TitleWrapper>
                  <Box>
                    <Row sx={{ justifyContent: 'space-between' }}>
                      <Title color="red">
                        <b>{bidData?.title}</b>
                      </Title>
                      <Column>
                        <Text color="green" fontWeight="bold">
                          {bidData?.maxBudget}
                          {bidData?.currency ?? ' AED'}
                        </Text>
                        <Text>
                          {moment(bidData?.createdDate).format('DD-MMM-YYYY')}
                        </Text>
                      </Column>
                    </Row>

                    <Row>
                      <SmallText>Project ID {bidData?.id}</SmallText>
                    </Row>
                  </Box>
                  <Row>
                    <Tabs>
                      {tabs?.map((item, idx) => {
                        return (
                          <TabItem
                            key={'tab-' + idx}
                            className={idx === currentTab ? 'active' : ''}
                            onClick={() => setCurrentTab(idx)}
                          >
                            {item}
                          </TabItem>
                        );
                      })}
                    </Tabs>
                  </Row>
                </TitleWrapper>
              </ContentBox>
              <ContentBox className="main-wrapper">
                {currentTab === 0 ? (
                  <Details
                    // userDetails={userDetails}
                    isDirectBidAssignment={isDirectBidAssignment}
                    account={accountType}
                    bidData={bidData}
                    bid={bidId}
                    userHasProposal={userHasProposal}
                    isBidOwner={isBidOwner}
                    completed={completed}
                  ></Details>
                ) : (
                  <Proposals
                    account={accountType}
                    projectId={project}
                    bidData={bidData}
                    isBidOwner={isBidOwner}
                  ></Proposals>
                )}
              </ContentBox>
            </Grid2>
            <Grid item xs={2.4}>
              <ContentBox className="title-wrapper">
                <Box sx={{ display: 'flex', padding: '1.3rem ' }}>
                  <Text color="green" size="large">
                    Client Information
                  </Text>
                </Box>
              </ContentBox>
              <ContentBox className="main-wrapper">
                <SideboxWrapper>
                  <Row>
                    <Text color="red" size="md">
                      {clientData?.firstName} {clientData?.lastName}
                    </Text>
                  </Row>
                  <Row sx={{ alignItems: 'center' }}>
                    <CustomLocationIcon color="#4aa398" />
                    <Text>
                      {clientData?.city}{' '}
                      {clientData?.country ?? 'United Arab Emirates'}
                    </Text>
                  </Row>
                  <Row sx={{ gap: '1rem' }}>
                    <StarRating data={bidData?.client?.rating} sz="lg" />
                    <div>( {bidData?.client?.ratingNUmber} )</div>
                  </Row>
                  <Row>
                    <Text>
                      Member since{' '}
                      {moment(clientData?.createdDate).format('MMM YYYY')}
                    </Text>
                  </Row>
                  <VerticalDivider />
                  <Text color="green" size="md">
                    Client Verification
                  </Text>
                  {bidData?.client?.verified &&
                    bidData?.client?.verified.map((item, idx) => {
                      return (
                        <Row
                          sx={{ alignItems: 'center', gap: '1rem' }}
                          key={'verified-item-' + idx}
                        >
                          <CustomCheckSquareIcon />
                          <Text>{item}</Text>
                        </Row>
                      );
                    })}
                  {bidData?.client?.unverified &&
                    bidData?.client?.unverified.map((item, idx) => {
                      return (
                        <Row
                          sx={{ alignItems: 'center', gap: '1rem' }}
                          key={'unverified-item-' + idx}
                        >
                          <CustomXSquareIcon />
                          <Text>{item}</Text>
                        </Row>
                      );
                    })}
                </SideboxWrapper>
              </ContentBox>
              <VerticalDivider />
              {userDetails?.isProposedProject ? (
                <ContentBox>
                  <BidBoxWrapper>
                    <Column>
                      <Row>
                        <Text color="green">Payment Status</Text>
                      </Row>
                      <Row>
                        <Text color="red" size="large">
                          {userDetails?.paymentStatus}
                        </Text>
                      </Row>
                      <Row>
                        <Text>{userDetails?.paymentDescription}</Text>
                      </Row>
                    </Column>
                  </BidBoxWrapper>
                </ContentBox>
              ) : (
                <ContentBox>
                  <BidBoxWrapper>
                    <Column
                      sx={{
                        borderRight: '1px solid #ACCECA',
                        width: '25%',
                        alignItems: 'center',
                      }}
                    >
                      <Text>Bids</Text>
                      <Text color="green" size="large">
                        {bidData?.proposals?.data?.length ?? 0}
                      </Text>
                    </Column>
                    <Column
                      sx={{
                        alignItems: 'center',
                        width: '75%',
                        justifyContent: 'center',
                      }}
                    >
                      {userHasProposal ? (
                        <CustomGreenButton className="disabled">
                          Applied
                        </CustomGreenButton>
                      ) : accountType === 1 ? (
                        <CustomGreenButton onClick={() => setOpen(true)}>
                          Apply
                        </CustomGreenButton>
                      ) : isBidOwner && completed === false ? (
                        <RedButton onClick={() => setOpenCancelProject(true)}>
                          Cancel Project
                        </RedButton>
                      ) : isBidOwner && completed === true ? (
                        <CustomRedButton className="disabled">
                          Cancel Project
                        </CustomRedButton>
                      ) : (
                        ''
                      )}
                    </Column>
                  </BidBoxWrapper>
                </ContentBox>
              )}
            </Grid>
          </StyledGrid2>
          <StyledGrid>
            <Grid2 item xs={8} sx={{}}>
              <ContentBox className="title-wrapper">
                <TitleWrapper>
                  <Box>
                    <Row
                      sx={{
                        justifyContent: 'space-between',
                      }}
                    >
                      <Title color="red">
                        <b>{bidData?.title}</b>
                      </Title>
                      <Column>
                        <Text color="green" fontWeight="bold">
                          {bidData?.maxBudget}
                          {bidData?.currency ?? ' AED'}
                        </Text>
                        <Text>
                          {moment(bidData?.createdDate).format('DD-MMM-YYYY')}
                        </Text>
                      </Column>
                    </Row>

                    <Row>
                      <SmallText>Project ID {bidData?.id}</SmallText>
                    </Row>
                  </Box>
                  <Row2>
                    <Tabs>
                      {tabs?.map((item, idx) => {
                        return (
                          <TabItem
                            key={'tab-' + idx}
                            className={idx === currentTab ? 'active' : ''}
                            onClick={() => setCurrentTab(idx)}
                          >
                            {item}
                          </TabItem>
                        );
                      })}
                    </Tabs>
                  </Row2>
                </TitleWrapper>
              </ContentBox>
              <ContentBox className="main-wrapper">
                {currentTab === 0 ? (
                  <Details
                    // userDetails={userDetails}
                    account={accountType}
                    bidData={bidData}
                    userHasProposal={userHasProposal}
                    isBidOwner={isBidOwner}
                  ></Details>
                ) : (
                  <Proposals
                    account={accountType}
                    projectId={project}
                    bidData={bidData}
                    isBidOwner={isBidOwner}
                  ></Proposals>
                )}
              </ContentBox>
            </Grid2>
            <Grid item xs={2.4} sx={{ marginTop: '2rem' }}>
              <ContentBox className="title-wrapper">
                <Box sx={{ display: 'flex', padding: '1.3rem ' }}>
                  <Text color="green" size="large">
                    Client Information
                  </Text>
                </Box>
              </ContentBox>
              <ContentBox className="main-wrapper">
                <SideboxWrapper>
                  <Row>
                    <Text color="red" size="md">
                      {clientData?.firstName} {clientData?.lastName}
                    </Text>
                  </Row>
                  <Row sx={{ alignItems: 'center' }}>
                    <CustomLocationIcon color="#4aa398" />
                    <Text>
                      {clientData?.city}{' '}
                      {clientData?.country ?? 'United Arab Emirates'}
                    </Text>
                  </Row>
                  <Row sx={{ gap: '1rem' }}>
                    <StarRating data={bidData?.client?.rating} sz="lg" />
                    <div>( {bidData?.client?.ratingNUmber} )</div>
                  </Row>
                  <Row>
                    <Text>
                      Member since{' '}
                      {moment(clientData?.createdDate).format('MMM YYYY')}
                    </Text>
                  </Row>
                  <VerticalDivider />
                  <Text color="green" size="md">
                    Client Verification
                  </Text>
                  {bidData?.client?.verified &&
                    bidData?.client?.verified.map((item, idx) => {
                      return (
                        <Row
                          sx={{ alignItems: 'center', gap: '1rem' }}
                          key={'verified-item-' + idx}
                        >
                          <CustomCheckSquareIcon />
                          <Text>{item}</Text>
                        </Row>
                      );
                    })}
                  {bidData?.client?.unverified &&
                    bidData?.client?.unverified.map((item, idx) => {
                      return (
                        <Row
                          sx={{ alignItems: 'center', gap: '1rem' }}
                          key={'unverified-item-' + idx}
                        >
                          <CustomXSquareIcon />
                          <Text>{item}</Text>
                        </Row>
                      );
                    })}
                </SideboxWrapper>
              </ContentBox>
              <VerticalDivider />
              {userDetails?.isProposedProject ? (
                <ContentBox>
                  <BidBoxWrapper>
                    <Column>
                      <Row>
                        <Text color="green">Payment Status</Text>
                      </Row>
                      <Row>
                        <Text color="red" size="large">
                          {userDetails?.paymentStatus}
                        </Text>
                      </Row>
                      <Row>
                        <Text>{userDetails?.paymentDescription}</Text>
                      </Row>
                    </Column>
                  </BidBoxWrapper>
                </ContentBox>
              ) : (
                <ContentBox>
                  <BidBoxWrapper>
                    <Column
                      sx={{
                        borderRight: '1px solid #ACCECA',
                        width: '25%',
                        alignItems: 'center',
                      }}
                    >
                      <Text>Bids</Text>
                      <Text color="green" size="large">
                        {bidData?.proposals?.data?.length ?? 0}
                      </Text>
                    </Column>
                    <Column
                      sx={{
                        alignItems: 'center',
                        width: '75%',
                        justifyContent: 'center',
                      }}
                    >
                      {userHasProposal ? (
                        <CustomGreenButton className="disabled">
                          Applied
                        </CustomGreenButton>
                      ) : accountType === 1 ? (
                        <CustomGreenButton onClick={() => setOpen(true)}>
                          Apply
                        </CustomGreenButton>
                      ) : isBidOwner && bidData?.status !== 3 ? (
                        <RedButton onClick={() => setOpenCancelProject(true)}>
                          Cancel Project
                        </RedButton>
                      ) : (
                        ''
                      )}
                    </Column>
                  </BidBoxWrapper>
                </ContentBox>
              )}
            </Grid>
          </StyledGrid>
        </ContainerCustom>
      </ContentBoxWrapper>
      <Modal handleClose={handleClose} isOpen={open} maxWidth="md">
        <BidOnProjectForm
          handleSubmit={handleSubmit}
          proposals={bidData?.proposals}
        />
      </Modal>
      <Modal handleClose={handleClose} isOpen={openCancelProject} maxWidth="md">
        <Box sx={{ padding: '5rem 0' }}>
          <Column sx={{ alignItems: 'center' }}>
            <Row>
              <Text color="red" size="large">
                <b>Do you want to cancel the project?</b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  We get it, sometimes there are unexpected events that could
                  lead to the cancellation of a project. However, do note that
                  there would be a cancellation fee.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <VerticalDivider />
            <Row sx={{ gap: '1rem' }}>
              <RedButton
                onClick={() => {
                  handleClose();
                }}
              >
                {' '}
                Keep the project
              </RedButton>
              <CancelButton
                onClick={() => {
                  handleCancelProject();
                  setOpenSuccessCancelModal(() => true);
                }}
              >
                Cancel the project
              </CancelButton>
            </Row>
          </Column>
        </Box>
      </Modal>
      <Modal
        handleClose={handleClose}
        isOpen={openSuccessCancelModal}
        maxWidth="md"
      >
        <Box sx={{ padding: '5rem 0' }}>
          <Column sx={{ alignItems: 'center' }}>
            <Row>
              <IconContainer>
                <CustomCheckIcon variant="red" />
              </IconContainer>
            </Row>
            <Row>
              <Text color="red" size="large">
                <b>Project Cancelled</b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  This is to let you know that we have cancelled the project as
                  per your request.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <VerticalDivider />
            <Row>
              <RedButton onClick={listAllProjects}> Back to home </RedButton>
            </Row>
          </Column>
        </Box>
      </Modal>
      <Modal
        handleClose={handleCloseSuccess}
        isOpen={openSuccess}
        maxWidth="md"
      >
        <Box sx={{ padding: '5rem 0' }}>
          <Column sx={{ alignItems: 'center' }}>
            <Row>
              <IconContainerGreen>
                <CustomCheckIcon variant="green" />
              </IconContainerGreen>
            </Row>
            <Row>
              <Text color="green" size="large">
                <b>Application Successful!</b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  This is to let you know that your bid is Successfully placed
                  and we have sent it to the client. We will be notifying you if
                  your bid is approved or not.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <VerticalDivider />
            <Row>
              <GreenButton onClick={listAllProjects}>
                {' '}
                Browse more projects{' '}
              </GreenButton>
            </Row>
          </Column>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectDetailsSection;
