import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import './TodoForm.scss';

const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));


const TodoForm = ({ onChange, onSubmit, form, errors }) => {
  const { t } = useTranslation();

  return (
    <>
    <form className='TodoForm' onSubmit={onSubmit}>
      <input
        type="text"
        name="content"
        placeholder="할 일을 입력하세요"
        value={form.content}
        onChange={onChange}
      />
      <button type="submit">{t('등록')}</button>
    </form>
    <ErrorMessages errors={errors} field="content" />
    </>
  );
};

export default React.memo(TodoForm);
