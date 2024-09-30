import { useEffect, useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete,
  InputAdornment,
  IconButton,
  TextareaAutosize,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  CircularProgress,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button, { GreenButton } from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField, {
  OutlinedTextField,
  SimpleTextField,
} from '../shared/Textfield';
import Image from 'next/image';
import {
  OutlineSearchIcon,
  CloseIcon,
  ChevronDownIcon,
  UploadIcon,
  Congrats,
  Check,
  CheckBig,
  Cross,
  CrossForModal,
} from '../shared/Icon';
import { StaticPill } from '../shared/Pill';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { Button as CustomButton } from '@mui/material';

import {
  addBidData,
  getCategories,
  getCities,
  getClientData,
  getCountries,
  getCountriesByiso,
  getCountriesByName,
  getLanguages,
  getSpecificCategory,
  paymentForBid,
  uploadFiles,
} from './formService';
import DropdownO1 from '../shared/DropdownO1';
import {
  budget,
  locations,
  ageGroupOptions,
  ethnicity,
} from '../models/filters.models';
import { useRouter } from 'next/router';
import RegistrationForm from '../forms/RegistrationForm';
import LoginForm from '../forms/LoginForm';
import LoginForPost from './LoginForPost';
import DropdownO from '../shared/DropdownO1';
import countryList from 'react-select-country-list';
import DropdownCountry from '../shared/DropdownCountry';
import DropdownNew from '../shared/DropdownNew';
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 13px;
  background: #ffffff;
  box-shadow: 0px 3px 20px #00000029;
  padding: 3.125rem;
  margin-top: 3.75rem;
  @media (max-width: 500px) {
    padding: 2rem;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;
const CategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  border: 1px solid #949494;
  border-radius: 10px;
  padding: 1.25rem;
  cursor: pointer;
  &.active {
    background: #eb4c60;
    border: 1px solid #eb4c60;
    span {
      color: #ffffff;
    }
    .icon-img-box img {
      filter: invert(0) sepia(0%) saturate(0%) hue-rotate(338deg)
        brightness(101%) contrast(7);
    }
  }

  &:hover {
    border: 1px solid #eb4c60;
    color: #eb4c60;
  }
  // span {
  //   color: #eb4c60;
  // }

  //   .icon-img-box img {
  //     filter: invert(0) sepia(100%) saturate(100%) hue-rotate(330deg)
  //       brightness(100%) contrast(100%);
  //   }
  // }
`;

const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;
const Field = styled.div`
  background: white;
  border-radius: 20px;
  display: flex;
  color: #eb4c60;
  padding: 0.5rem 0.8rem;
  column-gap: 1rem;
  cursor: pointer;
`;

// Styled component for individual skill items
const SkillsItem = styled.div`
  border: 1px solid #ccc;
  padding: 7px 25px;
  border-radius: 20px;
  background-color: #f9f9f9;
  font-size: 14px;
  display: inline-block;
  @media (max-width: 500px) {
    padding: 6px 7px;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  min-height: 8.5rem;
  padding: 1.75rem 1.75rem 0;
`;

const ImageContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
`;

const PillsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledStaticPill = styled(StaticPill)`
  background-color: #d8d8d8;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const GrayText = styled(Text)`
  color: #949494;
  font-size: 10px;
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  min-height: 9rem;
  max-height: 9rem;
  overflow: auto;
  border-radius: 12px;
  padding: 1rem;
  font-family: inherit;
  background-color: transparent;
  opacity: 1;
  border: 1px solid #d8d8d8;
  color: #525252;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;

const UploadButton = styled(CustomButton)`
  border: 1px solid #d8d8d8;
  color: #949494;
  border-radius: 5px;
  background: #fcfcfc;
  width: 100%;
  font-size: 12px;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;

  &:hover {
    background: #fcfcfc;
    color: #949494;
    border: 1px solid #d8d8d8;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  color: #eb4c60;
  &.Mui-checked {
    color: #4aa398;
  }
`;

const CustomDropdown = styled(DropdownNew)`
  .MuiInputBase-root {
    border-radius: 18px;
    background: red;
  }
`;
const CustomDropdownSkill = styled(DropdownO1)`
  .MuiInputBase-root {
    border-radius: 18px;
    background: red;
  }
`;
const CountryDropdown = styled(DropdownCountry)`
  .MuiInputBase-root {
    border-radius: 18px;
    background: red;
  }
`;
const CustomTab = styled.div`
  border: 1px solid #d8d8d8;
  padding: 14px;
  width: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  &.active {
    background-color: #fdeaef;
    border: 1px solid #eb4c60;
    color: #eb4c60;
  }

  &.left {
    border-radius: 23px 0 0 23px;
    &.active {
      background-color: #ecf6f5;
      border: 1px solid #4aa398;
      color: #4aa398;
    }
  }

  &.right {
    border-radius: 0 23px 23px 0;

    &.active {
      background-color: #fff0ea;
      border: 1px solid #e96e3f;
      color: #e96e3f;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

const MyOutlinedTextField = styled(TextField)`
  width: 54rem;
  border-radius: 20px;
`;
// const languages = [
//   'English',
//   'Arabic',
//   'Spanish',
//   'French',
//   'German',
//   'Chinese',
//   'Japanese',
//   'Russian',
//   'Portuguese',
//   'Hindi',
// ];

const upgradesData = [
  {
    key: 'featured',
    title: 'Featured',
    desc: 'Attract more freelancers with a prominent placement in our jobs list page.',
    price: '1.00 AED',
  },
  {
    key: 'urgent',
    title: 'Urgent',
    desc: 'Make your project stand out and let freelancers know that your job is time sensitive.',
    price: '1.00 AED',
  },
];

function PostProjectForm2({ handleNextClick, initialData }) {
  const imgsrc = '/assets/img/categories/';
  const [open, setOpen] = useState(false);
  const [openOnlyClient, setOpenOnlyClient] = useState(false);
  const router = useRouter();
  console.log('ooo', initialData);
  const handleClose = () => {
    setOpen(false);
    setOpenOnlyClient(false);
  };

  const [categories, setCategories] = useState([]);

  const [selectedGender, setSelectedGender] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState(null);
  const [skills, setSkills] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [projectBudget, setProjectBudget] = useState(null);
  const [projectDate, setProjectDate] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dataForm, setDataForm] = useState(null);
  const [ageReq, setAgeReq] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [genderReq, setGenderReq] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState('');
  const [activeStates, setActiveStates] = useState(categories.map(() => false));
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [budget, setBudget] = useState('');
  const [data, setData] = useState();
  const [model, setModel] = useState(false);
  const [photo, setPhoto] = useState('');
  const [video, setVideo] = useState(false);
  const [editor, setEditor] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filename, setFilename] = useState(null);
  const [upgrades, setUpgrades] = useState({
    featured: false,
    urgent: false,
  });
  const [progress, setProgress] = useState(1);

  const [projectData, setProjectData] = useState({
    title: null,
    category: null,
    gender: null,
    ageGroup: null,
    skills: null,
    languages: null,
    location: null,
    projectBudget: null,
    projectDate: null,
    projectDescription: null,
    uploadedFiles: null,
    deliverables: null,
    deliveryDays: null,
    upgrades: {
      featured: null,
      urgent: null,
    },
  });
  const [isValid, setValid] = useState({
    title: false,
    category: false,
    gender: false,
    ageGroup: false,
    skills: false,
    location: false,
    projectBudget: false,
    projectDate: false,
    projectDescription: false,
    uploadedFiles: false,
    deliverables: false,
    deliveryDays: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    title: null,
    category: null,
    gender: null,
    ageGroup: null,
    skills: null,
    location: null,
    projectBudget: null,
    projectDate: null,
    projectDescription: null,
    uploadedFiles: null,
    deliverables: null,
    deliveryDays: null,
  });

  const onLanguageClick = (clickedLanguage) => {
    let temp = [];
    if (selectedLanguages.find((language) => language === clickedLanguage)) {
      temp = selectedLanguages.filter(
        (language) => language !== clickedLanguage
      );
      setSelectedLanguages(() => temp);
    } else {
      temp = selectedLanguages.concat(clickedLanguage);
      setSelectedLanguages(() => temp);
    }
    setProjectData((prevState) => ({
      ...prevState,
      ['languages']: temp,
    }));
  };
  const fetchCategories = async () => {
    const result = await getCategories();
    if (result?.data) {
      const sortedCategories = result.data.data
        .map((item) => ({
          id: item.id,
          ...item.attributes,
        }))
        .sort((a, b) => a.orderNumber - b.orderNumber);

      return setCategories(sortedCategories);
    }
  };
  const locations2 = [
    { id: 1, title: 'New York' },
    { id: 2, title: 'Los Angeles' },
    { id: 3, title: 'Chicago' },
    { id: 4, title: 'Houston' },
    { id: 5, title: 'Miami' },
  ];
  const reloadFunction = async () => {
    // await fetchCategories();

    try {
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
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
    setModel(false);
    setPhotos(false);
    setGenderReq(false);
    setAgeReq(false);

    if (initialData) {
      const { categories, country, city, budget, skills } = initialData;
      console.log(selectedCategory, 'cat');
      switch (selectedCategory?.title) {
        case 'Model':
          setModel(true);
          break;
        case 'Photographer':
        case 'Videographer':
        case 'Editor':
          setPhoto(
            selectedCategory?.title === 'Photographer' ? 'pictures' : 'videos'
          );
          break;
        default:
          break;
      }

      try {
        const res = await getSpecificCategory(selectedCategory.title);
        if (res) {
          const attributes = res.data?.data[0]?.attributes || {};
          setAgeReq(attributes.ageRequired);
          setGenderReq(attributes.genderRequired);
          setPhotos(attributes.noOfPictureRequired);
        }
      } catch (error) {
        console.error('Error fetching specific category:', error);
      }

      let parsedSkills = [];

      if (skills) {
        console.log(skills, 'THESKILLS');
        try {
          // Normalize skills to always be an array
          const normalizedSkills = Array.isArray(skills)
            ? skills
            : [String(skills)];

          console.log(normalizedSkills.map(Number), 'you skills');

          setSelectedSkill(normalizedSkills.map(Number));
        } catch (error) {
          console.error('Failed to parse skills:', error);
        }
      }

      const skillIds = parsedSkills.map((skill) => skill.id);
      // setLocation(`${country}, ${city}`);
      const cityObject = { title: city, value: city };
      const countryObject = { title: country, value: country };
      console.log(countryObject, cityObject, 'BOTH');
      setSelectedCountry(countryObject);
      setSelectedCity(cityObject);
      setCity(city);
      setBudget(budget);
      setProjectData((prevState) => ({
        ...prevState,
        budget,
        // location: country,
        // city: city,
        skills: skillIds, // Set parsed skills here
      }));
    }
  };
  useEffect(() => {
    reloadFunction();
  }, [selectedCategory]);
  useEffect(() => {
    // if (selectedCountry && selectedCountry.iso) {
    console.log(selectedCountry, 'asd');
    getCountriesByName(selectedCountry.title).then((result) => {
      if (result.status) {
        console.log(
          result.data?.data[0]?.attributes.cities.data?.map(
            (res) => res.attributes.name
          ),
          'asdasd'
        );

        setCities(() => []);
        const temp = result.data?.data[0]?.attributes?.cities.data;
        console.log(temp, '123');
        const transformedArray = temp?.map((obj) => ({
          title: obj.attributes.name,
          value: obj.attributes.name,
          id: obj.id,
        }));
        console.log(transformedArray, 'lklk');

        setCities(transformedArray);
      }
    });
    // }
  }, [selectedCountry]);
  const toggleCategoryActiveState = (index) => {
    const updatedActiveStates = Array(categories.length).fill(false);
    updatedActiveStates[index] = true;
    setActiveStates(updatedActiveStates);
    console.log(updatedActiveStates, 'sd');
    handleCategoryChange(index);
  };
  const FetchCatFunction = async () => {
    await fetchCategories();
  };
  const FetchLanguages = async () => {
    try {
      const response = await getLanguages();
      const formattedLanguages = response.data.data
        .map((language) => ({
          value: language.id,
          label: language.attributes.name,
        }))
        .sort((a, b) => a.value - b.value); // Sorting languages by id
      setLanguages(formattedLanguages);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };
  useEffect(() => {
    FetchCatFunction();
    FetchLanguages();
  }, [1]);
  useEffect(() => {
    if (initialData.categories == 'Photographer') {
      const index = 0;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
      // handleSkillsChange(initialData.skills);
    }
    if (initialData.categories == 'Videographer') {
      const index = 1;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
    }
    if (initialData.categories == 'Editor') {
      const index = 2;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
    }
    if (initialData.categories == 'Drone Operator') {
      const index = 3;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
      const value = { title: 'Drone operator', id: 1 };
      // handleSkillsChange(value);
    }
    if (initialData.categories == 'Makeup-artist') {
      const index = 4;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
    }
    if (initialData.categories == 'Hair-stylist') {
      const index = 5;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
    }
    if (initialData.categories == 'Stylist') {
      const index = 6;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
    }
    if (initialData.categories == 'Model') {
      const index = 7;
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
    }
    if (initialData.categories == 'Studio-location') {
      const index = 8;
      console.log('asdasd');
      handleCategoryChange(parseInt(index, 10));
      toggleCategoryActiveState(index);
      // handleSkillsChange(initialData.skills);
      // }
    }
  }, [categories]);

  const onLanguagesSearchChange = (e) => {
    // console.log(e.target.textContent, 'kjj');
    onLanguageClick(e.target.textContent);
  };

  const onLocationSearchChange = (event, value) => {
    setLocation(value);
    setErrorMessage((prevState) => ({
      ...prevState,
      ['location']: null,
    }));
    setValid((prevState) => ({
      ...prevState,
      ['location']: true,
    }));
    setProjectData((prevState) => ({
      ...prevState,
      ['location']: value,
    }));
  };

  const checkProjectDate = (date) => {
    const dateFormat = 'YYYY-MM-DD';
    const projectDateValid = moment(date, dateFormat, true).isValid();
    const today = moment().format('YYYY-MM-DD');
    if (
      projectDateValid &&
      moment(today).format('YYYY-MM-DD') < moment(date).format('YYYY-MM-DD')
    ) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['projectDate']: null,
      }));
      setValid((prevState) => ({
        ...prevState,
        ['projectDate']: true,
      }));
      setProjectDate(() => moment(date).format('DD-MMM-YYYY'));
      setProjectData((prevState) => ({
        ...prevState,
        ['projectDate']: moment(date).format('DD-MMM-YYYY'),
      }));
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['projectDate']: 'Please select a later date.',
      }));
    }
  };

  // const handleFileUpload = (e) => {
  //   if (!e.target.files) {
  //     return;
  //   }
  //   const files = e.target.files[0];
  //   if (files) {
  //     setSelectedImage(URL.createObjectURL(files));
  //     const formData = new FormData();
  //     formData.append('files', file);
  //     // setUploadedFiles(() => {
  //     //   filenames;
  //     // });
  //     setFilename(files.name);
  //   }
  // };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFilename(file.name);
      // setFiletype(file.type);
      const formData = new FormData();
      formData.append('files', file);
      console.log(formData);
      setDataForm(formData);
    }
    // if (dataForm) {
    //   uploadFiles(dataForm);
    // }
  };
  const handleUpgradeChange = (event) => {
    const { name, checked } = event.target;

    setUpgrades((prevUpgrades) => ({
      ...prevUpgrades,
      [name]: checked,
    }));

    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      upgrades: {
        ...prevProjectData.upgrades,
        [name]: checked,
      },
    }));
  };

  const onChangeAgeGroup = (ageGroup) => {
    setAgeGroup(ageGroup);
    setValid((prevState) => ({
      ...prevState,
      ['ageGroup']: true,
    }));
  };
  const onChangeEthnicity = (ageGroup) => {
    setSelectedEthnicity(ageGroup);
    // setValid((prevState) => ({
    //   ...prevState,
    //   ['ageGroup']: true,
    // }));
  };
  const onChangeCountry = (country) => {
    console.log(country, 'Country');
    const temp = { title: country, value: country };
    setSelectedCountry(temp);
    setSelectedCity(null);
    // setValid((prevState) => ({
    //   ...prevState,
    //   ['ageGroup']: true,
    // }));
  };
  const onChangeCity = (country) => {
    console.log(country, 'Citi');
    const temp = { title: country, value: country };
    setSelectedCity(temp);
    // setValid((prevState) => ({
    //   ...prevState,
    //   ['ageGroup']: true,
    // }));
  };
  const onGenderClick = (val) => {
    setSelectedGender(() => val);
    setValid((prevState) => ({
      ...prevState,
      ['gender']: true,
    }));
  };

  const handleFormClick = () => {
    if (progress <= 1) {
      let enteredTitle = titleInputRef.current.value;
      if (enteredTitle && enteredTitle !== '') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['title']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['title']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['title']: enteredTitle,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['title']: 'Please provide project title',
        }));
      }

      if (selectedCategory?.slug === null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['category']: 'Please select a category',
        }));
      }

      if (selectedGender === null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['gender']: 'Please select freelancer gender',
        }));
      }

      // if (ageGroup === null) {
      //   setErrorMessage((prevState) => ({
      //     ...prevState,
      //     ['ageGroup']: 'Please select freelancer age',
      //   }));
      // }

      if (
        isValid.title &&
        isValid.category &&
        isValid.ageGroup &&
        isValid.gender
      ) {
        setProgress((prev) => prev + 1);
      }
    }
    if (progress === 2) {
      if (location !== null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['location']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['location']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['location']: location,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['location']: 'Please select a location',
        }));
      }

      if (projectDate !== null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDate']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['projectDate']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['projectDate']: projectDate,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDate']: 'Please provide project date',
        }));
      }

      if (projectBudget !== null) {
        // let budgetArr = projectBudget.split('-');
        let enteredBudget = budgetValue.current.value;
        if (enteredBudget && enteredBudget !== '') {
          setErrorMessage((prevState) => ({
            ...prevState,
            ['budget']: null,
          }));
          setValid((prevState) => ({
            ...prevState,
            ['budget']: true,
          }));
        }
        setProjectData((prevState) => ({
          ...prevState,
          ['budget']: enteredBudget,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['budget']: 'Please provide project budget',
        }));
      }
      if (isValid.location && isValid.projectDate && isValid.projectBudget) {
        setProgress((prev) => prev + 1);
      }
    }

    if (progress === 3) {
      if (projectDescription !== null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDescription']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['projectDescription']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['projectDescription']: projectDescription,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDescription']: 'Please provide project description',
        }));
      }

      if (isValid.projectDescription) {
        setProgress((prev) => prev + 1);
      }
    }

    if (progress === 4) {
      let enteredDeliverables = deliverablesInputRef.current.value;
      let enteredDeliveryDays = deliveryDaysInputRef.current.value;

      if (enteredDeliverables && enteredDeliverables !== '') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliverables']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['deliverables']: true,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliverables']: 'Please provide number of deliverables',
        }));
      }

      if (enteredDeliveryDays && enteredDeliveryDays !== '') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliveryDays']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['deliveryDays']: true,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliveryDays']: 'Please provide delivery days',
        }));
      }
    }

    setProjectData((prevState) => ({
      ...prevState,
      ['upgrades']: { featured: featured, urgent: urgent },
    }));
  };
  const titleInputRef = useRef();
  const budgetValue = useRef();
  const deliverablesInputRef = useRef();
  const deliveryDaysInputRef = useRef();
  const { featured, urgent } = upgrades;

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitLoader(true);
    // await uploadFiles(dataForm)
    // .then((res) => {
    //   // setLoading(false);
    //   if (res.status) {
    //     const url = res.data.data[0].url;
    //     setImageUrl(url);
    //   }
    // });
    if (
      isValid.title
      // isValid.budget
      // isValid.category &&
      // isValid.location &&
      // isValid.projectDate &&
      // isValid.projectBudget &&
      // isValid.projectDescription &&
      // isValid.deliverables &&
      // isValid.deliveryDays
    ) {
      /********************ACCOUNTTYPE_AND_LOGIN_CHECK*****************/
      const clientId = localStorage.getItem('hinyn-cid');
      const ClientData = {
        id: clientId,
      };
      const getMyData = async () => {
        if (clientId) {
          const Data = await getClientData(ClientData);
          console.log(Data.data.data.attributes.accountType, 'MYDATA');
          const TYPE = Data.data.data.attributes.accountType;
          const bidData = {
            title: projectData?.title,
            description: projectData?.projectDescription,
            minBudget: 0,
            status: 1,
            city: selectedCity?.id,
            // country: [],
            // genders: selectedGender,
            // age_ranges: ageGroup?.title,
            // languages: selectedLanguages,
            // minBudget: projectData.projectBudget[0],/
            // deliveryDate: projectData.projectDate,
            // maxBudget:
            //   projectData.projectBudget.length > 1
            //     ? projectData.projectBudget[1]
            //     : '',
            maxBudget: projectData?.budget,
            numDeliverables: projectData?.deliverables,
            deliveryDays: projectData?.deliveryDays,

            isFeatured: true,
            isUrgent: true,
            categories: [selectedCategory?.id],
            skills: selectedSkill,
            client: clientId,
          };
          setData(bidData);
          localStorage.setItem('projectFormData', JSON.stringify(bidData));
          console.log('Data', bidData);
          setSubmitLoader(false);
          // if (TYPE && TYPE === 2) {
          //   console.log('YEPPPPP!!');
          //   addBidData(bidData).then((res) => {
          //     console.log('hasid');
          //     if (res.status === true) {
          //       console.log('bid done');
          //       const bidId = res.data.id;
          //       console.log(res.data.id);
          //       if (bidId) {
          //         const Data = {
          //           bid: bidId,
          //         };
          //         paymentForBid(Data).then((res) => {
          //           if (res) {
          //             // setSubmitLoader(false);
          //             console.log('payment', res.data.data.paymentUrl);
          //             const URL = res.data.data.paymentUrl;
          //             // window.location.href = URL;
          //             window.location.href = URL;
          //           }
          //         });
          //       }
          //       // handleNextClick(res.data.id);
          //     }
          //   });
          // } else {
          //   setSubmitLoader(false);
          //   setOpenOnlyClient(true);
          // }
        } else {
          setSubmitLoader(false);
          setOpenForm(true);
        }
      };
      getMyData();
      /***********************FORM_DATA*****************************/
    } else {
      setOpen(true);
      setSubmitLoader(false);
    }
  };
  // const handleSkillsChange2 = (value, id) => {
  //   console.log(value, 'value');
  //   setSelectedSkill(() => id);
  //   // setSelectedSkillId(() => value.id);
  // };
  const handleSkillsChange = (value) => {
    console.log(value, 'value');
    setSelectedSkill(() => value);
    // setSelectedSkillId(() => value.id);
  };
  const handleCategoryChange = (index) => {
    setSelectedSkill([]);
    console.log(index, 'indexa@@@@');
    if (categories) {
      console.log(categories, 'YEp');
      setSelectedCategory(categories[index]);
      // setSelectedCategory2(categories[index]?.title);
      console.log(categories[index], 'a');
    }
    setSelectedSkills(null);
    let listSkill = [];
    categories[index]?.skills.data.map((item) => {
      let temp = { id: item.id, ...item.attributes };
      listSkill = [...listSkill, { ...temp }];
    });
    setSkills(listSkill);
  };
  const handleCategoryChange2 = (index, categories) => {
    console.log(index, 'indexa');
    if (categories) {
      console.log(categories);
      setSelectedCategory(categories[index]);
      // setSelectedCategory2(categories[index]?.title);
      console.log(categories[index], 'a');
    }
    let listSkill = [];
    categories[index]?.skills.data.map((item) => {
      let temp = { id: item.id, ...item.attributes };
      listSkill = [...listSkill, { ...temp }];
    });
    setSkills(listSkill);
  };
  const progress1 = () => {
    const toggleCategoryActiveState = (index) => {
      setSelectedSkill([]);
      const updatedActiveStates = Array(categories.length).fill(false);
      updatedActiveStates[index] = true;
      setActiveStates(updatedActiveStates);
      console.log(updatedActiveStates, 'sd');
      handleCategoryChange(index);
    };
    return (
      <>
        <Text size="large">
          <b>Choose a name for your project</b>
        </Text>
        <Grid item xs={12}>
          <StyledTextField
            required
            fullWidth
            id="title"
            name="title"
            placeholder="example: Portrait photographer for a photoshoot"
            inputRef={titleInputRef}
            onKeyUp={(e) => {
              setErrorMessage((prevState) => ({
                ...prevState,
                ['title']: null,
              }));
              setValid((prevState) => ({
                ...prevState,
                ['title']: true,
              }));
              setProjectData((prevState) => ({
                ...prevState,
                ['title']: e.target.value,
              }));
            }}
          />
          {errorMessage.title && <Error>{errorMessage.title}</Error>}
        </Grid>
        <VerticalDivider />
        <Text size="large">
          <b>Tell us the type of professional you&apos;ll need</b>
        </Text>
        <Grid item xs={12}>
          <CategoriesList>
            {categories.map((category, id) => {
              return category?.slug !== 'all' ? (
                <CategoryItem
                  key={'category-item-' + id}
                  // className={color === true ? 'active' : ''}
                  // onClick={() => setColor(!color)}
                  className={activeStates[id] ? 'active' : ''}
                  onClick={() => toggleCategoryActiveState(id)}
                >
                  <ImageContainer className="icon-img-box">
                    <Image
                      src={imgsrc + category.icon}
                      layout="fill"
                      className="icon-img"
                      alt="icon-img"
                    />
                  </ImageContainer>
                  <GrayText component="span">{category.title}</GrayText>
                </CategoryItem>
              ) : null;
            })}
          </CategoriesList>
          {errorMessage.category && <Error>{errorMessage.category}</Error>}
        </Grid>

        <VerticalDivider />
        <Text size="large">
          <b>What skills are required?</b>
        </Text>
        <Text marginY="10px">
          We&apos;ve detected the following skills to suit your project. Feel
          free to modify these choices to best suit your needs.
        </Text>
        <Grid item xs={12}>
          <CustomDropdownSkill
            hasLabel={false}
            items={skills}
            width="100%"
            type="outlined"
            setHandleOnChange={handleSkillsChange}
            selected={selectedSkill}
            color="red"
            defaultLabel="Select Skill"
          />
          {/* <Field>
            {selectedSkills.map((skill, index) => (
              <SkillsItem key={index} className="skill-item">
                {skill.title}
              </SkillsItem>
            ))}
          </Field> */}
          {/* {errorMessage.ageGroup && <Error>{errorMessage.ageGroup}</Error>} */}
        </Grid>
        {/* start of gender */}
        {genderReq === true ? (
          <>
            <VerticalDivider />
            <Text size="large">
              <b>Select the gender of the professional you&apos;ll need</b>
            </Text>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex' }}>
                <CustomTab
                  className={selectedGender === 'male' ? 'left active' : 'left'}
                  onClick={() => onGenderClick('male')}
                >
                  Male
                </CustomTab>
                <CustomTab
                  className={selectedGender === 'female' ? 'active' : ''}
                  onClick={() => onGenderClick('female')}
                >
                  Female
                </CustomTab>
                <CustomTab
                  className={
                    selectedGender === 'any' ? 'right active' : 'right'
                  }
                  onClick={() => onGenderClick('any')}
                >
                  Any
                </CustomTab>
              </Box>
              {errorMessage.category && <Error>{errorMessage.category}</Error>}
            </Grid>
          </>
        ) : null}
        {/* start of age */}
        <VerticalDivider />
        {ageReq === true ? (
          <>
            <Text size="large">
              <b>Select the age of the professional you&apos;ll need</b>
            </Text>
            <Grid item xs={12}>
              <CustomDropdown
                hasLabel={false}
                items={ageGroupOptions}
                width="100%"
                type="outlined"
                typology="okok"
                selected={ageGroup}
                setHandleOnChange={onChangeAgeGroup}
                color={'red'}
              />
              {errorMessage.ageGroup && <Error>{errorMessage.ageGroup}</Error>}
            </Grid>
          </>
        ) : null}
        {model ? (
          <>
            <VerticalDivider />
            <Text size="large">
              <b>Select Ethnicity of Model you need</b>
            </Text>
            <Grid item xs={12}>
              <CustomDropdown
                hasLabel={false}
                items={ethnicity}
                width="100%"
                type="outlined"
                typology="okok"
                selected={selectedEthnicity}
                setHandleOnChange={onChangeEthnicity}
                color={'red'}
              />
            </Grid>
          </>
        ) : null}
        <VerticalDivider />
        <Grid item xs={12}>
          <Text size="large">
            <b>Language</b>
          </Text>
          <Typography component="p" align="left" marginY="10px">
            Select the language you&apos;ll be needing for this project
          </Typography>
          <SearchContainer>
            <PillsContainer>
              {selectedLanguages.map((language, id) => {
                return (
                  <StyledStaticPill key={'language-' + id}>
                    {language}
                    <StyledCloseIcon
                      variant="red"
                      onClick={() => onLanguageClick(language)}
                    />
                  </StyledStaticPill>
                );
              })}
            </PillsContainer>
            <Autocomplete
              freeSolo
              id="search-language-input"
              disableClearable
              options={languages?.map((language) => language)}
              onChange={onLanguagesSearchChange}
              renderInput={(params) => (
                <SimpleTextField
                  bcolor="white"
                  border="white"
                  {...params}
                  label=""
                  placeholder="Search languages here"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <OutlineSearchIcon className="icon" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </SearchContainer>
        </Grid>
      </>
    );
  };

  const progress2 = () => {
    return (
      <>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text size="large" marginY="6px">
            <b>Tell us where is the location of your project</b>
          </Text>
          <Text size="smd" font="bold">
            Country
          </Text>
          <CountryDropdown
            hasLabel={false}
            items={locations}
            width="100%"
            type="outlined"
            typology="okok"
            selected={selectedCountry}
            setHandleOnChange={onChangeCountry}
            color={'red'}
          />

          {errorMessage.location && <Error>{errorMessage.location}</Error>}
        </Grid>
        {/* <VerticalDivider /> */}
        <Grid item xs={12}>
          <Text size="smd" font="bold">
            City
          </Text>
          <CountryDropdown
            hasLabel={false}
            items={cities}
            width="100%"
            type="outlined"
            typology="okok"
            selected={selectedCity}
            setHandleOnChange={onChangeCity}
            color={'red'}
          />

          {errorMessage.location && <Error>{errorMessage.location}</Error>}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text size="large" marginY="6px">
            <b>Select the day required for your project</b>
          </Text>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label=""
              value={projectDate}
              onChange={checkProjectDate}
              renderInput={(params) => (
                <SimpleTextField
                  border="gray"
                  bcolor="white"
                  radius="less"
                  sx={{ width: '100%' }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          {errorMessage.projectDate && (
            <Error>{errorMessage.projectDate}</Error>
          )}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text size="large" marginY="6px">
            <b>What is your budget?</b>
          </Text>

          <SimpleTextField
            border="gray"
            bcolor="white"
            radius="less"
            label=""
            placeholder="Select budget of Project"
            value={budget}
            inputMode="numeric" // Ensures a numeric keypad on mobile devices
            onChange={(e) => {
              const value = e.target.value;

              // Allow only numbers using regex
              if (/^\d*$/.test(value)) {
                setBudget(value);
                setErrorMessage((prevState) => ({
                  ...prevState,
                  ['budget']: null,
                }));
                setValid((prevState) => ({
                  ...prevState,
                  ['budget']: true,
                }));
                setProjectData((prevState) => ({
                  ...prevState,
                  ['budget']: value,
                }));
              }
            }}
          />
          {errorMessage.projectBudget && (
            <Error>{errorMessage.projectBudget}</Error>
          )}
        </Grid>
      </>
    );
  };

  const progress3 = () => {
    return (
      <>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text size="large" marginY="6px">
            <b>Tell us the story behind your project</b>
          </Text>
          <StyledTextArea
            placeholder="Describe your project"
            id="projectDescription"
            name="projectDescription"
            maxLength={3000}
            onChange={(event) => {
              const { value } = event.target;
              setProjectDescription(() => value);
              if (value) {
                setErrorMessage((prevState) => ({
                  ...prevState,
                  ['projectDescription']: null,
                }));
                setValid((prevState) => ({
                  ...prevState,
                  ['projectDescription']: true,
                }));
                setProjectData((prevState) => ({
                  ...prevState,
                  ['projectDescription']: value,
                }));
              }
            }}
          />
          {errorMessage.projectDescription && (
            <Error>{errorMessage.projectDescription}</Error>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <GrayText>
              <i>Max: 3000 characters</i>
            </GrayText>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Text size="large">
            <b>Upload files</b>
          </Text>
          <Text marginY="6px">
            Drag & drop any images or documents that might be helpful in
            explaining your brief here.
          </Text>
          <UploadButton
            component="label"
            variant="outlined"
            sx={{ marginRight: '1rem' }}
            startIcon={<UploadIcon />}
          >
            <br />
            {filename ? filename : 'Max File Size: 25mb'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileUpload}
              multiple
            />
          </UploadButton>
          {uploadedFiles?.length > 0
            ? uploadedFiles.map((file, idx) => {
                <Text key={'file-upload-' + idx} color="red">
                  Uploaded Files:{file}
                </Text>;
              })
            : null}
          {errorMessage.uploadedFiles && (
            <Error>{errorMessage.uploadedFiles}</Error>
          )}
        </Grid>
      </>
    );
  };

  const progress4 = () => {
    return (
      <>
        {photos === true ? (
          <>
            <VerticalDivider />
            <Grid item xs={12}>
              <Text size="large" marginY="8px">
                <b>Deliverables</b>
              </Text>
              <Text size="smd" font="bold">
                How many {photo} will be delivered in total?
              </Text>
              <SimpleTextField
                border="gray"
                bcolor="white"
                radius="less"
                placeholder="Enter number of days"
                name="deliveryDate"
                inputRef={deliveryDaysInputRef}
                inputMode="numeric" // Shows numeric keypad on mobile devices
                onInput={(e) => {
                  const input = e.target;
                  const value = input.value;

                  // Remove any non-numeric characters
                  const numericValue = value.replace(/[^0-9]/g, '');

                  // Update state with numeric value
                  setProjectData((prevState) => ({
                    ...prevState,
                    ['deliverables']: numericValue,
                  }));

                  // Update validity state
                  setValid((prevState) => ({
                    ...prevState,
                    ['deliverables']: numericValue.length > 0,
                  }));

                  // Set the cleaned value back to the input field
                  input.value = numericValue;
                }}
              />

              {errorMessage.deliverables && (
                <Error>{errorMessage.deliverables}</Error>
              )}
            </Grid>
            <VerticalDivider />
            <Grid item xs={12}>
              <Text size="smd" font="bold">
                How many days for delivery of {photo}?
              </Text>
              <SimpleTextField
                border="gray"
                bcolor="white"
                radius="less"
                placeholder="Enter number of days"
                name="deliveryDate"
                inputRef={deliveryDaysInputRef}
                inputMode="numeric" // Shows numeric keypad on mobile devices
                onInput={(e) => {
                  const input = e.target;
                  const value = input.value;

                  // Remove any non-numeric characters
                  const numericValue = value.replace(/[^0-9]/g, '');

                  // Set the sanitized value back to the input field
                  input.value = numericValue;

                  // Update state with sanitized value
                  setProjectData((prevState) => ({
                    ...prevState,
                    ['deliveryDays']: numericValue,
                  }));

                  // Optionally, update validity state if needed
                  setValid((prevState) => ({
                    ...prevState,
                    ['deliveryDays']: true, // Assuming any input is considered valid
                  }));

                  // Clear error message if any (not necessary in this case as we're not showing errors)
                  setErrorMessage((prevState) => ({
                    ...prevState,
                    ['deliveryDays']: null,
                  }));
                }}
              />

              {errorMessage.deliveryDays && (
                <Error>{errorMessage.deliveryDays}</Error>
              )}
            </Grid>
            <VerticalDivider />
          </>
        ) : null}
        <Grid item xs={12}>
          <Text size="large" marginTop={5}>
            <b>Choose upgrades for your project</b>
          </Text>
          <FormControl
            sx={{ width: '100%' }}
            component="fieldset"
            variant="standard"
          >
            <FormGroup>
              {upgradesData.map((upgrade, idx) => {
                return (
                  <Box
                    key={'upgrades-' + idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '1rem 0',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <FormControlLabel
                        control={
                          <StyledCheckbox
                            checked={
                              upgrade?.key === 'featured' ? featured : urgent
                            }
                            onChange={(e) => {
                              handleUpgradeChange(e);
                            }}
                            name={upgrade?.key}
                          />
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Text color="red">
                          <b>{upgrade?.title}</b>
                        </Text>
                        <Text>{upgrade?.desc}</Text>
                      </Box>
                    </Box>
                    <Text>
                      <b>{upgrade?.price}</b>
                    </Text>
                  </Box>
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </>
    );
  };
  const [currentForm, setCurrentForm] = useState('register');
  const [success, setSuccess] = useState(false);
  const handleClose2 = () => {
    setOpenForm(false);
    setCurrentForm('register');
  };
  const handleSubmit = () => {
    handleClose();
  };
  const openLogin = () => {
    setCurrentForm('login');
  };
  const handleLink = (value) => {
    if (value === 1) {
      window.open('/TermsAndConditions', '_blank');
    } else if (value === 2) {
      window.open('/Privacy', '_blank');
    }
  };
  const handleCloseLogin = () => {
    handleClose2();
    setSuccess(true);
    console.log('yes');
  };
  const closeSuccess = () => {
    setSuccess(false);
  };
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          marginBottom: '2rem',
          marginTop: '5rem',
          background: 'transparent',
        }}
      >
        <CssBaseline />

        <Text align="center" size="xxl" color="white">
          <b>Hey, Tell us what you need!</b>
        </Text>
        <VerticalDivider />
        <Container maxWidth="sm">
          <Text color="white" align="center">
            Contact skilled freelancers within minutes. View profiles, ratings,
            portfolios and chat with them. Pay the freelancer only when you are
            100% staisfied with their work.
          </Text>
        </Container>

        <FormContainer>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container rowSpacing={1} sx={{ marginBottom: '2rem' }}>
              {progress1()}
              {progress2()}
              {progress3()}
              {progress4()}
            </Grid>
          </Box>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}
          >
            {progress ? (
              submitLoader ? (
                <Button width="30%">
                  <CircularProgress size={15} color="inherit" />
                </Button>
              ) : (
                <Button
                  width="30%"
                  onClick={(e) => {
                    handleFormClick();
                    submitHandler(e);
                  }}
                >
                  SUBMIT
                </Button>
              )
            ) : (
              <GreenButton onClick={handleFormClick}>NEXT</GreenButton>
            )}
          </Container>
          {progress ? (
            <Text>
              By clicking submit, you agree to the{' '}
              <Text
                color="red"
                component="span"
                onClick={() => handleLink(1)}
                style={{ cursor: 'pointer' }}
              >
                Terms and Conditions
              </Text>{' '}
              and{' '}
              <Text
                color="red"
                component="span"
                onClick={() => handleLink(2)}
                style={{ cursor: 'pointer' }}
              >
                Privacy Policy
              </Text>{' '}
              of HINYN.
            </Text>
          ) : null}
        </FormContainer>
      </Container>
      <Modal
        handleClose={handleClose2}
        handleSubmit={handleSubmit}
        isOpen={openForm}
        hasHeader={false}
        hasFooter={false}
      >
        {currentForm === 'register' ? (
          <RegistrationForm openLogin={openLogin} data={data} />
        ) : (
          <LoginForPost data={data} closeLogin={handleCloseLogin} />
        )}
      </Modal>
      <Modal
        handleClose={closeSuccess}
        // handleSubmit={handleSubmit}
        isOpen={success}
        hasHeader={false}
        hasFooter={false}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <div
            style={{
              background: '#EAECEE',
              borderRadius: 100,
              width: 70,
              height: 70,
            }}
          >
            <CheckBig variant="green" />
          </div>
          <Text color="red" style={{ fontWeight: 'bold', fontSize: '20px' }}>
            You`ve successfully logged in.
          </Text>
          <Text
            color="grey"
            style={{ width: '80%', textAlign: 'center', fontSize: '14px' }}
          >
            You are logged in! you can now post your project.
          </Text>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 13,
            right: 23,
            cursor: 'pointer',
          }}
          onClick={closeSuccess}
        >
          <CrossForModal />
        </div>
      </Modal>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        Oops! All fields are required.
      </Modal>
      <Modal
        handleClose={handleClose}
        isOpen={openOnlyClient}
        hasHeader={false}
        hasFooter={false}
      >
        <div
          style={{
            position: 'absolute',
            top: 13,
            right: 23,
            cursor: 'pointer',
          }}
          onClick={handleClose}
        >
          <CrossForModal />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}
        >
          {' '}
          Only Client can post project!
        </div>
      </Modal>
    </>
  );
}

export default PostProjectForm2;
