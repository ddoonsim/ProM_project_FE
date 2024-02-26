import apiRequest from '../../lib/apiRequest';

const updateInfo = (form) => {
  return new Promise((resolve, reject) => {
    apiRequest('/project/update', 'POST', form)
      .then((res) => {
        if (!res.data.success) {
          reject(res.data);
        } else {
          resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
};

export default updateInfo;
