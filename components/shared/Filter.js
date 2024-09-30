import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import Modal2 from './Modal2';
import DropdownO from './DropdownO';
import { Container } from '@mui/material';
import ClickableStarRating from './ClickableStarRating';

import { useFreelancer } from '../../src/store';
import {
  getClientsHFilter3,
  getClientsHFilter4,
  getCountries,
  getFilteredClients,
  getFilteredClients2,
  getFilteredClientsCatCountry,
  getFilteredClientsCatLocation,
  getFilteredClientsOnlyLocation,
  getFilteredClientsOnlyName,
  getFilteredClientsProfile,
} from '../forms/formService';
import { NoOutlinedSquareTextField } from './Textfield';

const FilterButton = styled.span`
  background: transparent;
  color: #949494;
  padding: 0.5rem 1rem;
  border-radius: 19px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    border: 1px solid #0f7669;
    background: #0f76691a;
    color: #0f7669;
  }
`;

const Item = styled.div`
  font-family: 'DM Sans', sans-serif !important;
  display: flex;
  flex-direction: column;
`;
const Item2 = styled.div`
  font-family: 'DM Sans', sans-serif !important;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const ItemLabel = styled.span`
  font-size: 14px;
  color: #3d3d3d;
`;
const ItemLabel2 = styled.span`
  font-size: 14px;
  color: #eb4c60;
  cursor: pointer;
`;
function Filter({ categories }) {
  const [open, setOpen] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [locations, setLocations] = useState([]);
  // const locations = [
  //   { title: 'Dubai', value: 'Dubai' },

  //   { title: 'Sharjah', value: 'Sharjah' },
  //   { title: 'America', value: 'America' },
  //   { title: 'UAE', value: 'UAE' },
  //   { title: 'Saudi', value: 'Saudi' },
  //   { title: 'Pakistan', value: 'Pakistan' },
  // ];
  const budget = [
    {
      title: '0-free collaboration',
      value: '0',
    },
    {
      title: '1-100',
      value: '1',
    },
    {
      title: '101-200',
      value: '101',
    },
    {
      title: '201-500',
      value: '201',
    },
    {
      title: '500+',
      value: '500',
    },
  ];
  const { setFilter, setFreelancer } = useFreelancer();
  const profileName = useRef();
  const handleClose = () => {
    setOpen(false);
    // setSelectedCategory(null);
    // setSelectedSkill(null);
    // setSelectedLocation(null);
  };
  const Countries = async () => {
    const result = await getCountries();
    if (result) {
      setLocations([]);
      const locations = result.data.data.map((item) => ({
        title: item.attributes.name,
        value: item.attributes.name,
      }));
      console.log(locations, 'LOCATIONS');
      setLocations(locations);
    }
  };
  useEffect(() => {
    Countries();
  }, []);
  const handleCategoryChange = (val) => {
    const selected = categories.filter((category) => category.key === val);
    if (selected) {
      const res = selected[0]?.skills?.data.map((item) => {
        return {
          id: item.id,
          key: item?.attributes?.slug,
          ...item?.attributes,
        };
      });
      setSkills(() => res);
      console.log('Filter Skills', skills);
    }
    setSelectedCategory(() => val);
  };

  const handleSkillsChange = (val) => {
    setSelectedSkill(() => val);
  };

  const handleLocationChange = (val) => {
    setSelectedLocation(() => val);
  };

  const handleBudgetChange = (val) => {
    setSelectedBudget(() => val);
  };
  // const requestClients = async ({ category, skill, location }) => {
  //   await getFilteredClients({ category, skill, location }).then((res) => {
  //     if (res) {
  //       console.log('ee', res.data.data);
  //       setFreelancer(res.data.data);
  //     }
  //   });
  // };
  const handleSubmit = async () => {
    const name = profileName.current.value;
    console.log(name);
    if (selectedCategory && !selectedSkill && !selectedLocation && !name) {
      console.log('1');
      await getClientsHFilter3(selectedCategory).then((res) => {
        if (res.status) {
          setFreelancer(res.data.data);
        }
      });
    } else if (
      selectedCategory &&
      selectedSkill &&
      !selectedLocation &&
      !name
    ) {
      console.log('2');
      await getClientsHFilter4(selectedCategory, selectedSkill).then((res) => {
        if (res.status) {
          setFreelancer(res.data.data);
        }
      });
    } else if (selectedCategory && selectedSkill && selectedLocation && !name) {
      console.log('3');
      await getFilteredClients2(
        selectedCategory,
        selectedSkill,
        selectedLocation
      ).then((res) => {
        if (res.status) {
          setFreelancer(res.data.data);
        }
      });
    } else if (selectedCategory && selectedSkill && selectedLocation && name) {
      console.log('all');
      await getFilteredClientsProfile(
        selectedCategory,
        selectedSkill,
        selectedLocation,
        name
      ).then((res) => {
        if (res.status) {
          console.log(res.data.data);
          setFreelancer(res.data.data);
        }
      });
    } else if (
      name &&
      !selectedCategory &&
      !selectedSkill &&
      !selectedLocation
    ) {
      console.log('6');
      await getFilteredClientsOnlyName(name).then((res) => {
        if (res.status) {
          setFreelancer(res.data.data);
        }
      });
    } else if (
      !name &&
      !selectedCategory &&
      !selectedSkill &&
      selectedLocation
    ) {
      console.log('location');
      await getFilteredClientsOnlyLocation(selectedLocation).then((res) => {
        console.log(res);
        if (res.status) {
          setFreelancer(res.data.data);
        }
      });
    } else if (
      name &&
      selectedCategory &&
      !selectedSkill &&
      !selectedLocation
    ) {
      console.log('Cat NAme');
      await getFilteredClientsCatLocation(selectedCategory, name).then(
        (res) => {
          if (res.status) {
            setFreelancer(res.data.data);
          }
        }
      );
    } else if (
      !name &&
      selectedCategory &&
      !selectedSkill &&
      selectedLocation
    ) {
      console.log('category&Country');
      await getFilteredClientsCatCountry(
        selectedLocation,
        selectedCategory
      ).then((res) => {
        if (res.status) {
          setFreelancer(res.data.data);
        }
      });
    }
    handleClose();
  };
  const resetField = (field) => {
    // if (field === 'profile') setSelectedBudget(() => null);
    if (field === 'location') setSelectedLocation(() => null);
    else if (field === 'category') setSelectedCategory(() => null);
    else if (field === 'skills') setSelectedSkill(() => null);
  };
  return (
    <>
      <FilterButton onClick={() => setOpen(true)}>Filters</FilterButton>
      <Modal2
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isOpen={open}
        title="Filters"
        description="desc"
        hasHeader={true}
        hasFooter={true}
        Widthmax={true}
      >
        <Container>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ItemLabel>Category</ItemLabel>
              <ItemLabel2 onClick={() => resetField('category')}>
                Clear
              </ItemLabel2>
            </div>

            <DropdownO
              hasLabel={false}
              items={categories}
              setHandleOnChange={handleCategoryChange}
              selected={selectedCategory}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Categories"
            />
          </Item>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ItemLabel>Skills</ItemLabel>
              <ItemLabel2 onClick={() => resetField('skills')}>
                Clear
              </ItemLabel2>
            </div>

            <DropdownO
              hasLabel={false}
              items={skills}
              setHandleOnChange={handleSkillsChange}
              selected={selectedSkill}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Skills"
            />
          </Item>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ItemLabel>Location</ItemLabel>
              <ItemLabel2 onClick={() => resetField('location')}>
                Clear
              </ItemLabel2>
            </div>

            <DropdownO
              hasLabel={false}
              items={locations}
              setHandleOnChange={handleLocationChange}
              selected={selectedLocation}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Location"
            />
          </Item>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ItemLabel style={{ fontWeight: 100 }}>Profile Name</ItemLabel>
              {/* <ItemLabel2 onClick={() => resetField('profile')}>
                Clear
              </ItemLabel2> */}
            </div>

            {/* <DropdownO
              hasLabel={false}
              items={budget}
              setHandleOnChange={handleBudgetChange}
              selected={selectedBudget}
              width="100%"
              type="standard"
              color="red"
              defaultLabel="Select Budget Range"
            /> */}
            <NoOutlinedSquareTextField
              fullWidth
              id="profileName"
              // placeholder="profile name"
              // name=""
              inputRef={profileName}
            />
          </Item>
          {/* <Item2>
            <ItemLabel>Rating</ItemLabel>
            <ClickableStarRating />
          </Item2> */}
        </Container>
      </Modal2>
    </>
  );
}

export default Filter;
