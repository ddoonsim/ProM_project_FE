import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import { getRoom, registerMessage } from '../../api/chatting/chat';
import ChatRoomForm from '../../components/chatting/ChatRoomForm';
import UserContext from '../../modules/user';

let webSocket;
const ChatContainer = () => {
  const inputEl = useRef();
  const buttonEl = useRef();
  const chatBoxEl = useRef();

  const initialInfo = {
    roomNo: '',
    roomNm: '',
    capacity: '',
  };

  const initialChatData = {
    member: '',
    roomNo: '',
    message: '',
  };

  const { roomNo } = useParams();
  const [roomInfo, setRoomInfo] = useState(initialInfo);
  const [chatData, setChatData] = useState(initialChatData);
  const [messages, setMessages] = useState([]);

  const {
    state: { userInfo },
  } = useContext(UserContext);
  useEffect(() => {
    webSocket = new WebSocket(process.env.REACT_APP_WS_URL);
    webSocket.onopen = (e) => {
      console.log('연결 성공');
    };

    webSocket.onclose = (e) => {
      console.log('연결 종료');
    };

    getRoom(roomNo)
      .then((res) => {
        setRoomInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.roomNo === roomNo) {
          // 동일한 채팅 방에서만 메세지 출력
          setMessages(messages.concat(data));
        }
      };
    }
  }, [webSocket, messages]);

  const handleChange = useCallback(
    (e) => {
      const params = {
        roomNo,
        memberSeq: userInfo.seq,
        message: e.target.value,
      };
      setChatData(params);

      if (e.keyCode === 13) {
        // 엔터키 클릭시
        buttonEl.current.click();
      }
    },
    [roomInfo],
  );

  const handleClick = useCallback(() => {
    console.log('채팅 딸깍!');
    console.log('chatData====', chatData);
    if (!webSocket) return;
    webSocket.send(JSON.stringify(chatData));
    inputEl.current.value = '';
    inputEl.current.focus();
    registerMessage(chatData); // 채팅 기록 서버 DB에 기록
    const st = 25 * messages.length + 100;
    chatBoxEl.current.scrollTo(0, st);
  }, [chatData]);

  const lis = messages.map((m, index) => (
    <li key={index}>
      [{m.memberSeq}]{m.message}
      <hr />
    </li>
  ));

  return (
    <>
      <ChatRoomForm
        handleChange={handleChange}
        inputEl={inputEl}
        buttonEl={buttonEl}
        chatBoxEl={chatBoxEl}
        handleClick={handleClick}
        roomNo={roomNo}
        lis={lis}
      />
    </>
  );
};

export default ChatContainer;
