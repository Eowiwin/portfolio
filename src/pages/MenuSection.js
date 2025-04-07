import React, { useState, useEffect } from 'react';
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
  const [isLandscape, setIsLandscape] = useState(false);

  // Detect landscape mode
  useEffect(() => {
    const checkOrientation = () => {
      const isLand = window.innerWidth > window.innerHeight && window.innerWidth < 1024;
      setIsLandscape(isLand);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Landscape mode layout
  if (isLandscape) {
    return (
      <div className={`fixed inset-0 z-40 w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <MouseFollower />
        <div className="absolute inset-0 z-0 overflow-hidden">
          <GradientBackground />
        </div>
        
        <div className="relative z-10 w-full px-4">
          <nav className="flex flex-row flex-wrap justify-center gap-2 py-2">
            <button
              onClick={() => onNavigate('main')}
              className={`group relative text-center px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 rounded-md ${
                currentSection === 'main'
                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200')
              }`}
            >
              {t.homeLink}
            </button>
            
            <button
              onClick={() => onNavigate('about')}
              className={`group relative text-center px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 rounded-md ${
                currentSection === 'about'
                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200')
              }`}
            >
              {t.aboutLink}
            </button>
            
            <button
              onClick={() => onNavigate('projects')}
              className={`group relative text-center px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 rounded-md ${
                currentSection === 'projects'
                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200')
              }`}
            >
              {t.projectsLink}
            </button>
            
            <button
              onClick={() => onNavigate('resume')}
              className={`group relative text-center px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 rounded-md ${
                currentSection === 'resume'
                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200')
              }`}
            >
              {t.cvLink}
            </button>
            
            <button
              onClick={() => onNavigate('contact')}
              className={`group relative text-center px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 rounded-md ${
                currentSection === 'contact'
                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200')
              }`}
            >
              {t.contactLink}
            </button>
          </nav>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Default portrait mode layout
  return (
    <div className={`fixed inset-0 z-40 w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <MouseFollower />
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GradientBackground />
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto">
        <nav className="flex flex-col items-center space-y-12 py-12">
          <button
            onClick={() => onNavigate('main')}
            className={`group relative w-full text-center px-6 text-2xl md:text-4xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'main'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden pb-2">
              <span className="relative z-10">{t.homeLink}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-500 group-hover:w-full`}></span>
            </span>
            {currentSection === 'main' && (
              <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></span>
            )}
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`group relative w-full text-center px-6 text-2xl md:text-4xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'about'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden pb-2">
              <span className="relative z-10">{t.aboutLink}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-500 group-hover:w-full`}></span>
            </span>
            {currentSection === 'about' && (
              <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></span>
            )}
          </button>
          
          {/* Projects Button */}
          <button
            onClick={() => onNavigate('projects')}
            className={`group relative w-full text-center px-6 text-2xl md:text-4xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'projects'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden pb-2">
              <span className="relative z-10">{t.projectsLink}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-500 group-hover:w-full`}></span>
            </span>
            {currentSection === 'projects' && (
              <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></span>
            )}
          </button>
          
          <button
            onClick={() => onNavigate('resume')}
            className={`group relative w-full text-center px-6 text-2xl md:text-4xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'resume'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden pb-2">
              <span className="relative z-10">{t.cvLink}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-500 group-hover:w-full`}></span>
            </span>
            {currentSection === 'resume' && (
              <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></span>
            )}
          </button>
          
          {/* Timeline button removed */}
          
          <button
            onClick={() => onNavigate('contact')}
            className={`group relative w-full text-center px-6 text-2xl md:text-4xl font-bold tracking-wider transition-all duration-500 transform hover:scale-105 ${
              currentSection === 'contact'
                ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                : (isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600')
            }`}
          >
            <span className="inline-block relative overflow-hidden pb-2">
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