import React, { useState, useCallback } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import JoinForm from '../../components/member/JoinForm';
import requestJoin from '../../api/member/join';
import sendEmail from '../../api/commons/sendEmail';

const JoinContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    agree: false,
  });
  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /**
       * 필수 항목
       */
      const requiredFields = {
        email: t('NotBlank_email'),
        password: t('NotBlank_password'),
        confirmPassword: t('NotBlank_confirmPassword'),
        name: t('NotBlank_name'),
        mobile: t('NotBlank_mobile'),
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

      /* 약관 동의 체크 */
      if (!form.agree) {
        _errors.agree = _errors.agree || [];
        _errors.agree.push(t('AssertTrue_join_agree'));
        hasError = true;
      }

      if (hasError) {
        setErrors(() => _errors);

        return;
      }

      // 회원가입 처리
      requestJoin(form)
        .then(() => {
          // 회원 가입 성공시 처리
          alert(t('join_ok'));
          setForm(() => {}); // 양식 초기화

          // 로그인 페이지 이동
          navigate('/login', { replace: true });
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, t, navigate],
  );

  // OnChange 함수
  const onChange = useCallback((e) => {
    const target = e.currentTarget;
    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );

    if (target.name == 'mobile') {
      autoHyphen(target); // 자동 하이픈 추가
    }
  }, []);

  // onToggle 함수
  const onToggle = useCallback((e) => {
    setForm(
      produce((draft) => {
        draft.agree = !draft.agree;
      }),
    );
  }, []);

  // 자동 하이픈 추가 함수
  const autoHyphen = (target) => {
    const rawPhone = target.value.replace(/-/g, '');
    let formattedPhone = '';

    if (rawPhone.length < 4) {
      formattedPhone = rawPhone;
    } else if (rawPhone.length < 8) {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(3)}`;
    } else if (rawPhone.length < 11) {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
        3,
        7,
      )}-${rawPhone.slice(7)}`;
    } else {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
        3,
        7,
      )}-${rawPhone.slice(7, 11)}`;
    }

    target.value = formattedPhone;
  };

  const onClick = useCallback((e) => {
    console.log(form);
    sendEmail(form.email); // 이메일 전송
    alert(t('sendEmail_ok'));
  });

  return (
    <JoinForm
      onSubmit={onSubmit}
      onChange={onChange}
      onToggle={onToggle}
      onClick={onClick} /* 이메일 인증코드 전송 클릭 이벤트 */
      form={form}
      errors={errors}
    />
  );
};

export default React.memo(JoinContainer);
