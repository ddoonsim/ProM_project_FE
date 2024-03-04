import React, { useCallback, useState } from 'react';
import ModalBox from '../commons/ModalBox';
import TaskDetailContainer from '../../containers/task/TaskDetailContainer';
import styled from 'styled-components';
import sizeNames from '../../styles/sizes';

const { normal, medium } = sizeNames;

const Tasks = styled.div`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border: 0.5px solid #ddd;
  border-radius: 5px;
  font-size: ${medium};
  font-weight: 500;
  height: 100px;
  cursor: pointer;

  .date {
    padding: 5px;
    font-size: ${normal};
    font-weight: 400;
  }

  .managers {
    padding: 2px 5px;
    border-radius: 5px;
    background-color: #68898559;
    font-size: ${normal};
    font-weight: 400;
    width: fit-content;
  }
`;

const TaskBox = ({ tasks, listStatus, item }) => {
  const [open, setOpen] = useState(false);
  const [taskSeq, setTaskSeq] = useState(null);
  const onClick = useCallback((seq) => {
    setOpen(true);
    setTaskSeq(seq);
  }, []);
  return (
    <>
      {tasks &&
        tasks.length > 0 &&
        tasks
          .filter(({ status }) => status === listStatus.toUpperCase())
          .map(({ seq, tname, sdate, edate, member }) => (
            <Tasks key={seq} onClick={() => onClick(seq)}>
              {tname}
              <div className="date">
                진행기간 : {sdate} ~ {edate}
              </div>
              {/* 담당자 목록 출력(가능하면) */}
              <div className="managers">user01</div>
            </Tasks>
          ))}
      {open && (
        <ModalBox isOpen={open}>
          <TaskDetailContainer seq={taskSeq} pSeq={item.seq} />
        </ModalBox>
      )}
    </>
  );
};

export default React.memo(TaskBox);
