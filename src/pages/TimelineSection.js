import React, { useEffect, useState, useRef } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import { AnimatedButton, TransitionElement, SectionContainer } from '../components/AnimatedElements';

const TimelineSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const [isLandscape, setIsLandscape] = useState(false);
  const scrollRef = useRef(null);
  const [animationReady, setAnimationReady] = useState(false);
  
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

  // Ensure scrolling works properly
  useEffect(() => {
    const handleScroll = (e) => {
      // Prevent default scrolling behavior on the body
      if (scrollRef.current) {
        // Don't check if the target is inside scrollRef, allow scrolling from anywhere
        scrollRef.current.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    if (scrollRef.current) {
      // Enable scrolling for the timeline container
      scrollRef.current.style.overscrollBehavior = 'contain';
      scrollRef.current.style.WebkitOverflowScrolling = 'touch';
      
      // Make the container take up the full viewport
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      
      // Add wheel event listener to redirect scroll events to the container
      window.addEventListener('wheel', handleScroll, { passive: false });
      
      // Force layout recalculation
      setTimeout(() => {
        scrollRef.current.scrollTop = 0;
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
    
    return () => {
      // Cleanup
      window.removeEventListener('wheel', handleScroll);
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, []);

  // Coordinate animations - first wait for section to be visible, then trigger paths
  useEffect(() => {
    // First set animation ready to allow TransitionElements to animate
    const readyTimer = setTimeout(() => {
      setAnimationReady(true);
    }, 100);
    
    return () => clearTimeout(readyTimer);
  }, []);

  const handleBackToAbout = () => {
    onNavigate('about');
  };
  
  // Combine education and work data in chronological order based on language
  const getTimelineData = (isFrench) => {
    if (isFrench) {
      return [
        {
          id: 'w1',
          period: "2025 - Aujourd'hui",
          title: "Alternant ingénieur logiciel - 1ère et 2ème année d'école d'ingénieurs en informatique",
          place: "CLERAD",
          description: "Développement d'un ERP interne.",
          type: 'work'
        },
        {
          id: 'w2',
          period: "2024 - 2025",
          title: "Alternant développeur - 3ème année BUT Informatique",
          place: "CLERAD",
          description: "Développement d'un ERP interne.",
          type: 'work'
        },
        {
          id: 'e1',
          period: "2022 - 2024",
          title: "BUT Informatique - 1ère et 2ème année",
          place: "Université Clermont Auvegne - Aubière",
          description: "Spécialisation dans le développement mobile à partir de la 2ème année.",
          type: 'education'
        },
        {
          id: 'w3',
          period: "2019 - 2022",
          title: "Baccalauréat Général",
          place: "Lycée Jeanne d'Arc - Montaigu Vendée",
          description: "Mention Bien.",
          type: 'education'
        },
        {
          id: 'w4',
          period: "2015 - 2019",
          title: "Brevet des Collèges",
          place: "Collège Saint Nicolas",
          description: "Mention Bien.",
          type: 'education'
        },
        {
          id: 'e3',
          period: "",
          title: "",
          place: "",
          description: "",
          type: ''
        }
      ];
    } else {
      return [
        {
          id: 'w1',
          period: "2025 - Present",
          title: "Engineer Apprentice - 1st and 2nd year Master in Computer Science (Equivalent)",
          place: "CLERAD",
          description: "Development of an internal ERP system.",
          type: 'work'
        },
        {
          id: 'w2',
          period: "2024 - 2025",
          title: "Developer Apprentice - 3rd year BUT Computer Science (Equivalent to Bachelor's Degree)",
          place: "CLERAD",
          description: "Development of an internal ERP system.",
          type: 'work'
        },
        {
          id: 'e1',
          period: "2022 - 2024",
          title: "BUT Computer Science (Equivalent to Bachelor's Degree) - 1st and 2nd year",
          place: "Clermont Auvergne University - Aubière",
          description: "Specialization in mobile development from the 2nd year onwards.",
          type: 'education'
        },
        {
          id: 'w3',
          period: "2019 - 2022",
          title: "French Baccalauréat (General track)",
          place: "Jeanne d'Arc High School - Montaigu Vendée",
          description: "Honors degree (2:1).",
          type: 'education'
        },
        {
          id: 'w4',
          period: "2015 - 2019",
          title: "Middle School Diploma",
          place: "Saint Nicolas Middle School",
          description: "Honors degree (2:1).",
          type: 'education'
        },
        {
          id: 'e3',
          period: "",
          title: "",
          place: "",
          description: "",
          type: ''
        }
      ];
    }
  };

  const timelineData = getTimelineData(isFrench);

  const TimelineEvent = ({ data, isDarkMode, index, isLast, alignRight }) => {
    // Only render TransitionElement if animation is ready
    if (!animationReady) {
      return null;
    }
    
    // Determine which emoji to show based on the index
    const getEmoji = () => {
      if (index === 0 || index === 1) {
        // For the first item, return a fragment with both emojis
        return (
          <>
            <span role="img" aria-label="Education" className="text-sm mr-0.5">📚</span>
            <span role="img" aria-label="Work" className="text-sm ml-0.5">💼</span>
          </>
        );
      }
      if (index === 1 || index === 2 || index === 3 || index === 4) return "📚"; // Next four items - books
      if (index === timelineData.length - 1) return "👶🏼"; // Last item - baby
      return "📚"; // Default fallback
    };

    // For the last entry (baby), we don't want any text on the left
    if (index === timelineData.length - 1) {
      return (
        <TransitionElement index={index + 1} delay={index * 100}>
          <div className="relative pb-16">
            <div className="grid grid-cols-7 items-center gap-2">
              <div className="col-span-3"></div>
              <div className="col-span-1 flex justify-center">
                <div className={`w-12 h-12 rounded-full z-10 relative
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
                  shadow-md border-2 border-blue-500 flex items-center justify-center`}>
                  <div className="flex items-center justify-center">
                    <span role="img" aria-label="Baby" className="text-lg">👶🏼</span>
                  </div>
                </div>
              </div>
              <div className="col-span-3"></div>
            </div>
          </div>
        </TransitionElement>
      );
    }
    
    return (
      <TransitionElement index={index + 1} delay={index * 100}>
        <div className="relative pb-16">
          {/* Center line with more dramatic curves */}
          {!isLast && (
            <div className="absolute left-1/2 top-8 transform -translate-x-1/2 h-full">
              <svg className="h-full w-24" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d={alignRight ? "M50,0 C90,30 10,70 50,100" : "M50,0 C10,30 90,70 50,100"}
                  fill="none" 
                  stroke="url(#blue-purple-gradient)" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ strokeDashoffset: 0 }}
                />
                <defs>
                  <linearGradient id="blue-purple-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          
          {/* Content layout with more spacing */}
          <div className="grid grid-cols-7 items-center gap-2">
            {/* Left side content */}
            {alignRight ? (
              <>
                <div className="col-span-3">
                  <div className={`p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <span className={`inline-block px-2 py-1 mb-2 text-xs rounded-full ${
                      data.type === 'education' 
                        ? (isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800')
                        : (isDarkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800')
                    }`}>
                      {data.period}
                    </span>
                    
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {data.title}
                    </h3>
                    
                    <h4 className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {data.place}
                    </h4>
                    
                    <p className={`mt-2 text-sm text-justify ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {data.description}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <div className={`w-12 h-12 rounded-full z-10 relative
                    ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
                    shadow-md border-2 border-blue-500 flex items-center justify-center`}>
                    <div className="flex items-center justify-center">
                      {getEmoji()}
                    </div>
                  </div>
                </div>
                <div className="col-span-3"></div>
              </>
            ) : (
              <>
                <div className="col-span-3"></div>
                <div className="col-span-1 flex justify-center">
                  <div className={`w-12 h-12 rounded-full z-10 relative
                    ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
                    shadow-md border-2 border-blue-500 flex items-center justify-center`}>
                    <div className="flex items-center justify-center">
                      {getEmoji()}
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className={`p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <span className={`inline-block px-2 py-1 mb-2 text-xs rounded-full ${
                      data.type === 'education' 
                        ? (isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800')
                        : (isDarkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800')
                    }`}>
                      {data.period}
                    </span>
                    
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {data.title}
                    </h3>
                    
                    <h4 className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {data.place}
                    </h4>
                    
                    <p className={`mt-2 text-sm text-justify ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {data.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </TransitionElement>
    );
  };

  // Landscape mode layout
  if (isLandscape) {
    return (
      <div className="fixed inset-0 w-full h-full overflow-y-auto" ref={scrollRef} style={{ touchAction: 'pan-y' }}>
        <MouseFollower />
        <GradientBackground />
        
        <SectionContainer className="relative z-10 w-full min-h-full p-4 flex flex-col items-center pb-32">
          {/* Controls above the timeline in landscape mode - with significantly increased top margin */}
          <TransitionElement index={0}>
            <div className="sticky top-0 flex justify-center items-center space-x-4 py-2 mt-32 mb-4 w-full z-20">
              {/* Back button */}
              <AnimatedButton 
                onClick={handleBackToAbout}
                emoji="📝"
                className="text-sm px-3 py-1.5 rounded"
                darkTextClass={isDarkMode ? "text-white" : "text-gray-800"}
              >
                {t.backToAbout}
              </AnimatedButton>
            </div>
          </TransitionElement>
          
          {/* Heading */}
          <TransitionElement index={1}>
            <div className="w-full text-center mb-8">
              <h1 className={`text-2xl font-bold font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {t.timelineTitle}
              </h1>
              <p className={`mt-2 text-sm text-center mx-auto max-w-3xl px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.timelineDescription}
              </p>
            </div>
          </TransitionElement>
          
          {/* Timeline content - Combined under one section with larger max-width */}
          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="relative">
              {animationReady && timelineData.map((item, index) => (
                <TimelineEvent 
                  key={item.id} 
                  data={item} 
                  isDarkMode={isDarkMode}
                  index={index}
                  isLast={index === timelineData.length - 1}
                  alignRight={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    );
  }

  // Default portrait mode layout
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto" ref={scrollRef} style={{ touchAction: 'pan-y' }}>
      <MouseFollower />
      <GradientBackground />
      
      <SectionContainer className="relative z-10">
        {/* Add significant top padding */}
        <div className="pt-16 md:pt-24"></div>
        
        {/* Controls above the timeline - removed blur effect */}
        <TransitionElement index={0}>
          <div className="flex justify-center items-center space-x-4 py-2 mb-4 px-4 relative z-20 sticky top-0">
            {/* Back button */}
            <AnimatedButton 
              onClick={handleBackToAbout}
              emoji="📝"
              className="text-sm px-3 py-1.5 rounded"
              darkTextClass={isDarkMode ? "text-white" : "text-gray-900"}
            >
              {t.backToAbout}
            </AnimatedButton>
          </div>
        </TransitionElement>
        
        {/* Content - Wider container */}
        <div className="relative z-10 w-full pb-40">
          {/* Header */}
          <TransitionElement index={1}>
            <div className="mb-12 text-center px-4">
              <h1 className={`text-3xl md:text-6xl font-bold mb-4 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {t.timelineTitle}
              </h1>
              <p className={`text-base md:text-xl text-center max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.timelineDescription}
              </p>
            </div>
          </TransitionElement>
          
          {/* Timeline content - Centered with max-width but inside full-width container */}
          <div className="w-full flex justify-center px-4">
            <div className="w-full max-w-3xl">
              <div className="relative">
                {animationReady && timelineData.map((item, index) => (
                  <TimelineEvent 
                    key={item.id} 
                    data={item} 
                    isDarkMode={isDarkMode}
                    index={index}
                    isLast={index === timelineData.length - 1}
                    alignRight={index % 2 === 0}
                />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default TimelineSection;