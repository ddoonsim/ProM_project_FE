import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { findIdInfo } from '../../api/member/findid';
import FindIdForm from '../../components/member/FindIdForm';
import Swal from 'sweetalert2';

const FindIdContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let hasError = false; // 검증 실패 여부
      const _errors = {};
      setErrors(() => _errors);

      /* 필수 항목 검증 S */
      const requiredFields = {
        name: t('NotBlank_name'),
        mobile: t('NotBlank_mobile'),
      };

      for (const field in requiredFields) {
        _errors[field] = _errors[field] || [];
        if (!form[field] || !form[field].trim()) {
          _errors[field].push(requiredFields[field]);
          hasError = true;
        }
      }
      /* 필수 항목 검증 E */

      if (hasError) {
        setErrors(() => _errors);
        return;
      }

      console.log('버튼 클릭!!');

      // 회원정보 일치 확인
      findIdInfo(form)
        .then((res) => {
          if (res.data) {
            // 회원정보 일치시 처리
            // 가입한 아이디(이메일)가 모달창 또는 알림으로 나오도록 처리
            const atIndex = res.data.indexOf('@');
            const modifiedData = atIndex !== -1 ? res.data.slice(atIndex) : res.data;
            
            Swal.fire({
              title: '아이디',
              text: res.data.slice(0, 2) + '***' + modifiedData,
              icon: 'success',
            });

            // 로그인 페이지 이동
            navigate('/login', { replace: true });
          }
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, t, navigate],
  );

  // OnChange 함수
  const onChange = useCallback((e) => {
    const target = e.currentTarget;

    if (target.name === 'mobile') {
      autoHyphen(target); // 자동 하이픈 추가
    }

    setForm((form) => ({
      ...form,
      [target.name]: target.value,
    }));
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

  return (
    <FindIdForm
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      errors={errors}
    />
  );
};
export default FindIdContainer;
