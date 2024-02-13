import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

const { primary } = colorNames;
const { normal } = sizeNames;

const ErrorMsgStyle = styled.div`
  padding: 5px 15px;
  width: 100%;
  text-align: center;
  color: #BF0F0F;
  font-size: ${normal};
  margin: 5px 0;
`;

export default ErrorMsgStyle;
