import React from 'react';
import Modal from 'react-modal';
import { closeBtn, closeSvg, customStyles } from './ListModalStyle';
import { CgClose } from 'react-icons/cg';

const ListModalBox = ({
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
      <button style={closeBtn} onClick={onClose}>
        <CgClose style={closeSvg} />
      </button>
      {subTitle && <h2>{subTitle}</h2>}
      {children}
    </Modal>
  );
};

export default React.memo(ListModalBox);
