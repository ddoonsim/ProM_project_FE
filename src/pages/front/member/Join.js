import JoinContainer from '../../../containers/member/JoinContainer';
import { Helmet } from 'react-helmet-async';
import { MainTitle } from '../../../components/commons/TitleStyle';
import { OuterBox } from '../../../components/commons/OutlineStyles';
import { useTranslation } from 'react-i18next';

const Join = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('회원가입')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle>{t('회원가입')}</MainTitle>
        <JoinContainer />
      </OuterBox>
    </>
  );
};

export default Join;
