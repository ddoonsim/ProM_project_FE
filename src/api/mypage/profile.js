import apiRequest from '../../lib/apiRequest';

export default function requestProfile(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/mypage/edit', 'POST', form)
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
