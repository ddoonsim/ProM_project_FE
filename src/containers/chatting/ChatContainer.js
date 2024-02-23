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
  let chatLog = [];
  let [loglis, setLoglis] = useState();
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

  const { roomNm } = useParams();
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
        setRoomInfo(res[0].chatRoom);
        if (res.length > 1) {
          for (let i = 1; i < res.length; i++) {
            chatLog.push({
              member:
                res[i].member !== null
                  ? res[i].member.name
                  : '사용자 정보 없음',
              roomNo: res[i].chatRoom.roomNo,
              message: res[i].message,
            });
          }
          setLoglis(
            chatLog.map((log, index) => (
              <>
                <li
                  key={`${log.member}_${log.message}`}
                  className={userInfo.name === log.member ? 'me' : ''}
                >
                  {log.member === userInfo.name ? '' : log.member}
                  <span>{log.message}</span>
                </li>
                {/* <li key={index}>{log.message}</li> */}
              </>
            )),
          );
        }
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

  /* 모든 이벤트에 하단 이동중... 비교 조건 추가  */
  useEffect(() => {
    chatBoxEl.current.scrollTo(0, chatBoxEl.current.scrollHeight);
  });

  const handleChange = useCallback(
    (e) => {
      if (!inputEl.current.value) {
        return false;
      }
      const params = {
        roomNo,
        memberSeq: userInfo.seq,
        memberNm: userInfo.name,
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
    if (!webSocket) return;
    if (!inputEl.current.value) {
      return false;
    }
    webSocket.send(JSON.stringify(chatData));
    inputEl.current.value = '';
    inputEl.current.focus();
    registerMessage(chatData); // 채팅 기록 서버 DB에 기록
    console.log('messages.length ', messages.length);
    const st = 25 * messages.length + 100;
    console.log('chatBoxEl: ', chatBoxEl);
    chatBoxEl.current.scrollTo(0, st);
  }, [chatData]);

  const lis = messages.map((m, index) => (
    <>
      <li key={index} className={userInfo.name === m.memberNm ? 'me' : ''}>
        {m.memberNm === userInfo.name ? '' : m.memberNm}{' '}
        <span>{m.message}</span>
      </li>
      {/* <li key={index}>{m.message} </li> */}
    </>
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
        roomNm={roomNm}
        lis={lis}
        loglis={loglis}
      />
    </>
  );
};

export default ChatContainer;
