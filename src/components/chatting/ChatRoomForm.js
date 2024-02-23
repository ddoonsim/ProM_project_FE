import React, { useState } from 'react';
import styled from 'styled-components';
import { InputText } from '../commons/InputStyle';
import { FiSend } from 'react-icons/fi';
import colorNames from '../../styles/colors';
import { MainTitle } from '../commons/TitleStyle';

const { info, primary } = colorNames;

const ChatBox = styled.ul`
  flex-direction: column;
  min-height: 0;
  height: 700px;
  width: 400px;
  overflow-y: auto; /* 세로 스크롤을 표시하고 필요할 때만 스크롤합니다. */
  border: 1px solid #ccc; /* 채팅창에 테두리를 추가합니다. */
  background: #eee;
  padding: 10px;

  li {
    display: grid;
    justify-content: start;
  }

  .me {
    justify-content: end;
  }

  li + li {
  }

  span {
    max-widht: 50px;
    background: ${info};
    color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    line-height: 19px;
  }

  .me > span {
    widht: 50%;
    background: ${primary};
  }
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

const Hr = styled.div`
  .hr-sect {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: #ff4040;
    font-size: 12px;
    margin: 8px 0px;
  }
  .hr-sect::before,
  .hr-sect::after {
    content: '';
    flex-grow: 1;
    background: #ff4040;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const ChatRoomForm = ({
  roomNm,
  handleClick,
  inputEl,
  buttonEl,
  chatBoxEl,
  handleChange,
  lis,
  loglis,
}) => {
  return (
    <>
      <MainTitle>{roomNm}</MainTitle>
      <ChatBox ref={chatBoxEl} id="chatBox">
        {loglis}
        <Hr>
          <div className="hr-sect">이전 채팅</div>
        </Hr>
        {lis}
      </ChatBox>

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
