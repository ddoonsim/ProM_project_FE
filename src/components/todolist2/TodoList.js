import React from 'react';
import { FaRegSquare, FaCheckSquare, FaRegTrashAlt } from 'react-icons/fa';

const TodoList = ({ todos, onToggle, onRemove }) => {
  return (
    <ul>
      {todos &&
        todos.map(({ seq, content, done }) => (
          <li key={seq} onClick={() => onToggle(seq)}>
            {done ? <FaCheckSquare /> : <FaRegSquare />}
            {content}
            <FaRegTrashAlt onClick={() => onRemove(seq)} />
          </li>
        ))}
    </ul>
  );
};

export default React.memo(TodoList);
