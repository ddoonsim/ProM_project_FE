import apiRequest from "../../lib/apiRequest";

export const findUserInfo = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/member/info')
      .then((res) => {
        if (res.data.success) {
          // 로그인 상태인 경우 -> 회원정보 반환
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => reject(err));
  });