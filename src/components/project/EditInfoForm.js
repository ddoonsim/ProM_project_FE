import React from 'react';
import { MainTitle } from '../commons/TitleStyle';
import { InputText } from '../commons/InputStyle';
import { BigButton } from '../commons/ButtonStyle';
import { Container } from '../commons/ModalStyle';
import ErrorMessages from '../commons/ErrorMessages';

const EditInfoForm = ({ form, onSubmit, onChange, errors }) => {

  return (
    <Container>
      <MainTitle>프로젝트 설정 수정</MainTitle>

      <form onSubmit={onSubmit}>
        <dl>
          <dt>프로젝트 제목</dt>
          <dd>
            <InputText
              type="text"
              name="pname"
              value={form.pname}
              onChange={onChange}
            />
          </dd>
        </dl>
        <ErrorMessages errors={errors} field="pname" />
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
          수정하기
        </BigButton>
      </form>
    </Container>
  );
};

export default React.memo(EditInfoForm);
