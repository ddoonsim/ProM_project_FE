import { useState } from 'react';
import TaskBox from './TaskBox';
import styled from 'styled-components';

const TaskProgressForm = styled.div`
  padding: 10px 80px;

  .progress_name {
    display: flex;
    padding-left: 160px;

    h3 + h3 {
      padding-left: 320px;
    }
  }

  .progress_boxes {
    display: flex;

    .inner_box {
      width: 350px;
      min-height: 400px;
      padding: 20px;
      background-color: #eee;
      border: 0.5px solid #ddd;
      border-radius: 20px;
    }

    .inner_box + .inner_box {
      margin-left: 10px;
    }
  }
`;

const TaskProgressBoxForm = ({ tasks, item }) => {
  return (
    <TaskProgressForm>
      <div className="progress_name">
        <h3>요청</h3>
        <h3>진행 중</h3>
        <h3>완료</h3>
        <h3>보류</h3>
      </div>
      <div className="progress_boxes">
        <div name="REQUEST" className="inner_box">
          <TaskBox tasks={tasks} item={item} listStatus="request" />
        </div>
        <div name="PROGRESS" className="inner_box">
          <TaskBox tasks={tasks} item={item} listStatus="progress" />
        </div>
        <div name="SUCCESS" className="inner_box">
          <TaskBox tasks={tasks} item={item} listStatus="success" />
        </div>
        <div name="HOLD" className="inner_box">
          <TaskBox tasks={tasks} item={item} listStatus="hold" />
        </div>
      </div>
    </TaskProgressForm>
  );
};

export default TaskProgressBoxForm;
