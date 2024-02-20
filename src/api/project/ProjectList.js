import apiRequest from '../../lib/apiRequest';

export default function getList() {
  return new Promise((resolve, reject) => {
    apiRequest('/project/list', 'GET')
      .then((res) => {
        if (!res.data.success) {
          reject(res.data);
        } else {
          resolve(res.data.data);
        //   console.log(res.data.data);
        }
      })
      .catch((err) => reject(err));
  });
}
