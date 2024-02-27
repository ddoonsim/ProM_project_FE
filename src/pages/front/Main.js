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
        <img src={home_ex} width="100%" alt="home" />
      </Img>
    </>
  );
};

export default Main;
