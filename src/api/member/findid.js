import apiRequest from "../../lib/apiRequest";

export const findIdInfo = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/member/find_id', 'POST', form)
      .then((res) => {
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => reject(err));
  });