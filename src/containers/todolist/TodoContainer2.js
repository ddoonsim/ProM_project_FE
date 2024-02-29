import React, { useState, useCallback } from 'react';
import TodoForm from '../../components/todolist2/TodoForm';
import TodoList from '../../components/todolist2/TodoList';

const TodoContainer = ({ seq, todos }) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});


  const onChange = useCallback(
    (e) => setForm((form) => ({ ...form, [e.target.name]: e.target.value })),
    [],
  );

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <TodoForm
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
        form={form}
      />
      <TodoList todos={todos} />
    </>
  );
};

export default React.memo(TodoContainer);
