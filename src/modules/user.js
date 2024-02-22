import { getUserInfo } from '../api/member/login';
import { createContext, useState, useCallback } from 'react';

const initialState = {
  state: { isLogin: false, userInfo: {} },
  action: { setIsLogin: null, setUserInfo: null },
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const updateUserInfo = useCallback(() => {
    if (isLogin) {
      return;
    }

    getUserInfo()
      .then((userInfo) => {
        console.log(userInfo);
        setUserInfo(() => userInfo);
        setIsLogin(Boolean(userInfo && userInfo.email !== undefined && userInfo.email.trim() !== '')); // 로그인 여부
      })
      .catch((err) => console.error(err));
  }, [isLogin]);

  const value = {
    state: { isLogin, userInfo },
    action: { setIsLogin, setUserInfo, updateUserInfo },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const { Consumer: UserConsumer } = UserContext;

export { UserProvider, UserConsumer };

export default UserContext;