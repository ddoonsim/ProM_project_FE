import ProjectListContainer from '../../containers/project/ProjectListContainer';
import styled from 'styled-components';
import UserContext from '../../modules/user';
import { useContext } from 'react';
import colorNames from '../../styles/colors';
import { SubTitle } from '../../components/commons/TitleStyle';
import { NavLink } from 'react-router-dom';
import classNames from '../../../node_modules/classnames/index';
import sizeNames from '../../styles/sizes';

const { primary, info, white } = colorNames;
const { medium, big } = sizeNames;

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
    border-color: ${white};
    border-width: thin;
    margin: 30px;
  }
  .btn {
    display: inline-block;
    border: 1px solid ${info};
    width: 150px;
    height: 40px;
    line-height: 35px;
    border-radius: 3px;
    color: ${info};
    background: ${white};
    font-size: ${medium};
    font-weight: 500;
    cursor: pointer;

    &.on {
      background: ${primary};
      color: ${white};
    }
  }
  ul {
    text-align: center;
  }

  .list {
    display: block;
    padding: 10px 0;
    font-size: ${medium};
    color: ${white};
    background: ${primary};
  }
`;

const Side = () => {
  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);
  return (
    <Nav>
      <div>프로필 이미지</div>
      <SubTitle align="center" color="white">
        {userInfo.name}
      </SubTitle>
      <NavLink
        to="/mypage/profile"
        className={({ isActive }) => classNames({ on: isActive }) + ' btn'}
      >
        수정하기
      </NavLink>
      <hr />
      <NavLink
        to="/newProject"
        className={({ isActive }) => classNames({ on: isActive }) + ' btn'}
      >
        새 프로젝트
      </NavLink>
      <ProjectListContainer />
    </Nav>
  );
};

export default Side;
