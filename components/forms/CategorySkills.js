import { useEffect, useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Container,
  InputAdornment,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { SearchIcon } from '../shared/Icon';
import ScrollableTable from '../shared/ScrollableTable';
import { getCategories, getSkills } from './formService';
import ScrollableTable2 from '../shared/ScrollableTable2';

const StyledButton = styled(Button)``;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const ORLine = styled.div`
  color: #b7b7b7;
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  align-items: center;
  text-align: center;
`;

const HR = styled.div`
  border-bottom: 1px solid #b7b7b750;
`;

const GridDiv = styled.div`
  /* margin-top: 2rem; */
  /* width: 100%; */
  display: flex;
  /* background-color: red; */
  margin: 0 2rem;
  gap: 1.5rem;
  justify-content: center;
  @media (max-width: 440px) {
    flex-direction: column;
  }
  /* justify-content: end; */
`;
const Div = styled.div`
  /* background-color: red; */
  /* margin: 0 8rem; */
  margin-top: 1.5rem;
  margin-left: 21vw;
  @media (max-width: 440px) {
    margin-left: 17rem;
    margin-bottom: 2rem;
  }
  /* align-self: flex-end; */
  /* display: flex; */
`;
const GridDiv2 = styled.div``;
const GridDiv3 = styled.div`
  @media (max-width: 440px) {
    /* display: flex;
    flex-direction: column; */
  }
`;
const SelectedDiv = styled.div`
  @media (max-width: 440px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
function CategorySkills({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [categorySkills, setCategorySkills] = useState();

  useEffect(() => {
    let catList = [];

    getCategories().then((result) => {
      if (result?.data) {
        result.data.data.map((item) => {
          let temp = { id: item.id, ...item.attributes };
          catList = [...catList, { ...temp }];
        });

        // Sort the categories by orderNumber
        catList.sort((a, b) => a.orderNumber - b.orderNumber);

        setCategories(catList);
      }
    });
  }, []);

  const onCategoryClick = (index) => {
    const category = categories[index];
    const isSelected = selectedCategories.includes(category);

    if (isSelected) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }

    let listSkill = [];
    categories[index]?.skills.data.map((item) => {
      let temp = { id: item.id, ...item.attributes };
      listSkill = [...listSkill, { ...temp }];
    });
    setSkills(listSkill);
  };

  const onSkillClick = (selectedSkill) => {
    const skillIndex = selectedSkills.indexOf(selectedSkill);

    if (skillIndex !== -1) {
      const updatedSkills = [...selectedSkills];
      updatedSkills.splice(skillIndex, 1);
      setSelectedSkills(updatedSkills);
    } else {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  };

  const onSkillRemove = (skillToRemove) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };
  const onCategoryRemove = (catToRemove) => {
    setSelectedCategories((prevSkills) =>
      prevSkills.filter((skill) => skill !== catToRemove)
    );
  };
  const [isValid, setValid] = useState({
    category: false,
    form: true,
  });
  const [errorMessage, setErrorMessage] = useState({
    category: null,
  });
  const categoryInputRef = useRef();

  function submitHandler(event) {
    if (selectedCategories.length && selectedSkills.length) {
      const data = {
        categories: selectedCategories,
        skills: selectedSkills.map((skill) => skill.id),
      };
      console.log(data);
      handleNextClick(data);
    }
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ marginBottom: '5.2rem', marginTop: '2rem' }}
      >
        <CssBaseline />
        <FormContainer>
          <Text size="xxl">
            <b>Tell us what you do</b>
          </Text>
          <Text align="center">
            Tell us your top skills. This helps us recommend jobs for you.
          </Text>

          {/* <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  fullWidth
                  id="category"
                  name="category"
                  placeholder='Try "photography"'
                  // inputRef={categoryInputRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon variant="gray" siz="large" />
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage.firstname && (
                  <Error>{errorMessage.firstname}</Error>
                )}
              </Grid>
            </Grid>
            <ORLine>
              <HR />
              or
              <HR />
            </ORLine>
          </Box> */}
        </FormContainer>
      </Container>
      {/* <Container maxWidth="2xl"> */}
      <GridDiv
      // container
      // spacing={2}
      // sx={{ marginBottom: '2rem', background: 'red' }}
      >
        <GridDiv2>
          <ScrollableTable
            data={categories}
            title="Select a Category"
            startAdornment={'icon'}
            endAdornment={'right-arrow'}
            type="categories"
            onCategoryClick={onCategoryClick}
            selectedCategories={selectedCategories}
          />
        </GridDiv2>
        <GridDiv2>
          <ScrollableTable
            data={skills}
            title="Select Skills for Category"
            type="category_skills"
            category={selectedCategories}
            endAdornment={'add-icon'}
            onSkillClick={onSkillClick}
            selectedSkills={selectedSkills}
          />
        </GridDiv2>
        <GridDiv3>
          <SelectedDiv>
            {/* <ScrollableTable2
              data={selectedSkills}
              title={selectedSkills.length}
              endAdornment={'cross-icon'}
              onSkillRemove={onSkillRemove}
              text={'skills Selected'}
            /> */}
            <ScrollableTable2
              data={selectedCategories}
              data2={selectedSkills}
              title={selectedCategories.length}
              endAdornment={'cross-icon'}
              onCategoryRemove={onCategoryRemove}
              text={'Selected Values'}
              onSkillRemove={onSkillRemove}
            />
          </SelectedDiv>
          <Div>
            <StyledButton onClick={submitHandler}>NEXT</StyledButton>
          </Div>
        </GridDiv3>
      </GridDiv>
      {/* </Container> */}

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <div>Oops! All fields are required.</div>
      </Modal>
    </>
  );
}

export default CategorySkills;
