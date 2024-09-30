import styled from '@emotion/styled';
import Button from '../shared/Button';
import SearchBar from '../shared/searchBar/SearchBar';
import { Box } from '@mui/material';
import { FiGlobe } from 'react-icons/fi';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import ExpandedSearchBar from '../shared/searchBar/ExpandedSearchBar';
import RegistrationForm from '../forms/RegistrationForm';
import Modal from '../shared/Modal';
import Logo2 from '../shared/Logo2';
import LoginForm from '../forms/LoginForm';

import { logoutUser } from '../forms/formService';

import { FaBars, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';

const MobileMenuIcon = styled(FaBars)`
  font-size: 24px;
  cursor: pointer;
  @media (min-width: 769px) {
    display: none;
  }

  display: ${(props) => (props.isMobileMenuOpen ? 'none' : 'block')};
`;

const CloseIcon = styled(FaTimes)`
  font-size: 24px;
  cursor: pointer;
  display: ${(props) => (props.isMobileMenuOpen ? 'block' : 'none')};
`;

const CustomGlobeIcon = styled(FiGlobe)`
  margin-top: 4px;
  font-size: 20px;

  &:hover {
    color: #eb4c60;
  }
`;

const CustomBox = styled(Box)`
  box-shadow: 0px 3px 30px #00000029;
  background: #ffffff;
  padding: 1.5rem 7rem;
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  max-height: ${(props) => (props.isExpanded ? '170px' : '90px')};

  // @media (max-width: 768px) {
  //   padding: 1.5rem;
  // }
  width: 100%;
  transition: all 0.5s ease-in-out;
`;
const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  z-index: 10;
  top: 0;
`;
const Head = styled(Container)`
  display: flex;

  grid-template-columns: 1fr 2fr 1fr;
  justify-content: space-between;
  align-items: center;
  height: auto;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const LoginContainer = styled.div`
  display: flex;
  column-gap: 2rem;
  align-items: center;

  justify-content: space-evenly;
  @media (max-width: 768px) {
    display: none;
  }
`;
const LinkText = styled.div`
  cursor: pointer;

  &:hover {
    color: #4aa398;
  }
`;

// const ExpandedSearchBarContainer = styled.div`
//   transition: all 0.5s ease;
// `;

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  // top: 0;
  width: 100%;
  // padding: 6px 0;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background: white;
  border-top: 1px solid #a6a6a6;
`;

const CustomPhoneText = styled.div`
  padding: 18px 30px;
  width: 100%;
  background: lightgray;
  cursor: pointer;
  border-bottom: 1px solid #a6a6a6;
  color: #eb4c60;
`;

const Header2 = ({ categories }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('hinyn-cjwt')) {
      setIsLoggedIn(() => true);
    } else setIsLoggedIn(() => false);
  }, [isLoggedIn]);

  const toggleIsExpanded = () => {
    setIsExpanded(() => !isExpanded);
  };

  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleClose();
  };

  const showForm = (form) => {
    setOpen(true);
    setCurrentForm(form);
  };

  const handleLogging = () => {
    if (isLoggedIn) logoutUser();
    else showForm('login');
    setIsLoggedIn(() => !isLoggedIn);
    return localStorage.getItem('hinyn-cjwt') ? true : false;
  };
  const router = useRouter();
  const handleProfile = () => {
    const cid = localStorage.getItem('hinyn-cid');
    router.push('/dashboard/clientProfile?fid=' + cid);
  };
  const handleCloseExpandedSearchBar = (val) => {
    setIsExpanded(() => val);
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const openLogin = () => {
    setCurrentForm('login');
  };
  return (
    <>
      <ParentContainer>
        <CustomBox isExpanded={isExpanded}>
          <Head>
            <Logo2 />

            {/* </SearchAdjust> */}
            <LoginContainer>
              {isLoggedIn ? (
                ''
              ) : (
                <Button onClick={() => showForm('register')}>
                  Create an account
                </Button>
              )}
              {isLoggedIn ? (
                <>
                  <LinkText onClick={() => handleLogging()}>Logout</LinkText>
                  <LinkText onClick={handleProfile}>My Profile</LinkText>
                </>
              ) : (
                <LinkText onClick={() => handleLogging()}>Login</LinkText>
              )}

              <span>
                <CustomGlobeIcon />
              </span>
            </LoginContainer>
          </Head>

          {isExpanded ? (
            <ExpandedSearchBar
              categories={categories}
              handleCloseExpandedSearchBar={handleCloseExpandedSearchBar}
            />
          ) : null}
        </CustomBox>

        <Modal
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          isOpen={open}
          hasHeader={false}
          hasFooter={false}
        >
          {currentForm === 'register' ? (
            <RegistrationForm openLogin={openLogin} />
          ) : (
            <LoginForm />
          )}
        </Modal>
      </ParentContainer>

      {isMobileMenuOpen && (
        <MobileMenuContainer id="mobileMenuContainer">
          <CustomPhoneText onClick={() => showForm('register')}>
            Create an account
          </CustomPhoneText>
          <CustomPhoneText onClick={() => showForm('login')}>
            Login
          </CustomPhoneText>
        </MobileMenuContainer>
      )}
    </>
  );
};

export default Header2;
