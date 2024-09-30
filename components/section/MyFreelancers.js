import { Container, Box } from '@mui/material';

import styled from '@emotion/styled';

import { useFreelancer } from '../../src/store';
import Dropdown2 from '../shared/Dropdown2';
import CardsSection from './CardsSection';
import Filter from '../shared/Filter';
import { useEffect, useState } from 'react';
import { getCategories } from '../forms/formService';
import Dropdown3 from '../shared/Dropdown3';

const ContainerCustom2 = styled.div``;
const ContainerStyle = styled(Container)`
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 0px;
    margin-top: 10px;
  }
  gap: 40px;
  margin-top: 30px;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;
const MyFreelancers = () => {
  const { freelancer } = useFreelancer();
  const [categories, setCategories] = useState([]);
  const [selectedValueSort, setSelectedValueSort] = useState();
  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data) {
        setCategories(() => []);
        result?.data?.data.map((item) => {
          let temp = { id: item.id };
          setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
        });
      }
    });
  }, []);
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

  const handleOptionClickSort = (selectedValue) => {
    console.log('Option selected:', selectedValue);
    setSelectedValueSort(selectedValue);
  };
  // const handleButtonClick = () => {};
  return (
    <Box
      sx={{ height: 'auto', width: '80%', margin: 'auto', paddingBottom: 10 }}
    >
      <ContainerStyle
        sx={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1rem',
        }}
        maxWidth="xl"
      >
        {/* <FilterContainer>
          <Filter categories={categories} />
          <Dropdown3
            hasLabel={true}
            label="Sort"
            items={sortOptions}
            onClickOption={handleOptionClickSort}
            selected={selectedValueSort}
            setHandleOnChange={handleOptionClickSort}
          />
        </FilterContainer> */}
      </ContainerStyle>
      <ContainerCustom2>
        <CardsSection
          categories={categories}
          cards={freelancer}
          hasTools={true}
          cardText="Hire me"
          // handleButtonClick={handleButtonClick}
        />
      </ContainerCustom2>
    </Box>
  );
};

export default MyFreelancers;
