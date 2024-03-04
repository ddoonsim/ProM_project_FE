import React, { useEffect, useState } from 'react';
import getNoticeList from '../../api/project/noticeList';
import NoticeListBox from '../../components/project/NoticeListBox';
import { useParams } from 'react-router-dom';

const NoticeListContainer = () => {
  const { projectSeq } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 공지글 목록 가져오기
    getNoticeList(projectSeq)
      .then((items) => {
        setItems(() => items);
      })
      .catch((err) => console.error(err));
  }, [projectSeq]);

  return <NoticeListBox items={items} />;
};

export default React.memo(NoticeListContainer);
