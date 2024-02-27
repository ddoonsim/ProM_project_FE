import apiRequest from "../../lib/apiRequest";

export const findPwInfo = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/member/find_pw', 'POST', form)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        console.log("Err", err);
        reject(err)
      });
  });


  