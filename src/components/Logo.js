import React from 'react';

const Logo = () => {
  return (
    <div className="absolute top-6 left-6 z-20">
      <a href="/" className="flex items-center space-x-2">
        <img 
          src="/logo512.png" 
          alt="Eowin Logo" 
          className="w-12 h-12 object-contain"
        />
      </a>
    </div>
  );
};

export default Logo; 