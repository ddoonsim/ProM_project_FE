import Modal from "react-modal";
import { useContext } from "react";
import ModalContext from "../../modules/modalContext";
import { CgClose } from 'react-icons/cg';
import { customStyles, closeBtn, closeSvg } from "../../components/commons/ModalStyle";

const ModalContainer = ({children}) => {
    const {
        state: {modalIsOpen},
        action: {setModalIsOpen},
      } = useContext(ModalContext);

    return (
        <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <button style={closeBtn} onClick={() => setModalIsOpen(false)}>
          <CgClose style={closeSvg} />
        </button>
        {children}
      </Modal>
    );
}

export default ModalContainer;