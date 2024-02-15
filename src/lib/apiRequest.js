import axios from 'axios';
import cookies from 'react-cookies';

export default function apiRequest(
  url,
  method = 'GET',
  data = null,
  headers = null,
) {
  if (!/^https[s]?/i.test(url)) {
    // 외부 API인 경우 https(s)로 시작, 내부 API인 경우 localhost:2000 고정
    url = process.env.REACT_APP_API_URL + url;
  }

  // 요청 데이터(data) 있고, method가 GET 방식 -> 쿼리스트링으로 변환
  if (method.toUpperCase() === 'GET' && data) {
    const searchParams = new URLSearchParams(data);
    url += `?${searchParams.toString()}`;
    data = null;
  }
  const token = cookies.load('token');
  if (token) {
    headers = headers || {};
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({
    method,
    url,
    data,
    headers,
    validateStatus: (state) => state < 500,
  });
}
