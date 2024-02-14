import styled from 'styled-components';

// 푸터 스타일시트 설정
const OuterBox = styled.footer`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #fff;
  z-index: 1;
`;

// 푸터
const Footer = () => {
  return <OuterBox>푸터</OuterBox>;
};

export default Footer;
