import { useParams } from 'react-router-dom';
import getProjectInfo from '../../api/project/ProjectMainView';
import ProjectMainForm from '../../components/project/ProjectMainForm';
import React, { useEffect, useState } from 'react';

const ProjectMainContainer = () => {
  const param = useParams();
  const projectSeq = param.projectSeq;
  const [item, setItem] = useState({});

  // 프로젝트 정보 가져오기
  useEffect(() => {
    getProjectInfo(projectSeq)
      .then((item) => {
        setItem(() => item);
      })
      .catch((err) => console.error(err));
  }, [projectSeq]);

  

  return <ProjectMainForm item={item}  />;
};

export default React.memo(ProjectMainContainer);
