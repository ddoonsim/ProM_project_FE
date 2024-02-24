import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './modules/user';

import Layout from './layouts/front/CommonLayout';
import Modal from 'react-modal';

/* 소비자 페이지 */
import NotFound from './pages/commons/NotFound';
import Main from './pages/front/Main';
import Login from './pages/front/member/Login';
import Join from './pages/front/member/Join';
import Logout from './pages/front/member/Logout';
import FindId from './pages/front/member/FindId';
import FindPw from './pages/front/member/FindPw';
import Mypage from './pages/front/member/Mypage';
import NewProject from './pages/front/project/NewProject';
import RoomContainer from './containers/chatting/RoomContainer';
import ChatContainer from './containers/chatting/ChatContainer';
import ChatRoomCreate from './pages/chatting/ChatRoomCreate';
import ProjectMain from './pages/front/project/ProjectMain';
import ProfileEdit from './pages/front/member/ProfileEdit';
import Invitation from './pages/front/project/Invitation';
import AcceptedContainer from './containers/project/AcceptedContainer';

Modal.setAppElement('#root');

const App = () => {
  const {
    action: { updateUserInfo },
  } = useContext(UserContext);

  updateUserInfo();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/find_pw" element={<FindPw />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<ProfileEdit />} />
        <Route path="/newProject" element={<NewProject />} />
        <Route Route path="/chatroom" element={<ChatContainer />}>
          <Route path=":roomNo" element={<ChatContainer />} />
        </Route>
        <Route path="/chatlist" element={<RoomContainer />} />
        <Route path="/chatroom/create" element={<ChatRoomCreate />} />
        <Route path="/newProject" element={<NewProject />} />
        <Route path="/project/:projectSeq" element={<ProjectMain />} />
        <Route path="/project/invite/:projectSeq" element={<Invitation />} />
        <Route path="/accepted/:projectSeq" element={<AcceptedContainer />} />
      </Route>
      <Route path="*" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
