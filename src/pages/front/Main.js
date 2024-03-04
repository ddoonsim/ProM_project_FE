import home_ex from '../../images/home_ex.png';
import styled from 'styled-components';
import UserContext from '../../modules/user';
import { useContext } from 'react';
import Dashboard from './Dashboard';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Img = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const Main = () => {
  const { t } = useTranslation();

  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);

  return isLogin ? (
    <>
      <Helmet>
        <title>{t('ProM_Project')}</title>
      </Helmet>
      <Dashboard />
    </>
  ) : (
    <>
      <Helmet>
        <title>{t('ProM')}</title>
      </Helmet>
      <Img>
      <img src={home_ex} usemap="#imgmap202432151650" width="100%" alt="home" />
      <map id="imgmap202432151650" name="imgmap202432151650">
          <area shape="rect" alt="로그인" title="" coords="1490,237,1743,300" href="/login" target="_self" />
          <area shape="rect" alt="회원가입" title="" coords="1493,307,1759,369" href="/join" target="_self" />
      </map>
      </Img>
    </>
  );
};

export default Main;
