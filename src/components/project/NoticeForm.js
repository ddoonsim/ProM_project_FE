import AddNoticeBtn from './AddNoticeBtn';

const NoticeForm = ({pSeq}) => {
  return (
    <>
      <h3>
        📣 공지사항
        <AddNoticeBtn pSeq={pSeq} />
      </h3>
      <div className="notice_box"></div>
    </>
  );
};

export default NoticeForm;
