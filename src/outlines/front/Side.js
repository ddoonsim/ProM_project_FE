import ProjectListContainer from '../../containers/project/ProjectListContainer';
import styled from 'styled-components';
import UserContext from '../../modules/user';
import { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import colorNames from '../../styles/colors';
import { SubTitle } from '../../components/commons/TitleStyle';
import { NavLink } from 'react-router-dom';
import { CgClose } from "react-icons/cg";
import classNames from '../../../node_modules/classnames/index';
import sizeNames from '../../styles/sizes';
import NewProject from '../../pages/front/project/NewProject';
import { customStyles, closeBtn, closeSvg } from '../../components/commons/ModalStyle';

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

  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: ${white};
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${medium};
    color: ${primary};
    font-weight: bold;
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    setModalIsOpen(modalIsOpen);
  }, [modalIsOpen]);

  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);


  return (
    <SideNav>
      <div>프로필 이미지</div>
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
      <button className="btn" onClick={() => setModalIsOpen(true)}>
        {' '}
        + 새 프로젝트
      </button>
      <ProjectListContainer />

      <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button style={closeBtn} onClick={() => setModalIsOpen(false)}><CgClose style={closeSvg} /></button>
        <NewProject />
      </Modal>
    </SideNav>
  );
};

export default Side;