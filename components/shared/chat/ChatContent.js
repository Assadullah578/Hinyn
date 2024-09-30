// import React, { useState, useEffect, useRef } from 'react';
// import styled from '@emotion/styled';

// import ChatItem from './ChatItem';
// import { AddIcon, SendIcon } from '../Icon';
// import { addMessages, getMessages } from '../../forms/formService';
// import Image from 'next/image';

// const MainChatContent = styled.div`
//   padding: 25px 0;

//   height: 100%;
// `;

// const ContentHeader = styled.div`
//   background: rgba(255, 255, 255, 1);

//   border-bottom: 1px solid #ebe7fb;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: absolute;
//   right: 0;
//   left: 0;
//   top: 0;
//   z-index: 1000;
// `;

// const CurrentChattingUser = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px 20px;
// `;

// const CurrentChattingUserP = styled.p`
//   margin: 0;
//   font-weight: 600;
//   padding: 0 20px;
//   font-size: 20px;
// `;

// const ContentBody = styled.div`
//   width: 100%;

//   margin-top: 40px;
//   margin-bottom: 40px;
//   overflow: auto;
// `;

// const ChatItemWrapper = styled.div`
//   margin: 2px 0 4.4rem 0;
// `;

// const ContentFooter = styled.div`
//   padding-top: 30px;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
// `;

// const SendNewMessage = styled.div`
//   background-color: rgba(255, 255, 255, 1);
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
//   border-radius: 8px;
// `;

// const SendNewMessageButton = styled.button`
//   width: 36px;
//   height: 36px;
//   background-color: #ecefff;
//   border: none;
//   box-shadow: none;
//   outline: none;
//   cursor: pointer;
//   font-size: 16px;
//   color: #4665ff;
//   padding: 5px 0 0 0;
//   border-radius: 5px;
//   line-height: 36px;
//   transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);

//   &:hover {
//     transform: scale(1.2);
//   }

//   i {
//     display: block;
//   }
// `;

// const InputField = styled.input`
//   flex-grow: 1;
//   padding: 0 15px;
//   background-color: transparent;
//   border: none;
//   outline: none;
// `;

// const SendMsgBtn = styled.div`
//   background-color: #3b5bfe;
//   color: #fff;
//   cursor: pointer;
//   padding: 7px 10px 0 10px;
//   border-radius: 7px;
// `;
// const StyledImage = styled(Image)`
//   border-radius: 9px;
// `;
// const ImageContainer = styled.div`
//   width: 3.5rem;
//   height: 3.5rem;
//   position: relative;
//   border-radius: 9px;
//   box-shadow: 0px 3px 6px #00000029;
// `;
// const ChatContent = ({ name, id, clientid }) => {
//   const messagesEndRef = useRef(null);
//   const [chat, setChat] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [empty, setEmpty] = useState(false);

//   const scrollToBottom = () => {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       if (msg !== '') {
//         const newChatItem = {
//           key: chat.length + 1,
//           // msg: msg,
//         };

//         setChat((prevChat) => [...prevChat, newChatItem]);
//         scrollToBottom();
//         setMsg('');
//       }
//     }
//   };

//   const onStateChange = (e) => {
//     setMsg(e.target.value);
//   };
//   const requestData = () => {
//     getMessages().then((res) => {
//       setChat(() => []);
//       if (res?.data?.data) {
//         let temp = res?.data?.data;
//         console.log(temp);
//         if (temp) {
//           temp?.map((item) => {
//             setChat((prevData) => prevData.concat({ ...item }));
//           });
//         }
//       }
//       scrollControl();
//     });
//   };
//   const scrollControl = () => {
//     window.addEventListener('keydown', handleKeyDown);
//     scrollToBottom();

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   };
//   useEffect(() => {
//     scrollControl();
//   }, []);
//   useEffect(() => {
//     requestData();
//   }, []);
//   const PostMessage = () => {
//     const clientId = localStorage.getItem('hinyn-cid');

//     const chatData = {
//       sender: clientId,
//       recipient: id,
//       content: msg,
//       seenAt: new Date().toISOString(),
//     };

//     if (msg != '') {
//       setEmpty(false);
//       addMessages(chatData).then((res) => {
//         if (res.data) {
//           console.log('ok');
//           requestData();
//           setMsg('');
//           scrollControl();
//         }
//       });
//     } else {
//       setEmpty(true);
//     }
//   };
//   const imgPath = '/assets/img/avatars/';
//   // const clientId = localStorage.getItem('hinyn-cid');
//   console.log('here', clientid, id, name);
//   return (
//     <MainChatContent className="main__chatcontent">
//       <ContentHeader className="content__header">
//         <CurrentChattingUser>
//           <ImageContainer>
//             <StyledImage
//               src={imgPath + 'img-avatar2.png'}
//               layout="fill"
//               alt="icon-img"
//             />
//           </ImageContainer>
//           <CurrentChattingUserP>{name}</CurrentChattingUserP>
//         </CurrentChattingUser>
//       </ContentHeader>
//       <ContentBody>
//         <ChatItemWrapper>
//           {chat ? (
//             chat
//               .filter(
//                 (itm) =>
//                   (itm.attributes?.sender?.data?.id == clientid &&
//                     itm.attributes?.recipient?.data?.id === id) ||
//                   (itm.attributes?.sender?.data?.id === id &&
//                     itm.attributes?.recipient?.data?.id == clientid)
//               )
//               .map((itm, index) => (
//                 <ChatItem
//                   key={index}
//                   msg={itm.attributes?.content}
//                   sender={itm.attributes?.sender}
//                   recipient={itm.attributes?.recipient}
//                   sendTime={
//                     itm.attributes?.seenAt
//                       ? itm.attributes?.seenAt.split('T')[1].split('.')[0]
//                       : ''
//                   }
//                   sendDate={
//                     itm.attributes?.seenAt
//                       ? itm.attributes?.seenAt.split('T')[0]
//                       : ''
//                   }
//                 />
//               ))
//           ) : (
//             <div>No Chat Yet</div>
//           )}

//           <div ref={messagesEndRef} />
//         </ChatItemWrapper>
//       </ContentBody>
//       <ContentFooter className="content__footer">
//         {empty ? (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               color: 'red',
//               fontSize: '15px',
//               fontWeight: 'bold',
//             }}
//           >
//             Message cannot be empty
//           </div>
//         ) : (
//           ''
//         )}
//         <SendNewMessage>
//           <SendNewMessageButton>
//             <AddIcon />
//           </SendNewMessageButton>
//           <InputField
//             type="text"
//             placeholder="Type a message here"
//             onChange={onStateChange}
//             value={msg}
//           />
//           <SendMsgBtn>
//             <SendIcon onClick={() => PostMessage()} />
//           </SendMsgBtn>
//         </SendNewMessage>
//       </ContentFooter>
//     </MainChatContent>
//   );
// };

// export default ChatContent;
