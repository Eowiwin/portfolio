import React from 'react';
import useThemeStore from '../store/themeStore';

const Footer = () => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <footer className={`fixed bottom-4 w-full text-center text-sm z-30 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      <p>© 2025 - Made by Erwan MENAGER <span className="text-red-600">❤</span></p>
    </footer>
  );
};

export default Footer;