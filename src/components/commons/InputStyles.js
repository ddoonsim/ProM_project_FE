import styled from 'styled-components';
import colorNames from '../../styles/colors';

const { info } = colorNames;

export const InputText = styled.input`
  border: 1px solid ${info};
  padding: 0 20px;
  height: 35px;
  border-radius: 3px;
  width: ${({ width }) => width || '100%'};
`;
