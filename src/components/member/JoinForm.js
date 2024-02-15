import { useTranslation } from 'react-i18next';
import { SubTitle } from '../commons/TitleStyle';
import { InputText } from '../commons/InputStyle';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import { ButtonGroup, BigButton, Btn } from '../commons/ButtonStyle';
import sizeNames from '../../styles/sizes';
import styled from 'styled-components';
import loadable from '@loadable/component';
import React from 'react';

const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

const { medium, big } = sizeNames;

const FormBox = styled.form`
  dl {
    display: flex;
    padding: 10px 15px;
    align-items: center;

    dt {
      width: 130px;
    }

    dd {
      flex-grow: 1;
      width: 300px;
    }
  }

  dl + dl {
    border-top: 1px solid #d5d5d5;
  }

  dl:last-of-type {
    margin-bottom: 15px;
  }

  .email_box {
    display: flex;
  }

  .auth_box {
    display: flex;
    margin: 5px 0;
  }

  .count {
    margin-left: 5px;
    font-size: initial;
    line-height: 35px;
  }

  .terms {
    border: 1px solid #d5d5d5;
    height: 150px;
    padding: 10px;
    overflow: auto;
  }

  .agree_terms {
    text-align: center;
    font-size: ${medium};
    cursor: pointer;
    margin: 5px 0 10px;

    svg {
      font-size: ${big};
      vertical-align: middle;
      margin-right: 5px;
    }
  }
`;

const JoinForm = ({ onSubmit, onChange, onToggle, onClick, form, errors }) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit}>
      <dl>
        <dt>{t('이메일')}</dt>
        <dd>
          <div className="email_box">
            <InputText
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
            <ErrorMessages errors={errors} field="email" />
            <Btn type="button" name="sendCodeBtn" onClick={onClick}>
              인증코드 전송
            </Btn>
          </div>
          <div className="auth_box">
            <InputText
              type="number"
              name="authNum"
              placeholder="인증코드 입력"
            />
            <div className="count" name="count">
              03:00
            </div>
            <Btn type="button" name="confirmBtn" disabled>
              확인
            </Btn>
            <Btn type="button" name="reSendBtn" disabled>
              재전송
            </Btn>
          </div>
          <div className="confirmed_msg" name="confirmed">
            ✅ 확인된 이메일입니다.
          </div>
        </dd>
      </dl>
      <dl>
        <dt>{t('비밀번호')}</dt>
        <dd>
          <InputText
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="password" />
        </dd>
      </dl>
      <dl>
        <dt>{t('비밀번호 확인')}</dt>
        <dd>
          <InputText
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="confirmPassword" />
        </dd>
      </dl>
      <dl>
        <dt>{t('회원명')}</dt>
        <dd>
          <InputText
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="name" />
        </dd>
      </dl>
      <dl>
        <dt>{t('휴대전화번호')}</dt>
        <dd>
          <InputText
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="mobile" />
        </dd>
      </dl>
      <SubTitle align="center" border_width={1}>
        {t('회원가입 약관')}
      </SubTitle>
      <pre className="terms">회원 가입약관....</pre>
      <div className="agree_terms" onClick={onToggle}>
        {form.agree ? <FiCheckSquare /> : <FiSquare />}
        {t('회원 약관에 동의합니다.')}
      </div>
      <ErrorMessages errors={errors} field="agree" />

      <ButtonGroup>
        <BigButton
          type="submit"
          color="black"
          bcolor="black"
          height="50px"
          size="medium"
          fsize="medium"
        >
          {t('가입하기')}
        </BigButton>
        <BigButton
          type="reset"
          color="white"
          bcolor="black"
          height="50px"
          size="medium"
          fsize="medium"
          fcolor="black"
        >
          {t('다시입력')}
        </BigButton>
      </ButtonGroup>
    </FormBox>
  );
};

export default React.memo(JoinForm);
