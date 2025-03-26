import React from 'react';
import useThemeStore from '../store/themeStore';

const AnimatedShapes = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Large background shapes */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full animate-float-slow"
        style={{
          backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(0, 0, 0, 0.2)',
          left: '-100px',
          top: '-100px',
          filter: isDarkMode ? 'blur(40px)' : 'blur(50px)',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full animate-float-medium"
        style={{
          backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.4)' : 'rgba(0, 0, 0, 0.2)',
          right: '-50px',
          top: '10%',
          filter: isDarkMode ? 'blur(40px)' : 'blur(50px)',
        }}
      />
      <div 
        className="absolute w-[700px] h-[700px] rounded-full animate-float-fast"
        style={{
          backgroundColor: isDarkMode ? 'rgba(236, 72, 153, 0.4)' : 'rgba(0, 0, 0, 0.2)',
          left: '5%',
          bottom: '-100px',
          filter: isDarkMode ? 'blur(40px)' : 'blur(50px)',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full animate-float-slow"
        style={{
          backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.4)' : 'rgba(0, 0, 0, 0.2)',
          right: '10%',
          bottom: '5%',
          filter: isDarkMode ? 'blur(40px)' : 'blur(50px)',
        }}
      />
    </div>
  );
};

export default AnimatedShapes; 