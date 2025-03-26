import React, { useEffect, useState } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import Logo from '../components/Logo';
import MouseFollower from '../components/MouseFollower';

const AnimatedName = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className={`
        relative inline-block
        text-blue-600 dark:text-blue-400
        transition-all duration-300
        ${isHovered ? 'scale-105' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <>
          {/* Multiple sparkles with different positions and delays */}
          <span 
            className="absolute -top-12 left-0 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-12 right-0 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.2s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-16 left-1/4 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0.4s' }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span 
            className="absolute -top-16 right-1/4 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.6s' }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span 
            className="absolute -top-20 left-1/2 -translate-x-1/2 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0.8s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-24 right-1/2 -translate-x-1/2 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '1s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          
          {/* Lion */}
          <span 
            className="absolute left-1/2 -translate-x-1/2 -top-32 animate-floatUp pointer-events-none select-none"
            style={{ fontSize: '1.5em' }}
            aria-hidden="true"
          >
            🦁
          </span>
        </>
      )}
      <span className="relative">
        {children}
      </span>
    </span>
  );
};

const MainSection = ({ onNavigate }) => {
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
    <div className="relative w-full h-screen flex items-center justify-center transition-colors duration-300">
      <MouseFollower />
      <GradientBackground />
      <Logo />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 scale-75 md:scale-100 transform-gpu">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">
          {t.greeting} <AnimatedName>{t.name}</AnimatedName>
        </h1>
        <h2 className="text-lg md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-2 md:mb-4">
          {t.nickname} <AnimatedName>{t.nicknameValue}</AnimatedName>
        </h2>
        <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
          {t.description}
        </p>
        <div className="flex gap-4 md:gap-6 justify-center">
          <a 
            href="#projects" 
            className="text-xs md:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.projects}
          </a>
          <button 
            onClick={() => onNavigate('about')}
            className="text-xs md:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.about}
          </button>
        </div>
      </div>

      {/* Top right menu */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-3 md:gap-4 scale-75 md:scale-100">
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