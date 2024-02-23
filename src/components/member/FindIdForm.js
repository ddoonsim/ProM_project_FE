import { useTranslation } from 'react-i18next';
import { InputText } from '../commons/InputStyle';
import { ButtonGroup, BigButton } from '../commons/ButtonStyle';
import styled from 'styled-components';
import loadable from '@loadable/component';
import React, { useRef, useEffect } from 'react';

const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

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
  `;

  const FindIdForm = ({ onSubmit, onChange,form, errors}) => {

    errors = errors || {};

    const refName = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        refName.current.focus();
    }, [refName]);

  return (
    <FormBox onSubmit={onSubmit}>
        <dl>
            <dt>{t('회원명')}</dt>
            <dd>
            <InputText
                type="text"
                name="name"
                ref={refName}
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
      <ErrorMessages>{errors.global}</ErrorMessages>
      <ButtonGroup>
        <BigButton
          type="submit"
          color="black"
          bcolor="black"
          height="50px"
          size="medium"
          fsize="medium"
        >
          {t('아이디 찾기')}
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

export default React.memo(FindIdForm);