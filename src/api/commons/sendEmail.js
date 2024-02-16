import apiRequest from '../../lib/apiRequest';

// 인증 코드 이메일 발송
export const sendVerifyEmail = function (email) {
  return new Promise((resolve, reject) => {
    apiRequest(`/email/verify?email=${email}`, 'GET')
      .then((data) => {
        if (data.data.success) {
          alert('인증코드를 발송했습니다! 이메일을 확인하세요😊');
        } else {
          alert('이메일 전송에 실패했습니다😢')
          reject(data.data);
        }
      })
      .catch((err) => console.error(err));
  });
};