import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTask } from '../../api/task/TaskInfo';
import TodoContainer from '../todolist/TodoContainer';

const MainBox = styled.div``;

const SubBox = styled.div``;

const TaskDetailContainer = ({ seq }) => {
  const [task, setTask] = useState(null);
  useEffect(() => {
    getTask(seq).then((task) => setTask(task));
  }, [seq]);

  return (
    <MainBox>
      <SubBox></SubBox>
      <SubBox>
        <TodoContainer seq={seq} todos={task && task.todos} />
      </SubBox>
    </MainBox>
  );
};

export default TaskDetailContainer;
