import React, { useState, useEffect } from 'react';
import useThemeStore from '../store/themeStore';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 200);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const styles = {
    position: 'fixed',
    width: isClicking ? '24px' : '36px',
    height: isClicking ? '24px' : '36px',
    backgroundColor: isDarkMode 
      ? 'rgba(59, 130, 246, 0.15)' 
      : 'rgba(0, 0, 0, 0.15)',
    borderRadius: '50%',
    pointerEvents: 'none',
    left: `${position.x - (isClicking ? 12 : 18)}px`,
    top: `${position.y - (isClicking ? 12 : 18)}px`,
    zIndex: 9999,
    transition: 'all 0.2s ease-out',
    boxShadow: isDarkMode
      ? '0 0 20px rgba(59, 130, 246, 0.3)'
      : '0 0 20px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(4px)',
    border: isDarkMode
      ? '1px solid rgba(59, 130, 246, 0.2)'
      : '1px solid rgba(0, 0, 0, 0.2)',
    opacity: isVisible ? 1 : 0,
  };

  return <div style={styles} />;
};

export default MouseFollower; 