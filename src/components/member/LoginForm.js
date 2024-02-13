import { InputText } from '../commons/InputStyles';
import { BigButton } from '../commons/ButtonStyle';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiLock, FiKey, FiUserPlus } from 'react-icons/fi';
import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import loadable from '@loadable/component';

// 에러메세지 지연 로딩
const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

// 로그인폼 스타일시트 설정
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

// input 태그 스타일시트 설정
const LoginText = styled(InputText)`
  display: block;
  & + & {
    margin-top: 5px;
  }
`;

// 로그인 메인 폼
const LoginForm = ({ onSubmit, onChange, form, errors }) => {
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
        value={form.email}
        onChange={onChange}
        placeholder={t('이메일')}
        ref={refEmail}
      />
      <ErrorMessages errors={errors} field="email" />

      <LoginText
        type="password"
        name="password"
        value={form.password}
        onChange={onChange}
        placeholder={t('비밀번호')}
      />
      <ErrorMessages errors={errors} field="password" />

      <BigButton type="submit" size="medium" className="mt10">
        {t('로그인')}
      </BigButton>

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
      {errors.global && errors.global.message && (
        <ErrorMessages>{errors.global.message}</ErrorMessages>
      )}
    </FormBox>
  );
};

export default React.memo(LoginForm);
