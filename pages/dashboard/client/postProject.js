import { Box, Container } from '@mui/material';
import styled from '@emotion/styled';
import Logo from '../../../components/shared/Logo';
import { useState } from 'react';
import PostProjectForm1 from '../../../components/forms/PostProjectForm1';
import ProjectSuccessPost from '../../../components/section/ProjectSuccessPost';
import Logo3 from '../../../components/shared/Logo3';
import { useRouter } from 'next/router';
export { getServerSideProps } from '../../../src/store';

const MainBox = styled(Box)`
  background: ${(props) =>
    props.bg === 'full'
      ? 'linear-gradient(68deg, #EB4C60 0%, #79222D 100%)'
      : '#EBEBEB'};
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding-bottom: 5%;
  position: relative;
`;

const HeaderBox = styled(Box)`
  height: 35rem;
  width: 100%;
  background: linear-gradient(68deg, #eb4c60 0%, #79222d 100%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
`;

const LogoBox = styled.div`
  position: 'absolute';
  z-index: 2;
`;

const PostProject = () => {
  // const router = useRouter();
  // const { categories, skills, country, city, budget } = router.query;
  const [currentActiveForm, setCurrentActiveForm] = useState(1);
  const [category, setCategory] = useState(null);
  const [id, setId] = useState();
  const handleNextClick = (data) => {
    setCurrentActiveForm((prev) => prev + 1);
    console.log('dfdf', data.title, id);
    setCategory(data);
    setId(data);
  };
  return (
    <MainBox bg={currentActiveForm === 2 ? 'full' : ''}>
      {currentActiveForm === 1 ? <HeaderBox /> : null}
      <Container sx={{ paddingTop: '2rem' }}>
        <LogoBox>
          {' '}
          <Logo3 type="white" />{' '}
        </LogoBox>
      </Container>
      <Container sx={{ position: 'relative' }}>
        {currentActiveForm === 1 ? (
          <Box sx={{ position: 'absolute', left: '0', right: '0' }}>
            <PostProjectForm1
              handleNextClick={handleNextClick}
              // initialData={{ categories, skills, country, city, budget }}
            />{' '}
          </Box>
        ) : null}
        {currentActiveForm === 2 ? (
          <ProjectSuccessPost
            handleNextClick={handleNextClick}
            filterCategory={category}
            bidId={id}
          />
        ) : null}
      </Container>
    </MainBox>
  );
};

export default PostProject;
