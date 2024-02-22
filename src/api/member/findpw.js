import apiRequest from "../../lib/apiRequest";

export const findUserInfo = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/member/find_pw', 'POST', form)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          // 로그인 상태인 경우 -> 회원정보 반환인데.... 로그인 상태면 안되자나...
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => reject(err));
  });


  