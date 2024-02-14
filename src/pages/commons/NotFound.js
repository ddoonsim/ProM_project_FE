import E404 from '../../images/errors/404.png';
import styled from 'styled-components';

const NotFoundPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const NotFound = () => {
  return (
    <NotFoundPage>
      <img src={E404} alt="error 404" />
    </NotFoundPage>
  );
};

export default NotFound;
