import React from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';

const MenuSection = ({ onNavigate, currentSection }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];

  return (
    <div className={`fixed inset-0 z-40 w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <MouseFollower />
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GradientBackground />
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto">
        <nav className="flex flex-col items-center space-y-8 py-12">
          <button
            onClick={() => onNavigate('main')}
            className={`relative w-full text-center px-6 py-4 text-2xl md:text-4xl font-bold transition-all duration-300 transform hover:scale-105 ${
              currentSection === 'main'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            {t.homeLink}
            {currentSection === 'main' && (
              <span className="absolute bottom-0 left-1/2 w-12 h-1 bg-current transform -translate-x-1/2"></span>
            )}
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`relative w-full text-center px-6 py-4 text-2xl md:text-4xl font-bold transition-all duration-300 transform hover:scale-105 ${
              currentSection === 'about'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            {t.aboutLink}
            {currentSection === 'about' && (
              <span className="absolute bottom-0 left-1/2 w-12 h-1 bg-current transform -translate-x-1/2"></span>
            )}
          </button>
          
          <button
            onClick={() => onNavigate('contact')}
            className={`relative w-full text-center px-6 py-4 text-2xl md:text-4xl font-bold transition-all duration-300 transform hover:scale-105 ${
              currentSection === 'contact'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            {t.contactLink}
            {currentSection === 'contact' && (
              <span className="absolute bottom-0 left-1/2 w-12 h-1 bg-current transform -translate-x-1/2"></span>
            )}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MenuSection;