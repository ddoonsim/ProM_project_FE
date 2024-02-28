import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalBox from '../commons/ModalBox';
import AddNoticeContainer from '../../containers/project/AddNoticeContainer';

const AddNoticeBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Link className="btn" onClick={() => setIsOpen(!isOpen)}>새 글 등록</Link>
      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <AddNoticeContainer />
        </ModalBox>
      )}
    </>
  );
};

export default AddNoticeBtn;
