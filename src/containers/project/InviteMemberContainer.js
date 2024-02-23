import { useCallback, useState } from 'react';
import InviteMemberForm from '../../components/project/InviteMemberForm';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import { sendInvitation } from '../../api/commons/sendEmail';

const InviteMemberContainer = () => {
  const [form, setForm] = useState({});

  const { t } = useTranslation();

  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /* 이메일 입력란 필수 체크 S */
      const _errors = {};
      let hasError = false;
      if (!form.email) {
        _errors.email = _errors.agree || [];
        _errors.email.push(t('NotBlank_email'));

        hasError = true;
      }

      if (hasError) {
        setErrors(() => _errors);

        return;
      }
      /* 이메일 입력란 필수 체크 E */

      // 초대 이메일 전송!
      sendInvitation(form.email, 'http://localhost:3000/');
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
    <InviteMemberForm
      form={form}
      errors={errors}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default InviteMemberContainer;
