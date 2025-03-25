import React, { useEffect } from 'react';
import GradientBackground from './GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import Logo from './Logo';

const MainSection = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isFrench, toggleLanguage } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];

  useEffect(() => {
    // Update the document class when dark mode changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <GradientBackground />
      <Logo />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
          {t.greeting} <span className="text-blue-600 dark:text-blue-400">{t.name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-4">
          {t.nickname} <span className="text-blue-500 dark:text-blue-400">{t.nicknameValue}</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          {t.description}
        </p>
        <div className="flex gap-6 justify-center">
          <a 
            href="#projects" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.projects}
          </a>
          <a 
            href="#about" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.about}
          </a>
        </div>
      </div>

      {/* Top right menu */}
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <button 
          onClick={toggleLanguage}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Toggle language"
        >
          {t.language}
        </button>
        <button 
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">☰</button>
      </div>
    </div>
  );
};

export default MainSection; 