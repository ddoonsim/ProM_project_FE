import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ChatContainer from '../../containers/chatting/ChatContainer';
import ModalBox from '../../components/commons/ModalBox';
const ChatRoom = ({ roomNo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { seq } = roomNo;
  const onClose = useCallback(() => setIsOpen(false), []);
  return (
    <>
      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <ChatContainer roomNo={roomNo} />
        </ModalBox>
      )}
      <Link className="btn" name="chatroom" onClick={() => setIsOpen(!isOpen)}>
        팀 단체 채팅
      </Link>
    </>
  );
};

export default ChatRoom;
