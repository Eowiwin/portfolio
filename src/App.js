import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainSection from './pages/MainSection';
import AboutSection from './pages/AboutSection';
import ContactSection from './pages/ContactSection';
import MenuSection from './pages/MenuSection';
import ResumeSection from './pages/ResumeSection';
import TimelineSection from './pages/TimelineSection';
import ProjectsSection from './pages/ProjectsSection';
import MusicPlayer from './components/MusicPlayer';
import Logo from './components/Logo';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import useThemeStore from './store/themeStore';
import useLanguageStore from './store/languageStore';
import { translations } from './utils/translations';
import './App.css';

// Mapping des sections vers les chemins d'URL
const sectionToPath = {
  main: '/',
  about: '/about',
  projects: '/projects',
  contact: '/contact',
  resume: '/resume',
  timeline: '/timeline',
};

// Mapping inverse des chemins vers les sections
const pathToSection = {
  '/': 'main',
  '/about': 'about',
  '/projects': 'projects',
  '/contact': 'contact',
  '/resume': 'resume',
  '/timeline': 'timeline',
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isFrench, toggleLanguage } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  // Déterminer la section actuelle à partir de l'URL
  const currentSection = pathToSection[location.pathname] || 'main';
  
  // Pre-load any assets if needed
  useEffect(() => {
    // You can add actual asset preloading logic here if needed
    // This is just a placeholder to ensure the loading screen shows for at least 2 seconds
    const minLoadingTime = setTimeout(() => {
      // Do nothing, just ensuring minimum load time
    }, 2000);

    return () => clearTimeout(minLoadingTime);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  const handleNavigation = (section) => {
    const path = sectionToPath[section] || '/';
    navigate(path);
    setMenuOpen(false); // Close menu after navigation
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <div className="w-full min-h-screen">
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
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
              <MusicPlayer />
            </div>
            <div className="relative">
              <button 
                onClick={toggleMenu}
                className={`h-10 w-10 flex items-center justify-center transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
                aria-label="Menu button"
                aria-expanded={menuOpen}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Three lines that transform into a cross */}
                  <span 
                    className={`absolute w-6 h-0.5 rounded transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-300' : 'bg-black'} ${
                      menuOpen 
                        ? 'transform rotate-45 translate-y-0' 
                        : 'transform -translate-y-2'
                    }`}
                  ></span>
                  <span 
                    className={`absolute w-6 h-0.5 rounded transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-300' : 'bg-black'} ${
                      menuOpen 
                        ? 'opacity-0' 
                        : 'opacity-100'
                    }`}
                  ></span>
                  <span 
                    className={`absolute w-6 h-0.5 rounded transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-300' : 'bg-black'} ${
                      menuOpen 
                        ? 'transform -rotate-45 translate-y-0' 
                        : 'transform translate-y-2'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Content Section */}
          {menuOpen ? (
            <MenuSection onNavigate={handleNavigation} currentSection={currentSection} />
          ) : (
            <Routes>
              <Route path="/" element={<MainSection onNavigate={handleNavigation} />} />
              <Route path="/about" element={<AboutSection onNavigate={handleNavigation} />} />
              <Route path="/projects" element={<ProjectsSection onNavigate={handleNavigation} />} />
              <Route path="/contact" element={<ContactSection onNavigate={handleNavigation} />} />
              <Route path="/resume" element={<ResumeSection onNavigate={handleNavigation} />} />
              <Route path="/timeline" element={<TimelineSection onNavigate={handleNavigation} />} />
            </Routes>
          )}

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;