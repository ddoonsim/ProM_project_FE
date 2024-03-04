import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getTask } from '../../api/task/TaskInfo';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import TodoForm from '../../components/todolist2/TodoForm';
import TodoList from '../../components/todolist2/TodoList';
import TaskForm from '../../components/task/TaskForm';
import saveTask from '../../api/task/SaveTask';
import Confetti from 'react-dom-confetti';

function dateFormat(date) {
  return `${date.getFullYear()}-${('' + (date.getMonth() + 1)).padStart(
    2,
    '0',
  )}-${('' + date.getDate()).padStart(2, '0')}`;
}

const MainBox = styled.div`
  display: flex;
  width: 950px;
`;

const SubBox = styled.div``;

const TaskDetailContainer = ({ seq, pSeq }) => {
  const [task, setTask] = useState({
    gid: Date.now(),
  });
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const [editor, setEditor] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (!seq) return;

    getTask(seq).then((task) => {
      setTask(task);
    });
  }, [seq]);

  const onChange = useCallback(
    (e) =>
      setForm((form) => ({ ...form, [e.target.name]: e.target.value.trim() })),
    [],
  );
  const onEditor = useCallback(
    () => {
      setForm(
        produce((draft) => {
          draft.description = editor ? editor.getData() : ' ';
        }),
      );
    },
    [editor],
    form,
  );

  /** todo 리스트 체크 토글  */
  const onTodoToggle = useCallback(
    (seq) =>
      setTask((task) => {
        task.todos = task.todos || [];
        task.todos = task.todos.map((todo) =>
          todo.seq === seq ? { ...todo, done: !todo.done } : todo,
        );

        saveTask(task, pSeq);

        return { ...task };
      }),
    [],
  );

  /**
   * todolist 제거
   *
   */
  const onTodoRemove = useCallback(
    (seq) =>
      setTask((task) => {
        if (!task.todos || task.todos.length === 0) return;

        task.todos = task.todos.filter((todo) => todo.seq !== seq);

        saveTask(task, pSeq);
        return { ...task };
      }),
    [pSeq],
  );

  /**
   * todolist submit 처리
   */
  const onTodoSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!form.content || !form.content.trim()) {
        setErrors(
          produce((draft) => {
            draft.content = draft.content || [];
            draft.content.push(t('할일을_입력하세요.'));
          }),
        );
        return;
      }

      setTask((task) => {
        task.todos = task.todos || [];
        task.todos = task.todos.concat({
          ...form,
          seq: Date.now(),
          done: false,
        });

        saveTask(task, pSeq);

        return { ...task };
      });

      setForm({ content: '' });
    },
    [form, t, pSeq, [editor]],
  );

  /* 서브 태스크 S */
  const onTaskSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasErrors = false;
      const requiredField = {
        tname: t('업무_제목을_입력하세요.'),
        status: t('업무_상태를_선택하세요.'),
        members: t('담당자를_선택하세요.'),
        sdate: t('업무기간을_선택하세요.'),
        edate: t('업무기간을_선택하세요.'),
      };

      for (const [key, value] of Object.entries(requiredField)) {
        _errors[key] = _errors[key] || [];
        if (key === 'members') {
          if (!task.members || !task.members.value) {
            _errors[key].push(value);
          }
          continue;
        }

        if (!task || !task[key] || !task[key].trim()) {
          _errors[key].push(value);
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setErrors(_errors);
        return;
      }

      saveTask(task, pSeq);
    },
    [t, task, pSeq],
  );

  const onTaskChange = useCallback((e) => {
    setTask(
      produce((draft) => {
        draft[e.target.name] = e.target.value.trim();
      }),
    );
  }, []);

  const onChangeStatus = useCallback(
    (status) =>
      setTask(
        produce((draft) => {
          draft.status = status;
        }),
      ),
    [],
  );
  const onSelectMembers = useCallback((selectedOptions) => {
    setTask(
      produce((draft) => {
        draft.members = selectedOptions;
      }),
    );
  }, []);

  const onChangeDate = useCallback((dates) => {
    if (!dates || dates.length < 2) return;

    setTask(
      produce((draft) => {
        draft.sdate = dateFormat(dates[0]);
        draft.edate = dateFormat(dates[1]);
      }),
    );
  }, []);

  // 파일 업로드 콜백 함수
  const fileUploadCallback = useCallback(
    (files) => {
      let html = '';
      for (const file of files) {
        html += `<img src='${file.fileUrl}' />`;
      }
      editor.setData(html);
    },
    [editor],
  );
  /* 프로젝트 구성 멤버 */
  /* 서브 태스크 E */

    // 진행률
    const percentTodo = () => {
      const completedTodos = task.todos.filter((todo) => todo.done).length;
      return task.todos.length ? (completedTodos / task.todos.length) * 100 : 0;
    };
  
    // 폭죽 효과
    const confettiConfig = {
      angle: 90,
      spread: 360,
      startVelocity: 70,
      elementCount: 800,
      dragFriction: 0.05,
      duration: 5000,
      stagger: 1,
      width: '30px',
      height: '30px',
      perspective: '500px',
      colors: [
        '#FFD700',
        '#FF6347',
        '#00FF00',
        '#87CEEB',
        '#FF00FF',
        '#FFFF00',
        '#00FFFF',
        '#FFA07A',
        '#FF1493',
        '#00FF7F',
      ],
      opacity: 0.9,
      origin: { x: 0.8, y: 0.2 },
    };


  return (
    <MainBox>
      <SubBox>
        <TaskForm
          task={task}
          errors={errors}
          onEditor={onEditor}
          onSubmit={onTaskSubmit}
          onChange={onTaskChange}
          onChangeStatus={onChangeStatus}
          onSelectMembers={onSelectMembers}
          onChangeDate={onChangeDate}
          setEditor={setEditor}
          fileUploadCallback={fileUploadCallback}
          members={
            task && task.project && task.project.member
              ? task.project.member
              : []
          }
        />
      </SubBox>
      <SubBox>
        <TodoForm
          onChange={onChange}
          onSubmit={onTodoSubmit}
          errors={errors}
          form={form}
        />
        <div>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            paddingLeft: '10px',
          }}
        >
        </div>
        <div
          style={{
            width: '100%',
            height: '12px',
            background: '#f3f3f3',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${percentTodo()}%`,
              height: '100%',
              background:
                'linear-gradient(to right, #0A4B59 ,#3E768C, #88B0BF)',
              borderRadius: '6px',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>
        <TodoList
          todos={(task && task.todos) || []}
          onToggle={onTodoToggle}
          onRemove={onTodoRemove}
        />
      </SubBox>
      <Confetti active={percentTodo() === 100} config={confettiConfig} />
    </MainBox>
  );
};

export default TaskDetailContainer;
