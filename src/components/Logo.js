import React from 'react';
import useThemeStore from '../store/themeStore';

const Logo = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="absolute top-6 left-6 z-20">
      <a href="/portfoliov2/" className="flex items-center space-x-2">
        <div className="relative">
          {isDarkMode && (
            <div 
              className="absolute rounded-full blur-xl transition-colors duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                width: '48px',
                height: '48px',
                left: '50%',
                top: '50%',
                transform: 'translate(-55%, -50%)',
              }}
            />
          )}
          <img 
            src={process.env.PUBLIC_URL + '/logo512.png'} 
            alt="Eowin Logo" 
            className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300 relative z-10"
          />
        </div>
      </a>
    </div>
  );
};

export default Logo; 