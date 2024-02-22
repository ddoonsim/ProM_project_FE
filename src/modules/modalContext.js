import { useState, useCallback, createContext } from 'react';

const modalsState = {
  isOpen: false,
  setIsOpen: null,
};

// modal을 열고 닫는 함수
export const ModalContext = createContext(modalsState);

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const OpenAndCloseModal = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }

    if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  const value = {
    state: { isOpen },
    action: { setIsOpen },
  };

  return (
    <ModalProvider.Provider value={value}>{children}</ModalProvider.Provider>
  );
};

const { Consumer: ModalConsumer } = ModalContext;

export { ModalProvider, ModalConsumer };

export default ModalContext;
