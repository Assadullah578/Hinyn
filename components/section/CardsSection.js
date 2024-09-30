import styled from '@emotion/styled';
import { Grid, Box } from '@mui/material';
import Filter from '../shared/Filter';
import CustomCard from '../shared/CustomCard';
import Dropdown3 from '../shared/Dropdown3';
import { useEffect, useState } from 'react';
import {
  getClients,
  getClientsForAscDsc,
  getFilteredClientsRating,
  requestClientsNewlyAdded,
  sortClientsRating,
} from '../forms/formService';
import { useFreelancer } from '../../src/store';
import Modal2 from '../shared/Modal2';
import DropdownO from '../shared/DropdownO';

const sortOptions = [
  {
    title: 'Ranking',
    value: 'ranking',
  },
  {
    title: 'Newly Added',
    value: 'newly-added',
  },
  {
    title: 'Ascending',
    value: 'ascending',
  },
  {
    title: 'Descending',
    value: 'descending',
  },
];
const ItemLabel = styled.span`
  font-size: 14px;
  color: #3d3d3d;
`;
const ItemLabel2 = styled.span`
  font-size: 14px;
  color: #eb4c60;
  cursor: pointer;
`;
const GridContainer = styled(Box)`
  margin-top: 1.5rem;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  /* background-color: red; */
  padding: 1rem 0;
`;
const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50vh;
  justify-content: center;
  color: #eb4c60;
`;
const Label = styled.span`
  padding: 0.5rem 1rem;
  color: #949494;
  cursor: pointer;
  &:hover {
    border: 1px solid #0f7669;
    background: #0f76691a;
    color: #0f7669;
    border-radius: 19px;
  }
`;
function CardsSection({
  cards,
  hasTools = true,
  cardText,
  handleButtonClick,
  categories,
}) {
  // const handleButtonClick=()=>{

  // };
  const { setFreelancer } = useFreelancer();
  const [selectedValue, setSelectedValue] = useState();
  const [logged, setLogged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // const handleOptionClickShow = (selectedValue) => {
  //   console.log('Option selected:', selectedValue);
  //   setSelectedValue(selectedValue);
  //   if (selectedValue == 'ascending' || selectedValue == 'descending') {
  //     requestClients(selectedValue);
  //   } else if (selectedValue == 'all') {
  //     requestClientsAll();
  //   }
  // };
  useEffect(() => {
    const cid = localStorage.getItem('hinyn-cid');
    if (cid) {
      setLogged(true);
    }
  }, []);
  const requestClients = async (selectedValue) => {
    const apiValue = selectedValue === 'ascending' ? 'asc' : 'desc';

    await getClientsForAscDsc(apiValue).then((res) => {
      if (res) {
        console.log(res.data.data);
        setFreelancer(res.data.data);
      }
    });
  };
  const requestClientsAll = async () => {
    await getClients(1).then((res) => {
      if (res) {
        console.log(res.data.data);
        setFreelancer(res.data.data);
      }
    });
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async () => {
    if (selected === 'ascending' || selected === 'descending') {
      console.log('asec');
      requestClients(selected);
    } else if (selected === 'ranking') {
      console.log('rating');
      const res = await sortClientsRating();
      if (res.status) {
        setFreelancer(res.data.data);
      }
    } else if (selected === 'newly-added') {
      console.log('newly added');
      const res2 = requestClientsNewlyAdded();
      if (res2.status) {
        setFreelancer(res2.data.data);
      }
    } else if (selected === null) {
      console.log('all');
      requestClientsAll();
    }
    setIsOpen(false);
  };

  const handleOptionChange = (event) => {
    console.log(event);
    setSelected(event);
  };
  const resetField = () => {
    setSelected(null);
  };
  return (
    <GridContainer>
      {hasTools ? (
        <FilterContainer>
          <Filter categories={categories} />
          <Label onClick={() => setIsOpen(!isOpen)}>Sort By</Label>
          {/* <Dropdown3
            hasLabel={true}
            label="Sort By"
            items={sortOptions}
            onClickOption={handleOptionClickShow}
            selected={selectedValue}
            setHandleOnChange={handleOptionClickShow}
          /> */}
        </FilterContainer>
      ) : null}
      {cards && cards.length > 0 ? (
        <Grid
          container
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 8 }}
        >
          {cards.map((card, idx) => (
            <Grid
              key={idx}
              item
              xs={12}
              sm={6}
              lg={3}
              sx={{ position: 'relative', marginTop: '3rem' }}
            >
              <CustomCard
                data={card}
                cardText={cardText}
                handleButtonClick={handleButtonClick}
                logged={logged}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NotFoundContainer>
          No freelancers available for this category.
        </NotFoundContainer>
      )}
      <Modal2
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isOpen={isOpen}
        title="Sort By"
        description="desc"
        hasHeader={true}
        hasFooter={true}
        Widthmax={true}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ItemLabel>Select an option</ItemLabel>
          <ItemLabel2 onClick={resetField}>Clear</ItemLabel2>
        </div>
        <DropdownO
          hasLabel={false}
          items={sortOptions}
          setHandleOnChange={handleOptionChange}
          selected={selected}
          width="100%"
          type="standard"
          color="red"
          defaultLabel="Select Categories"
        />
      </Modal2>
    </GridContainer>
  );
}

export default CardsSection;
