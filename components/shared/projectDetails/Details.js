import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { StaticPill, PillWithIcon } from '../Pill';
import ImageSlider from '../ImageSlider';
import Button, { GreenButton, RedButton } from '../Button';
import Text from '../Typography';
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import BidOnProjectForm from '../../forms/BidOnProjectForm';
import { Container } from '@mui/system';
import { CautionIcon, CheckIcon } from '../Icon';
import moment from 'moment';
import { SimpleTextField2 } from '../Textfield';
import StarRating from '../StarRating';
import {
  getMyProposal,
  updateBidData,
  updateProposalData,
  updateProposalStatus,
} from '../../forms/formService';
import { get } from 'http';
import ClickableStarRating from '../ClickableStarRating';

const VerticalDivider = styled.div`
  height: 1rem;
`;

const MainWrapper = styled.div`
  @media (max-width: 769px) {
    padding: 2.5rem 1.8rem;
  }
  padding: 2.5rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
`;

const Row = styled(Box)`
  display: flex;
  &.attachment {
    flex-direction: column;
  }
  &.green-bg {
    background: #ecf6f5;
    padding: 10px 20px;
    border-radius: 10px;
  }
`;
const IconContainer = styled.div`
  background: #dbedea;
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

const CustomCautionIcon = styled(CautionIcon)`
  font-size: 4rem;
`;

const SectionTitle = styled(Text)`
  font-size: 20px;
`;

const DescTitle = styled.span`
  color: #949494;
`;

const GrayText = styled(Text)`
  color: #949494;
`;
const CustomGreenButton = styled(GreenButton)`
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const CustomRedButton = styled(Button)`
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Details = ({
  userDetails,
  bidData,
  bid,
  userHasProposal,
  isBidOwner,
  account,
  completed,
  isDirectBidAssignment,
}) => {
  const projectDetails = {
    attachments: [
      'project-temp-1.jpeg',
      'project-temp-2.jpeg',
      'project-temp-3.jpeg',
    ],
  };

  const modalTexts = {
    projBid: {
      title: 'Application Successful!',
      desc: 'This is to let you know that your bid is successfully placed and we have sent it to the client. We will be notifying you if your bid is approved or not.',
    },
    projComplete: {
      title: 'Project completed',
      desc: 'We will confirm with the client as well if everything is done before closing the project. Once they confirm, we will release your funds to your wallet.',
    },
    projCompleteClient: {
      title: 'Project completed',
      desc: 'We will confirm with the professional to ensure everything is completed before closing the project. Once they confirm, we will proceed with the next steps to finalize the project.',
    },
  };

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [proposalId, setProposalID] = useState(null);
  const [proposalStatus, setProposalStatus] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openSuccessModalClient, setOpenSuccessModalClient] = useState(false);
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [directBidStatus, setDirectBidStatus] = useState(false);
  const [openCompleteModalClient, setOpenCompleteModalClient] = useState(false);

  const handleClose = (e, reason) => {
    if (open) setOpen(false);
    if (openSuccessModal) setOpenSuccessModal(false);
    if (openFinishModal) setOpenFinishModal(false);
    if (openCompleteModalClient) setOpenCompleteModalClient(false);
    if (openSuccessModalClient) setOpenSuccessModalClient(false);
  };
  console.log('asddd', completed, userHasProposal);
  const handleSubmit = (isSuccess) => {
    if (isSuccess) {
      setOpen(false);
      setOpenSuccessModal(true);
      // setOpenFinishModal(true);
    }
  };

  const requestMyProposal = async (bid) => {
    const client = localStorage.getItem('hinyn-cid');
    const res = await getMyProposal(client, bid);
    if (res) {
      console.log(res, 'RESPONSE');
      const proposal = res.data?.data?.[0];
      if (proposal) {
        setProposalStatus(proposal.attributes.status);
        setProposalID(proposal.id);
        setDirectBidStatus(proposal.attributes.isDirectBidAssignment);
        console.log(
          'this is proposalid',
          proposal.id,
          proposal.attributes.isDirectBidAssignment
        );
      } else {
        console.log('No proposal found');
      }
    }
  };
  useEffect(() => {
    if (bid) {
      console.log(bid);
      requestMyProposal(bid);
    }
  }, [bid, reload]);
  const handleCompletion = async () => {
    console.log('called');
    const proposalData = {
      status: 3,
    };
    const bidData2 = {
      status: 6,
    };
    // const proposalId = 82;
    await updateBidData(bidData2, bidData.id).then((res) => {
      if (res.status) {
        console.log('Bid Data updateDecorator', bidData.id);
      }
    });
    await updateProposalStatus(proposalData, proposalId).then((result) => {
      if (result?.data.data) {
        console.log('Completed Updated');
      }
    });

    handleClose();
    setReload((prev) => !prev);
    setOpenSuccessModal(true);
  };
  const listAllProjects = () => {
    router.push('/dashboard');
  };
  const handleCompleteClient = async () => {
    console.log('sdf');

    const bidData2 = {
      status: 3,
    };
    // const proposalId = 82;
    await updateBidData(bidData2, bidData.id).then((res) => {
      if (res.status) {
        console.log('Bid Data update', bidData.id);
        setOpenSuccessModalClient(true);
        setReload((prev) => !prev);
      }
    });
  };
  return (
    <>
      <MainWrapper>
        <Row>
          <DescTitle>Looking for</DescTitle>
        </Row>
        <Row>
          <PillWithIcon
            color="green"
            bg="transparent"
            category={bidData?.categories?.data[0]?.attributes}
          />
        </Row>
        <Row>
          <DescTitle>Skills required for this project</DescTitle>
        </Row>
        <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
          {bidData?.skills?.data?.map((skill, idx) => {
            return (
              <StaticPill bg="green" key={'skill-reqd-' + idx}>
                {skill?.attributes?.title}
              </StaticPill>
            );
          })}
        </Row>
        <Row>
          <DescTitle>Languages required for this project</DescTitle>
        </Row>
        <Row sx={{ gap: '1rem', flexWrap: 'wrap' }}>
          {['English'].map((lang, idx) => {
            return (
              <StaticPill bg="green" key={'lang-reqd-' + idx}>
                {lang}
              </StaticPill>
            );
          })}
        </Row>
        <VerticalDivider />
        <Row>
          <SectionTitle color="green">Project Details</SectionTitle>
        </Row>
        <Row>
          <DescTitle>Location</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.city} {bidData?.country ?? 'N/A'}
        </Row>
        <Row>
          <DescTitle>Event Date</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.deliveryDate
            ? moment(bidData?.deliveryDate).format('DD-MMM-YYYY')
            : 'NA'}
        </Row>
        <Row>
          <DescTitle>Budget Range</DescTitle>
        </Row>
        <Row className="green-bg">
          {bidData?.minBudget} - {bidData?.maxBudget} AED
        </Row>
        <Row>
          <DescTitle>Description</DescTitle>
        </Row>
        <Row className="green-bg">{bidData?.description}</Row>
        <Row>
          <DescTitle>Attachments</DescTitle>
        </Row>
        <Row>
          NA
          {/* <ImageSlider images={projectDetails?.attachments} /> */}
        </Row>
        <Row>
          <DescTitle>Deliverables</DescTitle>
        </Row>
        <Row className="green-bg">{bidData?.numDeliverables ?? 0}</Row>
        <Row>
          <DescTitle>Deadline</DescTitle>
        </Row>
        <Row className="green-bg">{bidData?.deliveryDate ?? 'NA'}</Row>
        <Row
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
        >
          {userHasProposal && proposalStatus === 1 && directBidStatus ? (
            // isDirectBidAssignment === true
            // userDetails?.isProposedProject ? (
            <CustomGreenButton onClick={() => setOpenFinishModal(true)}>
              Complete Project
            </CustomGreenButton>
          ) : proposalStatus === 3 && !isBidOwner ? (
            <CustomGreenButton className="disabled">
              Completed
            </CustomGreenButton>
          ) : // bidData?.proposals?.data?.length > 0 &&
          isBidOwner && bidData.status === 6 ? (
            <CustomRedButton
              onClick={() => {
                setOpenCompleteModalClient(true);
              }}
            >
              Complete Project
            </CustomRedButton>
          ) : // bidData?.proposals?.data?.length > 0 &&
          isBidOwner && bidData?.status === 3 ? (
            <CustomRedButton className="disabled">
              Project Completed
            </CustomRedButton>
          ) : (
            ''
          )}
          {/* {userDetails?.isProposedProject ? (
            <CustomGreenButton onClick={() => setOpenFinishModal(true)}>
              Complete Project
            </CustomGreenButton>
          ) : (
            <CustomGreenButton onClick={() => setOpen(true)}>
              Apply
            </CustomGreenButton>
          )} */}
        </Row>
      </MainWrapper>
      <Modal handleClose={handleClose} isOpen={open} maxWidth="md">
        <BidOnProjectForm
          handleSubmit={handleSubmit}
          proposals={bidData?.proposals}
        />
      </Modal>
      <Modal handleClose={handleClose} isOpen={openSuccessModal} maxWidth="lg">
        <Box sx={{ padding: '5rem 0' }}>
          <Column>
            <Row>
              <IconContainer>
                <CustomCheckIcon variant="green" />
              </IconContainer>
            </Row>
            <Row>
              <Text color="green" size="l2" font="bold">
                <b>
                  {/* {userDetails?.isProposedProject
                    ? */}
                  {modalTexts.projComplete.title}
                  {/* : modalTexts.projBid.title} */}
                </b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <Text align="center" color="gray">
                  {/* {userDetails?.isProposedProject
                    ? */}
                  {modalTexts.projComplete.desc}
                  {/* // : modalTexts.projBid.desc} */}
                </Text>
              </Container>
            </Row>
            <Text
              color="green"
              size="smd"
              font="bold"
              style={{ margin: '30px' }}
            >
              Please take a minute to rate Joe as a client{' '}
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '37.3rem',
              }}
            >
              <Text size="md">Rating:</Text>
              <div>
                <ClickableStarRating />
              </div>
            </div>
            <div style={{ width: '37.3rem' }}>
              <SimpleTextField2 placeholder="Write your experience" />
            </div>
            <Row>
              <RedButton width="more" onClick={handleClose}>
                Submit
              </RedButton>
            </Row>
          </Column>
        </Box>
      </Modal>
      <Modal
        handleClose={handleClose}
        isOpen={openSuccessModalClient}
        maxWidth="lg"
      >
        <Box sx={{ padding: '5rem 0' }}>
          <Column>
            <Row>
              <IconContainer>
                <CustomCheckIcon variant="green" />
              </IconContainer>
            </Row>
            <Row>
              <Text color="green" size="l2" font="bold">
                <b>
                  {/* {userDetails?.isProposedProject
                    ? */}
                  {modalTexts.projCompleteClient.title}
                  {/* : modalTexts.projBid.title} */}
                </b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <Text align="center" color="gray">
                  {/* {userDetails?.isProposedProject
                    ? */}
                  {modalTexts.projCompleteClient.desc}
                  {/* // : modalTexts.projBid.desc} */}
                </Text>
              </Container>
            </Row>
            <Text
              color="green"
              size="smd"
              font="bold"
              style={{ margin: '30px' }}
            >
              Please take a minute to rate Joe as a Professional{' '}
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '37.3rem',
              }}
            >
              <Text size="md">Rating:</Text>
              <div>
                <ClickableStarRating />
              </div>
            </div>
            <div style={{ width: '37.3rem' }}>
              <SimpleTextField2 placeholder="Write your experience" />
            </div>
            <Row>
              <RedButton width="more" onClick={handleClose}>
                Submit
              </RedButton>
            </Row>
          </Column>
        </Box>
      </Modal>
      <Modal handleClose={handleClose} isOpen={openFinishModal} maxWidth="lg">
        <Box sx={{ padding: '5rem 0' }}>
          <Column>
            <Row>
              <CustomCautionIcon variant="red" />
            </Row>
            <Row>
              <Text color="red" size="large">
                <b>Project Complete?</b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  Were thrilled to know that you completed your project! We will
                  confirm with the client as well if everything is done before
                  closing the project. Once they confirm, we will release your
                  funds to your wallet.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  By clicking the button below, you agree that you have finished
                  the project with the client and have provided all
                  deliverables.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <Row>
              <GreenButton
                // onClick={() => {
                //   handleClose();
                //   setOpenSuccessModal(true);
                // }}
                onClick={handleCompletion}
              >
                Mark Project as Complete
              </GreenButton>
            </Row>
          </Column>
        </Box>
      </Modal>
      <Modal
        handleClose={handleClose}
        isOpen={openCompleteModalClient}
        maxWidth="lg"
      >
        <Box sx={{ padding: '5rem 0' }}>
          <Column>
            <Row>
              <CustomCautionIcon variant="red" />
            </Row>
            <Row>
              <Text color="red" size="large">
                <b>Project Complete?</b>
              </Text>
            </Row>
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  We're thrilled to know that you have completed your project
                  with the professional! We will confirm with the professional
                  to ensure everything is done before closing the project. Once
                  they confirm, we will proceed with the next steps.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <Row>
              <Container maxWidth="sm">
                <GrayText align="center">
                  By clicking the button below, you agree that the project has
                  been completed to your satisfaction and all deliverables have
                  been received.
                </GrayText>
              </Container>
            </Row>
            <VerticalDivider />
            <Row>
              <Button
                // onClick={() => {
                //   handleClose();
                //   setOpenSuccessModal(true);
                // }}
                onClick={handleCompleteClient}
              >
                Mark Project as Complete
              </Button>
            </Row>
          </Column>
        </Box>
      </Modal>
    </>
  );
};

export default Details;
