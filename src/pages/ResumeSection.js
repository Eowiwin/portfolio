// filepath: /home/erwan/portfoliov2/src/pages/ResumeSection.js
import React, { useEffect, useState } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';

// Animated button component for the back to About button
const AnimatedButton = ({ children, onClick, emoji, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useThemeStore();

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative inline-block transition-all duration-300
        ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}
        ${isHovered ? 'scale-105' : ''}
        ${className}
      `}
    >
      {isHovered && (
        <>
          {/* Multiple sparkles with different positions and delays */}
          <span 
            className="absolute -top-6 left-0 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-8 right-0 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.15s' }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span 
            className="absolute -top-10 left-1/4 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0.3s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-12 right-1/4 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.45s' }}
            aria-hidden="true"
          >
            🔍
          </span>
          
          {/* About emoji */}
          <span 
            className="absolute left-1/2 -translate-x-1/2 -top-16 animate-floatUp pointer-events-none select-none"
            style={{ fontSize: '1.5em' }}
            aria-hidden="true"
          >
            {emoji}
          </span>
        </>
      )}
      <span className="relative">
        {children}
      </span>
    </button>
  );
};

const ResumeSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const [isLandscape, setIsLandscape] = useState(false);
  
  // Get current date in format: Month Day, Year
  const currentDate = new Date().toLocaleDateString(isFrench ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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

  const handleDownloadCV = () => {
    // Link to the PNG file in the public folder
    window.open(process.env.PUBLIC_URL + '/img/CV.png', '_blank');
  };

  const handleBackToAbout = () => {
    onNavigate('about');
  };

  // Landscape mode layout
  if (isLandscape) {
    return (
      <div className="relative w-full h-screen overflow-auto">
        <MouseFollower />
        <GradientBackground />
        
        <div className="relative z-10 w-full min-h-full p-4 flex flex-col items-center">
          {/* Controls above the resume in landscape mode */}
          <div className="flex justify-center items-center space-x-4 mb-4 w-full">
            {/* Back button */}
            <AnimatedButton 
              onClick={handleBackToAbout}
              emoji="📝"
              className="text-sm px-3 py-1.5 rounded"
            >
              {t.backToAbout}
            </AnimatedButton>
            
            {/* Download button */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md filter blur-md opacity-75 -z-10 scale-110"></div>
              <button 
                onClick={handleDownloadCV}
                className={`relative inline-block text-sm px-3 py-1.5 rounded transition-all ${
                  isDarkMode 
                    ? 'border-blue-500 text-white bg-gray-800/60 hover:bg-gray-800/80' 
                    : 'border-0 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                {t.downloadButton}
              </button>
            </div>
          </div>
          
          {/* Update date above the resume */}
          <div className="w-full text-center mb-2">
            <p className={`text-xs italic ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
              {isFrench ? 'Mis à jour le ' : 'Updated on '} {currentDate}
            </p>
          </div>
          
          <div className="w-full flex justify-center">
            <div className="max-w-4xl border rounded-lg overflow-hidden shadow-md bg-white">
              <img
                src={process.env.PUBLIC_URL + '/img/CV.png'}
                alt="Resume"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default portrait mode layout
  return (
    <div className="relative w-full h-screen overflow-auto">
      <MouseFollower />
      <GradientBackground />
      
      {/* Add more top padding to push controls down */}
      <div className="pt-20 md:pt-0"></div>
      
      {/* Mobile controls - shown above the resume on mobile with more vertical spacing */}
      <div className="md:hidden flex justify-center items-center space-x-4 mb-6 px-4 relative z-20">
        {/* Back button for mobile view */}
        <AnimatedButton 
          onClick={handleBackToAbout}
          emoji="📝"
          className="text-sm px-3 py-1.5 rounded"
        >
          {t.backToAbout}
        </AnimatedButton>
        
        {/* Download button for mobile view */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md filter blur-md opacity-75 -z-10 scale-110"></div>
          <button 
            onClick={handleDownloadCV}
            className={`relative inline-block text-sm px-3 py-1.5 rounded transition-all ${
              isDarkMode 
                ? 'border-blue-500 text-white bg-gray-800/90 hover:bg-gray-800' 
                : 'border-0 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg'
            }`}
          >
            {t.downloadButton}
          </button>
        </div>
      </div>
      
      {/* Update date above the resume with darker text - visible ONLY on mobile */}
      <div className="md:hidden w-full text-center mb-2 px-4 relative z-20">
        <p className={`text-xs md:text-sm italic px-2 py-1 rounded inline-block ${
          isDarkMode ? 'text-white bg-gray-800/70' : 'text-gray-900 bg-white/80'
        }`}>
          {isFrench ? 'Mis à jour le ' : 'Updated on '} {currentDate}
        </p>
      </div>
      
      {/* CV Container with download button next to it */}
      <div className="relative z-10 px-4 py-2 w-full">
        <div className="flex justify-center items-start">
          {/* Back to About button and controls for desktop - moved to left side next to the resume */}
          <div className="hidden md:block mr-6 sticky top-20">
            <div className="relative mb-4">
              <AnimatedButton 
                onClick={handleBackToAbout}
                emoji="📝"
                className="text-base"
              >
                {t.backToAbout}
              </AnimatedButton>
            </div>
            
            {/* Download button - below the back button */}
            <div className="relative mt-4 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md filter blur-md opacity-75 -z-10 scale-110"></div>
              <button 
                onClick={handleDownloadCV}
                className={`relative inline-block text-sm md:text-base px-3 py-2 rounded transition-all ${
                  isDarkMode 
                    ? 'border-blue-500 text-white bg-gray-800/80 hover:bg-gray-800' 
                    : 'border-0 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                {t.downloadButton}
              </button>
            </div>
            
            {/* Update date - below download button on desktop */}
            <div className="text-center mt-2">
              <p className={`text-xs md:text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {isFrench ? 'Mis à jour le ' : 'Updated on '} {currentDate}
              </p>
            </div>
          </div>
          
          <div className="w-full max-w-4xl border rounded-lg overflow-hidden shadow-md bg-white relative">
            <img
              src={process.env.PUBLIC_URL + '/img/CV.png'}
              alt="Resume"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;