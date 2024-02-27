import apiRequest from '../../lib/apiRequest';

export default function createTask(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/task/new', 'POST', form)
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
