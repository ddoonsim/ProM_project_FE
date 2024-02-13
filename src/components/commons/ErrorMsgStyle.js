import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

const { primary } = colorNames;
const { normal } = sizeNames;

const ErrorMsgStyle = styled.div`
  box-shadow: 2px 2px 5px
  ${({ bcolor }) => (bcolor ? colorNames[bcolor] : primary)};
  padding: 5px 15px;
  width: 100%;
  text-align: center;
  color: #BF0F0F;
  font-size: ${normal};
  border-radius: 3px;
  margin: 5px 0;
`;

export default ErrorMsgStyle;
