import React, { useState, useEffect, useMemo } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import { AnimatedButton, TransitionElement, SectionContainer } from '../components/AnimatedElements';
import ProjectCard, { formatProjectDate } from '../components/ProjectCard';

// Project Detail Component
const ProjectDetailView = ({ project, onClose, isDarkMode, t }) => {
  const { isFrench } = useLanguageStore();
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
  
  if (!project) return null;
  
  // Special landscape layout for mobile devices
  if (isLandscape) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
        {/* Backdrop with click handler to close */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        
        {/* Modal Content - Landscape optimized */}
        <div 
          className={`relative w-full h-full max-h-[95vh] rounded-lg shadow-xl overflow-hidden flex ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } transform transition-all`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-2 right-2 z-10 p-1 rounded-full ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Landscape layout - image on left, content on right */}
          <div className="flex flex-row h-full">
            {/* Project image - take up 40% of width */}
            <div className="w-2/5 h-full relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Project+Preview";
                }}
              />
            </div>
            
            {/* Project content - take up 60% of width */}
            <div className="w-3/5 p-3 overflow-y-auto" style={{ maxHeight: '95vh' }}>
              <h2 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h2>
              
              <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.description}
              </p>
              
              <div className="mb-3">
                <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {t.viewSource}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Regular portrait layout
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with click handler to close */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div 
        className={`relative max-w-4xl w-full rounded-lg shadow-xl overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } transform transition-all max-h-[90vh] flex flex-col`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Project image banner */}
        <div className="w-full relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x600?text=Project+Preview";
            }}
          />
        </div>
        
        {/* Project content - scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {project.title}
          </h2>
          
          <p className={`text-base md:text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {project.description}
          </p>
          
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 text-sm rounded-full ${
                    isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
            </div>
            
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {t.viewSource}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom component for Undertalya project with logo
const UndertalyaProjectCard = ({ project, onClick, isDarkMode }) => {
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-1`}
    >
      {/* Project image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
          }}
        />
      </div>
      
      {/* Project content */}
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span 
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              ...
            </span>
          )}
        </div>
        
        {/* Update date */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
        </div>
      </div>
      
      {/* Undertalya Logo in bottom right */}
      <div className="absolute bottom-3 right-3 w-12 h-12">
        <img 
          src={process.env.PUBLIC_URL + "/img/undertalya-logo.png"} 
          alt="Undertalya Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// Custom component for Bongomino project with logo
const BongominoProjectCard = ({ project, onClick, isDarkMode }) => {
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-1`}
    >
      {/* Project image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
          }}
        />
      </div>
      
      {/* Project content */}
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span 
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              ...
            </span>
          )}
        </div>
        
        {/* Update date */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
        </div>
      </div>
      
      {/* Bongomino Logo in bottom right */}
      <div className="absolute bottom-3 right-3 w-16 h-16">
        <img 
          src={process.env.PUBLIC_URL + "/img/bongomino-logo.png"} 
          alt="Bongomino Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// Custom component for Portfolio project with logo and theme-sensitive preview
const PortfolioProjectCard = ({ project, onClick, isDarkMode }) => {
  // Adding translation support
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  // Use different preview image based on theme AND language
  const previewImage = isDarkMode 
    ? (isFrench ? process.env.PUBLIC_URL + "/img/portfolio-preview-dark.png" : process.env.PUBLIC_URL + "/img/portfolio-preview-dark-en.png")
    : (isFrench ? process.env.PUBLIC_URL + "/img/portfolio-preview-light.png" : process.env.PUBLIC_URL + "/img/portfolio-preview-light-en.png");
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-1`}
    >
      {/* Project image - using theme-sensitive image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={previewImage} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
          }}
        />
      </div>
      
      {/* Project content */}
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span 
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              ...
            </span>
          )}
        </div>
        
        {/* Update date */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
        </div>
      </div>
      
      {/* Portfolio Logo in bottom right */}
      <div className="absolute bottom-3 right-3 w-12 h-12 flex items-center justify-center">
        <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-white'} flex items-center justify-center`}>
          <img 
            src={process.env.PUBLIC_URL + "/logo512.png"} 
            alt="Portfolio Logo"
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

// Custom component for SQLuedo project with logo
const SQLuedoProjectCard = ({ project, onClick, isDarkMode }) => {
  // Adding translation support
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-1`}
    >
      {/* Project image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
          }}
        />
      </div>
      
      {/* Project content */}
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span 
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              ...
            </span>
          )}
        </div>
        
        {/* Update date */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
        </div>
      </div>
      
      {/* SQLuedo Logo in bottom right */}
      <div className="absolute bottom-3 right-3 w-12 h-12">
        <img 
          src={process.env.PUBLIC_URL + "/img/sqluedo-logo.png"} 
          alt="SQLuedo Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// Custom component for Minecraft Plugin project with logo
const MinecraftPluginProjectCard = ({ project, onClick, isDarkMode }) => {
  // Adding translation support
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-1`}
    >
      {/* Project image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
          }}
        />
      </div>
      
      {/* Project content */}
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span 
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              ...
            </span>
          )}
        </div>
        
        {/* Update date */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
        </div>
      </div>
      
      {/* Minecraft Logo in bottom right */}
      <div className="absolute bottom-3 right-3 w-12 h-12">
        <img 
          src={process.env.PUBLIC_URL + "/img/minecraft-logo.png"} 
          alt="Minecraft Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// Custom component for Connect4 project with logo
const Connect4ProjectCard = ({ project, onClick, isDarkMode }) => {
  // Adding translation support
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-1`}
    >
      {/* Project image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
          }}
        />
      </div>
      
      {/* Project content */}
      <div className="p-5">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span 
              className={`px-2 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              ...
            </span>
          )}
        </div>
        
        {/* Update date */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
        </div>
      </div>
      
      {/* Connect4 Logo in bottom right */}
      <div className="absolute bottom-3 right-3 w-12 h-12">
        <img 
          src={process.env.PUBLIC_URL + "/img/connect4-logo.png"} 
          alt="Connect4 Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

const ProjectsSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const [sortOption, setSortOption] = useState('updated'); // 'updated' or 'alphabetical'
  const [searchQuery, setSearchQuery] = useState('');
  const [isLandscape, setIsLandscape] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectCount, setProjectCount] = useState(6); // Default to show 6 projects
  const [customCount, setCustomCount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Handle custom count input
  const handleCustomCountChange = (e) => {
    setCustomCount(e.target.value);
  };

  // Handle custom count submission
  const handleCustomCountSubmit = () => {
    const count = parseInt(customCount, 10);
    if (!isNaN(count) && count > 0) {
      setProjectCount(count);
    }
  };

  // Handle keydown for input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCustomCountSubmit();
    }
  };

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

  // Sample projects data - wrapped in useMemo to prevent recreation on every render
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Portfolio",
      description: isFrench 
        ? "Mon site portfolio créé avec React et Tailwind CSS. J'ai décidé de partir sur un style différent et d'ajouter des petites animations ✨."
        : "My portfolio website built with React and Tailwind CSS. I decided to go for a different style and add some small animations ✨.",
      tech: ["React Native", "Tailwind CSS", "JavaScript"],
      image: isDarkMode 
        ? (isFrench ? process.env.PUBLIC_URL + "/img/portfolio-preview-dark.png" : process.env.PUBLIC_URL + "/img/portfolio-preview-dark-en.png")
        : (isFrench ? process.env.PUBLIC_URL + "/img/portfolio-preview-light.png" : process.env.PUBLIC_URL + "/img/portfolio-preview-light-en.png"),
      link: "https://www.behance.net/gallery/223117437/Portfolio",
      updatedAt: "2025-04-08"
    },
    {
      id: 2,
      title: "Bongomino",
      description: isFrench 
        ? "Application tirée du jeu de société Ubongo. Les joueurs doivent résoudre des casse-têtes en un temps limité. Chaque joueur reçoit une grille et des pièces similaires à des formes de Tetris. Multi-plateforme, mode solo et multi-joueur 🧩."
        : "An app based on the board game Ubongo. Players must solve puzzles in a limited time. Each player receives a grid and pieces similar to Tetris shapes. Cross-platform, single-player, and multi-player modes 🧩.",
      tech: ["React Native", "Zustand"],
      image: process.env.PUBLIC_URL + "/img/bongomino-preview.png",
      link: "https://www.behance.net/gallery/223202905/Bongomino",
      updatedAt: "2025-02-15"
    },
    {
      id: 3,
      title: "Undertalya",
      description: isFrench 
        ? "Application android qui permet d'être utilisé en tant que guide du jeu Undertale. Réalisé en 1ère année de BUT avec un autre développeur ❤️."
        : "Android application that serves as a guide for the game Undertale. Developed in the first year of my degree with another developer ❤️.",
      tech: ["C#", ".NET", "MAUI"],
      image: process.env.PUBLIC_URL + "/img/undertalya-preview.png",
      link: "https://www.behance.net/gallery/223200553/Undertalya",
      updatedAt: "2023-11-17"
    },
    {
      id: 4,
      title: "SQLuedo",
      description: isFrench 
        ? "SQLuedo est une application ludique pour permettre d'apprendre le langage SQL de manière ludique ! Destinée pour les lycéens, il faut résoudre des enquêtes policières avec le SQL 🔎."
        : "SQLuedo is an app that lets you learn SQL in a fun way! Designed for high school students, you have to solve detective investigations using SQL 🔎.",
      tech: ["PHP", "Docker", ".NET API REST", "EntityFramework", "C#", "HTML", "CSS", "JavaScript", "Blazor", "Kotlin", "XAML", "PostgreSQL", "Twig"],
      image: process.env.PUBLIC_URL + "/img/sqluedo-preview.png",
      link: "https://www.behance.net/gallery/223203511/SQLuedo",
      updatedAt: "2024-06-24"
    },
    {
      id: 5,
      title: "Minecraft Plugin",
      description: isFrench 
        ? "Plugin Minecraft qui ajoute des fonctionnalités personnalisées au jeu (Objets, armures, outils, trophées...) 🧱."
        : "Minecraft plugin that adds custom features to the game (Items, armor, tools, trophies...) 🧱.",
      tech: ["Java", "Spigot"],
      image: process.env.PUBLIC_URL + "/img/minecraft-preview.png",
      link: "https://www.behance.net/gallery/223163959/Minecraft-plugin",
      updatedAt: "2023-07-01"
    },
    {
      id: 6,
      title: "Connect4",
      description: isFrench 
        ? "Application console (CLI) pour iOS avec mode solo (face à un robot) et multi-joueur. Plusieurs modes sont présents : Puissance 4, Morpions... 🎮."
        : "Console application (CLI) for iOS with single-player (against a robot) and multi-player modes. Several modes are available: Connect 4, Tic-Tac-Toe... 🎮.",
      tech: ["Swift"],
      image: process.env.PUBLIC_URL + "/img/connect4-preview.png",
      link: "https://www.behance.net/gallery/223206847/Connect-Four",
      updatedAt: "2025-02-12"
    }
  ], [isFrench, isDarkMode]); // Re-create when language or theme changes

  // Sort and filter projects based on selected option and search query
  const filteredAndSortedProjects = useMemo(() => {
    // First, filter by search query
    const filtered = projects.filter(project => {
      const searchLower = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchLower))
      );
    });

    // Then sort based on sort option
    return [...filtered].sort((a, b) => {
      if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else { // sort by updatedAt
        // Parse dates in YYYY-MM-DD format
        const aDate = new Date(a.updatedAt);
        const bDate = new Date(b.updatedAt);
        
        // Sort in descending order (newest first)
        return bDate - aDate;
      }
    });
  }, [projects, sortOption, searchQuery]);

  // Get visible projects based on project count setting
  const visibleProjects = useMemo(() => {
    return filteredAndSortedProjects.slice(0, projectCount);
  }, [filteredAndSortedProjects, projectCount]);

  const handleProjectClick = (project) => {
    // Instead of opening a link, set the selected project
    setSelectedProject(project);
  };

  // Handle closing the project detail view
  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  // Render appropriate project card based on project type
  const renderProjectCard = (project) => {
    if (project.title === "Undertalya") {
      return (
        <UndertalyaProjectCard 
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
          isDarkMode={isDarkMode}
        />
      );
    } else if (project.title === "Bongomino") {
      return (
        <BongominoProjectCard
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
          isDarkMode={isDarkMode}
        />
      );
    } else if (project.title === "Portfolio") {
      return (
        <PortfolioProjectCard
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
          isDarkMode={isDarkMode}
        />
      );
    } else if (project.title === "SQLuedo") {
      return (
        <SQLuedoProjectCard
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
          isDarkMode={isDarkMode}
        />
      );
    } else if (project.title === "Minecraft Plugin") {
      return (
        <MinecraftPluginProjectCard
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
          isDarkMode={isDarkMode}
        />
      );
    } else if (project.title === "Connect4") {
      return (
        <Connect4ProjectCard
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
          isDarkMode={isDarkMode}
        />
      );
    } else {
      return (
        <ProjectCard 
          key={project.id}
          project={project}
          onClick={() => handleProjectClick(project)}
        />
      );
    }
  };

  // Project count options
  const projectCountOptions = [3, 6, 9];

  // Toggle custom input
  const toggleCustomInput = () => {
    setShowCustomInput(!showCustomInput);
    if (!showCustomInput) {
      setCustomCount('');
    }
  };

  // Landscape mode layout with proper scrolling
  if (isLandscape) {
    return (
      <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden touch-manipulation" style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}>
        <MouseFollower />
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientBackground />
        </div>
        
        {/* Project Detail View (Modal) */}
        {selectedProject && (
          <ProjectDetailView 
            project={selectedProject} 
            onClose={handleCloseDetail}
            isDarkMode={isDarkMode}
            t={t}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10 px-4 py-16 w-full">
          <h1 className={`text-xl font-bold mb-2 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {t.projectsTitle}
          </h1>
          
          <p className={`text-sm leading-tight mb-4 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
            {t.projectsDescription}
          </p>
          
          {/* Search, Sort and Count Controls - Simplified for landscape */}
          <div className="flex flex-col mb-4 gap-2">
            {/* Search Bar */}
            <div className="w-full">
              <div className={`relative rounded-md shadow-sm w-full`}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchProjects}
                  className={`block w-full rounded-md border-0 py-2 px-3 text-xs shadow-sm ring-1 ring-inset 
                    ${isDarkMode 
                      ? 'bg-gray-800 text-white ring-gray-700 placeholder:text-gray-400 focus:ring-blue-500' 
                      : 'bg-white text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600'
                    } focus:ring-2 focus:ring-inset focus:outline-none`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-3 w-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.sortBy}
              </span>
              <div className="flex rounded-md overflow-hidden">
                <button
                  onClick={() => setSortOption('updated')}
                  className={`py-1 px-2 text-xs transition-colors ${
                    sortOption === 'updated'
                      ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                  }`}
                >
                  {t.updated}
                </button>
                <button
                  onClick={() => setSortOption('alphabetical')}
                  className={`py-1 px-2 text-xs transition-colors ${
                    sortOption === 'alphabetical'
                      ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                  }`}
                >
                  {t.alphabetical}
                </button>
              </div>
            </div>
            
            {/* Count Options */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.show}
              </span>
              <div className="flex rounded-md overflow-hidden">
                {projectCountOptions.map(count => (
                  <button
                    key={count}
                    onClick={() => {
                      setProjectCount(count);
                      setShowCustomInput(false);
                    }}
                    className={`py-1 px-2 text-xs transition-colors ${
                      projectCount === count && !showCustomInput
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }`}
                  >
                    {count}
                  </button>
                ))}
                <button
                  onClick={toggleCustomInput}
                  className={`py-1 px-2 text-xs transition-colors ${
                    showCustomInput
                      ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                  }`}
                >
                  {t.custom}
                </button>
              </div>
              
              {/* Custom count input */}
              {showCustomInput && (
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={customCount}
                    onChange={handleCustomCountChange}
                    onKeyDown={handleKeyDown}
                    className={`w-12 py-1 px-2 text-xs rounded-l-md border-0 shadow-sm ring-1 ring-inset
                      ${isDarkMode 
                        ? 'bg-gray-800 text-white ring-gray-700 focus:ring-blue-500' 
                        : 'bg-white text-gray-900 ring-gray-300 focus:ring-blue-600'
                      } focus:ring-2 focus:ring-inset focus:outline-none`}
                  />
                  <button
                    onClick={handleCustomCountSubmit}
                    className={`py-1 px-2 text-xs rounded-r-md ${
                      isDarkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    ✓
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Projects Grid - adapted for landscape */}
          <div className="grid grid-cols-2 gap-3 pb-16">
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project) => {
                if (project.title === "Undertalya") {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transform hover:-translate-y-1`}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
                          }}
                        />
                      </div>
                      
                      <div className="p-2">
                        <h3 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        
                        <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span 
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ...
                            </span>
                          )}
                        </div>
                        
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                        </div>
                      </div>
                      
                      {/* Undertalya Logo in bottom right (landscape) */}
                      <div className="absolute bottom-2 right-2 w-8 h-8">
                        <img 
                          src={process.env.PUBLIC_URL + "/img/undertalya-logo.png"} 
                          alt="Undertalya Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  );
                } else if (project.title === "Bongomino") {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transform hover:-translate-y-1`}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
                          }}
                        />
                      </div>
                      
                      <div className="p-2">
                        <h3 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        
                        <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span 
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ...
                            </span>
                          )}
                        </div>
                        
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                        </div>
                      </div>
                      
                      {/* Bongomino Logo in bottom right (landscape) */}
                      <div className="absolute bottom-2 right-2 w-8 h-8">
                        <img 
                          src={process.env.PUBLIC_URL + "/img/bongomino-logo.png"} 
                          alt="Bongomino Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  );
                } else if (project.title === "Portfolio") {
                  // Theme-sensitive image
                  const previewImage = isDarkMode 
                    ? process.env.PUBLIC_URL + "/img/portfolio-preview-dark.png"
                    : process.env.PUBLIC_URL + "/img/portfolio-preview-light.png";
                    
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transform hover:-translate-y-1`}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={previewImage} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
                          }}
                        />
                      </div>
                      
                      <div className="p-2">
                        <h3 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        
                        <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span 
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ...
                            </span>
                          )}
                        </div>
                        
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                        </div>
                      </div>
                      
                      {/* Portfolio Logo in bottom right (landscape) */}
                      <div className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center">
                        <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-white'} flex items-center justify-center`}>
                          <img 
                            src={process.env.PUBLIC_URL + "/logo512.png"} 
                            alt="Portfolio Logo"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else if (project.title === "SQLuedo") {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transform hover:-translate-y-1`}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
                          }}
                        />
                      </div>
                      
                      <div className="p-2">
                        <h3 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        
                        <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span 
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ...
                            </span>
                          )}
                        </div>
                        
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                        </div>
                      </div>
                      
                      {/* SQLuedo Logo in bottom right (landscape) */}
                      <div className="absolute bottom-2 right-2 w-8 h-8">
                        <img 
                          src={process.env.PUBLIC_URL + "/img/sqluedo-logo.png"} 
                          alt="SQLuedo Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  );
                } else if (project.title === "Minecraft Plugin") {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transform hover:-translate-y-1`}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
                          }}
                        />
                      </div>
                      
                      <div className="p-2">
                        <h3 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        
                        <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span 
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ...
                            </span>
                          )}
                        </div>
                        
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                        </div>
                      </div>
                      
                      {/* Minecraft Logo in bottom right (landscape) */}
                      <div className="absolute bottom-2 right-2 w-8 h-8">
                        <img 
                          src={process.env.PUBLIC_URL + "/img/minecraft-logo.png"} 
                          alt="Minecraft Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  );
                } else if (project.title === "Connect4") {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer relative ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transform hover:-translate-y-1`}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
                          }}
                        />
                      </div>
                      
                      <div className="p-2">
                        <h3 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        
                        <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span 
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ...
                            </span>
                          )}
                        </div>
                        
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                        </div>
                      </div>
                      
                      {/* Connect4 Logo in bottom right (landscape) */}
                      <div className="absolute bottom-2 right-2 w-8 h-8">
                        <img 
                          src={process.env.PUBLIC_URL + "/img/connect4-logo.png"} 
                          alt="Connect4 Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transform hover:-translate-y-1`}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
                          }}
                        />
                      </div>
                      
                      <div className="p-2">
                        <h3 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.title}
                        </h3>
                        
                        <p className={`text-xs mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span 
                              className={`px-1 py-0.5 text-xs rounded ${
                                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ...
                            </span>
                          )}
                        </div>
                        
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.updated}: {formatProjectDate(project.updatedAt, isFrench)}
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <div className={`col-span-full text-center py-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.noProjectsFound}
              </div>
            )}
          </div>
          
          {/* Return button */}
          <div className="mt-6 mb-8 text-center">
            <button
              onClick={() => onNavigate('main')}
              className={`inline-flex items-center text-xs ${
                isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              <span className="mr-1">↩️</span>
              {t.backToHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default portrait mode layout
  return (
    <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden touch-manipulation" style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}>
      <MouseFollower />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GradientBackground />
      </div>
      
      {/* Project Detail View (Modal) */}
      {selectedProject && (
        <ProjectDetailView 
          project={selectedProject} 
          onClose={handleCloseDetail}
          isDarkMode={isDarkMode}
          t={t}
        />
      )}
      
      {/* Content */}
      <SectionContainer className="relative z-10 px-4 max-w-7xl mx-auto pt-28 pb-24 md:pt-40 md:pb-20 w-full">
        <TransitionElement index={0}>
          <h1 className={`text-3xl md:text-6xl font-bold mb-6 md:mb-12 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {t.projectsTitle}
          </h1>
        </TransitionElement>
        
        <TransitionElement index={1}>
          <p className={`text-base md:text-xl leading-relaxed mb-8 max-w-3xl ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
            {t.projectsDescription}
          </p>
        </TransitionElement>
        
        {/* Search, Sort and Count Controls */}
        <TransitionElement index={2}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Search Bar */}
            <div className="w-full md:w-auto">
              <div className={`relative rounded-md shadow-sm w-full md:w-64`}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchProjects}
                  className={`block w-full rounded-md border-0 py-3 px-4 shadow-sm ring-1 ring-inset 
                    ${isDarkMode 
                      ? 'bg-gray-800 text-white ring-gray-700 placeholder:text-gray-400 focus:ring-blue-500' 
                      : 'bg-white text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600'
                    } focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Sort and Count Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort Options */}
              <div className="flex items-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.sortBy}
                </span>
                <div className="flex rounded-md overflow-hidden ml-2">
                  <button
                    onClick={() => setSortOption('updated')}
                    className={`py-2 px-3 text-sm transition-colors ${
                      sortOption === 'updated'
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }`}
                  >
                    {t.updated}
                  </button>
                  <button
                    onClick={() => setSortOption('alphabetical')}
                    className={`py-2 px-3 text-sm transition-colors ${
                      sortOption === 'alphabetical'
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }`}
                  >
                    {t.alphabetical}
                  </button>
                </div>
              </div>
              
              {/* Count Options */}
              <div className="flex items-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.show}
                </span>
                <div className="flex rounded-md overflow-hidden ml-2">
                  {projectCountOptions.map(count => (
                    <button
                      key={count}
                      onClick={() => {
                        setProjectCount(count);
                        setShowCustomInput(false);
                      }}
                      className={`py-2 px-3 text-sm transition-colors ${
                        projectCount === count && !showCustomInput
                          ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                          : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                  <button
                    onClick={toggleCustomInput}
                    className={`py-2 px-3 text-sm transition-colors ${
                      showCustomInput
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }`}
                  >
                    {t.custom}
                  </button>
                </div>
                
                {/* Custom count input */}
                {showCustomInput && (
                  <div className="flex items-center ml-2">
                    <input
                      type="number"
                      min="1"
                      value={customCount}
                      onChange={handleCustomCountChange}
                      onKeyDown={handleKeyDown}
                      className={`w-16 py-2 px-3 text-sm rounded-l-md border-0 shadow-sm ring-1 ring-inset
                        ${isDarkMode 
                          ? 'bg-gray-800 text-white ring-gray-700 focus:ring-blue-500' 
                          : 'bg-white text-gray-900 ring-gray-300 focus:ring-blue-600'
                        } focus:ring-2 focus:ring-inset focus:outline-none`}
                    />
                    <button
                      onClick={handleCustomCountSubmit}
                      className={`py-2 px-3 text-sm rounded-r-md ${
                        isDarkMode 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      ✓
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TransitionElement>
        
        {/* Projects Grid - with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project, index) => (
              <TransitionElement key={project.id} index={index + 3} delay={index * 50}>
                {renderProjectCard(project)}
              </TransitionElement>
            ))
          ) : (
            <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t.noProjectsFound}
            </div>
          )}
        </div>
        
        {/* Return button */}
        <TransitionElement index={visibleProjects.length + 4}>
          <div className="mt-12 md:mt-16 mb-8">
            <AnimatedButton 
              onClick={() => onNavigate('main')}
              emoji="↩️"
              darkTextClass={isDarkMode ? "text-gray-300" : "text-black"}
            >
              {t.backToHome}
            </AnimatedButton>
          </div>
        </TransitionElement>
      </SectionContainer>
    </div>
  );
};

export default ProjectsSection;