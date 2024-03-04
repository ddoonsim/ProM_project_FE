import React, { useCallback, useEffect, useState } from 'react';
import EditNoticeForm from '../../components/project/EditNoticeForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { produce } from 'immer';
import updateNotice from '../../api/project/updateNotice';
import getNoticeInfo from '../../api/project/noticeInfo';
import Swal from 'sweetalert2';
import deleteNotice from '../../api/project/deleteNotice';
import { deleteFile, getFiles } from '../../api/file/file';

const EditNoticeContainer = ({ seq }) => {
  const { projectSeq } = useParams();
  const [form, setForm] = useState({
    gid: '' + Date.now(),
  });

  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const [editor, setEditor] = useState();
  const [attached_file, setAttachedFile] = useState([]);

  useEffect(() => {
    getNoticeInfo(seq)
      .then((data) => {
        setForm(() => data);
      })
      .catch((err) => console.error(err));

    getFiles(form.gid, 'notice')
      .then((items) => attached_file.push(...items))
      .catch((err) => console.error(err));
  }, [seq, editor, form.gid, attached_file]);

  // 파일 업로드 콜백 함수
  const fileUploadCallback = useCallback(
    (files) => {
      let html = editor ? editor.getData() : '';
      for (const file of files) {
        if (file.fileType.indexOf('image/') !== -1) {
          html += `<img src='${file.fileUrl}' />`;
        }
        attached_file.push(file);
        html += `${file.fileName} 파일 업로드`;
      }
      editor.setData(html);
    },
    [editor, attached_file],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /* 제목 필수 입력 사항 체크 S */
      const _errors = {};
      let hasError = false;
      if (!form.tname) {
        _errors.tname = _errors.tname || [];
        _errors.tname.push(t('NotBlank_tname'));

        hasError = true;
      }
      if (!form.description) {
        _errors.description = _errors.description || [];
        _errors.description.push(t('NotBlank_description'));

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
    deleteNotice(form)
      .then(() => {
        Swal.fire({
          title: '공지글 삭제 완료',
          text: '공지글이 삭제되었습니다.',
          icon: 'success',
        }).then((res) => {
          if (res.isConfirmed || res.isDismissed) {
            window.location.reload();
          }
        });
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

  // 파일 삭제
  const onDelete = useCallback((e) => {
    const target = e.currentTarget;

    deleteFile(target.value)
      .then((data) => console.log(data, "파일 삭제"))
      .catch((err) => console.error(err));
  }, []);

  return (
    <EditNoticeForm
      form={form}
      errors={errors}
      onSubmit={onSubmit}
      onClick={onClick}
      onChange={onChange}
      onDelete={onDelete}
      onEditor={onEditor}
      editor={editor}
      setEditor={setEditor}
      fileUploadCallback={fileUploadCallback}
      attached_file={attached_file}
    />
  );
};

export default React.memo(EditNoticeContainer);
