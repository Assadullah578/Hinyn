import styled from '@emotion/styled';
import breakpoint from '../../utils/Breakpoints';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  getApiSkillById,
  getCategories,
  getCities,
  getCountries,
  getCountriesByiso,
} from '../../forms/formService';
import { locations, budget } from '../../models/filters.models';

const DetailsContainer = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 11px;
  margin: auto;
  margin-top: 0.5rem;
  width: 57rem;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  position: absolute;
  left: 0;
  right: 0;
  padding: 1.25rem 2.5rem;
`;
const DetailsContainerList = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 11px;
  margin: auto;
  margin-top: 0.5rem;
  max-width: 23rem;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  padding: 1.25rem 0rem;

  @media ${breakpoint.device.lg} {
    max-width: 37%;
  }
`;
const DetailsContainerList2 = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 11px;

  margin-top: 0.5rem;
  margin-left: 52rem;
  max-width: 20%;
  background: #f8f8f8;
  border: 1px solid #eb4c60;
  box-shadow: 0px 3px 6px #eb4c603c;
  position: absolute;
  left: 0;
  right: 0;
  padding: 0.25rem 0rem;

  @media ${breakpoint.device.lg} {
    max-width: 37%;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 0.25rem;
  column-gap: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const Text = styled.span`
  font-size: 14px;

  &.secondary {
    color: #eb4c60;
  }
`;

const ImageContainer = styled.div`
  width: 2rem;
  height: 2rem;
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
export const Pill = styled.div`
  background: white;
  border-radius: 20px;
  display: flex;
  color: #eb4c60;
  padding: 0.5rem 0.8rem;
  column-gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 3px #eb4c6060;
  }

  &.active {
    background-color: #eb4c6020;
  }
`;

const List = styled.ul`
  padding: 0;
`;
const ListItem = styled.li`
  text-decoration: none;
  font-weight: bold;
  list-style-type: none;
  padding: 5px 0 5px 60px;
  cursor: pointer;
  &:hover {
    background: #eb4c6010;
    color: #eb4c60;
  }
  &.active {
    background-color: #eb4c6020;
  }
`;

const DivExpand = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextEx = styled.div`
  color: #eb4c60;
  font-size: 17px;
`;
const TextEx2 = styled.div`
  font-size: 12px;
`;

const TextHead = styled.div`
  padding: 0 2rem;
`;

const CategoriesDetailsContainer = ({ handleSelectedCategory, categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category.id);
    handleSelectedCategory(category);
  };

  return (
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
  );
};

const SkillsDetailsContainer = ({ category, handleSelectedSkills }) => {
  const [categorySkills, setCategorySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (category) {
      getApiSkillById(category.id).then((result) => {
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
  }, [category]);

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

  return (
    <DetailsContainer>
      {categorySkills ? (
        <>
          <div>
            Skills related to{' '}
            {category ? (
              <Text className="secondary">
                {category.title ? category.title : 'Editor'}
              </Text>
            ) : (
              ''
            )}
          </div>
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
        </>
      ) : (
        <div>Select a Category</div>
      )}
    </DetailsContainer>
  );
};

const LocationDetailsContainer = ({
  handleSelectedCountry,
  handleSelectedCity,
  locations,
  country,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (country && country.iso) {
      console.log(country.iso, 'lll');
      getCountriesByiso(country.iso).then((result) => {
        if (result.status) {
          console.log(
            result.data.data[0].attributes.cities.data.map(
              (res) => res.attributes.name
            ),
            'asdasd'
          );

          setCities(() => []);
          result.data?.data[0].attributes.cities.data?.map((item) => {
            let temp = { id: item.id };
            setCities((prev) => prev.concat({ ...item.attributes, ...temp }));
          });
        }
      });
    }
  }, [country]);

  const selectLocation = (location) => {
    handleSelectedCountry(location);
    setSelectedCountryId(location.id);
    setSelectedCountry(location.name);
  };

  const selectCity = (location) => {
    setSelectedCityId(location.id);
    handleSelectedCity(location);
  };

  return (
    <>
      {!selectedCountryId ? (
        <DetailsContainerList>
          <TextHead>Select Country</TextHead>
          <List>
            {locations &&
              locations.map((item, idx) => {
                return (
                  <ListItem
                    key={'location-id-' + idx}
                    onClick={() => selectLocation(item)}
                    className={selectedCountryId === item.id ? 'active' : ''}
                  >
                    {item.name}
                  </ListItem>
                );
              })}
          </List>
        </DetailsContainerList>
      ) : (
        <DetailsContainerList>
          <TextHead>
            Select City from{' '}
            <span style={{ color: '#EB4C60', fontSize: 14.5, fontWeight: 700 }}>
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
        </DetailsContainerList>
      )}
    </>
  );
};

const BudgetDetailsContainer = ({ handleSelectedBudget }) => {
  const [selectedBudget, setSelectedBudget] = useState(null);

  const selectBudget = (budget) => {
    setSelectedBudget(budget);
    handleSelectedBudget(budget);
  };

  return (
    <DetailsContainerList2>
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
    </DetailsContainerList2>
  );
};

function DetailsSection({
  type,
  onHandleUserSelectedDetails,
  categories,
  locations,
}) {
  const [selectedCategory, setSelectedCategory] = useState({
    id: 3,
  });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    onHandleUserSelectedDetails({ categories: category });
  };

  const handleSelectedSkills = (skills) => {
    onHandleUserSelectedDetails({ skills: skills });
  };

  const handleSelectedCountry = (location) => {
    setSelectedCountry(location);
    onHandleUserSelectedDetails({ country: location });
  };

  const handleSelectedCity = (location) => {
    onHandleUserSelectedDetails({ city: location });
  };

  const handleSelectedBudget = (budget) => {
    onHandleUserSelectedDetails({ budget: budget });
  };

  if (type === 'categories') {
    return (
      <CategoriesDetailsContainer
        categories={categories}
        handleSelectedCategory={handleSelectedCategory}
      />
    );
  } else if (type === 'skills') {
    return (
      <SkillsDetailsContainer
        category={selectedCategory}
        handleSelectedSkills={handleSelectedSkills}
      />
    );
  } else if (type === 'city') {
    return (
      <LocationDetailsContainer
        handleSelectedCountry={handleSelectedCountry}
        handleSelectedCity={handleSelectedCity}
        locations={locations}
        country={selectedCountry}
      />
    );
  } else if (type === 'budget') {
    return (
      <BudgetDetailsContainer handleSelectedBudget={handleSelectedBudget} />
    );
  }
}

export default DetailsSection;
