import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { findPwInfo } from '../../api/member/findpw';
import FindPwForm from '../../components/member/FindPwForm';

const FindPwContainer = () => {
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
            email: t('NotBlank_email'),
            name: t('NotBlank_name'),
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

        // 회원정보 일치 확인
         findPwInfo(form)
         .then((res) => {
            console.log(res.success);
            if (res.success) {
             // 회원정보 일치시 처리
             alert(t('sendEmail_findPw_ok'));

             // 로그인 페이지 이동
             navigate('/login', { replace: true });
            } else {
              alert('이메일 인증에 실패했습니다😢');  // 안나와,,,
            }

         })
          .catch((err) => setErrors(() => err.message));
      //    . catch (() => {
      //     setErrors(() => ({
      //         global: t('Find_fail'),
      //     }));

      // });
      
        },
        [form, t,navigate],
    );

    const onChange = useCallback((e) => {
        const target = e.currentTarget;
        setForm((form) => ({
          ...form,
          [target.name]: target.value,
        }));
      }, []);

      return (
        <FindPwForm 
        onChange={onChange} 
        onSubmit={onSubmit} 
        form={form} 
        errors={errors} 
      />
      );
};

export default FindPwContainer;