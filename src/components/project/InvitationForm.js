import { Link } from 'react-router-dom';
import { Container } from '../commons/ModalStyle';

const InvitationForm = ({ item }) => {
  const { seq, pname, description } = item;

  return (
    <Container>
      <form>
        <h1>{pname}에 참여하시겠습니까?</h1>
        <Link to={`/accepted/${seq}`}>YES</Link>
        <Link to='/'>No</Link>
      </form>
    </Container>
  );
};

export default InvitationForm;
