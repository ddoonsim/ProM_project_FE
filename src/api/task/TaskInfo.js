import apiRequest from '../../lib/apiRequest';

/**
 * 업무 개별 조회
 * @param {*} seq
 * @returns
 */
export const getTask = (seq) => processResult(`/task/sub/${seq}`);

/**
 *
 * @param {*} seq : 프로젝트 등록번호
 * @returns
 */
export const getTasks = (seq) => processResult(`/task/${seq}`);

export const getMines = () => processResult('/task/mines');

function processResult(url) {
  return new Promise((resolve, reject) => {
    apiRequest(url)
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
