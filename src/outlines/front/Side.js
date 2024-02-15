import styled from 'styled-components';
import UserContext from '../../modules/user';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import colorNames from '../../styles/colors';

const { info } = colorNames;
const Nav = styled.nav`
  text-align: center;
  width: 250px;
  background: #88b0bf;
  min-height: 700px;

  button {
    height: 30px;
  }

  hr {
    width: 70%;
    color: black;
  }
  a {
    display: inline-block;
    border: 1px solid ${info};
    width: 90px;
    height: 28px;
    border-radius: 3px;
    line-height: 26px;
    color: ${info};
    background: #fff;

    &.on {
      background: ${info};
      color: #fff;
    }
  }
  ul {
    text-align: left;
  }
`;

const Side = () => {
  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);
  return (
    <Nav>
      <div>프로필 이미지</div>
      <div>{userInfo.name}</div>
      <Link to="/mypage/edit">수정하기</Link>
      <hr />
      <ul>
        <li>프로젝트 목록</li>
      </ul>
    </Nav>
  );
};

export default Side;
