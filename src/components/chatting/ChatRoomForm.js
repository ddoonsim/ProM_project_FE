import React, { useState } from 'react';
import styled from 'styled-components';
import { InputText } from '../commons/InputStyle';
import { FiSend } from 'react-icons/fi';
import colorNames from '../../styles/colors';
import { MainTitle } from '../commons/TitleStyle';
import { Container } from '../commons/ModalStyle';

const { info, primary } = colorNames;

const ChatRoom = styled.div`
  margin-bottom: 10px;

  p {
    margin: 0;
  }
`;

const ChatBox = styled.ul`
  flex-direction: column;
  min-height: 0;
  height: 700px;
  width: 650px;
  overflow-y: auto; /* 세로 스크롤을 표시하고 필요할 때만 스크롤합니다. */
  border: 1px solid #ccc; /* 채팅창에 테두리를 추가합니다. */
  background: #eee;
  padding: 10px;

  li {
    display: grid;
    justify-content: start;

    .time {
      text-align: end;
    }
  }

  .me {
    justify-content: end;
    .time {
      text-align: start;
    }
  }

  li + li {
  }

  span {
    background: ${info};
    color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
  }

  .me > span {
    background: ${primary};
  }
`;

const InputGrp = styled.div`
  display: flex;
  bottom: 55px;
  left: 15px;
  width: 100%;
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
    min-height: 45px;
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
    <Container>
      <MainTitle>{roomNm}</MainTitle>
      <ChatRoom>
        <ChatBox ref={chatBoxEl} id="chatBox">
          {loglis}
          <Hr>
            <div className="hr-sect">이전 채팅</div>
          </Hr>
          {lis}
        </ChatBox>
      </ChatRoom>
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
    </Container>
  );
};

export default React.memo(ChatRoomForm);
