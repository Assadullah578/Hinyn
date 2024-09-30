import { Box, Modal } from '@mui/material';
import DashboardHeader from '../../components/section/DashboardHeader';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NewsfeedSection from '../../components/section/NewsfeedSection';
import BrowseProjectsSection from '../../components/section/BrowseProjectsSection';
import MyProjectsSection from '../../components/section/MyProjectsSection';
export { getServerSideProps } from '../../src/store';
import { getClientData } from '../../components/forms/formService';
import ClientProjectsSection from '../../components/section/ClientProjectsSection';
import BrowseFreelancersSection from '../../components/section/BrowseFreelancersSection';

import MyFreelancers from '../../components/section/MyFreelancers';
import Modal2 from '../../components/shared/Modal2';
import { Congrats, CrossForModal } from '../../components/shared/Icon';
import Text from '../../components/shared/Typography';
import withAuth from '../../components/WithAuth';
const Index = () => {
  const router = useRouter();

  const { screen, project, showPopup } = router.query;
  const [currentTab, setCurrentTab] = useState(0);
  const [accountType, setAccountType] = useState(0);
  const [userData, setUserData] = useState();
  const [firstName, setFirstName] = useState();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (project && screen) setCurrentTab(1);
    // if (screen === 'browse') setCurrentTab(2);
    const id = localStorage.getItem('hinyn-cid');
    if (id) {
      getClientData({ id }).then((res) => {
        if (res.data) {
          localStorage.setItem(
            'hinyn-client-profile',
            JSON.stringify(res.data)
          );

          setUserData(res.data.data.attributes);
          setFirstName(res.data.data.attributes.firstName);
          setAccountType(res.data.data.attributes.accountType);
          setIsEmailVerified(res.data.data.attributes.isEmailVerified);
        }
      });
    }
  }, [project, screen]);

  const handleChangeTab = (val) => {
    setCurrentTab(val);
    console.log(val, 'asdsdadsdadsadas');
    // router.push('/dashboard');
  };
  const handleClose = () => {
    setOpen(false);
  };
  const renderScreenSection = (param) => {
    if (accountType === 1) {
      //professional
      switch (currentTab) {
        case 0:
          return <NewsfeedSection accountType={accountType} />;
        case 1:
          return <BrowseProjectsSection mainScreen={screen} />;
        case 2:
          return <MyProjectsSection />;
        default:
          return <NewsfeedSection />;
      }
    } else if (accountType === 2) {
      //client
      switch (currentTab) {
        case 0:
          return <NewsfeedSection accountType={accountType} />;
        case 1:
          if (screen !== 'details') return <BrowseFreelancersSection />;
          return <BrowseProjectsSection mainScreen={screen} />;
        case 3:
          return <ClientProjectsSection />;
        default:
          return <MyFreelancers />;
      }
    }
  };

  return (
    <>
      <Box sx={{ background: '#FFF', height: 'auto', minHeight: '100vh' }}>
        <DashboardHeader
          setTabChange={handleChangeTab}
          currentTab={currentTab}
          account={accountType}
          firstName={firstName}
          isEmailVerified={isEmailVerified}
          userData={userData}
        />
        {renderScreenSection(currentTab)}
        {showPopup ? (
          <Modal2
            handleClose={handleClose}
            isOpen={open}
            hasHeader={false}
            hasFooter={false}
            popupWidth={true}
            Widthmax={true}
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
                  background: '#EAECEE',
                  borderRadius: 100,
                  width: 70,
                  height: 70,
                }}
              >
                <Congrats />
              </div>
              <Text
                color="red"
                style={{ fontWeight: 'bold', fontSize: '30px' }}
              >
                Welcome
              </Text>
              <Text color="grey" style={{ width: '80%', textAlign: 'center' }}>
                Our website connects you with clients arround the world and
                allow you to showcase your skills and build your reputation as a
                professional freelancer.
              </Text>
            </div>
          </Modal2>
        ) : null}
      </Box>
    </>
  );
};

export default withAuth(Index);
