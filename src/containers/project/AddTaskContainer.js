import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import AddTaskForm from '../../components/task/AddTaskForm';
import createTask from '../../api/task/NewTask';
const AddTaskContainer = ({ item }) => {
  const { t } = useTranslation();

  const [member, setMember] = useState([]);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    member: member,
    tName: '',
    description: '',
    sDate: '',
    eDate: '',
    pSeq: 0,
    status: '',
  });
  const [errors, setErrors] = useState({});

  /* 프로젝트 구성 멤버 */
  let options = [];
  options = item.member.map(({ seq, name }) => {
    let obj = {};
    obj['value'] = seq;
    obj['label'] = name;
    return obj;
  });

  /* member */
  const handleChange = useCallback((e) => {
    const options = [...e];
    setMember(options.map((value) => value.value));
  }, []);

  /* form */
  const onChange = useCallback(
    (e) => {
      const target = e.currentTarget;
      console.log(target);
      setForm(
        produce((draft) => {
          draft[target.name] = target.value;

          draft['member'] = member;
          draft['pSeq'] = item.seq;
          draft['status'] = status
        }),
      );
    },
    [member],
  );
  const onClick = useCallback((e) => {
    const target = e.currentTarget;
    setStatus(target.value);
  });

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
      console.log(form);
      createTask(form)
        .then(() => {
          alert('새 업무를 생성했습니다.');

          window.location.reload();
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, member],
  );
  return (
    <AddTaskForm
      form={form}
      handleChange={handleChange}
      onChange={onChange}
      onSubmit={onSubmit}
      options={options}
      errors={errors}
      onClick={onClick}
    />
  );
};

export default AddTaskContainer;
