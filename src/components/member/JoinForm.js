import { useTranslation } from 'react-i18next';
import { SubTitle } from '../commons/TitleStyle';
import { InputText } from '../commons/InputStyle';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import { ButtonGroup, BigButton, Btn } from '../commons/ButtonStyle';
import sizeNames from '../../styles/sizes';
import styled from 'styled-components';
import loadable from '@loadable/component';
import React from 'react';
import FileUpload from '../commons/FileUpload';
import ImageView from '../commons/ImageView';

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

  .dn {
    display: none;
  }

  .email_box {
    display: flex;
  }

  .auth_box {
    display: flex;
    margin: 5px 0;

    [disabled] {
      background-color: #aeaeae;
      border: 1px solid #aeaeae;
    }
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

const JoinForm = ({
  onSubmit,
  onChange,
  onToggle,
  onClick,
  form,
  errors,
  setEmailRef,
  setSendCodeBtnRef,
  setConfirmBtnRef,
  setReSendBtnRef,
  setAuthNum,
  setCountEl,
  setConfirmedMsgRef,
  fileUploadCallback,
}) => {
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
              ref={(ref) => setEmailRef(ref)}
              value={form.email}
              onChange={onChange}
            />
            <Btn
              type="button"
              name="sendCodeBtn"
              ref={(ref) => setSendCodeBtnRef(ref)}
              onClick={onClick}
            >
              인증코드 전송
            </Btn>
          </div>
          <ErrorMessages errors={errors} field="email" />

          <div className="auth_box">
            <InputText
              type="text"
              name="authNum"
              ref={(ref) => setAuthNum(ref)}
              placeholder="인증코드 입력"
            />
            <div
              className="count"
              name="countEl"
              ref={(ref) => setCountEl(ref)}
            >
              03:00
            </div>
            <Btn
              type="button"
              name="confirmBtn"
              ref={(ref) => setConfirmBtnRef(ref)}
              onClick={onClick}
              // disabled
            >
              확인
            </Btn>
            <Btn
              type="button"
              name="reSendBtn"
              ref={(ref) => setReSendBtnRef(ref)}
              onClick={onClick}
              // disabled
            >
              재전송
            </Btn>
          </div>
          <div
            className="confirmed_msg dn"
            name="confirmedMsg"
            ref={(ref) => setConfirmedMsgRef(ref)}
          >
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
      <dl>
        <dt>{t('프로필이미지')}</dt>
        <dd>
          {form.profileImage && <ImageView image={form.profileImage} mode="thumbnail"/>}
          <FileUpload
            gid={form.gid}
            imageOnly={true}
            singleFile={true}
            fileUploadCallback={fileUploadCallback}
          >
            {t('이미지_업로드')}
          </FileUpload>
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
