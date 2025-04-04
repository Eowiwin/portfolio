import React from 'react';
import useThemeStore from '../store/themeStore';

const ProjectCard = ({ project, onClick }) => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transform hover:-translate-y-2`}
    >
      <div className="h-48 overflow-hidden">
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
      
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-xs rounded ${
                isDarkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Updated: {project.updatedAt}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;