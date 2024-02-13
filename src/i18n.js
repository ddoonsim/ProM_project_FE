import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './langs/ko';

const resources = {
  ko: {
    translation: ko,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
});
