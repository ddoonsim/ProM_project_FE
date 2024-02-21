import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRoom } from '../../api/chatting/chat';
import ChatRoomCreateForm from '../../components/chatting/ChatRoomCreateForm';

const ChatRoomCreateContainer = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      registerRoom(form).then(navigate('/chatlist'));
      console.log(form);
    },
    [form],
  );
  const onChange = useCallback((e) => {
    const target = e.currentTarget;
    setForm((form) => ({
      ...form,
      [target.name]: target.value,
    }));
  }, []);

  return (
    <>
      <ChatRoomCreateForm onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};

export default React.memo(ChatRoomCreateContainer);
