import MemberOnly from '../authority/MemberOnly';
import UserContext from '../../modules/user';
import { useContext } from 'react';
import { InputText } from '../commons/InputStyle';
import styled from 'styled-components';
import { BigButton } from '../commons/ButtonStyle';
import React from 'react';

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

  }`;

const ProfileEditForm = ({ onSubmit, onChange }) => {
  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);
  return (
    <MemberOnly>
      <FormBox onSubmit={onSubmit}>
        <h1>회원정보수정</h1>
        <dl>
          <dt>이메일</dt>
          <dd>{userInfo.email}</dd>
        </dl>
        <dl>
          <dt>회원명</dt>
          <InputText
            type="text"
            name="name"
            placeholder={userInfo.name}
            onChange={onChange}
          />
        </dl>
        <dl>
          <dt>비밀번호</dt>
          <InputText
            type="password"
            name="password"
            placeholder={userInfo.password}
            onChange={onChange}
          />
        </dl>
        <dl>
          <dt>프로필 이미지</dt>
        </dl>

        <BigButton
          type="submit"
          color="black"
          bcolor="black"
          height="50px"
          size="medium"
          fsize="medium"
        >
            수정하기
        </BigButton>
      </FormBox>
    </MemberOnly>
  );
};

export default React.memo(ProfileEditForm);
