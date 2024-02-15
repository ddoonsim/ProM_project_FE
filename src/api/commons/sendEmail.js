import apiRequest from '../../lib/apiRequest';

// 인증 코드 이메일 발송
export const sendVerifyEmail = function (email) {
  return new Promise((resolve, reject) => {
    apiRequest(`/email/verify?email=${email}`, 'GET')
      .then((res) => {
        console.log(res);

        alert('인증코드를 발송했습니다! 이메일을 확인하세요😊');
        // 이메일 승인 코드 메일 전송 완료 후 처리 콜백
      })
      .catch((err) => console.error(err));
  });
};

// 인증코드 일치 여부 확인
export const sendEmailVerifyCheck = function (authNum) {
  return new Promise(() => {
    apiRequest(`/email/auth_check?authNum=${authNum}`, 'GET')
      .then((data) => {})
      .catch((err) => console.error(err));
  });
};
