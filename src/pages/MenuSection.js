import React from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import Footer from '../components/Footer';

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
        <nav className="flex flex-col items-center space-y-16 py-12">
          <button
            onClick={() => onNavigate('main')}
            className={`group relative w-full text-center px-6 text-3xl md:text-6xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'main'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden">
              <span className="relative z-10">{t.homeLink}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-500 group-hover:w-full`}></span>
            </span>
            {currentSection === 'main' && (
              <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></span>
            )}
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`group relative w-full text-center px-6 text-3xl md:text-6xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'about'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden">
              <span className="relative z-10">{t.aboutLink}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-500 group-hover:w-full`}></span>
            </span>
            {currentSection === 'about' && (
              <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></span>
            )}
          </button>
          
          <button
            onClick={() => onNavigate('contact')}
            className={`group relative w-full text-center px-6 text-3xl md:text-6xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'contact'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden">
              <span className="relative z-10">{t.contactLink}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-500 group-hover:w-full`}></span>
            </span>
            {currentSection === 'contact' && (
              <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MenuSection;