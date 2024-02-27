import home_ex from '../../images/home_ex.png';
import styled from 'styled-components';
import UserContext from '../../modules/user';
import { useContext } from 'react';
import Dashboard from './Dashboard';
const Img = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const Main = () => {
  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);

  return isLogin ? (
    <>
      <Dashboard />
    </>
  ) : (
    <Img>
      <img src={home_ex} width="100%" alt="home" />
    </Img>
  );
};

export default Main;
