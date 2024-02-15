import apiRequest from '../../lib/apiRequest';

export default function sendEmail(email) {

  return new Promise((resolve, reject) => {
    apiRequest(`/email/verify?email=${email}`, 'GET')
      .then((res) => {
        console.log(res);
        // if (typeof callbackEmailVerify == 'function') {
        //   // 이메일 승인 코드 메일 전송 완료 후 처리 콜백
        //   // callbackEmailVerify(data);
        // }
      })
      .catch((err) => console.error(err));
  });
}
