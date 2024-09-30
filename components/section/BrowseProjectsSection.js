import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import AllProjectsSection from './AllProjectsSection';
import ProjectDetailsSection from './ProjectDetailsSection';

export const SCREENS = {
  list: 'list',
  details: 'details',
};
const BrowseProjectsSection = ({ mainScreen }) => {
  const router = useRouter();
  const { projectId } = router.query;

  const [currentScreen, setCurrentScreen] = useState(SCREENS.list);

  useEffect(() => {
    // console.log('id', projectId);
    if (mainScreen === SCREENS.details) setCurrentScreen(() => SCREENS.details);
    else setCurrentScreen(() => SCREENS.list);
  });

  const handleScreenChange = (screen) => {
    setCurrentScreen(() => screen);
  };

  return (
    <Box sx={{ background: 'green', height: 'auto' }}>
      {currentScreen === SCREENS.list ? (
        <AllProjectsSection handleScreenChange={handleScreenChange} />
      ) : (
        <ProjectDetailsSection projectId={projectId} />
      )}
    </Box>
  );
};

export default BrowseProjectsSection;
