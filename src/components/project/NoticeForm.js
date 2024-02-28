import NoticeListContainer from '../../containers/project/NoticeListContainer';
import AddNoticeBtn from './AddNoticeBtn';

const NoticeForm = () => {
  return (
    <>
      <h3>
        📣 공지사항
        <AddNoticeBtn />
      </h3>
      <NoticeListContainer />
    </>
  );
};

export default NoticeForm;
