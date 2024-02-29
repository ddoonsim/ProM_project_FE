import React, { useState, useCallback, useContext } from 'react';
import { produce } from 'immer';
import ProfileEditForm from '../../components/member/ProfileEditForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import requestProfile from '../../api/mypage/profile';
import Swal from 'sweetalert2';
import UserContext from '../../modules/user';

const ProfileEditContainer = () => {

  const { t } = useTranslation();
  
  const { state: { userInfo } } = useContext(UserContext);
 
  const navigate = useNavigate();

  const [form, setForm] = useState({...userInfo});

  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      requestProfile(form)
        .then(() => {
          // 수정 성공시 처리
          Swal.fire({
            title: "수정 완료",
            text: "마이페이지로 이동합니다🤗",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              // 마이페이지 이동
              navigate('/mypage', { replace: true });
              window.location.reload();
            }
          })        
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, t, navigate],
  );

  // OnChange 함수
  const onChange = useCallback((e) => {
    const target = e.currentTarget;

    if (target.name === 'mobile') {
      autoHyphen(target); // 자동 하이픈 추가
    }

    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
  }, []);

  // 자동 하이픈 추가 함수
  const autoHyphen = (target) => {
    const rawPhone = target.value.replace(/-/g, '');
    let formattedPhone = '';

    if (rawPhone.length < 4) {
      formattedPhone = rawPhone;
    } else if (rawPhone.length < 8) {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(3)}`;
    } else if (rawPhone.length < 11) {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
        3,
        7,
      )}-${rawPhone.slice(7)}`;
    } else {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
        3,
        7,
      )}-${rawPhone.slice(7, 11)}`;
    }

    target.value = formattedPhone;
  };

  const fileUploadCallback = useCallback((files) => {
    if (files && files.length > 0) {
      setForm(
        produce((draft) => {
          draft.profileImage = files[0];
        }),
      );
    }
  }, []);

  return (
    <ProfileEditForm
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      fileUploadCallback={fileUploadCallback}
    />
  );
};

export default React.memo(ProfileEditContainer);
