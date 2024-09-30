import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import Text from './Typography';
import Pill from './Pill';
import StarRating from './StarRating';
import { GreenButton } from './Button';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getLoggedInUserData, getProposalsOfBid } from '../forms/formService';

const ProjectContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  row-gap: 16px;
  padding: 32px;
`;

const Row = styled(Box)`
  display: flex;
`;
const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  color: #eb4c60;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;
const SmallText = styled.span`
  font-size: 12px;
  color: ${(props) => (props.color === 'green' ? '#4AA398' : '#949494')};
`;
const Desc = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 12px;
  color: ${(props) => (props.color === 'green' ? '#4AA398' : '#949494')};
`;
const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50vh;
  justify-content: center;
  color: #4aa398;
`;
const ConnectedList = ({ projects }) => {
  // console.log(projects);
  const router = useRouter();
  const [accountType, setAccountType] = useState({});

  const showProjectDetails = (projectId) => {
    router.push(`/dashboard?screen=details&project=${projectId}`);
  };

  useEffect(() => {
    getLoggedInUserData().then((res) => {
      if (res?.data?.client) {
        setAccountType(() => res?.data?.client?.accountType);
      }
    });
  }, []);

  return (
    <Box>
      {projects && projects.length > 0 ? (
        projects.map((project, idx) => {
          return (
            <ProjectContainer key={idx}>
              <Row sx={{ justifyContent: 'space-between' }}>
                <Column>
                  <Title>{project?.attributes.title}</Title>
                  {project?.attributes.minBudget === 1 &&
                  project.maxBudget === 0 ? (
                    <SmallText>Free Collaboration</SmallText>
                  ) : (
                    <SmallText>
                      {project?.attributes.minBudget} -{' '}
                      {project?.attributes.maxBudget}
                    </SmallText>
                  )}
                </Column>
                <Box
                  sx={{
                    gap: '1rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <Column>
                    <SmallText>
                      <b>
                        {project?.attributes.proposals?.data.length ?? '0'} Bids
                      </b>
                    </SmallText>
                  </Column>
                  <Column sx={{ alignItems: 'flex-end' }}>
                    <Text color="green">
                      {project?.attributes.maxBudget ?? 'null'} AED
                    </Text>
                    <SmallText color="green">Average Bid</SmallText>
                  </Column>
                </Box>
              </Row>
              <Row>
                <Desc>{project?.attributes.description}</Desc>
              </Row>
              <Row sx={{ columnGap: '8px' }}>
                {project?.attributes.categories
                  ? project?.attributes.categories?.data.map((category, id) => {
                      return (
                        <Pill key={'pill' + id} color="green">
                          {category?.attributes?.title}
                        </Pill>
                      );
                    })
                  : ''}
              </Row>
              <Row
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Row sx={{ columnGap: '16px' }}>
                  <StarRating data={project?.attributes.rating ?? 0} sz="lg" />
                  <SmallText>
                    {/* {project?.attributescreatedAt} */}
                    {moment(project?.attributes.createdAt).format(
                      'DD-MMM-YYYY'
                    )}
                  </SmallText>
                </Row>
                {accountType && accountType === 1 ? (
                  <Row>
                    <GreenButton
                      onClick={() => showProjectDetails(project?.id)}
                    >
                      Apply
                    </GreenButton>
                  </Row>
                ) : null}
              </Row>
            </ProjectContainer>
          );
        })
      ) : (
        <NotFoundContainer>
          No Projects available for this category.
        </NotFoundContainer>
      )}
    </Box>
  );
};

export default ConnectedList;
