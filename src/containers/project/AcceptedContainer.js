import { Navigate, useParams } from 'react-router-dom';
import addTeamMember from '../../api/project/addTeamMember';

const AcceptedContainer = () => {
  const param = useParams();
  const projectSeq = param.projectSeq;

  addTeamMember(projectSeq);

  return <Navigate to='/' />;
};

export default AcceptedContainer;
