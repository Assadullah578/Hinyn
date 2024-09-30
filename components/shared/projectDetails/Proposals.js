import { Box } from '@mui/material';
import styled from '@emotion/styled';
import Text from '../Typography';
import Image from 'next/image';
import { LocationIcon, CheckIcon } from '../Icon';
import StarRating from '../StarRating';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
  deleteProposal,
  getProposalData,
  getProposalsOfBid,
  getStrapiMedia,
  updateMilestone,
  updateProposalData,
} from '../../forms/formService';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GreenButton, RedButton } from '../Button';

import ChatContent from '../chat/ChatContent';
import ModalChat from '../ModalChat';
import Modal2 from '../Modal2';
import Modal from '../Modal';
import BidOnProjectForm from '../../forms/BidOnProjectForm';
import BidOnProjectFormUpdate from '../../forms/BidOnProjectUpdate';

const MainWrapper = styled.div`
  @media (max-width: 769px) {
    padding: 2.5rem 1.8rem;
  }
  padding: 1rem 5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  max-height: 90vh;
  overflow: auto;
`;

const Row = styled(Box)`
  display: flex;

  &.green-bg {
    background: #ecf6f5;
    padding: 10px 20px;
    border-radius: 10px;
  }
`;

const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;

const CustomRedButton2 = styled(RedButton)`
  background: #fdeaef;
  color: #eb4c60;
  border: none;
  &.isAwarded {
    pointer-events: none;
    opacity: 0.6;
  }
  &:hover {
    border: none;
  }
`;
const CustomRedButton = styled(RedButton)`
  background: #fdeaef;
  color: #eb4c60;
  border: none;
  /* width: 9.5rem !important; */
  &.isAwarded {
    pointer-events: none;
    opacity: 0.6;
  }
  &:hover {
    border: none;
  }
`;
const CustomGreenButton = styled(RedButton)`
  background: rgba(74, 163, 152, 0.3);
  color: rgba(74, 163, 152, 1);
  border: none;
  width: 5.1rem;

  &.isAwarded {
    pointer-events: none;
    opacity: 0.6;
  }
  &:hover {
    border: 0px solid rgba(74, 163, 152, 0.9) !important;
    box-shadow: 0 0 3px rgba(74, 163, 152, 0.9) !important;
    color: rgba(74, 163, 152, 0.9) !important;
  }
`;
const CustomGreenButton2 = styled(RedButton)`
  background: rgba(74, 163, 152, 0.3);
  color: rgba(74, 163, 152, 1);
  border: none;
  width: 9.5rem;
  padding-right: 3px !important;
  padding-left: 3px !important;
  &.isAwarded {
    pointer-events: none;
    opacity: 0.6;
  }
  &:hover {
    border: 0px solid rgba(74, 163, 152, 0.9) !important;
    box-shadow: 0 0 3px rgba(74, 163, 152, 0.9) !important;
    color: rgba(74, 163, 152, 0.9) !important;
  }
`;
const ProjectContainer = styled(Box)`
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  margin-top: 2.5rem;
  /* background-color: red; */

  &:last-child {
    border-bottom: 0;
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

const ImageContainer = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
  border-radius: 9px;
  box-shadow: 0px 3px 6px #00000029;
`;
const StyledImage = styled(Image)`
  border-radius: 9px;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const GrayText = styled(Text)`
  color: #949494;
`;
const CustomCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
`;
const Con1 = styled.div`
  background: #d8ebe8;
  border: 1px solid #4aa398;
  border-radius: 6px;
  padding: 8px 20px;
  position: absolute;
  width: 40rem;
  margin-left: 5rem;

  /* display: ${(props) => (props.openSuccessModal ? 'flex' : 'none')}; */
`;
const Button = styled.div`
  border: 2px solid #eb4c60;
  padding: 11px 24px;
  border-radius: 30px;
  color: #eb4c60;
  font-weight: bold;
  cursor: pointer;
  margin: 14px 0 0 0;
`;
const GButton = styled.div`
  border: 2px solid #eb4c60;
  padding: 11px 24px;
  border-radius: 30px;
  color: #eb4c60;
  font-weight: bold;
  cursor: pointer;
  margin: 14px 0 0 0;
`;
const Proposals = ({ projectId, bidData, isBidOwner }) => {
  const router = useRouter();
  const [proposals, setProposals] = useState([]);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [openProposalUpdate, setOpenProposalUpdate] = useState(false);
  const [isProposalOwner, setIsProposalOwner] = useState(false);
  const [updateProposalId, setUpdateProposalId] = useState(false);
  const [proposalData, setProposalData] = useState();
  const imgPath = '/assets/img/avatars/';
  const handleCloseMessage = () => {
    setOpen(false);
  };
  useEffect(() => {
    getProposalsOfBid(projectId).then((res) => {
      const loggedInCid = localStorage.getItem('hinyn-cid');
      setProposals(() => []);
      // console.log(res);
      if (res?.data?.data) {
        let temp = res?.data?.data?.attributes?.proposals;
        if (temp?.data && temp?.data?.length > 0) {
          temp?.data?.map((item) => {
            setProposals((prevData) =>
              prevData.concat({
                id: item?.id,
                isProposalOwner:
                  item?.attributes?.client?.data?.id === Number(loggedInCid),
                ...item?.attributes,
              })
            );

            //   const Ids = temp.data.map((res) => res.attributes.client.data.id);
            console.log(temp, 'kkjk');
            //   console.log(
            //     Ids.map((res) => res === Number(loggedInCid)),
            //     'PROPOSALS'
            //   );
          });
        }
      }
    });
  }, [projectId, reloadComponent]);
  useEffect(() => {
    if (showAcceptPopup || showCancelPopup) {
      const timer = setTimeout(() => {
        setShowAcceptPopup(false);
        setShowCancelPopup(false);
      }, 3000); // Disappear after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timeout on unmount
    }
  }, [showAcceptPopup, showCancelPopup]);
  const handleClose = (e, reason) => {
    setOpenProposalUpdate(false);
    if (openSuccessModal) setOpenSuccessModal(false);
  };

  const listAllProjects = () => {
    router.push('/dashboard');
  };

  const handleAcceptBid = async (proposalId) => {
    setShowAcceptPopup(true);
    const proposalData = {
      isDirectBidAssignment: true,
      dateAwarded: new Date(),
    };

    // Update the proposal data
    await updateProposalData(proposalData, proposalId).then((result) => {
      setOpenSuccessModal(() => true);
      if (result?.data) {
        // ('');
      }
    });

    // Fetch proposal data and update milestonea
    await getProposalData(proposalId).then((res) => {
      if (res?.data) {
        const milestones = res.data.data.attributes.milestones.data;

        if (milestones && milestones.length > 0) {
          const milestoneId2 = milestones[0].id;
          console.log('Milestone ID:', milestoneId2);

          // Update milestone with the fetched milestoneId
          const milestoneData = {
            confirmedByClient: true,
          };

          updateMilestone(milestoneData, milestoneId2).then((res) => {
            if (res) {
              console.log('Milestone updated');
            }
          });
        } else {
          console.log('No milestones found');
        }
      }
    });
  };

  const openMessage = (n, i) => () => {
    setOpen(true);
    setName(n);
    setId(i);
  };
  const cancelRequest = (id) => {
    deleteProposal(id).then((res) => {
      if (res) {
        setShowCancelPopup(true);
        setReloadComponent((prevValue) => !prevValue);
      }
    });
  };
  const handleUpdateProposal = () => {
    console.log('asaa');
  };
  const handleUpdateModal = (proposal) => {
    setOpenProposalUpdate(true);
    // console.log(proposal, 'asdd');
    const Data = {
      budget: proposal.budget,
      description: proposal.description,
      id: proposal.id,
    };
    setProposalData(Data);

    // setUpdateProposalID(proposalId);
  };
  const clientId = localStorage.getItem('hinyn-cid');
  return (
    <>
      <MainWrapper>
        {showAcceptPopup ? (
          <Con1>
            <Text color="green">You have accepted bid</Text>
          </Con1>
        ) : showCancelPopup ? (
          <Con1>
            <Text color="green">You have cancelled bid request</Text>
          </Con1>
        ) : null}
        {proposals &&
          proposals.map((proposal, idx) => {
            let bidder = proposal?.client?.data;
            return (
              <ProjectContainer key={'project-bid-' + idx}>
                <Row sx={{ gap: '2rem', width: '100%' }}>
                  <Column sx={{ flexBasis: '10%' }}>
                    <ImageContainer>
                      <StyledImage
                        src={
                          proposal?.displayPhoto
                            ? getStrapiMedia(proposal.displayPhoto)
                            : imgPath + 'avataruser-1.jpg'
                        }
                        layout="fill"
                        alt="icon-img"
                      />
                    </ImageContainer>
                  </Column>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexBasis: '100%',
                    }}
                  >
                    <Column sx={{ flexBasis: '70%' }}>
                      <Row
                        sx={{ gap: '14px', justifyContent: 'space-between' }}
                      >
                        <Box sx={{ display: 'flex' }}>
                          <Text color="red">
                            <b>
                              {bidder?.attributes?.firstName}{' '}
                              {bidder?.attributes?.lastName}
                            </b>
                          </Text>
                          <GrayText>
                            {' '}
                            {bidder?.attributes?.instagramProfile ?? ''}{' '}
                          </GrayText>
                        </Box>
                      </Row>
                      <Row sx={{ gap: '8px' }}>
                        <LocationIcon />
                        <GrayText>
                          {' '}
                          {bidder?.attributes?.city},{' '}
                          {bidder?.attributes?.country ?? 'UAE'}
                        </GrayText>
                      </Row>
                      <Row>
                        <Box sx={{ display: 'flex' }}>
                          <StarRating
                            data={bidder?.attributes?.rating ?? 3}
                            sz="lg"
                          />
                          <GrayText>
                            {' '}
                            {bidder?.attributes?.category ?? ''}{' '}
                          </GrayText>
                        </Box>
                      </Row>
                      <Row>
                        <GrayText>{proposal?.description}</GrayText>
                      </Row>
                      {isBidOwner ? (
                        <Row>
                          <GrayText>Bid Price: </GrayText>
                          <Text color="green">
                            <b>
                              {proposal?.budget} {proposal.currency ?? 'AED'}
                            </b>
                          </Text>
                        </Row>
                      ) : null}
                    </Column>
                    <Box>
                      {isBidOwner ? (
                        <>
                          <CustomRedButton2
                            onClick={() => handleAcceptBid(proposal?.id)}
                            className={
                              proposal?.dateAwarded || openSuccessModal
                                ? 'isAwarded'
                                : ''
                            }
                          >
                            {proposal?.dateAwarded || openSuccessModal
                              ? 'Bid Accepted'
                              : 'Accept Bid'}
                          </CustomRedButton2>
                          <div style={{ marginBottom: 10 }}></div>
                        </>
                      ) : (
                        <Text color="green">
                          <b>
                            {proposal?.budget} {proposal.currency ?? 'AED'}
                          </b>
                        </Text>
                      )}
                      {isBidOwner ? (
                        // <div>
                        //   <Button
                        //     onClick={openMessage(
                        //       bidder?.attributes?.firstName,
                        //       bidder?.id
                        //     )}
                        //   >
                        //     Message
                        //   </Button>
                        // </div>

                        <CustomGreenButton2
                          onClick={() => cancelRequest(proposal?.id)}
                        >
                          Cancal Request
                        </CustomGreenButton2>
                      ) : (
                        ''
                      )}
                      {proposal.isProposalOwner && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}
                        >
                          <CustomGreenButton
                            onClick={() => handleUpdateModal(proposal)}
                          >
                            Edit
                          </CustomGreenButton>{' '}
                          <CustomRedButton
                            onClick={() => cancelRequest(proposal?.id)}
                          >
                            Cancel
                          </CustomRedButton>
                        </div>
                      )}
                    </Box>
                  </div>
                </Row>
              </ProjectContainer>
            );
          })}
        {proposals && proposals.length === 0 ? (
          <ProjectContainer>
            <Text color="red">No proposals for this project yet.</Text>
          </ProjectContainer>
        ) : null}
        {proposals && proposals.length > 9 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '2rem',
            }}
          >
            <Stack spacing={2}>
              <CustomPagination count={10} />
            </Stack>
          </Box>
        ) : null}
      </MainWrapper>
      <ModalChat
        handleClose={handleCloseMessage}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
        Widthmax={true}
      >
        <ChatContent name={name} id={id} clientid={clientId} />
      </ModalChat>
      <Modal
        handleClose={handleClose}
        isOpen={openProposalUpdate}
        maxWidth="md"
      >
        <BidOnProjectFormUpdate
          handleSubmit={handleUpdateProposal}
          proposals={bidData?.proposals}
          proposalData={proposalData}
          handleCloseModalA={handleClose}
        />
      </Modal>
    </>
  );
};

export default Proposals;
