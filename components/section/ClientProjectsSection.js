import { Container, Box, Grid, Stack, Pagination } from '@mui/material';
import ProjectCard from '../shared/myProjects/ProjectCardClient';
import styled from '@emotion/styled';

import { useEffect, useState } from 'react';
import {
  getBidsStatus,
  getClientDataBids,
  getMyProjectsFilter,
  myProjectsBids,
} from '../forms/formService';
import Text from '../shared/Typography';
import Dropdown3 from '../shared/Dropdown3';
import { RiEyeCloseFill } from 'react-icons/ri';

const CustomPagination = styled(Pagination)`
  button {
    color: #4aa398;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70vh;
  align-items: center;
`;
const ContainerCustom = styled.div`
  width: 82%;
  margin: auto;
  padding-bottom: 3rem;
`;
const ContainerStyle = styled(Container)`
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 0px;
    margin-top: 10px;
  }

  gap: 40px;
  margin-top: 30px;
`;
const ClientProjectsSection = () => {
  const [clientBids, setClientBids] = useState([]);
  const [filteredBids, setFilteredBids] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValueSort, setSelectedValueSort] = useState();
  const initPaging = 1;
  const initPagingOption = 2;
  const [pagingOption, setPagingOption] = useState(initPagingOption);
  const [currentPaging, setCurrentPaging] = useState(initPaging);
  const sortOptions = [
    {
      title: 'Newest to Oldest',
      value: 'new-to-old',
    },
    {
      title: 'Oldest to Newest',
      value: 'old-to-new',
    },
    {
      title: 'Expired',
      value: 'expired',
    },
  ];

  const showOptions = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'Upcoming',
      value: 'upcoming',
    },
    {
      title: 'Active',
      value: 'active',
    },
    {
      title: 'Completed',
      value: 'completed',
    },
    {
      title: 'Cancelled',
      value: 'cancelled',
    },
  ];
  const CallBids = async (page) => {
    await myProjectsBids(page).then((res) => {
      if (res.data.data) {
        const bids = res.data.data?.attributes?.bids.data;
        setClientBids(bids);
        setFilteredBids(bids);
      }
    });
  };
  useEffect(() => {
    CallBids(); // Initially load all bids
  }, []);

  const CallBids2 = (value) => {
    if (value === 'all') {
      setFilteredBids(clientBids); // Show all bids
    } else {
      const statusMapping = {
        active: 1,
        upcoming: 2,
        completed: 3,
        cancelled: 4,
      };
      const filtered = clientBids.filter(
        (bid) => bid.attributes.status === statusMapping[value]
      );
      setFilteredBids(filtered);
    }
  };

  const handleOptionClickShow = (selectedValue) => {
    console.log('Option selected:', selectedValue);
    setSelectedValue(selectedValue);
    CallBids2(selectedValue);
  };

  const handleOptionClickSort = (selectedValue) => {
    console.log('Option selected:', selectedValue);
    setSelectedValueSort(selectedValue);
    // Sorting logic can be implemented here if needed
  };
  const onPaginate = (e, page) => {
    console.log('page');
    setCurrentPaging(page);
    CallBids(page);
  };
  return (
    <Box sx={{ background: '#fff', height: 'auto' }}>
      <ContainerCustom>
        <ContainerStyle
          sx={{
            display: 'flex',
            gap: '2rem',
            marginTop: '3rem',
          }}
          maxWidth="xl"
        >
          <Dropdown3
            hasLabel={true}
            label="Show"
            items={showOptions}
            onClickOption={handleOptionClickShow}
            selected={selectedValue}
            setHandleOnChange={handleOptionClickShow}
          />
          <Dropdown3
            hasLabel={true}
            label="Sort"
            items={sortOptions}
            onClickOption={handleOptionClickSort}
            selected={selectedValueSort}
            setHandleOnChange={handleOptionClickSort}
          />
        </ContainerStyle>
        <Grid
          container
          columnSpacing={5}
          rowSpacing={1}
          sx={{ marginTop: '1.5rem' }}
        >
          {filteredBids.map((bid, idx) => (
            <Grid
              key={'project-card-' + idx}
              item
              xs={12}
              sm={6}
              lg={4}
              sx={{ position: 'relative' }}
            >
              <ProjectCard projectDetail={bid} budget={bid?.budget} />
            </Grid>
          ))}
          {filteredBids && filteredBids.length === 0 ? (
            <NoDataContainer>
              <Text color="red">No available data</Text>
            </NoDataContainer>
          ) : null}
        </Grid>
        {filteredBids && filteredBids.length > 15 ? (
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
    </Box>
  );
};

export default ClientProjectsSection;
