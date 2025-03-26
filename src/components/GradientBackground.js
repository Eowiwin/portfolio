import React, { useState, useEffect } from 'react';
import useThemeStore from '../store/themeStore';

const GradientBlob = ({ style, mousePosition }) => {
  // Calculate offset based on mouse position
  const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 100;
  const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 100;

  return (
    <div 
      style={{
        position: 'fixed',
        borderRadius: '50%',
        filter: 'blur(20px)',
        opacity: 0.6,
        pointerEvents: 'none',
        transition: 'transform 0.3s ease-out',
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        ...style
      }}
    />
  );
};

const GradientBackground = () => {
  const { isDarkMode } = useThemeStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      {/* Background texture */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a0aec0' fill-opacity='${isDarkMode ? '0.08' : '0.2'}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0
        }}
      />

      {/* Gradient Blobs */}
      <GradientBlob 
        mousePosition={mousePosition}
        style={{
          width: 'min(85vw, 1300px)',
          height: 'min(85vw, 1300px)',
          background: isDarkMode 
            ? 'linear-gradient(to right, #020617, #172554)'
            : 'linear-gradient(to right, #3b82f6, #93c5fd)',
          left: 'min(-5vw, -100px)',
          top: 'min(-5vw, -100px)',
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />
      <GradientBlob 
        mousePosition={mousePosition}
        style={{
          width: 'min(85vw, 1300px)',
          height: 'min(85vw, 1300px)',
          background: isDarkMode 
            ? 'linear-gradient(to right, #1e1b4b, #312e81)'
            : 'linear-gradient(to right, #8b5cf6, #d946ef)',
          right: 'min(-5vw, -100px)',
          top: 'min(-5vw, -100px)',
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: '-1s'
        }}
      />
      <GradientBlob 
        mousePosition={mousePosition}
        style={{
          width: 'min(85vw, 1300px)',
          height: 'min(85vw, 1300px)',
          background: isDarkMode 
            ? 'linear-gradient(to right, #042f2e, #134e4a)'
            : 'linear-gradient(to right, #2dd4bf, #34d399)',
          left: 'min(-5vw, -100px)',
          bottom: 'min(-5vw, -100px)',
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: '-2s'
        }}
      />
      <GradientBlob 
        mousePosition={mousePosition}
        style={{
          width: 'min(85vw, 1300px)',
          height: 'min(85vw, 1300px)',
          background: isDarkMode 
            ? 'linear-gradient(to right, #1e1b4b, #312e81)'
            : 'linear-gradient(to right, #8b5cf6, #d946ef)',
          right: 'min(-5vw, -100px)',
          bottom: 'min(-5vw, -100px)',
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: '-3s'
        }}
      />
      <GradientBlob 
        mousePosition={mousePosition}
        style={{
          width: 'min(100vw, 1600px)',
          height: 'min(100vw, 1600px)',
          background: isDarkMode 
            ? 'linear-gradient(to right, #020617, #172554)'
            : 'linear-gradient(to right, #3b82f6, #93c5fd)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: '-1.5s'
        }}
      />

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

export default GradientBackground; 