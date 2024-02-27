import { Navigate, useParams } from 'react-router-dom';
import addTeamMember from '../../api/project/addTeamMember';
import Swal from 'sweetalert2';

const AcceptedContainer = () => {
  const param = useParams();
  const projectSeq = param.projectSeq;

  addTeamMember(projectSeq)
    .then((res) => {
      if (res) {
        Swal.fire({
          title: "프로젝트 수락 완료",
          text: "프로젝트에 참여를 수락하였습니다.",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.reload();
          }
        })
      }
    })
    .catch((res) => {
      if (res.status === 'BAD_REQUEST') {
        Swal.fire({
          title: "❌잘못된 접근입니다!",
          icon: "error"
        })
      }
    });

  return <Navigate to="/" />;
};

export default AcceptedContainer;
