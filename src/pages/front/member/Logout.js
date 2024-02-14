import cookies from 'react-cookies';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../../modules/user';

const Logout = () => {
  /*
   * 1. 쿠키 삭제(token)
   * 2. isLogin -> false, isAdmin = false
   * 3. userInfo -> {}
   */

  cookies.remove('token', { path: '/' });
  const {
    action: { setIsLogin, setIsAdmin, setUserInfo },
  } = useContext(UserContext);
  setIsLogin(false);
  setIsAdmin(false);
  setUserInfo({});

  return <Navigate to="/login" replace={true} />;
};

export default React.memo(Logout);
