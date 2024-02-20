import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { MainTitle, SubTitle } from '../commons/TitleStyle';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

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

      a {
        margin-left: 530px;
        padding: 5px 20px;
        background-color: ${info};
        border-radius: 5px;
        color: ${white};
      }

      .notice_box {
        min-height: 120px;
        padding: 5px 20px;
        background-color: ${white};
        border-radius: 20px;
      }
    }

    .team_member_box {
      width: 500px;
      min-height: 200px;
      display: flex;
      margin: 50px;
      padding: 10px 50px;
      background-color: ${white};
      border-radius: 20px;

      .team_member {
        width: 300px;

        p {
            font-size: ${medium};
        }
      }

      .btns {
        padding: 30px;

        .btn {
          margin: 10px 0;
          display: grid;
          text-align: center;
          border: none;
          width: 150px;
          height: 40px;
          line-height: 38px;
          border-radius: 3px;
          box-shadow: gray 1px 1px 3px;
          color: ${white};
          background: ${info};
          font-size: ${medium};
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
  }

  .tasks_progress_box {
    padding: 10px 80px;

    .progress_name {
      display: flex;
      padding-left: 160px;

      h3 + h3 {
        padding-left: 320px;
      }
    }
  }

  .progress_boxes {
    display: flex;

    .inner_box {
      width: 350px;
      height: 400px;
      padding: 20px;
      border: 0.5px solid gray;
      border-radius: 20px;
    }

    .inner_box + .inner_box {
      margin-left: 10px;
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
  const { pname, description } = item;
  return (
    <ProjectDashBoard className="container">
      <div className="project_info_box">
        <div className="info_box">
          <MainTitle borderBottom="none">
            <FiMoreVertical />
            &nbsp;&nbsp;{pname}
          </MainTitle>

          <p>{description}</p>

          <h3>
            📣 공지사항
            <Link>새 글 등록</Link>
          </h3>
          <div className="notice_box"></div>
        </div>
        <div className="team_member_box">
          <div className="team_member">
            <h2>팀 구성원</h2>
            {item.member && item.member.map(({ seq, name }) => (
              <p key={seq}>{name}</p>
            ))}
          </div>
          <div className="btns">
            <Link className="btn" name="invite_member">
              팀원 초대하기
            </Link>
            <Link className="btn" name="chat">
              팀 단체 채팅
            </Link>
          </div>
        </div>
      </div>

      <SubTitle border_width={0.5} color="#aaa">
        업무 진행 상황
        <Link className="plus_btn">업무 추가</Link>
      </SubTitle>
      <div className="tasks_progress_box">
        <div className="progress_name">
          <h3>예정</h3>
          <h3>진행 중</h3>
          <h3>완료</h3>
          <h3>보류</h3>
        </div>
        <div className="progress_boxes">
          <div className="inner_box">화면 설계</div>
          <div className="inner_box">로고 디자인</div>
          <div className="inner_box">로그인 및 회원가입</div>
          <div className="inner_box">네이버 로그인 API</div>
        </div>
      </div>
    </ProjectDashBoard>
  );
};

export default ProjectMainForm;
