import { useState, useEffect, createContext } from 'react';
import Modal from 'react-modal';

const modalsState = {
  state: { modalIsOpen: false },
  action: { setModalIsOpen: () => {} },
};

// modal을 열고 닫는 함수
export const ModalContext = createContext(modalsState);

const ModalProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setModalIsOpen(modalIsOpen);
  }, [modalIsOpen]);

  const value = {
    state: { modalIsOpen },
    action: { setModalIsOpen },
  };

  return (
    <ModalContext.Provider value={value}>
      {/* <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button onClick={() => setModalIsOpen(false)}> modal close</button> */}
        {children}
      {/* </Modal> */}
    </ModalContext.Provider>
  );
};

const { Consumer: ModalConsumer } = ModalContext;

export { ModalProvider, ModalConsumer };

export default ModalContext;
