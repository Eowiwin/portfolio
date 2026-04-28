import React from 'react';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';

const ProjectCard = ({ project, onClick }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = isFrench ? translations.fr : translations.en;
  
  // Function to translate months
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if not a valid date
      
      // Format: "Month Day, Year" for English or "Day Month Year" for French
      if (isFrench) {
        const frenchMonths = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                             "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        return `${date.getDate()} ${frenchMonths[date.getMonth()]} ${date.getFullYear()}`;
      } else {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString; // If anything goes wrong, return the original string
    }
  };
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-visible shadow-lg transition-all duration-300 cursor-pointer relative h-full flex flex-col ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-2`}
    >
      {/* Favorite Badge */}
      {project.isFavorite && (
        <div className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow-lg border-4 border-white">
          <img 
            src={process.env.PUBLIC_URL + "/img/favorite.png"} 
            alt="Favorite"
            className="w-6 h-6"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Favorite Label */}
      {project.isFavorite && (
        <div className="absolute top-2 right-12 z-10 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="text-xs font-semibold text-pink-600">
            {isFrench ? "Mon projet favori" : "My favorite project"}
          </span>
        </div>
      )}
      
      <div className="flex-shrink-0 h-40 md:h-48 overflow-hidden rounded-t-lg">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            // Fallback if image doesn't exist
            e.target.src = "https://via.placeholder.com/400x200?text=Project+Preview";
          }}
        />
      </div>
      
      <div className="p-3 md:p-6 flex-1">
        <h3 className={`text-base md:text-xl font-bold mb-1 md:mb-2 text-justify ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`text-[10px] md:text-sm mb-2 md:mb-4 text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
          {project.tech.map((tech, index) => (
            <span 
              key={index}
              className={`px-1 md:px-2 py-0.5 md:py-1 text-[8px] md:text-xs rounded ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className={`text-[8px] md:text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.updated}: {formatDate(project.updatedAt)}
        </div>
      </div>
    </div>
  );
};

// Export the component and the formatDate function so it can be used in other components
export default ProjectCard;
export const formatProjectDate = (dateString, isFrench) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if not a valid date
    
    // Format: "Month Day, Year" for English or "Day Month Year" for French
    if (isFrench) {
      const frenchMonths = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                           "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      return `${date.getDate()} ${frenchMonths[date.getMonth()]} ${date.getFullYear()}`;
    } else {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  } catch (e) {
    console.error("Date formatting error:", e);
    return dateString; // If anything goes wrong, return the original string
  }
};