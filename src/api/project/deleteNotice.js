import apiRequest from "../../lib/apiRequest";

const deleteNotice = (form) => {
    return new Promise((resolve, reject) => {
      apiRequest('/notice/delete', 'POST', form)
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
  
  export default deleteNotice;