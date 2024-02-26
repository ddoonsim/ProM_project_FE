import EditInfoForm from '../../components/project/EditInfoForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import { useParams } from 'react-router-dom';
import getProjectInfo from '../../api/project/ProjectMainView';
import createProject from '../../api/project/newProject';
import updateInfo from '../../api/project/updateInfo';

const EditInfoContainer = () => {
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({});

  const param = useParams();
  const projectSeq = param.projectSeq;

  useEffect(() => {
    getProjectInfo(projectSeq).then((data) => {
      setForm(() => data);
    });
  }, [projectSeq]);

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

      updateInfo(form)
        .then(() => {
          alert('프로젝트 정보를 수정했습니다.');

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
    <EditInfoForm
      form={form}
      onSubmit={onSubmit}
      onChange={onChange}
      errors={errors}
    />
  );
};

export default React.memo(EditInfoContainer);
