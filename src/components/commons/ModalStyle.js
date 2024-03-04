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

// 모달 창 스타일
export const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: '#00000070',
  },
  content: {
    width: 'fit-content',
    maxHeight: '850px',
    inset: 'unset',
    margin: '50vh auto',
    padding: '0 10px',
    transform: 'translateY(-50%)',
    position: 'relative',
    textAlign: 'center',
  },
};

// 닫기 버튼
export const closeBtn = {
  display: 'contents',
  fontSize: 'xx-large',
  position: 'absolute',
  cursor: 'pointer',
};

// X svg 요소 위치 고정
export const closeSvg = {
  position: 'absolute',
  right: '5px',
};

// 모달 창 내부 폼 스타일
export const Container = styled.div`
margin: 0 50px 10px;
display: inline-block;
max-width: 1200px;

  dl {
    display: flex;
    padding: 10px 15px;
    align-items: center;

    dt {
      width: 130px;
      font-size: medium;
    }

    dd {
      flex-grow: 1;
      width: 300px;
  }
`;
