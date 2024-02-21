/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ChatRoomListContainer from './ChatRoomListContainer';

const RoomBox = styled.li`
  box-shadow: 2px 2px 5px #212121;
  padding: 10px 20px;
  border-radius: 5px;
  a {
    display: flex;
    justify-content: space-between;
  }
`;

const FormBox = styled.form`
  input {
    display: block;
    border: 1px solid #d5d5d5;
    height: 45px;
    border-radius: 3px;
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
  }

  input:focus {
    border-color: #000;
  }

  button {
    margin-bottom: 20px;
  }
`;

const RoomContainer = () => {
  return (
    <>
      <ChatRoomListContainer />

      <Link to="/chatroom/create">채팅방 생성</Link>
    </>
  );
};

export default RoomContainer;
