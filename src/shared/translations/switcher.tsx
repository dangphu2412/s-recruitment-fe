import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Lang, LANGS } from './translation';

export function LanguageSwitcher() {
  const router = useRouter();
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  function handleLanguageChange(language: Lang) {
    router.push(router.pathname, router.asPath, { locale: language.code });
    setLanguageDropdownOpen(false);
  }

  return (
    <div className="relative" ref={languageDropdownRef}>
      <button
        onClick={() => {
          setLanguageDropdownOpen(!languageDropdownOpen);
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        title="Change Language"
      >
        <span className="hidden sm:inline text-sm text-gray-600">
          {router.locale?.toUpperCase()}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="h-3 w-3 text-gray-400"
        />
      </button>

      {languageDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Select Language
            </p>
          </div>
          {LANGS.map(language => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                router.locale === language.code
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700'
              }`}
            >
              <div className="flex-1 text-left">
                <div className="font-medium">{language.label}</div>
                <div className="text-xs text-gray-500">
                  {language.code.toUpperCase()}
                </div>
              </div>
              {router.locale === language.code && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
