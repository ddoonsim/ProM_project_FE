import home_ex from '../../images/home_ex.png';
import styled from 'styled-components';

const Img = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const Home = () => {
  return (
    <Img>
      <img src={home_ex} width="100%" alt="home" />
    </Img>
  );
};

export default Home;
