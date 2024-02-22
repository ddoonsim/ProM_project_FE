import { getRooms } from '../../api/chatting/chat';
import { useState, useCallback, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
const ChatRoomListContainer = () => {
  const [form, setForm] = useState({ roomNm: '', max: '' });
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const updateRooms = useCallback(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data.data);
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
      <h2>채팅방 목록</h2>
      <ul>{lis}</ul>
    </>
  );
};

export default ChatRoomListContainer;
