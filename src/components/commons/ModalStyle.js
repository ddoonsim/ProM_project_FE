import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

export const ModalStyle = styled.div`
  width: 300px;
  height: 200px;

  z-index: 999;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;

  svg {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;