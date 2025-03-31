import React, { useState } from 'react';
import MainSection from './pages/MainSection';
import AboutSection from './pages/AboutSection';
import ContactSection from './pages/ContactSection';
import MusicPlayer from './components/MusicPlayer';
import Logo from './components/Logo';
import useThemeStore from './store/themeStore';
import useLanguageStore from './store/languageStore';
import { translations } from './utils/translations';
import './App.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('main');
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isFrench, toggleLanguage } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  const handleNavigation = (section) => {
    setCurrentSection(section);
    setMenuOpen(false); // Close menu after navigation
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
            trackTitle="His Theme - Undertale" 
          />
        </div>
        <div className="relative">
          <button 
            onClick={toggleMenu}
            className={`h-10 w-10 flex items-center justify-center transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
            aria-label="Menu button"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <div 
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            >
              <button
                onClick={() => handleNavigation('main')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentSection === 'main' 
                    ? (isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600') 
                    : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                }`}
              >
                {t.homeLink}
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentSection === 'about' 
                    ? (isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600') 
                    : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                }`}
              >
                {t.aboutLink}
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentSection === 'contact' 
                    ? (isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600') 
                    : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                }`}
              >
                {t.contactLink}
              </button>
            </div>
          )}
        </div>
      </div>

      {currentSection === 'main' && <MainSection onNavigate={handleNavigation} />}
      {currentSection === 'about' && <AboutSection onNavigate={handleNavigation} />}
      {currentSection === 'contact' && <ContactSection onNavigate={handleNavigation} />}
    </div>
  );
};

export default App;