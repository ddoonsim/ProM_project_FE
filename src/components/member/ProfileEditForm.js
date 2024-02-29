import MemberOnly from '../authority/MemberOnly';
import { InputText } from '../commons/InputStyle';
import styled from 'styled-components';
import { BigButton } from '../commons/ButtonStyle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import ImageView from '../commons/ImageView';
import FileUpload from '../commons/FileUpload';

const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

const FormBox = styled.form`
transform: translate(50%, 50%);
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 800px;
height: 700px;
  dl {
    display: flex;
    padding: 10px 15px;
    align-items: center;

    dt {
      width: 130px;
    }

    dd {
      flex-grow: 1;
      width: 300px;
    }
  }

  dl + dl {
    border-top: 1px solid #d5d5d5;
  }

  dl:last-of-type {
    margin-bottom: 15px;
  }

  .upload_button {
    display: flex;
    height: 35px;
  }`;

const ProfileEditForm = ({
  onSubmit,
  onChange,
  form,
  errors,
  fileUploadCallback,
}) => {


  const { t } = useTranslation();

  return (
    <div className='form_box'>
    <MemberOnly>
      <FormBox onSubmit={onSubmit}>
        <h1>{t('회원정보수정')}</h1>

        <dl>
          <dt>{t('이메일')}</dt>
          <dd>{form.email}</dd>
        </dl>

        <dl>
          <dt>{t('회원명')}</dt>
          <dd>
            <InputText
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
            />
            <ErrorMessages errors={errors} field="name" />
          </dd>
        </dl>

        <dl>
          <dt>{t('비밀번호')}</dt>
          <dd>
            <InputText
             type="password"
             name="password"
             onChange={onChange} />
            <ErrorMessages errors={errors} field="password" />
          </dd>
        </dl>

        <dl>
          <dt>{t('비밀번호 확인')}</dt>
          <dd>
            <InputText
              type="password"
              name="confirmPassword"
              onChange={onChange}
            />
            <ErrorMessages errors={errors} field="confirmPassword" />
          </dd>
        </dl>

        <dl>
          <dt>{t('휴대전화번호')}</dt>
          <dd>
            <InputText
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={onChange}
            />
            <ErrorMessages errors={errors} field="mobile" />
          </dd>
        </dl>

        <dl>
          <dt>{t('프로필 이미지')}</dt>
          <dd>
            {form.profileImage && (
              <ImageView image={form.profileImage} mode="thumbnail" />
            )}
              <div className='upload_button'>
            <FileUpload
              gid={form.gid}
              imageOnly={true}
              singleFile={true}
              location={'profile_img'}
              fileUploadCallback={fileUploadCallback}
              >
                {t('이미지_업로드')}
              </FileUpload>
              </div>
          </dd>
        </dl>

        <BigButton
          type="submit"
          color="black"
          bcolor="black"
          height="50px"
          size="medium"
          fsize="medium"
        >
          수정하기
        </BigButton>
      </FormBox>
    </MemberOnly>
    </div>
  );
};

export default React.memo(ProfileEditForm);
