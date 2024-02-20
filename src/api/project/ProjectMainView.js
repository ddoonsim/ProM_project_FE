import apiRequest from '../../lib/apiRequest';

export default function getProjectInfo(projectSeq) {
  return new Promise((resolve, reject) => {
    apiRequest(`/project?projectSeq=${projectSeq}`, 'GET')
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
