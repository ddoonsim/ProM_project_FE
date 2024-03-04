import apiRequest from '../../lib/apiRequest';

// 파일 업로드
export const fileUpload = (formData) =>
  new Promise((resolve, reject) =>
    apiRequest('/file', 'POST', formData)
      .then((res) => {
        if (res.data.success) resolve(res.data.data);
        else reject(res);
      })
      .catch((err) => reject(err)),
  );

// 저장된 파일 목록
export function getFiles(gid, location) {
  return new Promise((resolve, reject) => {
    apiRequest(`/file/getList?gid=${gid}&location=${location}`, 'GET')
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

export function deleteFile(seq) {
  return new Promise((resolve, reject) => {
    apiRequest(`/file/delete/${seq}`, 'DELETE')
      .then((res) => {
        if (res.data.success) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => reject(err));
  });
}
