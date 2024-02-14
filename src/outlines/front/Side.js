import styled from 'styled-components';
import user from '../../modules/user';
const Nav = styled.nav`
  width: 250px;
  background: #88b0bf;
  min-height: 700px;

  button {
    height: 30px;
  }

  hr {
    width: 70%;
    color: black;
  }
`;

const Side = () => {
  return (
    <Nav>
      <div>프로필 이미지</div>
      <div>유저 이름</div>
      <button>수정하기</button>
      <hr></hr>
      <ul>
        <li>프로젝트 목록</li>
        <li></li>
      </ul>
    </Nav>
  );
};

export default Side;
