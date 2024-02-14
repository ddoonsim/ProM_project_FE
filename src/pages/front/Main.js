import LoginContainer from '../../containers/member/LoginContainer';
import UserContext from '../../modules/user';
import { useContext } from 'react';

const Main = () => {
  const {
    state: { isLogin, userInfo },
    action: { setIsLogin, setUserInfo },
  } = useContext(UserContext);

  const handleClick = () => {
    setIsLogin(true);
    setUserInfo({ userNm: '이이름' });
  };

  return isLogin ? (
    <h1>메인페이지... / {userInfo.userNm}</h1>
  ) : (
    <>
      <LoginContainer />
      <button type="button" onClick={handleClick}>
        로그인 하기
      </button>
    </>
  );
};

export default Main;