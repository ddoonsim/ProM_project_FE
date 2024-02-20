import FindPwForm from '../../components/member/FindPwForm';
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { findUserInfo } from '../../api/member/findpw';

const FindPwContainer = () => {
    const { t } = useTranslation();
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
            if (!form[field] || !form[field].trim()) {
              _errors[field] = requiredFields[field];
              hasError = true;
            }
          }
          /* 필수 항목 검증 E */
    
          if (hasError) {
            setErrors(() => _errors);
            return;
          }

          // 회원정보 일치 확인
          findUserInfo(form)
            .then(() => {

            })
            . catch (() => {
                setErrors(() => ({
                    global: t('Find_fail'),
                }));

            });
         

        },
        [form, t],
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