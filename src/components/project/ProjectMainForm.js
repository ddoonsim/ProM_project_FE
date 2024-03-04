import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { MainTitle, SubTitle } from '../commons/TitleStyle';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import EditInfoBtn from './EditProjectInfoBtn';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';
import ModalBox from '../commons/ModalBox';
import TeamMemberBox from './TeamMemberBox';
import NoticeContainer from '../../containers/project/NoticeContainer';
import TaskDetailContainer from '../../containers/task/TaskDetailContainer';
import TaskProgressBox from '../../pages/front/task/TaskProgressBox';

const { primary, info, white } = colorNames;
const { small, medium, big, exrtaBig } = sizeNames;

const ProjectDashBoard = styled.div`
  .project_info_box {
    display: flex;
    margin-bottom: 15px;

    .info_box {
      width: 800px;
      margin: 0 40px;

      svg {
        vertical-align: middle;
      }

      p {
        padding: 0 20px 20px;
        border-bottom: 0.5px solid #aaa;
        font-size: ${medium};
      }

      h3 {
        padding: 0 20px;
        font-size: 1.25rem;
        font-weight: 500;
      }

      .btn {
        margin-left: 530px;
        padding: 5px 20px;
        background-color: ${info};
        border-radius: 5px;
        color: ${white};
      }
    }
  }

  .plus_btn {
    margin-left: 1200px;
    padding: 5px 20px;
    background-color: ${primary};
    border-radius: 5px;
    color: ${white};
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

const ProjectMainForm = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const { seq, pname, description } = item;
  return (
    <ProjectDashBoard className="container">
      <div className="project_info_box">
        <div className="info_box">
          <MainTitle borderBottom="none">
            {/* 프로젝트 제목과 설명을 수정할 수 있는 폼 Open 버튼 */}
            <EditInfoBtn />
            &nbsp;&nbsp;{pname}
          </MainTitle>

          <p>{description}</p>

          {/* 공지글 박스 */}
          <NoticeContainer />
        </div>
        {/* 팀 구성원 박스 */}
        <TeamMemberBox item={item} />
      </div>

      <SubTitle border_width={0.5} color="#aaa">
        업무 진행 상황
        <Link className="plus_btn" onClick={() => setIsOpen(!isOpen)}>
          업무 추가
        </Link>
      </SubTitle>

      {/* 업무 진행 칸반 보드 */}
      <TaskProgressBox item={item} />

      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <TaskDetailContainer pSeq={item.seq} members={item.member} />
        </ModalBox>
      )}
    </ProjectDashBoard>
  );
};

export default ProjectMainForm;
