/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getRooms, registerRoom } from '../../api/chatting/chat';

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
  const [form, setForm] = useState({ roomNm: '', capacity: '' });
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const updateRooms = useCallback(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage('방목록 조회 실패...');
        setLoading(false);
      });
  }, []);

  useEffect(() => updateRooms(), []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    try {
      if (!form.roomNm) {
        e.target.roomNm.focus();

        throw new Error('방 이름을 입력하세요.');
      }

      registerRoom(form)
        .then(() => {
          setForm({ roomNm: '', capcity: '' });
          updateRooms();
        })
        .catch((err) => console.error(err));
    } catch (err) {
      setMessage(err.message);
    }
  }, []);

  const handleChange = useCallback((e) => {
    form[e.target.name] = e.target.value.trim();
    setForm({ ...form });
  }, []);

  let lis = null;
  if (rooms && rooms.length > 0) {
    lis = rooms.map((r) => {
      const link = `/room/${r.roomNo}`;
      return (
        <RoomBox key={r.roomNo}>
          <Link to={link}>
            <div className="left">{r.roomNm}</div>
            <div className="right">최대 인원수 : {r.capacity}명</div>
          </Link>
        </RoomBox>
      );
    });
  }

  return (
    <>
      <h1>채팅방 목록</h1>
    </>
  );
};

export default RoomContainer;
