import { InputText } from '../commons/InputStyle';
import { BigButton } from '../commons/ButtonStyle';
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiLock, FiKey, FiUserPlus } from 'react-icons/fi';
import styled from 'styled-components';
import loadable from '@loadable/component';

const Message = loadable(() => import('../commons/ErrorMsgStyle'));

const LoginText = styled(InputText)`
  display: block;
  & + & {
    margin-top: 5px;
  }
`;

const FormBox = styled.form`
  width: 300px;
  padding-bottom: 80px;

  .links {
    border: 1px solid #d5d5d5;
    border-left: 0;
    border-right: 0;
    padding: 10px 0;
    margin-top: 10px;
    display: flex;

    a {
      flex-grow: 1;
      width: 0;
      text-align: center;

      svg {
        vertical-align: middle;
      }
    }
  }
`;

const LoginForm = ({ onSubmit, onChange, errors }) => {
  const { t } = useTranslation();

  errors = errors || {};

  const refEmail = useRef();

  useEffect(() => {
    refEmail.current.focus();
  }, [refEmail]);

  return (
    <FormBox onSubmit={onSubmit}>
      <LoginText
        type="text"
        name="email"
        placeholder={t('이메일')}
        ref={refEmail}
        onChange={onChange}
      />
      {errors.email && <Message>{errors.email}</Message>}

      <LoginText
        type="password"
        name="password"
        placeholder={t('비밀번호')}
        onChange={onChange}
      />
      {errors.password && <Message>{errors.password}</Message>}

      <BigButton type="submit" size="medium" className="mt5">
        {t('로그인')}
      </BigButton>

      {errors.global && <Message>{errors.global}</Message>}

      <div className="links">
        <Link to="/find_id">
          <FiLock /> {t('아이디 찾기')}
        </Link>
        <Link to="/find_pw">
          <FiKey /> {t('비밀번호 찾기')}
        </Link>
        <Link to="/join">
          <FiUserPlus /> {t('회원가입')}
        </Link>
      </div>
    </FormBox>
  );
};

export default React.memo(LoginForm);