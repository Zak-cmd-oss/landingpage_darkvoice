import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from '../locales/pt-BR.json';
import en from '../locales/en.json';
import es from '../locales/es.json';

// Pegar idioma salvo ou usar PT-BR como padrão
const getSavedLanguage = () => {
  try {
    return localStorage.getItem('darkvoice_language') || 'pt-BR';
  } catch (error) {
    return 'pt-BR';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': {
        translation: ptBR
      },
      'en': {
        translation: en
      },
      'es': {
        translation: es
      }
    },
    lng: getSavedLanguage(),
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Salvar idioma no localStorage quando mudar
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('darkvoice_language', lng);
  } catch (error) {
    console.warn('Error saving language:', error);
  }
});

export default i18n;

