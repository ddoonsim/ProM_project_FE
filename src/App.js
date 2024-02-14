import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './modules/user';

import Layout from './layouts/front/CommonLayout';

/* 소비자 페이지 */
import NotFound from './pages/commons/NotFound';
import Main from './pages/front/Main';
import Login from './pages/front/member/Login';
import Join from './pages/front/member/Join';
import Logout from './pages/front/member/Logout';
import Mypage from './pages/front/member/Mypage';
// import Home from './pages/front/Home';

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
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      <Route path="*" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
