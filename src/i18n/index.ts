import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './en.json'
import vi from './vi.json'

i18n
  .use(LanguageDetector) // tự detect ngôn ngữ từ browser/localStorage
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: 'en', // mặc định
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'], // ưu tiên localStorage
      caches: ['localStorage'], // lưu lựa chọn vào localStorage
    },
  })

export default i18n
