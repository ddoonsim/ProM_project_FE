import React from 'react';
import styled from 'styled-components';
import { FaRegSquare, FaCheckSquare, FaRegTrashAlt } from 'react-icons/fa';
import './TodoList';

const ItemBox = styled.div`
  display: flex;
  border-bottom: 1px solid #d5d5d5;
  align-items: center;
  .checkbox {
    display: flex;
    flex-grow: 1;
    line-height: 1;
    padding: 10px;
    .chk {
      font-size: 2rem;
      vertical-align: middle;

      margin-right: 10px;
    }
    .text {
      line-height: 25px;
      font-size: 1.3rem;
    }
  }

  .remove {
    font-size: 2rem;
    vertical-align: middle;
  }
`;

const TodoList = ({ todos, onToggle, onRemove }) => {
  return (
    <div className="TodoList">
      {todos &&
        todos.map(({ seq, content, done }) => (
          <ItemBox>
            <div className="checkbox" key={seq} onClick={() => onToggle(seq)}>
              {done ? (
                <FaCheckSquare className="chk" />
              ) : (
                <FaRegSquare className="chk" />
              )}
              <div className="text">{content}</div>
            </div>

            <div className="remove" onClick={() => onRemove(seq)}>
              <FaRegTrashAlt />
            </div>
          </ItemBox>
        ))}
    </div>
  );
};

export default React.memo(TodoList);
