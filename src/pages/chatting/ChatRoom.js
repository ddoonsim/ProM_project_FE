import ChatContainer from '../../containers/chatting/ChatContainer';

const ChatRoom = ({roomNo}) => {
  return (
    <>
      <ChatContainer roomNo={roomNo}/>
    </>
  );
};

export default ChatRoom;
