import apiRequest from "../../lib/apiRequest";

const updateNotice = (form) => {
    return new Promise((resolve, reject) => {
      apiRequest('/notice/update', 'POST', form)
        .then((res) => {
          if (!res.data.success) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        })
        .catch((err) => reject(err));
    });
  };
  
  export default updateNotice;