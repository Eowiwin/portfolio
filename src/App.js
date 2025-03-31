import React, { useState } from 'react';
import MainSection from './pages/MainSection';
import AboutSection from './pages/AboutSection';
import MusicPlayer from './components/MusicPlayer';
import Logo from './components/Logo';
import useThemeStore from './store/themeStore';
import useLanguageStore from './store/languageStore';
import { translations } from './utils/translations';
import './App.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('main');
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isFrench, toggleLanguage } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  const handleNavigation = (section) => {
    setCurrentSection(section);
  };
  
  return (
    <div className="w-full min-h-screen">
      {/* Persistent Logo */}
      <Logo onNavigate={handleNavigation} />
      
      {/* All controls in one container for consistent alignment */}
      <div className="fixed top-4 md:top-6 right-4 md:right-6 flex items-center gap-3 md:gap-4 scale-75 md:scale-100 z-50">
        <button 
          onClick={toggleLanguage}
          className={`h-10 flex items-center justify-center transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
          aria-label="Toggle language"
        >
          {t.language}
        </button>
        <button 
          onClick={toggleDarkMode}
          className={`h-10 flex items-center justify-center transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <div className="scale-125">
          <MusicPlayer 
            audioSrc={process.env.PUBLIC_URL + "/audio/HisTheme.mp3"} 
            trackTitle="His Theme" 
          />
        </div>
        <button 
          className={`h-10 w-10 flex items-center justify-center transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
          aria-label="Menu button"
        >
          ☰
        </button>
      </div>

      {currentSection === 'main' ? (
        <MainSection onNavigate={handleNavigation} />
      ) : (
        <AboutSection onNavigate={handleNavigation} />
      )}
    </div>
  );
};

export default App;