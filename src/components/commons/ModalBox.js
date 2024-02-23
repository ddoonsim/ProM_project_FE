import React from 'react';
import Modal from 'react-modal';
import { customStyles } from './ModalStyle';

const ModalBox = ({
  isOpen,
  onAfterOpen,
  onClose,
  title,
  subTitle,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={title}
    >
      {subTitle && <h2>{subTitle}</h2>}
      {children}
    </Modal>
  );
};

export default React.memo(ModalBox);