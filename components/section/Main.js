import styled from '@emotion/styled';
import CategoryList from '../shared/categories/CategoryList';
import CategoryList2 from '../shared/categories/CategoryList2';
import CardsSection from './CardsSection';
import {
  getServerSideProps,
  // getClientFiltered,
  // paginateFreelancer,
  useFreelancer,
  useProject,
} from '../../src/store';
import { useEffect, useState } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import {
  getClients,
  getClientsForCategory,
  getClientsForChatList,
  getClientsHeaderFilter,
  getFilteredClients,
} from '../forms/formService';
import { useRouter } from 'next/router';

const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;

const ContainerCustom = styled.div`
  margin-top: 12rem;
  width: 80%;
  margin: auto;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    width: 88%;
  }
`;
const Scroll = styled.div`
  overflow-x: auto;
  width: 90vw;
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }
`;

function Main({ categories }) {
  const router = useRouter();
  const initPaging = 1;
  const initPagingOption = 5;
  const [pagingOption, setPagingOption] = useState(initPagingOption);
  const [currentPaging, setCurrentPaging] = useState(initPaging);
  const { freelancer, setFilter, setFreelancer } = useFreelancer();
  const { project } = useProject();
  // const [freelancer, setFreelancer] = useState([]);
  const [currCatSelected, setCurrCatSelected] = useState(undefined);

  const handleButtonClick = () => {
    router.push('/professionalProfile');
  };
  const requestClients = async () => {
    await getClientsForCategory(currCatSelected).then((res) => {
      if (res) {
        console.log(res.data.data);
        setFreelancer(res.data.data);
      }
    });
  };
  useEffect(() => {
    getServerSideProps();
  }, []);

  useEffect(() => {
    requestClients();
  }, [currCatSelected]);

  const handleSelectedCategory = (category) => {
    if (currCatSelected === category) setCurrCatSelected(() => undefined);
    else setCurrCatSelected(() => category);
  };
  const paginateClients = async (page) => {
    console.log(page, 'asdsd');
    await getClients(page).then((res) => {
      if (res) {
        setFreelancer(res?.data?.data);
      }
    });
  };
  const onPaginate = (e, page) => {
    setCurrentPaging(page);
    paginateClients(page);
  };

  return (
    <ContainerCustom>
      <CategoryList2
        categories={categories}
        handleSelectedCategory={handleSelectedCategory}
        currCatSelected={currCatSelected}
      />
      <CategoryList
        categories={categories}
        handleSelectedCategory={handleSelectedCategory}
        currCatSelected={currCatSelected}
      />

      <CardsSection
        categories={categories}
        cards={freelancer}
        cardText="Hire me2"
        // handleButtonClick={handleButtonClick}
        selectedCategory={currCatSelected}
      />
      {freelancer && freelancer.length > 24 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Stack spacing={2}>
            <CustomPagination
              count={pagingOption}
              onChange={onPaginate}
              page={currentPaging}
            />
          </Stack>
        </Box>
      ) : null}
    </ContainerCustom>
  );
}

export default Main;
