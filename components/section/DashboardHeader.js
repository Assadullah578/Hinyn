import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import LogoDash from '../shared/LogoDash';
import Logo2 from '../shared/Logo2';
import { BellIcon, ChatIcon, CloseIconCircle, EmailIcon } from '../shared/Icon';
import Button, { ButtonSmall } from '../shared/Button';
import Text from '../shared/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  getClientData,
  getMessages,
  getMyMessages,
  getStrapiMedia,
  getUserWallet,
  getWallet,
  logoutUser,
  resendEmail,
} from '../forms/formService';
// import { getLoggedInUserData } from '../forms/formService';
import { FaBars, FaTimes } from 'react-icons/fa';
import ModalChat from '../shared/ModalChat';
import ChatContent from '../shared/chatContent/ChatContent';
import { BiSolidNotification } from 'react-icons/bi';
const CustomBox = styled(Box)`
  box-shadow: 0px 3px 6px #00000029;
  background: #ebebeb;
  height: auto;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
const Head = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: ${(props) => (props.account == 1 ? '93%' : '85%')};
`;
const LoginContainer = styled.div`
  display: flex;
  column-gap: ${(props) => (props.account == 1 ? '1rem' : '2.4rem')};
  align-items: center;
  padding-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const LoginHoverBox = styled.div`
  background: white;
  position: absolute;
  top: 100%;
  width: 16rem;
  visibility: ${(props) => (props.hover ? '' : 'hidden')};
  opacity: ${(props) => (props.hover ? '1' : '0.6')};
  transition: 0.3s;
  padding: 2px 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 30px;
  bottom: -1rem;
  position: relative;
  margin-left: 2rem;
  @media (max-width: 769px) {
    position: fixed;
    display: flex;
    justify-content: center;
    padding-horizontal: auto;

    background: white;
    width: 100%;
    z-index: 1000;
    bottom: 0;
    margin: 0;
  }
`;

const TabItem = styled.div`
  cursor: pointer;

  &.active {
    color: ${(props) => (props.account === 1 ? '#4AA398' : '#ff5a5f')};
    border-bottom: 3px solid
      ${(props) => (props.account === 1 ? '#4AA398' : '#ff5a5f')};
  }
  @media (max-width: 769px) {
    padding: ${(props) => (props.account === 1 ? '13px 20px' : '13px 0')};
    border: none;

    &.active {
      font-weight: bold;
      border-top: 3px solid
        ${(props) => (props.account === 1 ? '#4AA398' : '#ff5a5f')};
      color: ${(props) => (props.account === 1 ? '#4AA398' : '#ff5a5f')};
    }
  }
`;

const ImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  position: relative;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;
const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const TopBar = styled.div`
  background: #4aa398;
  height: 50px;
  padding: 0 8rem;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Text1 = styled.div`
  color: white;
  font-size: 12.5px;
  margin-left: 8px;
`;
const Text2 = styled.div`
  color: white;
  font-size: 10px;
  margin: 2px 27px;
`;
const Text3 = styled.div`
  color: white;
  font-size: 10px;
  padding: 9px 25px;
  border: 1px solid white;
  border-radius: 40px;
`;
const Text3Con = styled.div`
  margin: auto;
  cursor: pointer;
`;
const StyledCloseIcon = styled(CloseIconCircle)`
  color: #525252;
  font-size: 25px;
  cursor: pointer;
  margin: auto 20px;
`;
const Box2 = styled.div`
  display: flex;
  align-items: center;
`;
const Box3 = styled.div`
  display: flex;
`;

const CustomText = styled.div`
  padding: 13px 20px;
  color: ${(props) => (props.hovered ? '#eb4c60' : '')};
  background: ${(props) => (props.hovered ? '#f5f5f5' : 'transparent')};
  transition: color 0.3s, background 0.3s;

  &:hover {
    color: #eb4c60;
    background: #ffedef;
    cursor: pointer;
  }
`;
const Line = styled.div`
  width: 100%;
  background: ${(props) => (props.account === 1 ? '#4AA398' : '#eb4c60')};
  height: 3px;
`;
const Line2 = styled.div`
  width: 70%;
  background: #eb4c60;
  height: 0.5px;
  opacity: 0.3;
  margin: auto;
`;
const MobileMenuIcon = styled(FaBars)`
  font-size: 24px;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none; // Hide the icon on larger screens
  }
`;
const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  // top: 0;
  right: 0;
  width: 45%;
  padding: 1px 0 10px 0;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background: white;
  border-top: 1px solid #a6a6a6;
  @media (min-width: 769px) {
    display: none;
  }
`;

// const CustomPhoneText = styled.div`
//   padding: 18px 30px;
//   width: 100%;
//   background: #ebebeb;
//   cursor: pointer;
//   color: #4aa398;
// `;
// const LinkText = styled.div`
//   cursor: pointer;

//   &:hover {
//     color: #4aa398;
//   }
// `;
const BurgerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 769px) {
    display: none;
  }
`;
const BoxCon = styled.div`
  display: flex;
  gap: 3rem;
  @media (max-width: 769px) {
    display: none;
  }
`;
const CloseIcon = styled(FaTimes)`
  font-size: 24px;
  cursor: pointer;
  display: ${(props) => (props.isMobileMenuOpen ? 'block' : 'none')};
`;
const BoxCustom = styled.div`
  width: 100%;
`;
const BottomTabs = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;
const HoverDiv = styled.div`
  background-color: white;
  padding: 3px 12px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffedef;
    color: #eb4c60;
  }
`;
const ListDiv = styled.div`
  /* margin-left: ${(props) => (props.account === 2 ? '65%' : '75%')}; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100000;
  top: 4rem;
  position: absolute;
  font-size: 14px;

  @media (max-width: 769px) {
    right: 2rem;
  }
`;

function DashboardHeader({
  currentTab,
  setTabChange,
  account,
  firstName,
  isEmailVerified,
  userData,
}) {
  let imgPath = '/assets/img/avatars/';
  const [wallet, setWallet] = useState([]);
  const [hover, setHover] = useState(false);
  const [displayPhoto2, setDisplayPhoto2] = useState(null);
  const router = useRouter();

  const showUserProfile = () => {
    if (account === 1) router.push('/dashboard/professionalProfile?val=' + 0);
    else router.push('/dashboard/clientProfile');
  };
  const showSettings = () => {
    router.push('/dashboard/professionalProfile?val=' + 1);
  };
  const showWallet = () => {
    router.push('/dashboard/professionalProfile?val=' + 2);
  };

  const loginHover = () => {
    setHover(true);
  };

  const loginHoverOut = () => {
    setHover(false);
  };
  // const showBrowseProjects = () => {
  //   router.push('/dashboard?screen=browse');
  // };

  const showPostProject = () => {
    router.push('/dashboard/client/postProject');
  };

  const handleLogoutUser = () => {
    logoutUser();
    router.push('/');
  };

  const professionalTabs = ['Dashboard', 'Browse', 'My Projects'];

  const clientTabs = ['Dashboard', 'Browse', 'My Freelancers', 'My Projects'];

  const showTabs = (account) => {
    const tabs =
      account === 1
        ? professionalTabs
        : account === 2
        ? clientTabs
        : clientTabs;

    return (
      <Tabs>
        {tabs.map((tabName, idx) => (
          <TabItem
            key={'tab-' + idx}
            account={account} // Pass the account prop here
            className={idx === currentTab ? 'active' : ''}
            onClick={() => setTabChange(idx)}
          >
            {tabName}
          </TabItem>
        ))}
      </Tabs>
    );
  };

  const showCTAButton = () => {
    if (account === 1) '';
    else
      return (
        <ButtonSmall width="11rem" onClick={() => showPostProject()}>
          Post a Project
        </ButtonSmall>
      );
  };
  const showCTAButtonSmall = () => {
    if (account === 1) '';
    else
      return (
        <ButtonSmall width="9rem" onClick={() => showPostProject()}>
          Post a Project
        </ButtonSmall>
      );
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [openChat, setOpenChat] = useState(false);
  const [chatList, setChatList] = useState(false);

  const [senderId, setSenderId] = useState();

  const [unread, setUnread] = useState(false);
  const [name, setName] = useState();
  const [chat, setChat] = useState([]);
  const clientId =
    typeof window !== 'undefined' ? localStorage.getItem('hinyn-cid') : null;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const Wallet = async () => {
    await getUserWallet(clientId).then((res) => {
      if (res) {
        const temp = res.data.data;
        setWallet(temp[0]?.attributes?.balance);
        // console.log(temp[0].attributes.balance);
      }
    });
  };
  const requestData = async () => {
    await getMessages().then((res) => {
      if (res?.data?.data) {
        let temp = res?.data?.data;

        if (temp) {
          const newChat = temp
            .filter((item) => item.attributes?.recipient?.data?.id == clientId)
            .map((item) => ({ ...item }));
          setChat(() => [...newChat]);
          {
            chat !== null ? setUnread(true) : setUnread(false);
          }
        }
      }
    });
  };
  const getUserData = async () => {
    const id2 = localStorage.getItem('hinyn-cid');
    const clientData = {
      id: id2,
    };
    await getClientData(clientData).then((res) => {
      if (res.status) {
        console.log(res.data.data.attributes.displayPhoto, '??');
        setDisplayPhoto2(res.data.data.attributes.displayPhoto);
      }
    }, []);
  };
  useEffect(() => {
    Wallet();
    requestData();
    getUserData();
    // console.log('klkl', userData.isEmailVerified);
  }, []);

  const handleCloseMessage = () => {
    setOpenChat(false);
  };
  const handleChatID = (chatid, name) => {
    setSenderId(chatid);
    setName(name);
    setOpenChat(true);
  };
  const toggleChatList = () => {
    // setChatList(!chatList);
    router.push('/dashboard/professionalProfile?val=' + 4);
  };
  const [closeEmail, setCloseEmail] = useState(false);
  const handleResend = () => {
    const id = localStorage.getItem('hinyn-uid');
    resendEmail(id).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      {currentTab == 0 && isEmailVerified === false && closeEmail === false ? (
        <TopBar>
          <Box display="flex" justifyContent="space-between">
            <Box padding="10px">
              <Box2>
                <EmailIcon color="white" fontSize="20px" />
                <Text1>Email verification required</Text1>
              </Box2>
              <Text2>
                To activate your account, please verify your email adresss
                {/* on the Emial 
                we sent to
                <span>samantha12@gmail.com</span> */}
              </Text2>
            </Box>
            <Box3>
              <Text3Con onClick={handleResend}>
                <Text3>Resend Email</Text3>
              </Text3Con>

              <StyledCloseIcon
                color="white"
                onClick={() => setCloseEmail(true)}
              />
            </Box3>
          </Box>
        </TopBar>
      ) : null}
      <CustomBox>
        <Head>
          <BoxCustom>
            <BurgerHeader>
              <LogoDash />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  position: 'relative',
                }}
              >
                {showCTAButtonSmall()}
                <div
                  onClick={toggleChatList}
                  style={{ cursor: 'pointer', marginTop: 3 }}
                >
                  {unread ? (
                    <BiSolidNotification
                      size="23px"
                      color={account === 2 ? '#EB4C60' : '#4AA398'}
                    />
                  ) : (
                    <ChatIcon />
                  )}
                  {chatList && (
                    <ListDiv account={account === 1}>
                      <Line></Line>
                      {chat ? (
                        <div>
                          {chat.map((itm, index) => (
                            <HoverDiv key={index}>
                              <div
                                style={{ padding: 4, cursor: 'pointer' }}
                                onClick={() =>
                                  handleChatID(
                                    itm.attributes?.sender?.data?.id,
                                    itm.attributes?.sender?.data?.attributes
                                      ?.firstName
                                  )
                                }
                              >
                                {
                                  itm.attributes?.sender?.data?.attributes
                                    ?.firstName
                                }
                              </div>
                            </HoverDiv>
                          ))}
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: 'white',
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          <Line></Line>
                          <div style={{ color: '#EB4C60', fontWeight: 'bold' }}>
                            No Messages Yet!
                          </div>
                        </div>
                      )}
                    </ListDiv>
                  )}
                </div>
                {isMobileMenuOpen ? (
                  <CloseIcon
                    onClick={closeMobileMenu}
                    isMobileMenuOpen={isMobileMenuOpen}
                  />
                ) : (
                  <MobileMenuIcon
                    onClick={handleMobileMenuToggle}
                    isMobileMenuOpen={isMobileMenuOpen}
                  />
                )}
              </div>
            </BurgerHeader>
            <BoxCon>
              <LogoDash />
              {showTabs(account)}
            </BoxCon>
          </BoxCustom>
          <LoginContainer>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                gap: '20px',
                paddingRight: '20px',
                borderRight: '2px solid #E3E3E3',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '20px',
                  gap: '20px',
                  position: 'relative',
                }}
              >
                <BellIcon />
                <div
                  onClick={toggleChatList}
                  style={{ cursor: 'pointer', marginTop: 3 }}
                >
                  {unread ? (
                    <ChatIcon
                    // size="18px"
                    // color={account === 2 ? '#EB4C60' : '#4AA398'}
                    />
                  ) : (
                    <ChatIcon />
                  )}
                </div>

                {chatList && (
                  <ListDiv account={account}>
                    <Line></Line>
                    {chat ? (
                      <div>
                        {chat.map((itm, index) => (
                          <HoverDiv key={index}>
                            <div
                              style={{ padding: 4, cursor: 'pointer' }}
                              onClick={() =>
                                handleChatID(
                                  itm.attributes?.sender?.data?.id,
                                  itm.attributes?.sender?.data?.attributes
                                    ?.firstName
                                )
                              }
                            >
                              {
                                itm.attributes?.sender?.data?.attributes
                                  ?.firstName
                              }
                            </div>
                          </HoverDiv>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: 'white',
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                      >
                        <Line></Line>
                        <div style={{ color: '#EB4C60', fontWeight: 'bold' }}>
                          No Messages Yet!
                        </div>
                      </div>
                    )}
                  </ListDiv>
                )}
              </Box>
            </Box>

            {showCTAButton()}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
                marginLeft: '26px',
              }}
              onMouseEnter={loginHover}
              onMouseLeave={loginHoverOut}
            >
              <ImageContainer>
                {/* <div>{userData?.displayPhoto}</div> */}
                <StyledImage
                  src={
                    displayPhoto2
                      ? getStrapiMedia(displayPhoto2)
                      : imgPath + 'avataruser-1.jpg'
                  }
                  layout="fill"
                  alt="Profile picture"
                />
              </ImageContainer>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '8rem',
                }}
              >
                <Text color="green">
                  <b> Hi, {firstName}!</b>
                </Text>
                {account == 1 ? (
                  <Text>{wallet ? wallet : 0}.00 AED</Text>
                ) : null}
              </Box>
              {/******************************HOVER PROFILE *********************************/}
              <LoginHoverBox hover={hover}>
                <Line></Line>
                <a onClick={showUserProfile}>
                  <CustomText hover={hover}>Profile</CustomText>
                </a>

                <CustomText hover={hover} onClick={showSettings}>
                  Settings
                </CustomText>
                {account === 1 ? (
                  <CustomText hover={hover} onClick={showWallet}>
                    Wallet
                  </CustomText>
                ) : null}
                <CustomText hover={hover}>Support</CustomText>
                <Line2></Line2>
                <a onClick={handleLogoutUser}>
                  <CustomText hover={hover}>Logout</CustomText>
                </a>
              </LoginHoverBox>
            </Box>
          </LoginContainer>
        </Head>
      </CustomBox>
      {/*****************************CHAT MODAL *********************************/}
      <ModalChat
        handleClose={handleCloseMessage}
        isOpen={openChat}
        hasHeader={false}
        hasFooter={false}
        Widthmax={true}
      >
        <ChatContent
          clientid={clientId}
          filtered={chat}
          chatId={senderId}
          name={name}
        />
      </ModalChat>
      {/******************************MOBILE MENU *********************************/}
      {isMobileMenuOpen ? (
        <MobileMenuContainer id="mobileMenuContainer">
          <Box
            onClick={showUserProfile}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              cursor: 'pointer',
              marginY: '13px',
            }}
          >
            <ImageContainer>
              <StyledImage
                src={
                  userData?.displayPhoto
                    ? getStrapiMedia(userData.displayPhoto)
                    : imgPath + 'avataruser-1.jpg'
                }
                layout="fill"
                alt="icon-img"
              />
            </ImageContainer>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '8rem',
              }}
            >
              <Text color={account === 1 ? 'green' : 'red'}>
                <b> Hi, {userData?.firstName}!</b>
              </Text>
              <Text>
                {userData?.cash?.toLocaleString() ?? ''} {'$0.0 AED'}
              </Text>
            </Box>
          </Box>

          <Line></Line>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            <CustomText onClick={showSettings}>Settings</CustomText>
            <CustomText onClick={showWallet}>Wallet</CustomText>
            <CustomText>Support</CustomText>
            <Line2></Line2>
            <a onClick={handleLogoutUser}>
              <CustomText>Logout</CustomText>
            </a>
          </div>
        </MobileMenuContainer>
      ) : (
        ''
      )}
      <BottomTabs>{showTabs(account)}</BottomTabs>
    </>
  );
}

export default DashboardHeader;
