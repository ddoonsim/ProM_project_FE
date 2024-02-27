import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import AddTaskForm from '../../components/project/AddTaskForm';
import createTask from '../../api/task/NewTask';
const AddTaskContainer = ({ item }) => {
  const { t } = useTranslation();

  const [member, setMember] = useState([]);
  const [form, setForm] = useState({
    member: member,
    tName: '',
    description: '',
    pSeq: 0,
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
      setForm(
        produce((draft) => {
          draft[target.name] = target.value;
          draft['member'] = member;
          draft['pSeq'] = item.seq;
        }),
      );
    },
    [member],
  );

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
    />
  );
};

export default AddTaskContainer;
