import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import DetailsSection from './DetailsSection';
import { Box } from '@mui/material';

import { useFreelancer } from '../../../src/store';
import {
  // getCategories,
  // getClientsHFilter,
  // getClientsHFilter2,
  // getClientsHFilter3,
  getCountries,
} from '../../forms/formService';
import { useRouter } from 'next/router';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ebebeb;
  border-radius: 50px;
  margin: auto;
  width: max-content;
  margin-top: 1rem;

  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
  }

  &:has(.active) {
    background: #eee;
  }
`;
const SearchOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 19px 25px;
  min-width: 12.6rem;
  transition: all 0.5s ease-in-out;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 50px;
  color: #bdc3c7;
  padding-right: 4rem;

  &:hover {
    // background: #f8f8f8;
    // border: 1px solid #eb4c60;
    // paddingvertical: 20px;
    // box-shadow: 0px 3px 6px #eb4c603c;
  }

  &.active {
    background: #f8f8f8;
    border: 1px solid #eb4c60;
    box-shadow: 0px 3px 6px #eb4c603c;
    color: #eb4c60;
    font-weight: bold;
  }

  .pretitle {
    font-size: 12px;
  }

  .value {
    color: #c4c4c4;

    &.active {
      color: #eb4c60;
    }
  }
`;
const VerticalDivider = styled.div`
  height: 36px;
  width: 1px;
  background: #dbd9d9;
`;
const TextEx = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #5d5d5d;
`;
const CustomSearchIcon = styled(FiSearch)`
  color: #ffffff;
`;
const SearchIconContainer = styled.div`
  background: linear-gradient(135deg, #ff5a5f 0%, #a52226 100%);
  box-shadow: 0px 3px 6px #eb4c6072;
  border-radius: 50%;
  padding: 4px 4px 0;
  margin: 0 30px;
  transform: scale(2);
`;

const items = [
  {
    key: 'categories',
    pretitle: 'Category',
    value: 'I am looking for',
  },
  {
    key: 'skills',
    pretitle: 'Skills',
    value: 'Expertise',
  },
  {
    key: 'city',
    pretitle: 'Where',
    value: 'Country',
  },

  {
    key: 'budget',
    pretitle: 'Budget',
    value: 'Per Project',
  },
];

function ExpandedSearchBar({ handleCloseExpandedSearchBar, categories }) {
  const router = useRouter();
  const [currentExpanded, setCurrentExpanded] = useState(null);
  const [showDetailsSection, setShowDetailsSection] = useState(false);
  const [userSelectedDetails, setUserSelectedDetails] = useState({ data: {} });
  const [displaySelectedDetails, setDisplaySelectedDetails] = useState({
    data: {},
  });
  const [clearValuesOnNextOpen, setClearValuesOnNextOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const { setFreelancer } = useFreelancer();

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

  const toggleDetailsSection = (key) => {
    setCurrentExpanded(key);
    setShowDetailsSection((prev) => currentExpanded !== key || !prev);

    if (clearValuesOnNextOpen) {
      setUserSelectedDetails((prev) => ({
        ...prev,
        data: {},
      }));
      setDisplaySelectedDetails((prev) => ({
        ...prev,
        data: {},
      }));
      setClearValuesOnNextOpen(false);
    }
  };

  const handleUserSelectedDetails = (details) => {
    // console.log(details, 'clickc');
    setUserSelectedDetails((prev) => {
      let updatedDetails = {
        data: { ...prev.data, ...details },
      };
      console.log(updatedDetails, '//');
      setDisplaySelectedDetails(updatedDetails);
      return updatedDetails;
    });
  };

  const handleSubmit = () => {
    const { categories, skills, country, city, budget } =
      userSelectedDetails.data;
    console.log(
      skills.map((res) => res.id),
      'skills'
    );

    const queryParams = {
      categories: categories ? categories.title : '',
      categoryId: categories ? categories.id : '',
      skills: skills ? skills.map((res) => res.id) : [],
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

  const showValue = (key, orig) => {
    if (displaySelectedDetails && displaySelectedDetails.data[key]) {
      const selectedItem = displaySelectedDetails.data[key];
      console.log(displaySelectedDetails, 'qwe', selectedItem);
      let displayValue;

      if (Array.isArray(selectedItem)) {
        // If selectedItem is an array, join the titles or names of the objects
        displayValue = selectedItem
          .map((item) => item.title || item.name)
          .filter(Boolean) // Remove undefined or null values
          .join(', ');
      } else {
        // If selectedItem is an object, get the name or title
        displayValue = selectedItem.name || selectedItem.title || orig;
      }
      const maxLength = 50; // You can adjust this length as needed
      if (displayValue.length > maxLength) {
        displayValue = displayValue.substring(0, maxLength) + '...';
      }
      return <span className="value active">{displayValue}</span>;
    } else {
      return orig;
    }
  };

  return (
    <Box sx={{ position: 'relative' }} onClick={handleCloseExpandedSearchBar}>
      <SearchContainer>
        {items &&
          items.map((item, idx) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }} key={item.key}>
              <SearchOptionContainer
                onClick={() => toggleDetailsSection(item.key)}
                className={item.key === currentExpanded ? 'active' : ''}
              >
                <TextEx>{item.pretitle}</TextEx>
                {displaySelectedDetails ? (
                  showValue(item.key, item.value)
                ) : (
                  <span>{item.value}</span>
                )}
              </SearchOptionContainer>
              {idx < items.length - 1 ? <VerticalDivider /> : null}
            </Box>
          ))}
        <SearchIconContainer>
          <CustomSearchIcon onClick={() => handleSubmit()} />
        </SearchIconContainer>
      </SearchContainer>
      {showDetailsSection ? (
        <DetailsSection
          categories={categories}
          locations={locations}
          type={currentExpanded}
          onHandleUserSelectedDetails={handleUserSelectedDetails}
        />
      ) : null}
    </Box>
  );
}

export default ExpandedSearchBar;
