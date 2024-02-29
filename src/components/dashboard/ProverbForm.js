import styled from 'styled-components';
import background_img from '../../images/proverb_background.jpg';

const ProverbBox = styled.div`
  margin: 0 10px;
  padding: 50px 25px;
  width: 500px;
  border: 1px solid #aaa;
  border-radius: 10px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 2rem;
  color: #fff;
  align-self: center;
  background-image: url(${background_img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const proverbs = [
  '꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다.',
  '하루하루를 마지막이라고 생각하라. \r\n그러면 예측할 수 없는 시간은 그대에게 더 많은 시간을 줄 것이다.',
  '오늘을 붙들어라. 되도록 이면 내일에 의지하지 말라.\r\n그날 그날이 일 년 중에서 최선의 날이다.',
  '진짜 문제는 사람들의 마음이다.\r\n그것은 절대로 물리학이나 윤리학의 문제가 아니다.',
  '가장 바쁜 사람이 가장 많은 시간을 갖는다.\r\n부지런히 노력하는 사람이 결국 많은 대가를 얻는다.',
  '행복은 결코 많고 큰 데만 있는 것이 아니다.\r\n작은 것을 가지고도 고마워하고 만족할 줄 안다면 그는 행복한 사람이다.\r\n여백과 공간의 아름다움은 단순함과 간소함에 있다.',
  '우리는 일 년 후면 다 잊어버릴 슬픔을 간직하느라고\r\n무엇과도 바꿀 수 없는 소중한 시간을 버리고 있습니다.\r\n소심하게 굴기에 인생은 너무나 짧습니다.',
];
const getRandomIndex = (length) => {
  return parseInt(Math.random() * length);
};

const ProverbForm = () => {
  return (
    <ProverbBox>
      <pre>{proverbs[getRandomIndex(proverbs.length)]}</pre>
    </ProverbBox>
  );
};

export default ProverbForm;
