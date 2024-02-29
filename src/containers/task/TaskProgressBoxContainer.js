import { useParams } from 'react-router-dom';
import { getTasks } from '../../api/task/TaskInfo';
import React, { useEffect, useState } from 'react';

import TaskProgressBoxForm from '../../components/task/TaskProgressBoxForm';

const TaskProgressBoxContainer = ({ item }) => {
  const param = useParams();
  const projectSeq = param.projectSeq;
  const [tasks, setTasks] = useState({});
  useEffect(() => {
    getTasks(projectSeq)
      .then((item) => {
        setTasks(() => item);
      })
      .catch((err) => console.error(err));
  }, [projectSeq]);

  return <TaskProgressBoxForm tasks={tasks} item={item} />;
};

export default TaskProgressBoxContainer;
