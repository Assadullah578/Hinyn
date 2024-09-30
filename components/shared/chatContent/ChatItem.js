import React from 'react';
// import styled, { keyframes } from 'styled-components';
import styled from '@emotion/styled';

const ChatItemContainer = styled.div`
  margin: 2px 0;
  margin-left: ${({ other }) => (other ? '74%' : '3%')};
  @media (max-width: 769px) {
    margin-left: ${({ other }) => (other ? '53%' : '')};
  }
`;

const ChatItemContent = styled.div`
  background-color: ${({ other }) => (other ? '#4AA398' : '#D7DBDD ')};
  color: ${({ other }) => (other ? '#000' : '#000')};
  padding: 6px 15px 2px 15px;
  /* border-radius: ${({ other }) =>
    other ? '10px 10px 0 10px' : '10px 10px 10px 0'}; */
  border-radius: 10px;
  max-width: 30%;
  min-width: 215px;
  @media (max-width: 769px) {
    max-width: 30%;
    min-width: 150px;
  }
`;

const ChatMsg = styled.div`
  user-select: none;
  font-weight: 300;
  font-size: 15px;
  color: ${({ other }) => (other ? 'white' : 'grey')};
`;

const ChatItemMeta = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 10px;
`;

const ChatItemMetaSpan = styled.span`
  color: #5c6163;
  user-select: none;
  font-size: 12px;
`;

const ChatItem = (props) => {
  const clientId = localStorage.getItem('hinyn-cid');
  // console.log(other);
  return (
    <ChatItemContainer other={props.sender?.data?.id == clientId}>
      <ChatItemContent other={props.sender?.data?.id == clientId}>
        <ChatMsg other={props.sender?.data?.id == clientId}>
          {props.msg}
        </ChatMsg>
        <ChatItemMeta>
          {/* <ChatItemMetaSpan>{props.sendDate}</ChatItemMetaSpan> */}
          {/* <ChatItemMetaSpan>{props.sendTime}</ChatItemMetaSpan> */}
        </ChatItemMeta>
      </ChatItemContent>
    </ChatItemContainer>
  );
};

export default ChatItem;
