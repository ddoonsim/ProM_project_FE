import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalBox from '../commons/ModalBox';
import InviteMember from '../../pages/front/project/InviteMember';
import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';
import ChatRoom from '../../pages/chatting/ChatRoom';

const { primary, info, white } = colorNames;
const { small, medium, big, exrtaBig } = sizeNames;

const TeamMember = styled.div`
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
`;

const TeamMemberBox = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { seq } = item;
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <TeamMember>
      <div className="team_member">
        <h2>팀 구성원</h2>
        {item.member &&
          item.member.map(({ seq, name }) => <p key={seq}>{name}</p>)}
      </div>
      <div className="btns">
        {isOpen && (
          <ModalBox isOpen={isOpen} onClose={onClose}>
            <InviteMember />
          </ModalBox>
        )}
        <Link
          className="btn"
          name="invite_member"
          onClick={() => setIsOpen(!isOpen)}
        >
          팀원 초대하기
        </Link>
        {isOpen && (
          <ModalBox isOpen={isOpen} onClose={onClose}>
            <ChatRoom roomNo={seq + 'p'} />
          </ModalBox>
        )}
        <Link
          className="btn"
          name="chatroom"
          onClick={() => setIsOpen(!isOpen)}
        >
          팀 단체 채팅
        </Link>
      </div>
    </TeamMember>
  );
};

export default TeamMemberBox;
