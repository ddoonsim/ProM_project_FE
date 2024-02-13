import styled from 'styled-components';

export const InputText = styled.input`
  border: 1px solid #d5d5d5;
  padding: 0 20px;
  height: 35px;
  border-radius: 3px;
  width: ${({ width }) => width || '100%'};
`;