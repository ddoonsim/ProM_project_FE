import { useContext } from 'react';
import InvitationContainer from '../../../containers/project/InvitationContainer';
import UserContext from '../../../modules/user';
import LoginNecessary from '../../commons/LoginNecessary';

const Invitation = () => {
  const {
    state: { isLogin },
  } = useContext(UserContext);

  return isLogin ? <InvitationContainer /> : <LoginNecessary />;
};

export default Invitation;
