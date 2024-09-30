import React, { useState, useEffect, useRef } from 'react';
// import styled from '@emotion/styled';
import styled from '@emotion/styled';
import ChatItem from './ChatItem';
import { AddIcon, SendIcon } from '../Icon';
import { addMessages, getChat, getMessages } from '../../forms/formService';
import Image from 'next/image';

const MainChatContent = styled.div`
  height: 90vh;

  background-color: #f3f3f3;
`;

const ContentHeader = styled.div`
  background: #d7dbdd;
  border-bottom: 1px solid #ebe7fb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CurrentChattingUser = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const CurrentChattingUserP = styled.p`
  margin: 0;
  font-weight: 600;
  padding: 0 20px;
  font-size: 20px;
`;

const ContentBody = styled.div`
  width: 100%;

  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the track */
  }

  &::-webkit-scrollbar-thumb {
    background: grey; /* Color of the scrollbar */
    border-radius: 10px; /* Rounded corners */
  }
  height: 72vh;
`;

const ChatItemWrapper = styled.div`
  margin: 2px 0 4.4rem 0;
`;

const ContentFooter = styled.div`
  /* padding-top: 30px; */
  /* background-color: red; */
  width: 70vw;
  /* position: absolute; */
  /* bottom: 0; */
  margin-left: 1.5rem;
  /* right: 0; */
`;

const SendNewMessage = styled.div`
  background-color: lightgray;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-radius: 50px;
  margin-top: 40vh;
  /* width: 70%; */
  margin: auto;
  /* margin-top: 36vh; */
`;

const SendNewMessageButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: #ecefff;
  border: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #4665ff;
  padding: 5px 0 0 0;
  border-radius: 5px;
  line-height: 36px;
  transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);

  &:hover {
    transform: scale(1.2);
  }

  i {
    display: block;
  }
`;

const InputField = styled.input`
  flex-grow: 1;
  /* padding: 0 15px; */
  background-color: transparent;
  border: none;
  outline: none;
`;

const SendMsgBtn = styled.div`
  background-color: #4aa398;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px 10px 20px;
  border-radius: 100px;
`;
const StyledImage = styled(Image)`
  border-radius: 9px;
`;
const ImageContainer = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  position: relative;
  border-radius: 100px;
  overflow: hidden;
  box-shadow: 0px 3px 6px #00000029;
`;
const ChatContent = ({ clientid, chatId, name, rerender }) => {
  const messagesEndRef = useRef(null);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');
  const [empty, setEmpty] = useState(false);
  // const [refresh, setRefresh] = useState(rerender);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (msg !== '') {
        const newChatItem = {
          key: chat.length + 1,
          // msg: msg,
        };

        setChat((prevChat) => [...prevChat, newChatItem]);
        scrollToBottom();
        setMsg('');
      }
    }
  };

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };
  const handleScroll = () => {
    // Call requestData when user scrolls
    requestData();
  };

  const requestData = () => {
    // const id = localStorage.getItem('hinyn-cid');
    // const data = {
    //   cid: clientid,
    //   senderId: chatId,
    // };
    getMessages().then((res) => {
      setChat(() => []);
      if (res?.data?.data) {
        let temp = res?.data?.data;
        // console.log(temp);
        if (temp) {
          temp?.map((item) => {
            setChat((prevData) => prevData.concat({ ...item }));
          });
        }
      }
      scrollControl();
    });
    // chat
    //           .filter(
    //             (itm) =>
    //               (itm.attributes?.sender?.data?.id == clientid &&
    //                 itm.attributes?.recipient?.data?.id === 199) ||
    //               (itm.attributes?.sender?.data?.id === 199 &&
    //                 itm.attributes?.recipient?.data?.id == clientid)

    //           )
  };
  const scrollControl = () => {
    window.addEventListener('keydown', handleKeyDown);
    scrollToBottom();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  };
  // useEffect(() => {
  //   scrollControl();
  // }, []);
  useEffect(() => {
    requestData();
    scrollControl();
  }, [rerender]);
  const PostMessage = () => {
    const clientId = localStorage.getItem('hinyn-cid');

    const chatData = {
      sender: clientId,
      recipient: chatId,
      content: msg,
      seenAt: new Date().toISOString(),
    };

    if (msg != '') {
      setEmpty(false);
      addMessages(chatData).then((res) => {
        if (res.data) {
          // console.log('ok');
          requestData();
          setMsg('');
          scrollControl();
        }
      });
    } else {
      setEmpty(true);
    }
  };
  const imgPath = '/assets/img/avatars/';

  return (
    <MainChatContent>
      <ContentHeader>
        <CurrentChattingUser>
          <ImageContainer>
            <StyledImage
              src={imgPath + 'img-avatar2.png'}
              layout="fill"
              alt="icon-img"
            />
          </ImageContainer>
          <CurrentChattingUserP>
            {name ? name : 'Samantha'}
          </CurrentChattingUserP>
        </CurrentChattingUser>
      </ContentHeader>
      <ContentBody>
        <ChatItemWrapper>
          {chat ? (
            chat
              .filter(
                (itm) =>
                  (itm.attributes?.sender?.data?.id == clientid &&
                    itm.attributes?.recipient?.data?.id === chatId) ||
                  (itm.attributes?.sender?.data?.id === chatId &&
                    itm.attributes?.recipient?.data?.id == clientid)
                // itm.attributes?.recipient?.data?.id == clientid
                // console.log( itm.attributes?.recipient?.data?.id)
              )
              .map((itm, index) => (
                <ChatItem
                  key={index}
                  msg={itm.attributes?.content}
                  sender={itm.attributes?.sender}
                  recipient={itm.attributes?.recipient}
                  // sendTime={
                  //   itm.attributes?.seenAt
                  //     ? itm.attributes?.seenAt.split('T')[1].split('.')[0]
                  //     : ''
                  // }
                  // sendDate={
                  //   itm.attributes?.seenAt
                  //     ? itm.attributes?.seenAt.split('T')[0]
                  //     : ''
                  // }
                />
              ))
          ) : (
            <div>No Chat Yet</div>
          )}

          <div ref={messagesEndRef} />
        </ChatItemWrapper>
      </ContentBody>
      <ContentFooter>
        {empty ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'red',
              fontSize: '15px',

              position: 'absolute',
              marginLeft: 300,
            }}
          >
            Message cannot be empty
          </div>
        ) : (
          ''
        )}
        <SendNewMessage>
          {/* <SendNewMessageButton>
            <AddIcon />
          </SendNewMessageButton> */}
          {/* <div style={{ background: 'red' }}> */}{' '}
          <InputField
            style={{ marginLeft: 10 }}
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msg}
          />
          {/* </div> */}
          <SendMsgBtn onClick={() => PostMessage()}>
            <SendIcon />
          </SendMsgBtn>
        </SendNewMessage>
      </ContentFooter>
    </MainChatContent>
  );
};

export default ChatContent;
