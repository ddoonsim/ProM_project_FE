import apiRequest from '../../lib/apiRequest';

export default function createProject(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/project/new', 'POST', form)
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
