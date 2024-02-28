import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalBox from '../commons/ModalBox';
import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';
import TaskDetail from '../../pages/front/task/TaskDetail';

const TaskBox = ({ tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {isOpen && (
        <ModalBox isOpen={isOpen} onClose={onClose}>
          <TaskDetail tasks={tasks.seq} />
        </ModalBox>
      )}

      {/* {tasks &&
        tasks.map(({ seq, tname, status }) => (
          <>
            <Link
              tasks={tasks}
              className="btn"
              name="task_detail"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p key={seq}>
                업무 제목: {tname} / 상태: {status}
              </p>
            </Link>
          </>
        ))} */}
    </>
  );
};

export default TaskBox;
