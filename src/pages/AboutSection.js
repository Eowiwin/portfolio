import React, { useState } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import Logo from '../components/Logo';

const images = [
  process.env.PUBLIC_URL + '/calisthenics1.jpg',
  process.env.PUBLIC_URL + '/calisthenics2.jpg',
  process.env.PUBLIC_URL + '/calisthenics3.jpg',
];

const AboutSection = ({ onNavigate }) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isFrench, toggleLanguage } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full min-h-screen flex items-start justify-center transition-colors duration-300">
      <MouseFollower />
      <GradientBackground />
      <Logo />
      
      {/* Content */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto mt-32 md:mt-40 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16">
          {/* Text content */}
          <div className="w-full md:w-6/12">
            <h1 className={`text-4xl md:text-6xl font-bold mb-8 md:mb-12 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {isFrench ? 'À PROPOS DE MOI' : 'ABOUT'}
            </h1>
            
            <div className="space-y-8">
              <p className={`text-base md:text-xl leading-relaxed text-justify ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                {t.aboutDescription}
              </p>
              
              <a 
                href="#resume" 
                className={`inline-block text-base md:text-xl transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
              >
                ↓ {isFrench ? 'CV' : 'resume'}
              </a>
            </div>
          </div>

          {/* Image with navigation */}
          <div className="w-full md:w-5/12">
            <div className="relative aspect-[3/4] w-full group flex items-center gap-8">
              {/* Previous image preview */}
              <div 
                className="hidden md:block relative w-48 h-96 overflow-hidden opacity-50 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={previousImage}
              >
                <img
                  src={images[(currentImageIndex - 1 + images.length) % images.length]}
                  alt="Previous"
                  className="absolute inset-0 w-full h-full object-cover blur-sm"
                />
              </div>

              {/* Current image */}
              <div 
                className="relative flex-[2] cursor-pointer"
                onClick={nextImage}
              >
                <img
                  src={images[currentImageIndex]}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-br-[8rem] transition-all duration-300"
                />
                <div 
                  className="absolute inset-0 rounded-br-[8rem]"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                    mixBlendMode: 'overlay'
                  }}
                />
              </div>

              {/* Next image preview */}
              <div 
                className="hidden md:block relative w-48 h-96 overflow-hidden opacity-50 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={nextImage}
              >
                <img
                  src={images[(currentImageIndex + 1) % images.length]}
                  alt="Next"
                  className="absolute inset-0 w-full h-full object-cover blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top right menu */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-3 md:gap-4 scale-75 md:scale-100">
        <button 
          onClick={toggleLanguage}
          className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
          aria-label="Toggle language"
        >
          {t.language}
        </button>
        <button 
          onClick={toggleDarkMode}
          className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button 
          onClick={() => onNavigate('main')}
          className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default AboutSection; 