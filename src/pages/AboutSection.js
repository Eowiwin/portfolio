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
      const isLand = window.innerWidth > window.innerHeight && window.innerWidth < 1024;
      console.log("Orientation check:", { 
        width: window.innerWidth, 
        height: window.innerHeight,
        isLandscape: isLand 
      });
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
    console.log("Rendering LANDSCAPE layout");
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <MouseFollower />
        <GradientBackground />
        
        {/* DEBUG - Landscape mode indicator */}
        <div className="fixed top-0 left-0 bg-red-500 text-white px-2 py-1 z-50 text-xs">
          LANDSCAPE MODE
        </div>
        
        <div className="relative z-10 w-full h-full p-4 flex flex-row items-center justify-between">
          {/* Text content - increased width */}
          <div className="w-10/12 pr-4 h-full flex flex-col justify-center">
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
          <div className="w-2/12 h-full flex items-center justify-center">
            <div className="relative h-[30%] aspect-[3/4] max-w-[15vh]">
              {/* Current image */}
              <div 
                className="relative w-full h-full overflow-hidden rounded-lg shadow-lg"
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
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex justify-center gap-1">
                {images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1 h-1 rounded-full transition-colors ${
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
  console.log("Rendering PORTRAIT layout");
  return (
    <div className="relative w-full h-auto min-h-screen overflow-y-auto overflow-x-hidden touch-manipulation overscroll-none">
      <MouseFollower />
      <GradientBackground />
      
      {/* DEBUG - Portrait mode indicator */}
      <div className="fixed top-0 left-0 bg-blue-500 text-white px-2 py-1 z-50 text-xs">
        PORTRAIT MODE
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto pt-28 pb-24 md:pt-40 md:pb-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-16">
          {/* Text content */}
          <div className="w-full md:w-5/12">
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

          {/* Image with navigation - larger but still mobile-appropriate */}
          <div className="w-full md:w-7/12 flex flex-col items-center md:items-start mt-6 md:mt-0">
            {/* Mobile image - larger size */}
            <div className="block md:hidden" style={{ width: '300px', height: '420px' }}>
              <div 
                className="w-full h-full rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={nextImage}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={images[currentImageIndex]}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Desktop version with previews - FINAL FIX */}
            <div className="hidden md:block relative w-full">
              <div className="relative w-full flex items-center justify-center">
                {/* Image navigation container with absolute fixed width */}
                <div className="flex items-center justify-between" style={{ width: '700px' }}>
                  {/* Previous image preview */}
                  <div 
                    className="relative overflow-hidden cursor-pointer hover:opacity-100 transition-opacity rounded-lg"
                    onClick={previousImage}
                    style={{ 
                      width: '165px', 
                      height: '350px',
                      opacity: 0.7 
                    }}
                  >
                    <img
                      src={images[(currentImageIndex - 1 + images.length) % images.length]}
                      alt="Previous"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Current image - desktop */}
                  <div 
                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                    onClick={nextImage}
                    style={{ 
                      width: '700px', 
                      height: '700px'
                    }}
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
                    className="relative overflow-hidden cursor-pointer hover:opacity-100 transition-opacity rounded-lg"
                    onClick={nextImage}
                    style={{ 
                      width: '165px', 
                      height: '350px',
                      opacity: 0.7 
                    }}
                  >
                    <img
                      src={images[(currentImageIndex + 1) % images.length]}
                      alt="Next"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile navigation indicators */}
            <div className="md:hidden flex justify-center w-full mt-2 gap-2">
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
};

export default AboutSection;
