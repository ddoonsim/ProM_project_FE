import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import moment from '../../../node_modules/moment/moment';
import AddTaskForm from '../../components/task/AddTaskForm';
import createTask from '../../api/task/NewTask';
const AddTaskContainer = ({ item }) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [editor, setEditor] = useState(null);
  const [member, setMember] = useState([]);
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [form, setForm] = useState({
    gid: '' + Date.now(),
    member: member,
    tName: '',
    description: '',
    sDate: startDate,
    eDate: endDate,
    pSeq: 0,
    status: status,
  });

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
  /* 프로젝트 구성 멤버 */
  let options = [];
  options = item.member.map(({ seq, name }) => {
    let obj = {};
    obj['value'] = seq;
    obj['label'] = name;
    return obj;
  });

  /* status */
  const statusChange = useCallback((e) => {
    setStatus(e.target.value);
  }, []);

  /* member */
  const handleChange = useCallback((e) => {
    const options = [...e];
    setMember(options.map((value) => value.value));
  }, []);

  /* form */
  const onChange = useCallback(
    (e) => {
      const target = e.currentTarget;
      setForm(
        produce((draft) => {
          draft[target.name] = target.value;

          draft['member'] = member;
          draft['pSeq'] = item.seq;
          draft['status'] = status;
          draft['sDate'] = startDate;
          draft['eDate'] = endDate;
        }),
      );
    },
    [member, status, item, editor, startDate, endDate],
  );

  /* date */
  const changeDate = (e) => {
    const startDateFormat = moment(e[0]).format('YYYY-MM-DD');
    const endDateFormat = moment(e[1]).format('YYYY-MM-DD');

    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
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
      createTask(form)
        .then(() => {
          alert('새 업무를 생성했습니다.');

          window.location.reload();
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, member, editor, status, startDate, endDate],
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
    <AddTaskForm
      form={form}
      handleChange={handleChange}
      onChange={onChange}
      onSubmit={onSubmit}
      options={options}
      errors={errors}
      onEditor={onEditor}
      editor={editor}
      setEditor={setEditor}
      fileUploadCallback={fileUploadCallback}
      statusChange={statusChange}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      changeDate={changeDate}
    />
  );
};

export default AddTaskContainer;
