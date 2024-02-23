import { getRooms } from '../../api/chatting/chat';
import { useState, useCallback, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MainTitle } from '../../components/commons/TitleStyle';
const ChatRoomListContainer = () => {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

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
      const link = `/chatroom/${r.roomNo}`;
      return (
        <div key={r.roomNo}>
          <Link to={link}>
            <div className="left">{r.roomNm}</div>
            <div className="right">최대 인원수 : {r.capacity}명</div>
          </Link>
        </div>
      );
    });
  }
  return (
    <>
      <MainTitle>채팅방 목록</MainTitle>
      <ul>{lis}</ul>
    </>
  );
};

export default ChatRoomListContainer;
