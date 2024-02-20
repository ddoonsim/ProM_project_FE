import home_ex from '../../images/home_ex.png';
import styled from 'styled-components';
import UserContext from '../../modules/user';
import { useContext } from 'react';
const Img = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const Main = () => {
  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);

  console.log('userInfo', { userInfo });

  return isLogin ? (
    <>
      <h1>{userInfo.name}님 로그인 성공 페이지 빠밤</h1>
    </>
  ) : (
    <Img>
      <img src={home_ex} width="100%" alt="home" />
    </Img>
  );
};

export default Main;
