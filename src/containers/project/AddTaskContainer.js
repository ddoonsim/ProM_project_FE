import React, { useState, useCallback } from 'react';
import { produce } from 'immer';
import AddTaskForm from '../../components/project/AddTaskForm';

const AddTaskContainer = () => {
  const [form, setForm] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(form);
    },
    [form],
  );
  const onChange = useCallback((e) => {
    const target = e.currentTarget;
    console.log(e);
    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
  }, []);

  return <AddTaskForm form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default AddTaskContainer;
