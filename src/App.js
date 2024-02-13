import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/front/CommonLayout';
import Main from './pages/front/Main';
import Login from './pages/front/member/Login';
import NotFound from './pages/commons/NotFound';
import Join from './pages/front/member/Join';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
