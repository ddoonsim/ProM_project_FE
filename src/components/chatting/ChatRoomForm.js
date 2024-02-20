import React, { useState } from 'react';
import styled from 'styled-components';
import { InputText } from '../commons/InputStyle';
import { FiSend } from 'react-icons/fi';

const ChatBox = styled.ul`
  min-height: 700px;
  position: static;
  display: block;
  top: 110px;
  left: 15px;
  width: calc(70% - 30px);
  height: calc(100% - 225px);
  background: #eee;
  padding: 10px;
  overflow-y: auto;
`;

const InputGrp = styled.div`
  display: flex;
  position: absolute;
  bottom: 55px;
  left: 15px;
  width: calc(100% - 30px);
  button {
    height: 45px;
    width: 45px;
    text-align: center;
    margin-left: 5px;
    border-color: #000;
    cursor: pointer;
    border-radius: 3px;
    svg {
      font-size: 1.5rem;
    }
  }

  input {
    flex-grow: 1;
  }
`;

const ChatRoomForm = ({
  roomNo,
  handleClick,
  inputEl,
  buttonEl,
  chatBoxEl,
  handleChange,
  lis,
  children,
}) => {
  return (
    <>
      <h1>{roomNo}채팅방!!</h1>
      <ChatBox ref={chatBoxEl}>{lis}</ChatBox>

      <InputGrp>
        <InputText
          ref={inputEl}
          onKeyUp={handleChange}
          type="text"
          placeholder="메세지 입력..."
        />
        <button type="button" onClick={handleClick} ref={buttonEl}>
          <FiSend />
        </button>
      </InputGrp>
    </>
  );
};

export default React.memo(ChatRoomForm);
