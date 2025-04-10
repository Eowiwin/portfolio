// filepath: /home/erwan/portfoliov2/src/pages/ResumeSection.js
import React, { useEffect, useState } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import { AnimatedButton, TransitionElement, SectionContainer } from '../components/AnimatedElements';
import { jsPDF } from 'jspdf';

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
    // Create a new image object
    const img = new Image();
    img.src = process.env.PUBLIC_URL + '/img/CV.png';
    
    img.onload = () => {
      // Create a new PDF with jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [img.width, img.height]
      });
      pdf.addImage(img, 'PNG', 0, 0, img.width, img.height);

      pdf.save('Resume.pdf');
    };
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
        
        <SectionContainer className="relative z-10 w-full min-h-full p-4 flex flex-col items-center">
          {/* Controls above the resume in landscape mode */}
          <TransitionElement index={0}>
            <div className="flex justify-center items-center space-x-4 mb-4 w-full">
              {/* Back button */}
              <AnimatedButton 
                onClick={handleBackToAbout}
                emoji="📝"
                className="text-sm px-3 py-1.5 rounded"
                darkTextClass={isDarkMode ? "text-white" : "text-gray-800"}
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
          </TransitionElement>
          
          {/* Update date above the resume */}
          <TransitionElement index={1}>
            <div className="w-full text-center mb-2">
              <p className={`text-xs italic ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {isFrench ? 'Mis à jour le ' : 'Updated on '} {currentDate}
              </p>
            </div>
          </TransitionElement>
          
          <TransitionElement index={2}>
            <div className="w-full flex justify-center">
              <div className="max-w-2xl shadow-md">
                <img
                  src={process.env.PUBLIC_URL + '/img/CV.png'}
                  alt="Resume"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </TransitionElement>
        </SectionContainer>
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
      
      <SectionContainer className="relative z-10">
        {/* Mobile controls - shown above the resume on mobile with more vertical spacing */}
        <TransitionElement index={0}>
          <div className="md:hidden flex justify-center items-center space-x-4 mb-6 px-4 relative z-20">
            {/* Back button for mobile view */}
            <AnimatedButton 
              onClick={handleBackToAbout}
              emoji="📝"
              className="text-sm px-3 py-1.5 rounded"
              darkTextClass={isDarkMode ? "text-white" : "text-gray-900"}
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
        </TransitionElement>
        
        {/* Update date above the resume with darker text - visible ONLY on mobile */}
        <TransitionElement index={1}>
          <div className="md:hidden w-full text-center mb-2 px-4 relative z-20">
            <p className={`text-xs md:text-sm italic px-2 py-1 rounded inline-block ${
              isDarkMode ? 'text-white bg-gray-800/70' : 'text-gray-900 bg-white/80'
            }`}>
              {isFrench ? 'Mis à jour le ' : 'Updated on '} {currentDate}
            </p>
          </div>
        </TransitionElement>
        
        {/* CV Container with download button next to it */}
        <div className="relative z-10 px-4 py-2 w-full">
          <div className="flex justify-center items-start">
            {/* Back to About button and controls for desktop - moved to left side next to the resume */}
            <TransitionElement index={2}>
              <div className="hidden md:block mr-6 sticky top-20">
                <div className="relative mb-4">
                  <AnimatedButton 
                    onClick={handleBackToAbout}
                    emoji="📝"
                    className="text-base"
                    darkTextClass={isDarkMode ? "text-gray-300" : "text-gray-900"}
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
            </TransitionElement>
            
            <TransitionElement index={3}>
              <div className="w-full mb-20 max-w-2xl shadow-md">
                <img
                  src={process.env.PUBLIC_URL + '/img/CV.png'}
                  alt="Resume"
                  className="w-full h-auto"
                />
              </div>
            </TransitionElement>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default ResumeSection;