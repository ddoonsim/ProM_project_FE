import apiRequest from '../../lib/apiRequest';

export default function getNoticeInfo(seq) {
  return new Promise((resolve, reject) => {
    apiRequest(`/notice/info?seq=${seq}`, 'GET')
      .then((res) => {
        if (!res.data.success) {
          reject(res.data);
        } else {
          resolve(res.data.data);
        }
      })
      .catch((err) => reject(err));
  });
}
