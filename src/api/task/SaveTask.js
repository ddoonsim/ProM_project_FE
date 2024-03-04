import apiRequest from '../../lib/apiRequest';

const saveTask = (task, pSeq) =>
  new Promise((resolve, reject) => {
    const members = task.members ? task.members.map((m) => m.value) : [];
    apiRequest(`/task/save`, 'POST', { ...task, pSeq, members })
      .then((res) => {
        if (res.data.success) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => reject(err));
  });

export default saveTask;
