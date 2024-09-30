import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Box, Container, Pagination, Stack } from '@mui/material';
import Text, { GrayText } from './Typography';
import Pill from './Pill';
import StarRating from './StarRating';
import { RedButton } from './Button';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  getLoggedInUserData,
  getProposalsOfBid,
  getStrapiMedia,
} from '../forms/formService';
import { LocationIcon } from './Icon';
import Image from 'next/image';
import { relative } from 'path';
import { getServerSideProps, useFreelancer } from '../../src/store';

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  row-gap: 16px;
  padding: 32px;
  min-height: 200px;
  @media (max-width: 700px) {
    width: 97vw;
  }
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
const CustomRedButton = styled(RedButton)`
  background: linear-gradient(110deg, #ff5a5f 0%, #a52226 100%);
  color: #ffffff;
  border: none;
  position: absolute;
  right: 0;

  &:hover {
    border: none;
    background: linear-gradient(110deg, #a52226 0%, #ff5a5f 100%);
    color: #ffffff;
  }
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;
  border-radius: 9px;
  box-shadow: 0px 3px 6px #00000029;
  @media (max-width: 700px) {
    width: 4rem;
    height: 4rem;
  }
`;
const StyledImage = styled(Image)`
  border-radius: 9px;
`;
const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50vh;
  justify-content: center;
  color: #eb4c60;
`;
const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;
const FreelancerConnectedList = () => {
  const { freelancer } = useFreelancer();
  const imgPath = '/assets/img/avatars/';
  const router = useRouter();
  const [accountType, setAccountType] = useState({});

  const showFreelancerProfile = (freelancerId) => {
    // console.log(freelancerId);
    router.push('/dashboard/professionalProfile?fid=' + freelancerId);
  };

  useEffect(() => {
    getLoggedInUserData().then((res) => {
      if (res?.data?.client) {
        setAccountType(() => res?.data?.client?.accountType);
        // console.log(freelancer);
      }
    });
  }, []);

  return (
    <>
      <Box>
        {freelancer && freelancer.length > 0 ? (
          freelancer.map((freelancer, idx) => {
            return (
              <MainContainer key={idx}>
                <Row sx={{ gap: '2rem', width: '100%' }}>
                  <Column sx={{ flexBasis: '10%' }}>
                    <ImageContainer>
                      <StyledImage
                        src={
                          freelancer?.attributes.displayPhoto
                            ? getStrapiMedia(freelancer.attributes.displayPhoto)
                            : imgPath + 'useravatr-2.jpg'
                        }
                        layout="fill"
                        alt="avatar-img"
                      />
                    </ImageContainer>
                  </Column>
                  <Column sx={{ flexBasis: '90%' }}>
                    <Row
                      sx={{
                        gap: '14px',
                        justifyContent: 'space-between',
                        position: 'relative',
                      }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        <Text color="red">
                          <b>
                            {freelancer?.attributes.firstName}{' '}
                            {freelancer?.attributes.lastName}
                          </b>
                        </Text>
                        <GrayText style={{ marginLeft: '12px' }}>
                          {' '}
                          {freelancer?.attributes.instagramProfile ?? ''}{' '}
                        </GrayText>
                      </Box>
                      <Box>
                        <CustomRedButton
                          onClick={() => showFreelancerProfile(freelancer?.id)}
                        >
                          Hire Me
                        </CustomRedButton>
                      </Box>
                    </Row>
                    <Row sx={{ gap: '8px', alignItems: 'center' }}>
                      <LocationIcon />
                      <GrayText>
                        {' '}
                        {
                          freelancer?.attributes.city?.data?.attributes?.name
                        }{' '}
                        {freelancer?.attributes.countr?.data?.attributes
                          ?.name ?? null}
                      </GrayText>
                    </Row>
                    <Row>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'center',
                          paddingY: '5px',
                        }}
                      >
                        <StarRating
                          data={freelancer?.attributes.rating ?? 0}
                          sz="lg"
                        />
                        <GrayText>
                          {' '}
                          {freelancer?.attributes.headline ?? ''}{' '}
                        </GrayText>
                      </Box>
                    </Row>
                    <Row>
                      <Box
                        sx={{
                          display: 'flex',
                          maxWidth: '29rem',
                        }}
                      >
                        <GrayText style={{}}>
                          {' '}
                          {freelancer?.attributes.description ?? ''}{' '}
                        </GrayText>
                      </Box>
                    </Row>
                  </Column>
                </Row>
              </MainContainer>
            );
          })
        ) : (
          <NotFoundContainer>
            No freelancers available for this category.
          </NotFoundContainer>
        )}
      </Box>
    </>
  );
};

export default FreelancerConnectedList;
