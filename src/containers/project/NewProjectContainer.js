import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { produce } from 'immer';
import NewProjectForm from '../../components/project/NewProjectForm';
import createProject from '../../api/project/newProject';

const NewProjectContainer = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      createProject(form)
        .then(() => {
          alert('새 프로젝트 생성했습니다.');

          // 로그인 페이지 이동
          navigate('/', { replace: true });
        })
        .catch((err) => console.error(err));
    },
    [form, navigate],
  );

  const onChange = useCallback((e) => {
    const target = e.currentTarget;

    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
  }, []);

  return <NewProjectForm form={form} onSubmit={onSubmit} onChange={onChange} />;
};

export default React.memo(NewProjectContainer);
