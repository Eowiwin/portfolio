import React, { useState, useEffect, useMemo } from 'react';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';
import { AnimatedButton } from '../components/AnimatedElements';
import ProjectCard from '../components/ProjectCard';

// Project Detail Component
const ProjectDetailView = ({ project, onClose, isDarkMode, t }) => {
  if (!project) return null;
  
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
        } transform transition-all`}
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
        <div className="w-full h-64 md:h-80 relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x600?text=Project+Preview";
            }}
          />
        </div>
        
        {/* Project content */}
        <div className="p-6 md:p-8">
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
              {t.updated}: {project.updatedAt}
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

const ProjectsSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const [sortOption, setSortOption] = useState('updated'); // 'updated' or 'alphabetical'
  const [searchQuery, setSearchQuery] = useState('');
  const [isLandscape, setIsLandscape] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  // Sample projects data - replace with your own projects
  const projects = [
    {
      id: 1,
      title: "Portfolio",
      description: isFrench 
        ? "Mon site portfolio créé avec React et Tailwind CSS. J'ai décidé de partir sur un style différent et d'ajouter des petites animations ✨."
        : "My portfolio website built with React and Tailwind CSS. I decided to go for a different style and add some small animations ✨.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      image: process.env.PUBLIC_URL + "/img/portfolio-preview.png",
      link: "https://www.behance.net/",
      updatedAt: "May 2023"
    },
    {
      id: 2,
      title: "Bongomino",
      description: isFrench 
        ? "Application tirée du jeu de société Ubongo. Elle a été réalisée dans une équipe de 4 développeurs. Multi-plateforme, mode solo et multijoueur 🧩."
        : "An app based on the board game Ubongo. It was developed by a team of four developers. It is multi-platform, with single-player and multiplayer modes 🧩.",
      tech: ["React Native", "Zustand"],
      image: process.env.PUBLIC_URL + "/img/bongomino-preview.png",
      link: "https://www.behance.net/",
      updatedAt: "July 2023"
    },
    {
      id: 3,
      title: "Undertalya",
      description: isFrench 
        ? "Application android qui permet d'être utilisé en tant que guide du jeu Undertale. Réalisé en 1ère année de BUT avec un autre développeur ❤️."
        : "Android application that serves as a guide for the game Undertale. Developed in the first year of my degree with another developer ❤️.",
      tech: ["C#", ".NET", "MAUI"],
      image: process.env.PUBLIC_URL + "/img/undertalya-preview.png",
      link: "https://www.behance.net/",
      updatedAt: "August 2023"
    }
  ];

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
        // Convert month names to dates for proper comparison
        const months = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3,
          'May': 4, 'June': 5, 'July': 6, 'August': 7,
          'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        
        const [aMonth, aYear] = a.updatedAt.split(' ');
        const [bMonth, bYear] = b.updatedAt.split(' ');
        
        const aDate = new Date(parseInt(aYear), months[aMonth]);
        const bDate = new Date(parseInt(bYear), months[bMonth]);
        
        // Sort in descending order (newest first)
        return bDate - aDate;
      }
    });
  }, [projects, sortOption, searchQuery]);

  const handleProjectClick = (project) => {
    // Instead of opening a link, set the selected project
    setSelectedProject(project);
  };

  // Handle closing the project detail view
  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  // Landscape mode layout with proper scrolling
  if (isLandscape) {
    return (
      <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden touch-manipulation">
        <MouseFollower />
        <div className="fixed inset-0 z-0">
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
          
          {/* Search and Sort Controls - Simplified for landscape */}
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
            <div className="flex items-center gap-2">
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.sortBy}
              </span>
              <div className="flex border rounded-md overflow-hidden">
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
          </div>
          
          {/* Projects Grid - adapted for landscape */}
          <div className="grid grid-cols-2 gap-3 pb-16">
            {filteredAndSortedProjects.length > 0 ? (
              filteredAndSortedProjects.map((project) => (
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
                    </div>
                    
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.updated}: {project.updatedAt}
                    </div>
                  </div>
                </div>
              ))
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
    <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden touch-manipulation">
      <MouseFollower />
      <div className="fixed inset-0 z-0">
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
      <div className="relative z-10 px-4 max-w-7xl mx-auto pt-28 pb-24 md:pt-40 md:pb-20 w-full">
        <h1 className={`text-3xl md:text-6xl font-bold mb-6 md:mb-12 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {t.projectsTitle}
        </h1>
        
        <p className={`text-base md:text-xl leading-relaxed mb-8 max-w-3xl ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
          {t.projectsDescription}
        </p>
        
        {/* Search and Sort Controls */}
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
          
          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t.sortBy}
            </span>
            <div className="flex border rounded-md overflow-hidden">
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
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.length > 0 ? (
            filteredAndSortedProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))
          ) : (
            <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t.noProjectsFound}
            </div>
          )}
        </div>
        
        {/* Return button */}
        <div className="mt-12 md:mt-16 mb-8">
          <AnimatedButton 
            onClick={() => onNavigate('main')}
            emoji="↩️"
            darkTextClass={isDarkMode ? "text-gray-300" : "text-black"}
          >
            {t.backToHome}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;