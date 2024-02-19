import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom, registerMessage } from '../../api/chatting/chat';

let webSocket;
const ChatContainer = () => {
  const initialInfo = {
    roomNo: '',
    roomNm: '',
    capcity: '',
  };

  const { roomNo } = useParams();
  const [roomInfo, setRoomInfo] = useState(initialInfo);

  useEffect(() => {
    webSocket = new WebSocket(process.env.REACT_APP_WS_URL);
    webSocket.onopen = (e) => {
      console.log('연결 성공');
    };

    webSocket.onclose = (e) => {
      console.log('연결 종료');
    };

    getRoom(roomNo)
      .then((res) => setRoomInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h2>채팅방</h2>
    </>
  );
};

export default ChatContainer;
