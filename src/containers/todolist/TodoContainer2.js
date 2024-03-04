import React, { useState, useCallback } from 'react';
import TodoForm from '../../components/todolist2/TodoForm';
import TodoList from '../../components/todolist2/TodoList';

const TodoContainer = ({ todos, setTodos, onSubmit, errors }) => {
  const [form, setForm] = useState({});

  const onChange = useCallback(
    (e) => setForm((form) => ({ ...form, [e.target.name]: e.target.value })),
    [],
  );

  const onToggle = useCallback(
    (seq) =>
      setTodos((todos) =>
        todos.map((todo) =>
          todo.seq === seq ? { ...todo, checked: !Number(todo.checked) } : todo,
        ),
      ),
    [setTodos],
  );
  return (
    <>
      <TodoForm
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
        form={form}
      />
      <TodoList todos={todos} onToggle={onToggle} />
    </>
  );
};

export default React.memo(TodoContainer);
