import apiRequest from '../../lib/apiRequest';

const addTeamMember = function (projectSeq) {
  return new Promise((resolve, reject) => {
    apiRequest(`/project/addTeamMember?projectSeq=${projectSeq}`, 'GET')
      .then((res) => {
        if (!res.data.success) {
          reject(res.data);
        } else {
          resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
};

export default addTeamMember;
