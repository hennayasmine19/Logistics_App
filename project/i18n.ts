import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './assets/locales/en.json';
import ta from './assets/locales/ta.json';

const LANGUAGE_PERSISTENCE_KEY = 'app_language';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lang: string) => void) => {
    const lang = await AsyncStorage.getItem(LANGUAGE_PERSISTENCE_KEY);
    callback(lang || 'en');
  },
  init: () => {},
  cacheUserLanguage: async (lang: string) => {
    await AsyncStorage.setItem(LANGUAGE_PERSISTENCE_KEY, lang);
  },
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ta: { translation: ta },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n; 