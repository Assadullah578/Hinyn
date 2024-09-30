import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { CrossForModal, CrossForModals } from '../shared/Icon';
import Text from '../shared/Typography';
import { getApiSkillById, getCities, getCountries } from '../forms/formService';
import { Pill } from './searchBar/DetailsSection';
import Button from './Button';
import { budget } from '../models/filters.models';
import { useRouter } from 'next/router';
const DetailsContainer = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 11px;
  margin: auto;
  margin-top: 1.5rem;
  width: 95%;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  position: absolute;
  left: 0;
  right: 0;
  padding: 1.25rem 2.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  column-gap: 1rem;
`;

const ImageContainer = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  position: relative;

  .icon-img {
    filter: grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg)
      saturate(600%) contrast(0.8) drop-shadow(0px 0px 1px #eb4c6050);
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  &.categories-row {
    padding: 0.5rem 0.25rem;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: #eb4c6030;
      cursor: pointer;
    }
  }
  &.active {
    background: #eb4c6030;
  }
`;
const DivExpand = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextEx = styled.div`
  color: #eb4c60;
  font-size: 15px;
`;
const TextEx2 = styled.div`
  font-size: 10px;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;
const SkillContainer = styled.div`
  height: 3rem;
  width: 100%;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
`;

const SkillTitle = styled.div`
  font-size: 12px;
  padding: 0 10px;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 12px;
  color: black;
`;
const SkillItem = styled.span`
  margin-right: 10px;
`;

const DetailsContainerList = styled.div`
  /* border: 1px solid #ebebeb; */
  border-radius: 11px;
  margin: auto;
  margin-top: 0.5rem;
  max-width: 23rem;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  padding: 1.25rem 0rem;
`;
const List = styled.ul`
  padding: 0;
`;
const ListItem = styled.li`
  text-decoration: none;
  font-weight: bold;
  list-style-type: none;
  padding: 5px 0 5px 10px;
  cursor: pointer;
  &:hover {
    background: #eb4c6010;
    color: #eb4c60;
  }
  &.active {
    background-color: #eb4c6020;
  }
`;
const TextHead = styled.div`
  margin-top: 1rem;
`;

const PhoneBarBody = ({ categories, handleClose }) => {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userSelectedDetails, setUserSelectedDetails] = useState({ data: {} });
  const [value, setValue] = useState(1);
  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category.id);
    console.log('as', category.id);
    setSelectedCategory(category.title);
    handleUserSelectedDetails({ categories: category });
    setValue(2);
  };
  const handleUserSelectedDetails = (details) => {
    // console.log(details, 'clickc');
    setUserSelectedDetails((prev) => {
      let updatedDetails = {
        data: { ...prev.data, ...details },
      };
      console.log(updatedDetails.data, '//');
      //   setDisplaySelectedDetails(updatedDetails);
      return updatedDetails;
    });
  };
  const [categorySkills, setCategorySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (selectedCategoryId) {
      getApiSkillById(selectedCategoryId).then((result) => {
        if (result?.data) {
          setCategorySkills(() => []);
          const temp = result?.data?.data?.attributes?.skills?.data ?? [];
          temp.map((item) => {
            let skillId = { id: item.id };
            setCategorySkills((prev) =>
              prev.concat({ ...item.attributes, ...skillId })
            );
          });
        }
      });
    }
  }, [selectedCategoryId]);
  const handleSelectedSkills = (skills) => {
    handleUserSelectedDetails({ skills: skills });
  };
  const togglePillActive = (item) => {
    setSelectedSkills((prev) => {
      const isActive = prev.some((data) => data.id === item.id);
      if (!isActive) {
        const updatedSkills = [...prev, item];
        handleSelectedSkills(updatedSkills);
        return updatedSkills;
      } else {
        const updatedSkills = prev.filter((data) => data.id !== item.id);
        handleSelectedSkills(updatedSkills);
        return updatedSkills;
      }
    });
  };
  const checkIsActive = (item) => {
    return selectedSkills.some((data) => data.id === item.id);
  };
  const handleNext = (a) => {
    setValue(a);
  };

  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryIso, setSelectedCountryIso] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getCountries().then((result) => {
      if (result) {
        setLocations(() => []);
        result?.data?.data.map((item) => {
          let temp = { id: item.id };
          setLocations((prev) => prev.concat({ ...item.attributes, ...temp }));
        });
      }
    });
  }, []);
  useEffect(() => {
    if (selectedCountryIso && selectedCountryIso) {
      getCities(selectedCountryIso).then((result) => {
        if (result?.data) {
          setCities(() => []);
          result?.data?.data?.map((item) => {
            let temp = { id: item.id };
            setCities((prev) => prev.concat({ ...item.attributes, ...temp }));
          });
        }
      });
    }
  }, [selectedCountry]);
  const selectLocation = (location) => {
    handleUserSelectedDetails({ country: location });
    setSelectedCountryId(location.id);
    setSelectedCountry(location.name);
    setSelectedCountryIso(location.iso);
  };

  const selectCity = (location) => {
    setSelectedCityId(location);
    handleUserSelectedDetails({ city: location });
  };
  const [selectedBudget, setSelectedBudget] = useState(null);

  const selectBudget = (budget) => {
    setSelectedBudget(budget);
    handleUserSelectedDetails({ budget: budget });
  };
  const handleSeacrh = () => {
    const { categories, skills, country, city, budget } =
      userSelectedDetails.data;
    console.log(userSelectedDetails.data.skills, 'skills');

    const queryParams = {
      categories: categories ? categories.title : '',
      categoryId: categories ? categories.id : '',
      skills: skills ? JSON.stringify(skills) : '',
      country: country ? country.name : '',
      city: city ? city.name : '',
      budget: budget ? budget.value : '',
    };
    console.log(queryParams);
    router.push({
      pathname: '/dashboard/client/postProject2',
      query: queryParams,
    });
  };
  return (
    <>
      <div
        style={{
          borderRadius: 100,
          //   padding: 5,
          width: 30,
          height: 30,
          border: '1px solid lightgray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 13,
          top: 13,
        }}
        onClick={handleClose}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: 13,
            height: 13,
          }}
        >
          {' '}
          <CrossForModals />
        </div>
      </div>
      {value === 1 ? (
        <>
          {' '}
          <Text
            style={{ fontSize: 20, marginTop: '2.3rem', fontWeight: 'bold' }}
          >
            Select Category
          </Text>
          <DetailsContainer>
            <GridContainer>
              {categories.map((category, idx) => {
                if (category?.key !== 'all')
                  return (
                    <Row
                      key={'category-' + idx}
                      className={
                        selectedCategoryId === category.id
                          ? 'categories-row active'
                          : 'categories-row'
                      }
                      onClick={() => handleCategoryClick(category)}
                    >
                      <ImageContainer className="icon-img-box">
                        <Image
                          src={'/assets/img/categories/' + category.icon}
                          layout="fill"
                          className="icon-img"
                          alt="icon-img-box"
                        />
                      </ImageContainer>
                      <DivExpand>
                        <TextEx>{category.title}</TextEx>
                        <TextEx2>Lorem ipsum from</TextEx2>
                      </DivExpand>
                    </Row>
                  );
              })}
            </GridContainer>
          </DetailsContainer>
        </>
      ) : value === 2 ? (
        <div>
          <div
            style={{
              height: '3rem',
              width: '100%',
              background: 'white',
              borderRadius: 6,
              display: 'flex',
              marginTop: 36,

              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '92%',
                margin: 'auto',
              }}
            >
              <div>
                <Text>Category</Text>
              </div>
              <div>
                <Text color="black" font={'bold'}>
                  {selectedCategory}
                </Text>
              </div>
            </div>
          </div>
          <Text
            style={{ fontSize: 20, marginTop: '2.3rem', fontWeight: 'bold' }}
          >
            Select skills
          </Text>
          <FlexContainer>
            {categorySkills.map((item, idx) => {
              return (
                <Pill
                  key={item.id}
                  onClick={() => togglePillActive(item)}
                  className={checkIsActive(item) ? 'active' : ''}
                >
                  {' '}
                  {item?.title} <span>+</span>
                </Pill>
              );
            })}
          </FlexContainer>
          <div style={{ position: 'absolute', bottom: 14, right: 17 }}>
            <Button onClick={() => handleNext(3)}>Next</Button>
          </div>
        </div>
      ) : value === 3 ? (
        <>
          <SkillContainer style={{ marginTop: 36 }}>
            <SkillTitle>Category</SkillTitle>
            <SkillList style={{ marginRight: 5 }}>{selectedCategory}</SkillList>
          </SkillContainer>

          <SkillContainer>
            <SkillTitle>Skills</SkillTitle>
            <SkillList>
              {userSelectedDetails.data.skills.map((data, index) => (
                <SkillItem key={data.id}>
                  {data.title}
                  {','}
                </SkillItem>
              ))}
            </SkillList>
          </SkillContainer>

          {selectedCountry ? (
            <SkillContainer>
              <SkillTitle>Location</SkillTitle>
              <SkillList style={{ marginRight: 5 }}>
                {selectedCountry}
                {','} {selectedCityId?.name}
              </SkillList>
            </SkillContainer>
          ) : null}
          <Text
            style={{ fontSize: 20, marginTop: '2.3rem', fontWeight: 'bold' }}
          >
            Select Location
          </Text>
          {!selectedCountryId ? (
            // <DetailsContainerList>
            <>
              <TextHead>Select Country</TextHead>
              <List>
                {locations &&
                  locations.map((item, idx) => {
                    return (
                      <ListItem
                        key={'location-id-' + idx}
                        onClick={() => selectLocation(item)}
                        className={
                          selectedCountryId === item.id ? 'active' : ''
                        }
                      >
                        {item.name}
                      </ListItem>
                    );
                  })}
              </List>
            </>
          ) : (
            // </DetailsContainerList>
            <>
              <TextHead>
                Select City from{' '}
                <span
                  style={{ color: '#EB4C60', fontSize: 12, fontWeight: 700 }}
                >
                  {selectedCountry}
                </span>
              </TextHead>
              <List>
                {cities &&
                  cities.map((item, idx) => {
                    return (
                      <ListItem
                        key={'location-id-' + idx}
                        onClick={() => selectCity(item)}
                        className={selectedCityId === item.id ? 'active' : ''}
                      >
                        {item.name}
                      </ListItem>
                    );
                  })}
              </List>
            </>
          )}
          <div style={{ position: 'absolute', bottom: 14, right: 17 }}>
            <Button onClick={() => handleNext(4)}>Next</Button>
          </div>
        </>
      ) : value === 4 ? (
        <>
          <SkillContainer style={{ marginTop: 36 }}>
            <SkillTitle>Category</SkillTitle>
            <SkillList style={{ marginRight: 5 }}>{selectedCategory}</SkillList>
          </SkillContainer>

          <SkillContainer>
            <SkillTitle>Skills</SkillTitle>
            <SkillList>
              {userSelectedDetails.data.skills.map((data) => (
                <SkillItem key={data.id}>
                  {data.title}
                  {','}
                </SkillItem>
              ))}
            </SkillList>
          </SkillContainer>
          {selectedCountry ? (
            <SkillContainer>
              <SkillTitle>Location</SkillTitle>
              <SkillList style={{ marginRight: 5 }}>
                {selectedCountry} {', '}
                {selectedCityId?.name}
              </SkillList>
            </SkillContainer>
          ) : null}
          {selectedBudget ? (
            <SkillContainer>
              <SkillTitle>Budget</SkillTitle>
              <SkillList style={{ marginRight: 5 }}>
                {selectedBudget.value}
              </SkillList>
            </SkillContainer>
          ) : null}
          <Text
            style={{ fontSize: 20, marginTop: '2.3rem', fontWeight: 'bold' }}
          >
            Select Budet{' '}
          </Text>
          <List>
            {budget &&
              budget.map((item, idx) => {
                return (
                  <ListItem
                    key={'budget-id-' + idx}
                    onClick={() => selectBudget(item)}
                    className={
                      selectedBudget && selectedBudget.title === item.title
                        ? 'active'
                        : ''
                    }
                  >
                    {item.title}
                  </ListItem>
                );
              })}
          </List>
          <div style={{ position: 'absolute', bottom: 14, right: 17 }}>
            <Button onClick={handleSeacrh}>Search</Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default PhoneBarBody;
