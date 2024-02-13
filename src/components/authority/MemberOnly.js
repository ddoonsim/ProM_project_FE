import React, { useContext } from 'react';
import UserContext from '../../modules/user';
import LoginContainer from '../../containers/member/LoginContainer';

const MemberOnly = ({ children }) => {
  const {
    state: { isLogin },
  } = useContext(UserContext);

  return isLogin ? children : <LoginContainer />;
};

export default React.memo(MemberOnly);