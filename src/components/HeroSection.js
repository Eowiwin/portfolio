import React from 'react';
import GradientBackground from './GradientBackground';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <GradientBackground />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Hey! I'm <span className="text-blue-600">Erwan MENAGER</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-600 mb-4">
          But you can call me <span className="text-blue-500">Eowin</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          I'm a french fullstack developer.
        </p>
        <div className="flex gap-6 justify-center">
          <a 
            href="#projects" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            → see my projects
          </a>
          <a 
            href="#about" 
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            → more about me
          </a>
        </div>
      </div>

      {/* Top right menu */}
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <span className="text-gray-600">FR</span>
        <button className="text-gray-600">🌙</button>
        <button className="text-gray-600">☰</button>
      </div>
    </div>
  );
};

export default HeroSection; 