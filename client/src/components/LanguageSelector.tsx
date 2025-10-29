import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import FlagIcon from './FlagIcon';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'pt-BR', shortCode: 'BR', country: 'BR' as const },
    { code: 'en', shortCode: 'US', country: 'US' as const },
    { code: 'es', shortCode: 'ES', country: 'ES' as const }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
      >
        <FlagIcon country={currentLanguage.country} size={20} />
        <svg 
          className={`w-4 h-4 text-foreground/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu dropdown */}
          <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-3 ${
                  i18n.language === lang.code ? 'bg-primary/5' : ''
                }`}
              >
                <FlagIcon country={lang.country} size={20} />
                <p className="font-medium text-sm text-foreground">{lang.shortCode}</p>
                {i18n.language === lang.code && (
                  <svg 
                    className="w-5 h-5 text-primary ml-auto" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

