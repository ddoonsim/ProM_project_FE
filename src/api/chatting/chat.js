import apiRequest from '../../lib/apiRequest';

/** 방목록 */
export const getRooms = () => apiRequest('/rooms');

/** 방정보  */
export const getRoom = (roomNo) => apiRequest(`/room/${roomNo}`);

/** 방등록 */
export const registerRoom = (form) => apiRequest('/room', 'POST', form);

/** 채팅 메세지 기록 */
export const registerMessage = (form) => apiRequest('/message', 'POST', form);
