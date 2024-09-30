import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CssBaseline,
  Grid,
  Box,
  Container,
  TextareaAutosize,
} from '@mui/material';
import styled from '@emotion/styled';
import Text, { SmallText } from '../shared/Typography';
import { GreenButton } from '../shared/Button';
import StyledTextField, {
  SimpleTextField,
  SimpleTextField2,
} from '../shared/Textfield';
import Dropdown from '../shared/Dropdown';
import {
  addMilestone,
  addProposal,
  updateBidData,
  updateProposalData,
} from './formService';
import Pill2 from '../shared/Pill2';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VerticalDivider = styled.div`
  height: 1rem;
`;

const CustomDropdown = styled(Dropdown)``;

const CustomTextField = styled(StyledTextField)`
  .MuiInputBase-root {
    border-radius: 10px;
    background-color: #f2f2f2;
    border: none;
    color: #4aa398;

    &:focus {
      border: none;
      outline: none;
    }
  }
`;

const GrayText = styled(Text)`
  color: #949494;
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  min-height: 7rem;
  border-radius: 20px;
  padding: 10px;
  font-family: inherit;
  background-color: #e6e6e6;
  opacity: 1;
  border: none;
  color: #949494;

  &:focus {
    border: none;
    outline: none;
  }
`;
const ContainerCustom = styled(Container)`
  padding: 20px 0;
`;
const BidOnProjectFormUpdate = ({
  handleSubmit,
  proposals,
  proposalData,
  handleCloseModalA,
}) => {
  console.log(proposalData, 'propasads');
  const [milestones, setMilestones] = useState([{ id: 1 }]);
  const [selectedCurrency, setSelectedCurrency] = useState(
    proposalData?.currency || 'USD'
  );
  const [bidAmount, setBidAmount] = useState(proposalData?.budget || '');
  const [proposalDescription, setProposalDescription] = useState(
    proposalData?.description || ''
  );
  const [errorMessage, setErrorMessage] = useState({
    bidAmount: null,
    bidDescription: null,
  });

  const router = useRouter();
  const { project } = router.query;

  const currencies = [
    {
      title: 'AED',
      value: 'AED',
    },
    {
      title: 'USD',
      value: 'USD',
    },
  ];
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('asaa', bidAmount, proposalDescription, proposalData.id);
    if (bidAmount && proposalDescription) {
      const clientId = localStorage.getItem('hinyn-cid');
      const proposalData2 = {
        budget: bidAmount,
        description: proposalDescription,
      };
      const response = await updateProposalData(proposalData2, proposalData.id);
      console.log(response);
      if (response.status) {
        handleCloseModalA();
      }
    }
  };
  // const [enteredBidDescription, setBidDescription] = useState('');

  const [isValid, setValid] = useState({
    bidAmount: null,
    bidDescription: null,
    form: false,
  });

  const bidAmountInputRef = useRef();
  const proposalInputRef = useRef();
  const milestoneInputRef = useRef();
  //   const submitHandler = (event) => {
  //     event.preventDefault();
  //     const enteredBidAmount = bidAmountInputRef.current.value;
  //     const enteredproposal = proposalInputRef.current.value;
  //     const enteredBidmilestone = milestoneInputRef.current.value;
  //     if (!enteredBidAmount) {
  //       setErrorMessage((prevState) => ({
  //         ...prevState,
  //         ['bidAmount']: 'Invalid bid amount',
  //       }));
  //       setValid((prevState) => ({
  //         ...prevState,
  //         ['form']: false,
  //       }));
  //     }

  //     if (!enteredproposal) {
  //       setErrorMessage((prevState) => ({
  //         ...prevState,
  //         ['bidDescription']: 'Provide bid description',
  //       }));
  //       setValid((prevState) => ({
  //         ...prevState,
  //         ['form']: false,
  //       }));
  //     }
  //     if (!enteredBidmilestone) {
  //       setErrorMessage((prevState) => ({
  //         ...prevState,
  //         ['bidDescription']: 'Provide Milestone',
  //       }));
  //       setValid((prevState) => ({
  //         ...prevState,
  //         ['form']: false,
  //       }));
  //     }
  //     if (
  //       enteredBidAmount &&
  //       enteredproposal &&
  //       enteredBidAmount !== '' &&
  //       enteredproposal !== ''
  //     ) {
  //       isValid.form = true;
  //     }

  //     if (isValid.form) {
  //       const clientId = localStorage.getItem('hinyn-cid');
  //       const proposalData = {
  //         status: 1,
  //         budget: enteredBidAmount,
  //         description: enteredproposal,
  //         client: clientId,
  //         bid: project,

  //         // milestone: enteredBidmilestone,
  //         isDirectBidAssignment: false,
  //       };
  //       console.log(proposalData);
  //       let existingProposals = proposals?.data.map((item) => item.id) ?? [];
  //       addProposal(proposalData).then((res) => {
  //         if (res?.data) {
  //           let newProposal = { proposals: [res?.data?.id] };
  //           if (existingProposals) {
  //             existingProposals.push(res?.data?.id);
  //             newProposal.proposals = existingProposals;
  //           }
  //           if (newProposal) {
  //             updateBidData(newProposal, project).then((result) => {
  //               if (result?.data) handleSubmit(true);
  //             });
  //           }
  //         } else handleSubmit(false);
  //       });
  //     }
  //   };
  const handleCurrencyChange = (val) => {
    setSelectedCurrency(() => val);
  };
  return (
    <>
      <ContainerCustom maxWidth="lg">
        <CssBaseline />
        <FormContainer>
          <Text color="red" size="l2">
            <b>Application to the bid</b>
          </Text>
          <Container maxWidth="sm">
            <Text align="center" color="gray">
              Interested with this project? Place a bid now and leave a message
              for the client on why you&apos;re the right person for this job!
            </Text>
          </Container>
          <VerticalDivider />
          <Box
            component="form"
            noValidate
            // onSubmit={submitHandler}
            sx={{ mt: 1, width: '100%' }}
          >
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <GrayText>
                  <b>Bid</b>
                </GrayText>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <CustomDropdown
                    hasLabel={false}
                    items={currencies}
                    width="100%"
                    setHandleOnChange={handleCurrencyChange}
                    typology="okok"
                    selected={selectedCurrency != '' ? selectedCurrency : 'USD'}
                    color="green"
                  />
                  <SimpleTextField2
                    radius="one"
                    required
                    fullWidth
                    id="bidAmount"
                    name="bidAmount"
                    inputRef={bidAmountInputRef}
                    placeholder="Enter bid Amount"
                    value={bidAmount} // Bind the state
                    onChange={(e) => setBidAmount(e.target.value)} // Update the state
                  />
                </div>
                {errorMessage.bidAmount && (
                  <Error>{errorMessage.bidAmount}</Error>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <GrayText>
                  <b>Bid Proposal </b>
                </GrayText>

                <SimpleTextField2
                  required
                  fullWidth
                  id="proposal"
                  name="proposal"
                  inputRef={proposalInputRef}
                  placeholder="Enter your proposal here"
                  value={proposalDescription} // Bind the state
                  onChange={(e) => setProposalDescription(e.target.value)} // Update the state
                />

                <GrayText sx={{ marginTop: '20px' }}>
                  <b>Suggest Milestone payment</b>
                </GrayText>
                <div>
                  {milestones?.map((milestone, index) => (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <SimpleTextField2
                        width="less"
                        id="milestone"
                        name="milestone"
                        inputRef={milestoneInputRef}
                        placeholder="Enter Milestone"
                      />
                      <div style={{ display: 'flex' }}>
                        <div style={{ margin: 'auto' }}>
                          <div
                            style={{
                              background: '#ddf0ed',
                              padding: '12px',
                              paddingLeft: '20px',
                              paddingRight: '20px',
                              borderRadius: '9px 0 0 9px',
                              color: '#4AA398',
                              fontSize: '15px',
                            }}
                          >
                            {selectedCurrency != '' ? selectedCurrency : 'USD'}
                          </div>
                        </div>{' '}
                        <SimpleTextField2
                          radius="one"
                          placeholder="Enter Amount"
                          onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div
                    style={{ width: '33%', marginTop: '20px' }}
                    // onClick={addMilestone2}
                  >
                    <Pill2
                      title="Add another milestone payment"
                      color="green"
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
            <ButtonContainer>
              <GreenButton onClick={submitHandler}>Submit</GreenButton>
            </ButtonContainer>
          </Box>
        </FormContainer>
      </ContainerCustom>
    </>
  );
};

export default BidOnProjectFormUpdate;
