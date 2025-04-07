import React, { useState, useEffect } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import { AnimatedButton, SectionContainer } from '../components/AnimatedElements';

const images = [
  process.env.PUBLIC_URL + '/img/calisthenics1.jpg',
  process.env.PUBLIC_URL + '/img/calisthenics2.jpg',
  process.env.PUBLIC_URL + '/img/calisthenics3.jpg',
  process.env.PUBLIC_URL + '/img/calisthenics4.jpg',
];

const AboutSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' or 'prev'

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
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    
    // Change the image immediately but use CSS to handle the visual transition
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const previousImage = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    
    // Change the image immediately but use CSS to handle the visual transition
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
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

  const handleGoToResume = (e) => {
    e.preventDefault();
    onNavigate('resume');
  };

  const handleGoToTimeline = (e) => {
    e.preventDefault();
    onNavigate('timeline');
  };

  // Landscape mode layout
  if (isLandscape) {
    console.log("Rendering LANDSCAPE layout");
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <MouseFollower />
        <GradientBackground />
        
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
              
              <div className="flex space-x-2 mt-2">
                <AnimatedButton
                  onClick={handleGoToResume}
                  emoji="📋"
                  darkTextClass={isDarkMode ? "text-gray-300" : "text-black"}
                  className="text-sm"
                >
                  {t.resumeButton}
                </AnimatedButton>
                
                <AnimatedButton
                  onClick={handleGoToTimeline}
                  emoji="📅"
                  darkTextClass={isDarkMode ? "text-gray-300" : "text-black"}
                  className="text-sm"
                >
                  {t.timelineButton}
                </AnimatedButton>
              </div>
            </div>
          </div>

          {/* Image part - significantly reduced size */}
          <div className="w-2/12 h-full flex items-center justify-center">
            <div className="relative h-[30%] aspect-[3/4] max-w-[15vh]">
              {/* Current image */}
              <div 
                className={`relative w-full h-full overflow-hidden rounded-lg shadow-lg ${isAnimating ? 'pointer-events-none' : 'cursor-pointer'}`}
                onClick={nextImage}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="relative w-full h-full">
                  <img
                    src={images[currentImageIndex]}
                    alt="Profile"
                    className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${
                      isAnimating 
                        ? `transform ${direction === 'next' ? 'scale-95 opacity-90' : 'scale-95 opacity-90'}`
                        : 'scale-100 opacity-100'
                    }`}
                    style={{ objectPosition: 'center' }}
                  />
                  <div 
                    className="absolute inset-0 rounded-lg transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                      mixBlendMode: 'overlay',
                      opacity: isAnimating ? 0.8 : 1
                    }}
                  />
                </div>
              </div>

              {/* Mobile navigation indicators */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex justify-center gap-1">
                {images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      if (index === currentImageIndex || isAnimating) return;
                      
                      setDirection(index > currentImageIndex ? 'next' : 'prev');
                      setIsAnimating(true);
                      
                      // Change image immediately
                      setCurrentImageIndex(index);
                      
                      // Reset animation after it completes
                      setTimeout(() => {
                        setIsAnimating(false);
                      }, 300);
                    }}
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
        
        {/* Custom animation keyframes */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          
          @keyframes slideOutLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          
          @keyframes slideOutRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  // Default portrait mode layout
  console.log("Rendering PORTRAIT layout");
  return (
    <div className="relative w-full h-auto min-h-screen overflow-y-auto overflow-x-hidden touch-manipulation overscroll-none">
      <MouseFollower />
      <GradientBackground />
      
      {/* Content */}
      <SectionContainer className="relative z-10 px-4 max-w-7xl mx-auto pt-28 pb-24 md:pt-40 md:pb-20 w-full">
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
              
              <div className="flex flex-wrap gap-4">
                <AnimatedButton 
                  onClick={handleGoToResume}
                  emoji="📋"
                  darkTextClass={isDarkMode ? "text-gray-300" : "text-black"} 
                  className="text-base md:text-xl"
                >
                  {t.resumeButton}
                </AnimatedButton>
                
                <AnimatedButton 
                  onClick={handleGoToTimeline}
                  emoji="📅"
                  darkTextClass={isDarkMode ? "text-gray-300" : "text-black"} 
                  className="text-base md:text-xl"
                >
                  {t.timelineButton}
                </AnimatedButton>
              </div>
            </div>
          </div>

          {/* Image with navigation - larger but still mobile-appropriate */}
          <div className="w-full md:w-7/12 flex flex-col items-center md:items-start mt-6 md:mt-0">
            {/* Mobile image - larger size */}
            <div className="block md:hidden" style={{ width: '57vw', height: '40vh', marginTop: '-5vh' }}>
              <div 
                className={`w-full h-full rounded-lg shadow-lg overflow-hidden ${isAnimating ? 'pointer-events-none' : 'cursor-pointer'}`}
                onClick={nextImage}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={images[currentImageIndex]}
                  alt="Profile"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isAnimating 
                      ? `transform ${direction === 'next' ? 'translate-x(-3%) scale-95' : 'translate-x(3%) scale-95'}`
                      : 'translate-x(0) scale-100'
                  }`}
                />
              </div>
            </div>
            
            {/* Desktop version with previews */}
            <div className="hidden md:block relative w-full">
              <div className="relative w-full flex items-center">
                {/* Image navigation container with absolute fixed width */}
                <div className="flex items-center justify-between" style={{ 
                    width: '80vw',
                    marginTop: '-15vh',
                    }}
                  >
                  {/* Previous image preview */}
                  <div 
                    className={`relative overflow-hidden ${isAnimating ? 'pointer-events-none' : 'cursor-pointer'} hover:opacity-100 transition-opacity rounded-lg`}
                    onClick={previousImage}
                    style={{ 
                      width: '10vw', 
                      height: '45vh',
                      opacity: isAnimating && direction === 'prev' ? 0.9 : 0.7 
                    }}
                  >
                    <img
                      src={images[(currentImageIndex - 1 + images.length) % images.length]}
                      alt="Previous"
                      className={`h-full w-full object-cover rounded-lg transition-transform duration-300 ${
                        isAnimating && direction === 'prev' ? 'scale-110' : ''
                      }`}
                    />
                  </div>

                  {/* Current image - desktop */}
                  <div 
                    className={`relative overflow-hidden rounded-lg shadow-lg ${isAnimating ? 'pointer-events-none' : 'cursor-pointer'}`}
                    onClick={nextImage}
                    style={{ 
                      width: '29vw', 
                      height: '85vh',
                      scale: 0.95,
                      transition: 'all 0.3s ease-in-out',
                      transform: isAnimating 
                        ? 'scale(0.95)' 
                        : 'scale(1)'
                    }}
                  >
                    <img
                      src={images[currentImageIndex]}
                      alt="Profile"
                      className={`w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out ${
                        isAnimating 
                          ? `transform ${direction === 'next' ? 'translate-x(-2%)' : 'translate-x(2%)'} opacity-90`
                          : 'translate-x(0) opacity-100'
                      }`}
                      style={{ objectPosition: 'center' }}
                    />
                    <div 
                      className="absolute inset-0 rounded-lg transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                        mixBlendMode: 'overlay',
                        opacity: isAnimating ? 0.5 : 1
                      }}
                    />
                  </div>

                  {/* Next image preview */}
                  <div 
                    className={`relative overflow-hidden ${isAnimating ? 'pointer-events-none' : 'cursor-pointer'} hover:opacity-100 transition-opacity rounded-lg`}
                    onClick={nextImage}
                    style={{ 
                      width: '10vw', 
                      height: '45vh',
                      opacity: isAnimating && direction === 'next' ? 0.9 : 0.7 
                    }}
                  >
                    <img
                      src={images[(currentImageIndex + 1) % images.length]}
                      alt="Next"
                      className={`h-full w-full object-cover rounded-lg transition-transform duration-300 ${
                        isAnimating && direction === 'next' ? 'scale-110' : ''
                      }`}
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
                  onClick={() => {
                    if (index === currentImageIndex || isAnimating) return;
                    setDirection(index > currentImageIndex ? 'next' : 'prev');
                    setIsAnimating(true);
                    
                    // Change image immediately
                    setCurrentImageIndex(index);
                    
                    // Reset animation after it completes
                    setTimeout(() => {
                      setIsAnimating(false);
                    }, 300);
                  }}
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
      </SectionContainer>
    </div>
  );
};

export default AboutSection;
