import ProjectListContainer from '../../containers/project/ProjectListContainer';
import styled from 'styled-components';
import UserContext from '../../modules/user';
import { useCallback, useContext, useState } from 'react';
import colorNames from '../../styles/colors';
import { SubTitle } from '../../components/commons/TitleStyle';
import { NavLink } from 'react-router-dom';
import classNames from '../../../node_modules/classnames/index';
import sizeNames from '../../styles/sizes';
import NewProject from '../../pages/front/project/NewProject';
import ImageView from '../../components/commons/ImageView';
import ModalBox from '../../components/commons/ModalBox';

const { primary, info, white } = colorNames;
const { medium, big } = sizeNames;

const SideNav = styled.nav`
  width: 250px;
  height: auto;
  background: #3e768c;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background: ${white};
    margin-bottom: 20px;
  }
  .btn {
    width: 150px;
    height: 40px;
    line-height: 38px;
    margin-bottom: 10px;
    border-radius: 3px;
    border: none;
    color: ${primary};
    background: ${white};
    font-size: ${medium};
    font-weight: 500;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.3s ease;
    &:hover {
      background: ${white};
      color: ${primary};
      cursor: pointer;
    }
  }
  hr {
    width: 80%;
    border-color: ${white};
    border-width: thin;
    margin: 30px 0;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .list {
    display: block;
    padding: 10px;
    font-size: ${medium};
    color: ${white};
    transition: background-color 0.3s ease;
    text-align: center;
    &:hover {
      background-color: ${white};
      color: ${primary};
    }
  }
  .on {
    background: ${white};
    color: ${primary};
  }
  .ReactModal__Content--after-open {
    width: 500px;
    height: 500px;
  }
`;

const Side = () => {

  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <SideNav>
      {userInfo.profileImage && (
        <ImageView image={userInfo.profileImage} mode="thumbnail" />
      )}
      <SubTitle align="center" color="white">
        {userInfo.name}
      </SubTitle>
      <NavLink
        to="/mypage/edit"
        className={({ isActive }) => classNames({ on: isActive }) + ' btn'}
      >
        수정하기
      </NavLink>
      <hr />
      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <NewProject mode={'new'} />
        </ModalBox>
      )}
      <button type="button" className="btn" onClick={() => setIsOpen(!isOpen)}>
        {' '}
        + 새 프로젝트
      </button>
      <ProjectListContainer />
    </SideNav>
  );
};
export default Side;
