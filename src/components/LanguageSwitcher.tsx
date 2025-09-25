import React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang) // đổi global
    setLanguageOpen(false)
  }
  const [languageOpen, setLanguageOpen] = React.useState(false)

  const getCurrentLanguage = () => {
    return i18n.language === 'vi' ? 'VI' : 'EN'
  }

  const hideTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current)
    }
    setLanguageOpen(true)
  }

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setLanguageOpen(false)
    }, 300)
  }

  return (
    <div
      className="relative font-[sans-serif] w-max mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1 cursor-pointer text-[#333] hover:text-[#007bff] transition-colors duration-200">
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{getCurrentLanguage()}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {languageOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-[1000] overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-2">
            <button
              onClick={() => changeLanguage('vi')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200 ${
                i18n.language === 'vi'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700'
              }`}
            >
              <span className="text-lg">🇻🇳</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">Tiếng Việt</span>
                <span className="text-xs text-gray-500">Vietnamese</span>
              </div>
              {i18n.language === 'vi' && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200 ${
                i18n.language === 'en'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700'
              }`}
            >
              <span className="text-lg">🇺🇸</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">English</span>
                <span className="text-xs text-gray-500">English</span>
              </div>
              {i18n.language === 'en' && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
