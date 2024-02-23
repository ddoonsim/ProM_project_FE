import { BigButton } from '../commons/ButtonStyle';
import ErrorMessages from '../commons/ErrorMessages';
import { InputText } from '../commons/InputStyle';
import { Container } from '../commons/ModalStyle';
import styled from 'styled-components';

const MsgBox = styled.div`
    padding: 5px 0;
    width: 500px;
    background-color: #5a787863;
    font-size: larger;
    font-weight: 500;
    border-radius: 5px;
`;

const InviteMemberForm = ({ form, onSubmit, onChange, errors }) => {
  return (
    <Container>
      <h1>팀원 초대하기</h1>
      <form onSubmit={onSubmit}>
        <MsgBox className='mb5'>
            <p>사이트에 가입된 이메일 혹은 가입할 이메일을 입력해주세요😊</p>
        </MsgBox>
        <dl>
          <dt>수신자</dt>
          <dd>
            <InputText
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="초대할 회원의 이메일을 입력하세요."
            ></InputText>
          </dd>
        </dl>
        <ErrorMessages errors={errors} field="email" />
        <BigButton
          type="submit"
          className="mt10 mb10"
          name="sendEmailBtn"
          width="250px"
        >
          초대 이메일 전송📧
        </BigButton>
      </form>
    </Container>
  );
};

export default InviteMemberForm;
