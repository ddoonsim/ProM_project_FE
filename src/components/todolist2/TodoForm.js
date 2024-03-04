import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
const FormBox = styled.form``;
const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

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
      <ErrorMessages errors={errors} field="content" />
    </FormBox>
  );
};

export default React.memo(TodoForm);
