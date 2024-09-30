import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ChatContent from '../shared/chatContent/ChatContent';

import { getMessages, getMyMessages } from '../forms/formService';

import Image from 'next/image';
import Map from 'core-js/es/map';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: ${(props) => (props.nochat ? '80vh' : '90vh')};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const UserList = styled.div`
  width: 35vw;
  height: 89vh;
  overflow-y: auto;
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
  background-color: white;
`;
const Chat = styled.div`
  height: 90vh;

  width: 100%;
`;
const SearchBar = styled.input`
  padding: 11px 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  width: 100%;

  /* background: green; */
  background: url('/assets/img/icons/img12.svg') no-repeat 4%;
  background-size: 20px 20px;
  @media (max-width: 600px) {
    padding: 5px 35px;
    font-size: 10px;
  }
`;
const RecentChat = styled.div``;
const Text = styled.div`
  font-size: 15px;
  font-weight: 700;
`;
const Message = styled.div`
  font-size: 13px;
  color: grey;
  margin: 5px 0;
  width: 100%;
`;
// const Time = styled.div`
//   font-size: 12px;
//   color: lightgray;
// `;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 10px 10px;
  /* background-color: ${({ bgColor }) => bgColor || 'lightgrey'}; */
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
  /* ${({ isSelected }) => isSelected && 'background-color: lightgrey;'} */
`;
const ChatName = styled.div``;
export const ChatScreen = (props) => {
  const [chat, setChat] = useState([]);
  const [chatList, setChatList] = useState([]);
  // const [clientsList, setClientsList] = useState([]);
  const [senderId, setSenderId] = useState();
  const [openChat, setOpenChat] = useState(false);
  const [name, setName] = useState();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const clientId = localStorage.getItem('hinyn-cid');

  const requestData = async () => {
    await getMyMessages(clientId).then((res) => {
      if (res?.data?.data) {
        let temp = res?.data?.data;

        if (temp) {
          // Create a map to store unique sender IDs
          const uniqueSenders = new Map();

          // Iterate over each item in the chat array
          temp.forEach((item) => {
            const senderId = item.attributes?.sender?.data?.id;

            // Check if the sender ID is not already in the map
            if (!uniqueSenders.has(senderId)) {
              // If not, add it to the map and push the item to the chatList array
              uniqueSenders.set(senderId, true);
              // Do not update the state here
            }
          });

          // After the loop, update the chatList state with unique items
          setChatList(
            Array.from(uniqueSenders.keys()).map((senderId) =>
              temp.find(
                (item) => item.attributes?.sender?.data?.id === senderId
              )
            )
          );
        }

        // if (temp) {
        // const newChat = temp;
        // .filter((item) => item.attributes?.recipient?.data?.id == clientId)
        // .map((item) => ({ ...item }));
        // setChat(() => [...newChat]);
      }
    });
  };
  useEffect(() => {
    requestData();
    // getClientsForChatList().then((res) => {
    //   if (res) {
    //     console.log(res.data.data);
    //     setClientsList(res.data.data);
    //   }
    // });
  }, []);
  const handleChatID = (chatid, name, index) => {
    requestData();
    setRefresh(!refresh);
    setSenderId(chatid);
    setName(name);
    setOpenChat(true);
    setSelectedItemIndex(index);
  };
  return (
    <Wrapper nochat={openChat}>
      <UserList>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            margin: 'auto',
          }}
        >
          <div
            style={{
              color: 'grey',
              fontWeight: 'bold',
              fontSize: 25,
              marginLeft: '1rem',
              padding: ' 2rem 0',
            }}
          >
            Messages
          </div>
          <SearchBar
            type="text"
            placeholder="Search Messages"
            style={{ background: '#ededed' }}
          />
          {chatList != '' ? (
            <RecentChat>
              {chatList.map((item, index) => {
                return (
                  <Wrap
                    key={index}
                    isSelected={selectedItemIndex === index}
                    onClick={() =>
                      handleChatID(
                        item.attributes?.sender?.data?.id,
                        item.attributes?.sender?.data?.attributes?.firstName,
                        index
                      )
                    }
                  >
                    <div>
                      <Image
                        src={'/assets/img/avatars/img-avatar2.png'}
                        style={{
                          borderRadius: '50%',
                        }}
                        width={45}
                        height={45}
                        alt="csdc"
                      />
                    </div>
                    <ChatName>
                      <Text>
                        {item.attributes?.sender?.data?.attributes?.firstName}{' '}
                        {item.attributes?.sender?.data?.attributes?.lastName}
                      </Text>
                      <Message>{item.attributes?.content}</Message>
                      {/* <Time>{item.time}</Time> */}
                    </ChatName>
                  </Wrap>
                );
              })}
            </RecentChat>
          ) : (
            <div style={{ margin: 'auto', marginTop: 50 }}>No New Messages</div>
          )}
        </div>
      </UserList>
      {/* <Chat>
        {openChat ? (
          <ChatContent
            clientid={clientId}
            rerender={refresh}
            chatId={senderId}
            name={name}
          />
        ) : (
          <div style={{ marginTop: 50, marginLeft: 500 }}>Select Chat</div>
        )}
      </Chat> */}
    </Wrapper>
  );
};
