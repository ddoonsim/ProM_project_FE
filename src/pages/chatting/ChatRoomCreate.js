import ChatRoomCreateContainer from '../../containers/chatting/ChatRoomCreateContainer';
import { Helmet } from 'react-helmet-async';
const ChatRoomCreate = () => {
  return (
    <>
      <Helmet>
        <title>채팅방 생성</title>
      </Helmet>
      <ChatRoomCreateContainer />
    </>
  );
};

export default ChatRoomCreate;
