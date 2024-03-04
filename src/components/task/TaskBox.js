import React, { useCallback, useState } from 'react';
import ModalBox from '../commons/ModalBox';
import TaskDetailContainer from '../../containers/task/TaskDetailContainer';
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
          .map(({ seq, tname }) => (
            <div key={seq} onClick={() => onClick(seq)}>
              {tname}
            </div>
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
