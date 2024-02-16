import React, { useContext } from 'react';
import UserContext from '../../modules/user';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from '../../../node_modules/classnames/index';
import colorNames from '../../styles/colors';

const { info } = colorNames;

// 헤더 스타일시트 설정
const OuterBox = styled.header`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  .right {
    a {
      display: inline-block;
      border: 1px solid ${info};
      width: 90px;
      height: 28px;
      border-radius: 3px;
      line-height: 26px;
      color: ${info};
      text-align: center;
      margin-left: 5px;

      &.on {
        background: ${info};
        color: #fff;
      }
    }
  }
`;

// 헤더
const Header = () => {
  const { t } = useTranslation();
  const {
    state: { isLogin },
  } = useContext(UserContext);

  return (
    <OuterBox>
      <div className="left">
        <NavLink to="/">로고</NavLink>
      </div>
      <div className="right">
        {isLogin ? (
          <>
            <NavLink
              to="/logout"
              className={({ isActive }) => classNames({ on: isActive })}
            >
              {t('로그아웃')}
            </NavLink>
            <NavLink
              to="/mypage"
              className={({ isActive }) => classNames({ on: isActive })}
            >
              {t('마이페이지')}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => classNames({ on: isActive })}
            >
              {t('로그인')}
            </NavLink>
            <NavLink
              to="/join"
              className={({ isActive }) => classNames({ on: isActive })}
            >
              {t('회원가입')}
            </NavLink>
          </>
        )}
      </div>
    </OuterBox>
  );
};

export default Header;
