import { Navigate, useParams } from 'react-router-dom';
import addTeamMember from '../../api/project/addTeamMember';

const AcceptedContainer = () => {
  const param = useParams();
  const projectSeq = param.projectSeq;

  addTeamMember(projectSeq)
    .then((res) => {
      if (res) {
        alert('프로젝트에 참여를 수락하였습니다.');
        window.location.reload();
      }
    })
    .catch((res) => {
      if (res.status === 'BAD_REQUEST') {
        alert('❌잘못된 접근입니다!');
      }
    });

  return <Navigate to="/" />;
};

export default AcceptedContainer;
