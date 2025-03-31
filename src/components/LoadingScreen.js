import React, { useState, useEffect } from 'react';
import useThemeStore from '../store/themeStore';
import Footer from './Footer';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Simulate loading with a faster gradual progress increase
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 20; // Doubled speed
        if (newProgress >= 100) {
          clearInterval(interval);
          // Reduced delay after reaching 100% before hiding
          setTimeout(() => {
            onLoadingComplete();
          }, 200); // Reduced from 500ms to 200ms
          return 100;
        }
        return newProgress;
      });
    }, 100); // Reduced from 200ms to 100ms

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Logo */}
      <div className="mb-8 relative">
        {isDarkMode && (
          <div 
            className="absolute rounded-full blur-xl transition-colors duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              width: '96px',
              height: '96px',
              left: '50%',
              top: '50%',
              transform: 'translate(-55%, -50%)',
            }}
          />
        )}
        <img 
          src={process.env.PUBLIC_URL + '/logo512.png'} 
          alt="Logo" 
          className="w-24 h-24 object-contain animate-pulse relative z-10"
        />
      </div>

      {/* Loading bar */}
      <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
        <div 
          className={`h-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Loading percentage */}
      <div className={`mt-4 text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {Math.round(progress)}%
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoadingScreen;