import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import NewProjectForm from '../../components/project/NewProjectForm';
import createProject from '../../api/project/newProject';
import Swal from 'sweetalert2';

const NewProjectContainer = () => {
  const [form, setForm] = useState({});

  const { t } = useTranslation();

  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const _errors = {};
      let hasError = false;
      if (!form.pname) {
        _errors.pname = _errors.agree || [];
        _errors.pname.push(t('NotBlank_pname'));

        hasError = true;
      }

      if (hasError) {
        setErrors(() => _errors);

        return;
      }

      createProject(form)
        .then(() => {
          Swal.fire({
            title: "프로젝트 생성 완료",
            text: "새 프로젝트 생성했습니다.",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              window.location.reload();
            }
          })           
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
