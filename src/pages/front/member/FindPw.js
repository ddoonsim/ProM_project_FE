import { Helmet } from 'react-helmet-async';
import { MainTitle } from '../../../components/commons/TitleStyle';
import { OuterBox } from '../../../components/commons/OutlineStyles';
import { useTranslation } from 'react-i18next';
import FindPwContainer from '../../../containers/member/FindPwContainer';

const FindPw = () => {
    const { t } = useTranslation();

  return (
    <>
    <Helmet>
      <title>{t('비밀번호 찾기')}</title>
    </Helmet>
    <OuterBox>
      <MainTitle>{t('비밀번호 찾기')}</MainTitle>
      <FindPwContainer />
    </OuterBox>
  </>
  );
};

export default FindPw;