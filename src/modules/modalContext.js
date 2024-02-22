import { useState, useEffect, createContext } from 'react';

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
        {children}
    </ModalContext.Provider>
  );
};

const { Consumer: ModalConsumer } = ModalContext;

export { ModalProvider, ModalConsumer };

export default ModalContext;
