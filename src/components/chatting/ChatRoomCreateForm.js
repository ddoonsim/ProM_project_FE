import React from 'react';
import styled from 'styled-components';
import sizeNames from '../../styles/sizes';
import { InputText } from '../commons/InputStyle';
import { BigButton, ButtonGroup } from '../commons/ButtonStyle';
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

const ChatRoomCreateForm = ({ onSubmit, onChange }) => {
  return (
    <FormBox onSubmit={onSubmit}>
      <dl>
        <dt>채팅방 이름</dt>
        <dd>
          <InputText type="text" name="roomNm" onChange={onChange}></InputText>
        </dd>
      </dl>
      <dl>
        <dt>인원 수</dt>
        <dd>
          <InputText
            type="number"
            name="capacity"
            onChange={onChange}
          ></InputText>
        </dd>
      </dl>
      <ButtonGroup>
        <BigButton
          type="submit"
          color="black"
          bcolor="black"
          height="50px"
          size="medium"
          fsize="medium"
        >
          방 만들기
        </BigButton>
      </ButtonGroup>
    </FormBox>
  );
};

export default React.memo(ChatRoomCreateForm);
