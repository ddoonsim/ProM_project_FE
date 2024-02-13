import styled from 'styled-components';
import colorNames from '../../styles/colors';

const { primary } = colorNames;

export const OuterBox = styled.div`
  background: #fff;
  padding: 50px 100px;
  width: 100%;
  max-width: 800px;
  min-height: 800px;
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 2px 2px 5px ${primary};
`;
