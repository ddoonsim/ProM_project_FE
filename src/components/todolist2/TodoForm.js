import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
const FormBox = styled.form``;

const TodoForm = ({ onChange, onSubmit, form, errors }) => {
  const { t } = useTranslation();
  return (
    <FormBox onSubmit={onSubmit}>
      <input
        type="text"
        name="content"
        value={form.content}
        onChange={onChange}
      />
      <button type="submit">{t('등록')}</button>
    </FormBox>
  );
};

export default React.memo(TodoForm);
