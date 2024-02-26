import { Link } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { useCallback, useState } from 'react';
import ModalBox from '../commons/ModalBox';
import NewProject from '../../pages/front/project/NewProject';

const EditInfoBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Link onClick={() => setIsOpen(!isOpen)}>
        <FiMoreVertical />
      </Link>

      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <NewProject mode={'edit'} />
        </ModalBox>
      )}
    </>
  );
};

export default EditInfoBtn;
