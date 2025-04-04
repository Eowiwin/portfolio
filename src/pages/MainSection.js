import React, { useEffect, useState } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import { AnimatedName, AnimatedButton } from '../components/AnimatedElements';

const MainSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
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
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 scale-75 md:scale-100 transform-gpu">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">
          {t.greeting} <AnimatedName>{t.name}</AnimatedName>
        </h1>
        <h2 className="text-lg md:text-3xl font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-4">
          {t.nickname} <AnimatedName>{t.nicknameValue}</AnimatedName>
        </h2>
        <p className="text-sm md:text-xl text-gray-800 dark:text-gray-200 mb-6 md:mb-8">
          {t.description}
        </p>
        <div className="flex gap-4 md:gap-6 justify-center text-xs md:text-base">
          <AnimatedButton 
            onClick={() => onNavigate('projects')} 
            emoji="🚀"
          >
            {t.projects}
          </AnimatedButton>
          <AnimatedButton 
            onClick={() => onNavigate('about')} 
            emoji="📝"
          >
            {t.about}
          </AnimatedButton>
          <AnimatedButton 
            onClick={() => onNavigate('contact')} 
            emoji="📧"
          >
            {t.contact || 'Contact'}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default MainSection;