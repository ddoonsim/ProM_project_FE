import { useCallback, useState } from 'react';
import AddNoticeForm from '../../components/project/AddNoticeForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { produce } from 'immer';
import newNotice from '../../api/project/newNotice';

const AddNoticeContainer = () => {
  const [form, setForm] = useState({
    gid: '' + Date.now(),
  });

  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const [editor, setEditor] = useState(null);

  const { projectSeq } = useParams();

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
      if (!form.tName) {
        _errors.tName = _errors.agree || [];
        _errors.tName.push(t('NotBlank_tName'));

        hasError = true;
      }

      if (hasError) {
        setErrors(() => _errors);

        return;
      }
      /* 제목 필수 입력 사항 체크 E */

      // 등록 컨트롤러 호출
      newNotice(form)
        .then((res) => {
          if (res) {
            alert('✅새 공지를 등록했습니다.');
            window.location.reload();
          }
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
        draft.description = editor.getData();
      }),
    );
  }, [editor]);

  return (
    <AddNoticeForm
      form={form}
      errors={errors}
      onSubmit={onSubmit}
      onChange={onChange}
      onEditor={onEditor}
      editor={editor}
      setEditor={setEditor}
      fileUploadCallback={fileUploadCallback}
    />
  );
};

export default AddNoticeContainer;
