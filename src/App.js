import React, { useState } from 'react';
import MainSection from './pages/MainSection';
import AboutSection from './pages/AboutSection';
import './App.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('main');

  const handleNavigation = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="w-full min-h-screen">
      {currentSection === 'main' ? (
        <MainSection onNavigate={handleNavigation} />
      ) : (
        <AboutSection onNavigate={handleNavigation} />
      )}
    </div>
  );
};

export default App;