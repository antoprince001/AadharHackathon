import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en/translations.json')
    },
    tn: {
      translations: require('./locales/tn/translations.json')
    },
    hi: {
      translations: require('./locales/hi/translations.json')
    },
    ml: {
      translations: require('./locales/ml/translations.json')
    },
    te: {
      translations: require('./locales/te/translations.json')
    },

  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'tn','hi','ml','te'];

export default i18n;