import styled from 'styled-components';

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

export const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: '#00000070',
  },
  content: {
    width: '800px',
    inset: 'unset',
    margin: '50vh auto',
    padding: '0 10px',
    transform: 'translateY(-50%)',
    position: 'relative',
    textAlign: 'center',
  },
};

export const closeBtn = {
  display: 'contents',
  fontSize: 'xx-large',
  position: 'absolute',
  cursor: 'pointer',
};

export const closeSvg = {
  position: 'absolute',
  right: '5px',
};
