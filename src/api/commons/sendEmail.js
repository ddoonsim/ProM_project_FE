import apiRequest from '../../lib/apiRequest';
import Swal from 'sweetalert2';

// 인증 코드 이메일 발송
export const sendVerifyEmail = function (email) {
  return new Promise((resolve, reject) => {
    apiRequest(`/email/verify?email=${email}`, 'GET')
      .then((data) => {
          if (data.data.success) {
            Swal.fire({
              title: "인증코드 발송 완료📨",
              text: "이메일을 확인하세요😊",
              icon: "success"
            })
          } else {
            Swal.fire({
              title: "이메일 전송 실패😢",
              icon: "error"
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                reject(data.data);
            }})
          }
      })
      .catch((err) => console.error(err));
  });
};

// 초대 이메일 발송
export const sendInvitation = function (email, link) {
  return new Promise(() => {
    apiRequest(`/email/invite?email=${email}&link=${link}`, 'GET')
      .then((data) => {
        if (data.data.success) {
          Swal.fire({
            title: "초대장 발송 완료📨",
            text: "초대장을 발송했습니다😊",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              window.location.reload();
            }
          })
        } else {
          console.log(data);
          Swal.fire({
            title: "초대장 발송 실패📨",
            html: "이미 우리 팀 팀원이네요!<br>이메일을 확인해주세요😊",
            icon: "error"
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              window.location.reload();
            }
          })
        }
      })
      .catch((err) => console.error(err));
  });
};
