import apiRequest from '../../lib/apiRequest';

export default function getNoticeList(pSeq) {
  return new Promise((resolve, reject) => {
    apiRequest(`/notice/list?pSeq=${pSeq}`, 'GET')
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
