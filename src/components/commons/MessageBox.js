import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

const { primary } = colorNames;
const { medium } = sizeNames;

const MsgBox = styled.div`
  background: #fff;
  padding: 20px;
  width: 500px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px ${primary};
  text-align: center;
  font-size: ${medium};
  font-weight: 500;
`;

const MessageBox = () => {
  return <MsgBox>로그인이 필요한 페이지입니다. 로그인 후 이용바랍니다.</MsgBox>;
};

export default MessageBox;
