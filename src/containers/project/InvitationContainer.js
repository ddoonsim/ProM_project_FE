import { useParams } from 'react-router-dom';
import InvitationForm from '../../components/project/InvitationForm';
import { useEffect, useState } from 'react';
import getProjectInfo from '../../api/project/ProjectMainView';

const InvitationContainer = () => {
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

  return <InvitationForm item={item} />;
};

export default InvitationContainer;
