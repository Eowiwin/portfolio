// filepath: /home/erwan/portfoliov2/src/pages/ResumeSection.js
import React, { useEffect, useState } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';

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
            <button 
              onClick={handleBackToAbout}
              className={`inline-block text-sm transition-colors px-3 py-1.5 rounded ${
                isDarkMode ? 'text-white hover:text-blue-400 bg-gray-800/60' : 'text-gray-800 hover:text-blue-700 bg-white/80'
              }`}
            >
              {t.backToAbout}
            </button>
            
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
        <button 
          onClick={handleBackToAbout}
          className={`inline-block text-sm transition-colors px-3 py-1.5 rounded ${
            isDarkMode ? 'text-white hover:text-blue-400 bg-gray-800/80' : 'text-gray-900 hover:text-blue-800 bg-white/90'
          }`}
        >
          {t.backToAbout}
        </button>
        
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
              <button 
                onClick={handleBackToAbout}
                className={`inline-block text-base transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}
              >
                {t.backToAbout}
              </button>
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