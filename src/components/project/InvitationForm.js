import { Link } from 'react-router-dom';
import { OuterBox } from '../commons/OutlineStyles';
import styled from 'styled-components';
import { BigButton, ButtonGroup } from '../commons/ButtonStyle';

const InvitationBox = styled.form`
  .yesBtn {
    color: white;
  }

  .descriptionBox {
    padding: 20px;
    background-color: #ddd;
    border-radius: 10px; 
    font-size: medium;
  }
`;

const InvitationForm = ({ item }) => {
  const { seq, pname, description } = item;

  return (
    <OuterBox>
      <InvitationBox>
        <h1>프로젝트 [{pname}]에 참여하시겠습니까?</h1>
        <div className="descriptionBox">{description}</div>
        <ButtonGroup>
          <BigButton
            type="reset"
            color="info"
            bcolor="info"
            height="50px"
            size="medium"
          >
            <Link className="yesBtn" to={`/accepted/${seq}`}>
              YES
            </Link>
          </BigButton>
          <BigButton
            type="reset"
            color="white"
            bcolor="black"
            height="50px"
            size="medium"
          >
            <Link to="/dashboard">No</Link>
          </BigButton>
        </ButtonGroup>
      </InvitationBox>
    </OuterBox>
  );
};

export default InvitationForm;
