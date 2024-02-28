import { useParams } from 'react-router-dom';
import getProjectInfo from '../../api/project/ProjectMainView';
import { getTasks } from '../../api/task/TaskInfo';
import ProjectMainForm from '../../components/project/ProjectMainForm';
import React, { useEffect, useState } from 'react';

const ProjectMainContainer = () => {
  const param = useParams();
  const projectSeq = param.projectSeq;
  const [item, setItem] = useState({});
  const [tasks, setTasks] = useState({});

  // 프로젝트 정보 가져오기
  useEffect(() => {
    getProjectInfo(projectSeq)
      .then((item) => {
        setItem(() => item);
        // console.log(item.member[0]);
      })
      .catch((err) => console.error(err));
  }, [projectSeq]);

  useEffect(() => {
    console.log('task list pseq', projectSeq);
    getTasks(projectSeq)
      .then((item) => {
        setTasks(() => item);
        console.log(item);
      })
      .catch((err) => console.error(err));
  }, [projectSeq]);

  return <ProjectMainForm item={item} tasks={tasks} />;
};

export default React.memo(ProjectMainContainer);
