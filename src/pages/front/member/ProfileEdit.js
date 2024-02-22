import ProfileEditContainer from '../../../containers/member/ProfileEditContainer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const ProfileEdit = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('회원정보수정')}</title>
      </Helmet>
      <ProfileEditContainer />
    </>
  );
};

export default ProfileEdit;
