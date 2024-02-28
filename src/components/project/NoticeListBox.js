import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalBox from '../commons/ModalBox';
import EditNoticeContainer from '../../containers/project/EditNoticeContainer';

const NoticeBox = styled.div`
  height: 120px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 20px;
  overflow-y: auto;

  .list {
    display: block;
    font-size: medium;
  }
`;

const NoticeListBox = ({ items }) => {
  items = items || [];

  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

  const [noticeSeq, setNoticeSeq] = useState({});

  return (
    <NoticeBox>
      {items.length > 0 ? (
        items.map(({ seq, tname }) => (
          <>
            <Link
              className=" list"
              onClick={() => {
                setNoticeSeq(() => seq);
                setIsOpen(!isOpen);
              }}
              key={seq}
            >
              {'📌 ' + tname}
            </Link>
          </>
        ))
      ) : (
        <div>없음</div>
      )}

      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <EditNoticeContainer seq={noticeSeq} />
        </ModalBox>
      )}
    </NoticeBox>
  );
};

export default NoticeListBox;
