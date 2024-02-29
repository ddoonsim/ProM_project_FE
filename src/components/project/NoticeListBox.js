import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalBox from '../commons/ModalBox';
import EditNoticeContainer from '../../containers/project/EditNoticeContainer';
import moment from 'moment';

const NoticeBox = styled.div`
  height: 120px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 20px;
  overflow-y: auto;

  .list {
    display: block;
    font-size: medium;
    padding: 5px;

    .createdAt {
      float: inline-end;
      color: gray;
    }
  }

  .list + .list {
    border-top: 0.5px dotted #aaa;
  }

  .none {
    color: gray;
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
        items.map(({ seq, tname, modifiedAt, createdAt }) => (
          <>
            <Link
              className=" list"
              onClick={() => {
                setNoticeSeq(() => seq);
                setIsOpen(!isOpen);
              }}
              key={seq}
            >
              {'📌 ' + tname}{' '}
              <div className="createdAt">
                {moment(modifiedAt || createdAt).format('YYYY-MM-DD HH:mm')}
              </div>
            </Link>
          </>
        ))
      ) : (
        <div className="list none">
          팀원들에게 공유하고자 하는 내용을 공지글로 등록해보세요😊
        </div>
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
