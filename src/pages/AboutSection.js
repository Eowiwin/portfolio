import React, { useState, useEffect } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';

const images = [
  process.env.PUBLIC_URL + '/img/calisthenics1.jpg',
  process.env.PUBLIC_URL + '/img/calisthenics2.jpg',
  process.env.PUBLIC_URL + '/img/calisthenics3.jpg',
];

const AboutSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLandscape, setIsLandscape] = useState(false);

  // Detect landscape mode
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 1024);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Minimum swipe distance (in px) to register as swipe
  const minSwipeDistance = 50;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      previousImage();
    }
  };

  // Landscape mode layout
  if (isLandscape) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <MouseFollower />
        <GradientBackground />
        
        <div className="relative z-10 w-full h-full p-4 flex flex-row items-center justify-between">
          {/* Text content - made more compact */}
          <div className="w-8/12 pr-4 h-full flex flex-col justify-center">
            <h1 className={`text-2xl font-bold mb-2 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {t.aboutTitle}
            </h1>
            
            <div className="space-y-2 overflow-auto max-h-[calc(100vh-120px)] pr-1 scrollbar-thin scrollbar-thumb-gray-400">
              <p className={`text-sm leading-tight ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                {t.aboutDescription}
              </p>
              
              <a 
                href="#resume" 
                className={`inline-block text-sm transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
              >
                {t.resumeButton}
              </a>
            </div>
          </div>

          {/* Image part - significantly reduced size */}
          <div className="w-4/12 h-full flex items-center justify-center">
            <div className="relative h-[50%] aspect-[3/4] max-w-[22vh]">
              {/* Current image */}
              <div 
                className="relative w-full h-full overflow-hidden rounded-lg"
                onClick={nextImage}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={images[currentImageIndex]}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                  style={{ objectPosition: 'center' }}
                />
                <div 
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                    mixBlendMode: 'overlay'
                  }}
                />
              </div>

              {/* Mobile navigation indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentImageIndex 
                        ? (isDarkMode ? 'bg-blue-400' : 'bg-blue-600') 
                        : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default portrait mode layout
  return (
    <div className="relative w-full h-auto min-h-screen overflow-y-auto overflow-x-hidden touch-manipulation overscroll-none">
      <MouseFollower />
      <GradientBackground />
      
      {/* Content */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto pt-28 pb-24 md:pt-40 md:pb-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-16">
          {/* Text content */}
          <div className="w-full md:w-6/12">
            <h1 className={`text-3xl md:text-6xl font-bold mb-6 md:mb-12 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {t.aboutTitle}
            </h1>
            
            <div className="space-y-6 md:space-y-8">
              <p className={`text-base md:text-xl leading-relaxed text-justify ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                {t.aboutDescription}
              </p>
              
              <a 
                href="#resume" 
                className={`inline-block text-base md:text-xl transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-black hover:text-blue-600'}`}
              >
                {t.resumeButton}
              </a>
            </div>
          </div>

          {/* Image with navigation - fixed for mobile centering */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-start mt-6 md:mt-0">
            <div className="relative w-[250px] md:w-full">
              <div className="relative aspect-[3/4] w-full group flex items-center justify-center md:justify-start gap-8">
                {/* Previous image preview */}
                <div 
                  className="hidden md:block relative w-48 h-96 overflow-hidden opacity-50 cursor-pointer hover:opacity-70 transition-opacity rounded-lg"
                  onClick={previousImage}
                >
                  <img
                    src={images[(currentImageIndex - 1 + images.length) % images.length]}
                    alt="Previous"
                    className="absolute inset-0 w-full h-full object-cover blur-sm rounded-lg"
                  />
                </div>

                {/* Current image - fixed width container for mobile */}
                <div 
                  className="relative w-full md:flex-[2] cursor-pointer h-80 md:h-96 overflow-hidden rounded-lg"
                  onClick={nextImage}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-lg transition-all duration-300"
                    style={{ objectPosition: 'center' }}
                  />
                  <div 
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                      mixBlendMode: 'overlay'
                    }}
                  />
                </div>

                {/* Next image preview */}
                <div 
                  className="hidden md:block relative w-48 h-96 overflow-hidden opacity-50 cursor-pointer hover:opacity-70 transition-opacity rounded-lg"
                  onClick={nextImage}
                >
                  <img
                    src={images[(currentImageIndex + 1) % images.length]}
                    alt="Next"
                    className="absolute inset-0 w-full h-full object-cover blur-sm rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation indicators */}
          <div className="md:hidden flex justify-center w-full mt-4 gap-2">
            {images.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex 
                    ? (isDarkMode ? 'bg-blue-400' : 'bg-blue-600') 
                    : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
