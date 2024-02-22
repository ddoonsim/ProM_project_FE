import { Helmet } from 'react-helmet-async';
import { MainTitle } from '../../../components/commons/TitleStyle';
import { OuterBox } from '../../../components/commons/OutlineStyles';
import { useTranslation } from 'react-i18next';
import FindIdContainer from '../../../containers/member/FindIdContainer';

const FindId = () => {
    const { t } = useTranslation();

  return (
    <>
    <Helmet>
      <title>{t('아이디 찾기')}</title>
    </Helmet>
    <OuterBox>
      <MainTitle>{t('아이디 찾기')}</MainTitle>
      <FindIdContainer />
    </OuterBox>
  </>
  );
};

export default FindId;