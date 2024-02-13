import LoginForm from '../../components/member/LoginForm';
import React, { useState, useCallback } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';

const LoginContainer = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 필수 항목
      const requiredFields = {
        email: t('NotBlank_email'),
        password: t('NotBlank_password'),
      };

      const _errors = {};
      let hasError = false; // 검증 실패 여부

      for (const field in requiredFields) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] || [];
          _errors[field].push(requiredFields[field]);

          hasError = true;
        }
      }

      // 필수입력사항 검증 실패 시
      if (hasError) {
        setErrors(() => _errors);
        return;
      }

      // 로그인 처리
    },
    [form],
  );

  const onChange = useCallback((e) => {
    const target = e.currentTarget;
    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
  }, []);

  return (
    <>
      <LoginForm
        onSubmit={onSubmit}
        onChange={onChange}
        form={form}
        errors={errors}
      />
    </>
  );
};

export default LoginContainer;
