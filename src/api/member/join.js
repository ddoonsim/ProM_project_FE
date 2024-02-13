import apiRequest from '../../lib/apiRequest';

export default function requestJoin(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/member', 'POST', form)
      .then((res) => {
        if (!res.data.success) {
          reject(res.data);
        } else {
          resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
}
