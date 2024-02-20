import apiRequest from '../../lib/apiRequest';

export const fileUpload = (formData) =>
  new Promise((resolve, reject) =>
    apiRequest('/file', 'POST', formData)
      .then((res) => {
        if (res.data.success) resolve(res.data.data);
        else reject(res);
      })
      .catch((err) => reject(err)),
  );
