import React from 'react';
import styled from 'styled-components';
import { MainTitle } from '../commons/TitleStyle';
import { InputText } from '../commons/InputStyle';
import { BigButton } from '../commons/ButtonStyle';
import sizeNames from '../../styles/sizes';

const {medium} = sizeNames;

const Container = styled.div`
margin: 0 50px 10px;

  dl {
    display: flex;
    padding: 10px 15px;
    align-items: center;

    dt {
      width: 130px;
      font-size: ${medium};
    }

    dd {
      flex-grow: 1;
      width: 300px;
  }
`;

const NewProjectForm = ({ form, onSubmit, onChange }) => {
  return (
    <Container>
      <MainTitle>새 프로젝트</MainTitle>

      <form onSubmit={onSubmit}>
        <dl>
          <dt>프로젝트 제목</dt>
          <dd>
            <InputText
              type="text"
              name="pName"
              value={form.pName}
              onChange={onChange}
            />
          </dd>
        </dl>
        <dl>
          <dt>프로젝트 설명</dt>
          <dd>
            <InputText
              type="text"
              name="description"
              value={form.description}
              onChange={onChange}
            />
          </dd>
        </dl>
        <BigButton
          className="mt5 mb10"
          type="submit"
          name="createBtn"
          width="250px"
        >
          프로젝트 만들기
        </BigButton>
      </form>
    </Container>
  );
};

export default React.memo(NewProjectForm);
