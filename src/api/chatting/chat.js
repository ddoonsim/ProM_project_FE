import apiRequest from '../../lib/apiRequest';

/** 방목록 */
export const getRooms = () => apiRequest('/chat/rooms');

/** 방정보  */
export const getRoom = (roomNo) => apiRequest(`/chat/room/${roomNo}`);

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
export const registerMessage = (form) =>
  apiRequest('/chat/message', 'POST', form);
