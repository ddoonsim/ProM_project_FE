import { getRooms } from '../../api/chatting/chat';
import { useState, useCallback, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SubTitle } from '../../components/commons/TitleStyle';
import ModalBox from '../../components/commons/ModalBox';
import ChatContainer from './ChatContainer';
const ChatRoomListContainer = () => {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

  const updateRooms = useCallback(() => {
    getRooms()
      .then((res) => {
        setRooms(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage('방목록 조회 실패...');
        setLoading(false);
      });
  }, []);
  useEffect(() => updateRooms(), []);
  let lis = null;
  if (rooms && rooms.length > 0) {
    lis = rooms.map((r) => {
      // const link = `/chatroom/${r.roomNo}`;
      console.log(r);

      return (
        <div key={r.roomNo}>
          <Link name="chatroom" onClick={() => setIsOpen(!isOpen)}>
            {r.roomNm}
            {/* <div className="right">최대 인원수 : {r.capacity}명</div> */}

            {isOpen && (
              <ModalBox isOpen={isOpen} onClose={onClose}>
                <ChatContainer roomNo={r.roomNo} />
              </ModalBox>
            )}
          </Link>
        </div>
      );
    });
  }

  return (
    <div>
      <SubTitle>채팅방 목록</SubTitle>
      <ul>{lis}</ul>
    </div>
  );
};

export default ChatRoomListContainer;
