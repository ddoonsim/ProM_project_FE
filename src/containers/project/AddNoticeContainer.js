import React, { useCallback, useState } from 'react';
import AddNoticeForm from '../../components/project/AddNoticeForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { produce } from 'immer';
import newNotice from '../../api/project/newNotice';
import Swal from 'sweetalert2';
import { deleteFile } from '../../api/file/file';

const AddNoticeContainer = () => {
  const [form, setForm] = useState({
    gid: '' + Date.now(),
  });

  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const [editor, setEditor] = useState(null);
  const [attached_file, setAttachedFile] = useState([]);

  const { projectSeq } = useParams();

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

      // 등록 컨트롤러 호출
      newNotice(form)
        .then(() => {
          Swal.fire({
            title: '공지글 등록 완료',
            text: '새 공지글을 등록했습니다.',
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
      }),
    );
  }, [editor]);

  // 파일 삭제_미완ㅠㅠㅠㅠ
  const onDelete = useCallback((e) => {
    const target = e.currentTarget;
    console.log(target)

    deleteFile(target.value)
      .then((data) => console.log(data, "파일 삭제"))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AddNoticeForm
      form={form}
      errors={errors}
      onSubmit={onSubmit}
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

export default React.memo(AddNoticeContainer);
