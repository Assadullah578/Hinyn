import { Container, Typography, CssBaseline, Stack, Box } from '@mui/material';
import Text, { GrayText } from '../shared/Typography';
import styled from '@emotion/styled';
import { CheckIcon, RightArrowIcon } from '../shared/Icon';
import { useFreelancer } from '../../src/store';
import CardsSection from '../section/CardsSection';
import Modal from '../shared/Modal';
import { useEffect, useState } from 'react';
import BidFreelancerForm from '../forms/BidFreelancerForm';
import Button from '../shared/Button';
import { useRouter } from 'next/router';
import cards from '../data/FreelancersData';
import Footer from '../section/Footer';
import { paymentForBid } from '../forms/formService';
import { BiTrendingDown } from 'react-icons/bi';

const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${(props) =>
    props.variant === 'bid' ? '#FFEEEF' : '#c16f7a'};
  width: 6rem;
  height: 6rem;
`;

const HomeLabelBox = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: all ease-in-out 0.5s;

  &:hover {
    span,
    svg {
      transform: scale(1.05);
    }
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
  color: ${(props) => (props.variant === 'bid' ? '#FF5A5F' : '#ffffff')};
`;

const StyledRightArrowIcon = styled(RightArrowIcon)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;
`;
const ContainerCon = styled.div`
  margin-top: 7%;
`;
const ProjectSuccessPost = ({ filterCategory, bidId }) => {
  const { freelancer, setFilter } = useFreelancer();
  const [open, setOpen] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const router = useRouter();
  const handleFilter = (data) => {
    setFilter({ category: data });
  };
  // const requestPayment = async () => {
  //   const Data = {
  //     bid: bidId,
  //   };

  //   await paymentForBid(Data).then((res) => {
  //     if (res) {
  //       console.log(res);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   // console.log('ooo', filterCategory, bidId);
  //   if (bidId) {
  //     requestPayment();
  //   }
  //   // handleFilter(filterCategory);
  // }, [bidId]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (data) => {
    setSelectedFreelancer(() => data);
    setOpen(() => true);
  };

  const handleBidSubmit = (clientData) => {
    setOpenSuccessModal(true);
    setOpen(() => false);
  };

  const handleBackClick = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <ContainerCon
        maxWidth="lg"
        sx={{
          marginBottom: '2rem',
          marginTop: '5rem',
          background: 'transparent',
          position: 'relative',
        }}
      >
        <CssBaseline />
        <HomeLabelBox onClick={() => handleBackClick()}>
          <Typography
            component="span"
            align="right"
            sx={{ color: '#ffffff', paddingRight: '1rem' }}
          >
            Go Home
          </Typography>
          <StyledRightArrowIcon />
        </HomeLabelBox>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <IconContainer>
            <StyledCheckIcon />
          </IconContainer>
          <Text size="xxl" color="white">
            <b>Project Successfully Posted!</b>
          </Text>
          <Container maxWidth="sm">
            <Typography component="p" align="center" sx={{ color: '#ffffff' }}>
              Your project is posted on our platform and we have a sent a
              notification to the professionals who have the necessary skills.
              If you have a specific professional that you would like to work
              with, notify them about your project and send them a bid below:
            </Typography>
          </Container>
        </Stack>
      </ContainerCon>
      <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
        <CardsSection
          cards={freelancer}
          hasTools={false}
          cardText="Put a bid"
          handleButtonClick={handleButtonClick}
        />
      </Container>
      <Modal handleClose={handleClose} isOpen={open} maxWidth="md">
        <BidFreelancerForm
          handleBidSubmit={handleBidSubmit}
          data={selectedFreelancer}
        />
      </Modal>
      <Modal handleClose={handleClose} isOpen={openSuccessModal} maxWidth="md">
        <Box sx={{ padding: '2rem 0 5rem 0' }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Box>
              <IconContainer variant="bid">
                <StyledCheckIcon variant="bid" />
              </IconContainer>
            </Box>
            <Box>
              <Text color="red" size="large">
                <b>Bid Successfully Sent!</b>
              </Text>
            </Box>
            <Box>
              <Container maxWidth="sm">
                <GrayText align="center">
                  This is to let you know that your bid is successfully placed
                  and we have sent it to the professional. We will be notifying
                  you if your bid is approved or not.
                </GrayText>
              </Container>
            </Box>
            <VerticalDivider />
            <Box>
              <Button onClick={() => handleBackClick()}> Back to home </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
      <Footer margin="top" />
    </>
  );
};

export default ProjectSuccessPost;
