import apiRequest from '../../lib/apiRequest';

/** 방목록 */
export const getRooms = () => {
  return new Promise((resolve, reject) => {
    apiRequest('/chat/rooms').then((res) => {
      if (!res.data.success) {
        reject(res.data);
      } else {
        resolve(res.data.data);
      }
    });
  });
};
/** 방정보  */
export const getRoom = (roomNo) => {
  return new Promise((resolve, reject) => {
    apiRequest(`/chat/room/${roomNo}`).then((res) => {
      if (!res.data.success) {
        reject(res.data);
      } else {
        resolve(res.data.data);
      }
    });
  });
};

/** 방등록 */
export const registerRoom = (form) => {
  return new Promise((resolve, reject) => {
    apiRequest('/chat/room', 'POST', form).then((res) => {
      if (!res.data.success) {
        reject(res.data);
      } else {
        resolve(res.data.data);
      }
    });
  });
};

/** 채팅 메세지 기록 */
export const registerMessage = (form) => {
  return new Promise((resolve, reject) => {
    apiRequest('/chat/message', 'POST', form).then((res) => {
      if (!res.data.success) {
        reject(res.data);
      } else {
        resolve(res.data.data);
      }
    });
  });
};
