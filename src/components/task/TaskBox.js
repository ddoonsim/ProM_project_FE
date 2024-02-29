import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import ModalBox from '../commons/ModalBox';
import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';
import TaskDetail from '../../pages/front/task/TaskDetail';
import AddTask from '../../pages/front/project/AddTask';
import { getTask } from '../../api/task/TaskInfo';

// 초기 상태
const initialState = {
  taskList: [], // 작업 목록
  loading: true, // 데이터 로딩 상태
};

// 액션 타입
const actionTypes = {
  SET_TASK_LIST: 'SET_TASK_LIST',
  SET_LOADING: 'SET_LOADING',
};

// 리듀서 함수
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TASK_LIST:
      return {
        ...state,
        taskList: action.payload,
        loading: false,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const TaskBox = ({ item, tasks, listStatus }) => {
  // 리듀서를 사용하여 상태 관리
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onClick = (seq) => {
    console.log('업무 딸깍');
    console.log(seq);
    getTask(seq).then((item) => {
      console.log(item);
      setTask(item);
    });
  };
  const [task, setTask] = useState({});

  useEffect(() => {
    if (Object.keys(tasks).length === 0) {
      console.log('tasks loading...');
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
    } else {
      const filteredTasks = tasks.filter(({ status }) => status === listStatus);
      dispatch({ type: actionTypes.SET_TASK_LIST, payload: filteredTasks });
    }
  }, [tasks, listStatus]);

  return (
    <>
      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {state.taskList.map(({ seq, sdate, edate, tname }) => (
            <>
              <Link
                onClick={() => {
                  onClick(seq);
                  setIsOpen(!isOpen);
                }}
              >
                {tname}
              </Link>
              <hr />
            </>
          ))}
        </div>
      )}
      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <AddTask tasks={task} item={item} />
        </ModalBox>
      )}
    </>
  );
};

export default TaskBox;
