import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import { produce } from 'immer';
import NewProjectForm from '../../components/project/NewProjectForm';
import createProject from '../../api/project/newProject';

const NewProjectContainer = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const {t} = useTranslation();

  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasError = false;
      if (!form.pName) {
        _errors.pName = _errors.agree || [];
        _errors.pName.push(t('NotBlank_pName'));

        hasError = true;
      }

      if (hasError) {
        setErrors(() => _errors);

        return;
      }

      createProject(form)
        .then(() => {
          alert('새 프로젝트 생성했습니다.');

          window.location.reload();
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, t],
  );

  const onChange = useCallback((e) => {
    const target = e.currentTarget;

    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
  }, []);

  return (
    <NewProjectForm
      form={form}
      onSubmit={onSubmit}
      onChange={onChange}
      errors={errors}
    />
  );
};

export default React.memo(NewProjectContainer);
