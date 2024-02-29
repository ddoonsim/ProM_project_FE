import React, { useCallback, useEffect, useState } from 'react';
import EditNoticeForm from '../../components/project/EditNoticeForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { produce } from 'immer';
import updateNotice from '../../api/project/updateNotice';
import getNoticeInfo from '../../api/project/noticeInfo';
import Swal from 'sweetalert2';
import deleteNotice from '../../api/project/deleteNotice';

const EditNoticeContainer = ({ seq }) => {
  const { projectSeq } = useParams();
  const [form, setForm] = useState({
    gid: '' + Date.now(),
  });

  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const [editor, setEditor] = useState();

  useEffect(() => {
    getNoticeInfo(seq)
      .then((data) => {
        setForm(() => data);
      })
      .catch((err) => console.error(err));
  }, [seq, editor]);

  // 파일 업로드 콜백 함수
  const fileUploadCallback = useCallback(
    (files) => {
      let html = '';
      for (const file of files) {
        html += `<img src='${file.fileUrl}' />`;
      }
      editor.setData(html);
    },
    [editor],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /* 제목 필수 입력 사항 체크 S */
      const _errors = {};
      let hasError = false;
      if (!form.tname) {
        _errors.tname = _errors.agree || [];
        _errors.tname.push(t('NotBlank_tname'));

        hasError = true;
      }

      if (hasError) {
        setErrors(() => _errors);

        return;
      }
      /* 제목 필수 입력 사항 체크 E */

      // 업데이트 컨트롤러 호출
      updateNotice(form)
        .then(() => {
          Swal.fire({
            title: '공지글 수정 완료',
            text: '공지글을 수정했습니다.',
            icon: 'success',
          }).then((res) => {
            if (res.isConfirmed || res.isDismissed) {
              window.location.reload();
            }
          });
        })
        .catch((err) => console.error(err));
    },
    [form, t],
  );

  // 공지글 삭제
  const onClick = useCallback(() => {
    console.log(form.seq);
    deleteNotice(form)
      .then(() => {
        alert('공지글이 삭제되었습니다.');
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }, [form]);

  // 공지 제목 입력 시
  const onChange = useCallback(
    (e) => {
      const target = e.currentTarget;
      setForm(
        produce((draft) => {
          draft[target.name] = target.value;
          draft['pSeq'] = projectSeq;
        }),
      );
    },
    [projectSeq],
  );

  // ckeditor에 조작할 때
  const onEditor = useCallback(() => {
    setForm(
      produce((draft) => {
        draft.description = editor ? editor.getData() : '';
        draft['pSeq'] = projectSeq;
      }),
    );
  }, [editor, projectSeq]);

  return (
    <EditNoticeForm
      form={form}
      errors={errors}
      onSubmit={onSubmit}
      onClick={onClick}
      onChange={onChange}
      onEditor={onEditor}
      editor={editor}
      setEditor={setEditor}
      fileUploadCallback={fileUploadCallback}
    />
  );
};

export default React.memo(EditNoticeContainer);
