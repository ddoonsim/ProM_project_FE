import React, { useState, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cookies from 'react-cookies';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../../components/member/LoginForm';
import UserContext from '../../modules/user';
import { requestLogin } from '../../api/member/login';

const LoginContainer = () => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    action: { updateUserInfo },
  } = useContext(UserContext);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let hasError = false;
      const _errors = {};
      setErrors(() => _errors);

      /* 필수 항목 검증 S */
      const requiredFields = {
        email: t('NotBlank_email'),
        password: t('NotBlank_password'),
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

      // 로그인 처리
      requestLogin(form)
        .then((token) => {
          // JWT -> 쿠키에 저장
          cookies.save('token', token, {
            path: '/',
          });

          // 양식 초기화
          setForm(() => {});

          // 로그인 상태(isLogin -> true), userInfo에 회원정보 업데이트
          updateUserInfo();

          // 프로젝트 초대장 페이지 띄우기
          if (`${location.pathname}`.includes('/project/invite')) {
            window.location.reload();
          }

          // 일반적인 로그인 시 ==> 메인페이지로 이동
          navigate('/');
        })
        .catch(() => {
          setErrors(() => ({
            global: t('Login_fail'),
          }));
        });
    },
    [form, t, navigate, updateUserInfo, location.pathname],
  );

  const onChange = useCallback((e) => {
    const target = e.currentTarget;
    setForm((form) => ({
      ...form,
      [target.name]: target.value,
    }));
  }, []);

  return (
    <>
      <LoginForm onChange={onChange} onSubmit={onSubmit} errors={errors} />
    </>
  );
};

export default React.memo(LoginContainer);