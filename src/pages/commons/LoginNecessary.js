// alert 로그인 필수입니다 -> 로그인 페이지로 이동!
import Login from '../front/member/Login';
import MessageBox from '../../components/commons/MessageBox';

const LoginNecessary = () => {

  return (
    <div className="login_page">
        <MessageBox />
      <Login />
    </div>
  );
};

export default LoginNecessary;
