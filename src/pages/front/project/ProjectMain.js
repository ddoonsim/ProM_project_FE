import ProjectMainContainer from '../../../containers/project/ProjectMainContainer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import React from 'react';

const ProjectMain = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('ProM_Project')}</title>
      </Helmet>
      <ProjectMainContainer />
    </>
  );
};

export default ProjectMain;
