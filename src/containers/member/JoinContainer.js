import React, { useState, useCallback, useRef } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import JoinForm from '../../components/member/JoinForm';
import requestJoin from '../../api/member/join';
import { sendVerifyEmail } from '../../api/commons/sendEmail';
import apiRequest from '../../lib/apiRequest';

const JoinContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    agree: false,
  });

  const [errors, setErrors] = useState({});

  // 회원가입 폼의 필요한 요소 가져오기
  const [emailRef, setEmailRef] = useState(useRef()); // 이메일 입력란 요소 useRef()
  // 확인, 재전송 버튼 요소 useRef()
  const [sendCodeBtnRef, setSendCodeBtnRef] = useState(useRef());
  const [confirmBtnRef, setConfirmBtnRef] = useState(useRef());
  const [reSendBtnRef, setReSendBtnRef] = useState(useRef());
  const [authNum, setAuthNum] = useState(useRef());
  const [countEl, setCountEl] = useState(useRef());
  const [confirmedMsgRef, setConfirmedMsgRef] = useState(useRef());

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

    if (target.name === 'mobile') {
      autoHyphen(target); // 자동 하이픈 추가
    }

    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
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
    console.log(target.value);
  };

  const onClick = useCallback((e) => {
    // 버튼을 클릭했을 때
    const target = e.currentTarget.name;
    console.log(target, '버튼 클릭!!');

    if (target === 'sendCodeBtn') {
      if (!form.email) {
        alert('이메일을 입력하세요!');
        return;
      }

      new Promise(() => {
        apiRequest(`/member/email_dup_check?email=${form.email}`, 'GET')
          .then((data) => {
            if (data.data.success) {
              // 중복이메일인 경우
              alert('❌ 이미 가입된 이메일입니다.');

              // 이메일 입력 란에 focus()
              if (emailRef.current) {
                emailRef.current.focus();
              }
            } else {
              // 중복이메일이 아닌 경우
              sendVerifyEmail(form.email); // 이메일 전송

              /** 이메일 승인 코드 메일 전송 완료 후 처리 콜백
               * 1. 제한 시간 카운트 다운 시작
               * 2. 확인, 재전송 버튼 disabled 제거
               * 3. 이메일 input 태그 readonly로 변경 */
              authCount.start();
            }
          })
          .catch((err) => console.error(err));
      }, [form]);
    } else if (target === 'reSendBtn') {
      // 재전송 버튼을 클릭했을 때
      sendVerifyEmail(form.email); // 이메일 전송
      authCount.start();
    } else if (target === 'confirmBtn') {
      // 확인버튼을 클릭했을 때
      console.log(authNum.value);
      if (!authNum.value.trim()) {
        // 인증코드를 입력하지 않고 확인을 클릭했을 때
        alert('인증코드를 입력하세요.');
        authCount.current.focus();
      }

      // 인증코드 일치 여부 확인
      console.log(authNum.value);
      // sendEmailVerifyCheck(authNum.value);
      new Promise(() => {
        apiRequest(`/email/auth_check?authNum=${authNum.value}`, 'GET')
          .then((data) => {
            console.log(data);
            console.log('인증코드 일치 여부 확인', data.data.success);
            if (data.data.success) {
              alert('이메일이 인증되었습니다😁');
              if (authCount.intervalId) clearInterval(authCount.intervalId);
              confirmBtnRef.disabled = true;
              reSendBtnRef.disabled = true;
              confirmedMsgRef.classList.remove('dn');
            } else {
              alert('이메일 인증에 실패했습니다😢');
            }
          })
          .catch((err) => console.error(err));
      });
    }
  });

  // 유효시간 카운트 다운
  const authCount = {
    intervalId: null,
    count: 60 * 3, // 유효시간 3분

    // 카운트 다운 시작
    start() {
      this.initialize();
      this.intervalId = setInterval(function () {
        authCount.count--;
        if (authCount.count < 0) {
          authCount.count = 0;
          clearInterval(authCount.intervalId);

          emailRef.setAttribute('readonly', 'false');
          sendCodeBtnRef.setAttribute('disabled', 'false');
          confirmBtnRef.disabled = true;
          reSendBtnRef.disabled = true;
          return;
        }

        emailRef.setAttribute('readonly', 'true');
        sendCodeBtnRef.setAttribute('disabled', 'true');
        confirmBtnRef.disabled = false;
        reSendBtnRef.disabled = false;

        const min = Math.floor(authCount.count / 60);
        const sec = authCount.count - min * 60;

        countEl.innerHTML = `${('' + min).padStart(2, '0')}:${(
          '' + sec
        ).padStart(2, '0')}`;
      }, 1000);
    },

    //인증 코드 유효시간 초기화
    initialize() {
      emailRef.setAttribute('readonly', 'true');
      sendCodeBtnRef.setAttribute('disabled', 'true');
      confirmBtnRef.disabled = false;
      reSendBtnRef.disabled = false;

      this.count = 60 * 3;
      if (this.intervalId) clearInterval(this.intervalId);
      countEl.innerHTML = '03:00';
    },
  };

  return (
    <JoinForm
      onSubmit={onSubmit}
      onChange={onChange}
      onToggle={onToggle}
      onClick={onClick} /* 이메일 인증코드 전송 클릭 이벤트 */
      form={form}
      errors={errors}
      setEmailRef={setEmailRef}
      setSendCodeBtnRef={setSendCodeBtnRef}
      setConfirmBtnRef={setConfirmBtnRef}
      setReSendBtnRef={setReSendBtnRef}
      setAuthNum={setAuthNum}
      setCountEl={setCountEl}
      setConfirmedMsgRef={setConfirmedMsgRef}
    />
  );
};

export default React.memo(JoinContainer);
