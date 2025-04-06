import React, { useState } from 'react';

/**
 * AnimatedName component for name animations with sparkles and a lion emoji
 */
export const AnimatedName = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className={`
        relative inline-block
        text-blue-600 dark:text-blue-400
        transition-all duration-300
        ${isHovered ? 'scale-105' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <>
          {/* Multiple sparkles with different positions and delays */}
          <span 
            className="absolute -top-12 left-0 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-12 right-0 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.2s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-16 left-1/4 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0.4s' }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span 
            className="absolute -top-16 right-1/4 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.6s' }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span 
            className="absolute -top-20 left-1/2 -translate-x-1/2 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0.8s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-24 right-1/2 -translate-x-1/2 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '1s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          
          {/* Lion */}
          <span 
            className="absolute left-1/2 -translate-x-1/2 -top-32 animate-floatUp pointer-events-none select-none"
            style={{ fontSize: '1.5em' }}
            aria-hidden="true"
          >
            🦁
          </span>
        </>
      )}
      <span className="relative">
        {children}
      </span>
    </span>
  );
};

/**
 * AnimatedButton component for navigation buttons with custom emojis and animations
 */
export const AnimatedButton = ({ 
  children, 
  onClick, 
  emoji, 
  isLink = false, 
  href = "#",
  className = "",
  darkTextClass = "text-gray-800 dark:text-gray-200",
  hoverTextClass = "hover:text-blue-600 dark:hover:text-blue-400" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSecondaryEmoji = () => {
    if (emoji === '🚀') return '🛸';
    if (emoji === '📝') return '✏️';
    if (emoji === '📧') return '✉️';
    if (emoji === '📋') return '📄';
    return '✨';
  };

  const buttonContent = (
    <span 
      className={`
        relative inline-block
        ${darkTextClass}
        ${hoverTextClass}
        transition-all duration-300
        ${isHovered ? 'scale-105' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <>
          {/* Enhanced sparkles with different positions and delays */}
          <span 
            className="absolute -top-8 left-0 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-10 left-1/4 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.2s' }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span 
            className="absolute -top-8 right-0 animate-sparkleRight opacity-0 invisible"
            style={{ animationDelay: '0.3s' }}
            aria-hidden="true"
          >
            ✨
          </span>
          <span 
            className="absolute -top-12 right-1/4 animate-sparkleLeft opacity-0 invisible"
            style={{ animationDelay: '0.4s' }}
            aria-hidden="true"
          >
            ⭐
          </span>
          <span 
            className="absolute -top-14 left-1/2 -translate-x-1/2 animate-floatUp opacity-0 invisible"
            style={{ animationDelay: '0.5s', fontSize: '0.8em' }}
            aria-hidden="true"
          >
            {getSecondaryEmoji()}
          </span>
          
          {/* Custom emoji for each button */}
          <span 
            className="absolute left-1/2 -translate-x-1/2 -top-16 animate-floatUp pointer-events-none select-none"
            style={{ fontSize: '1.5em' }}
            aria-hidden="true"
          >
            {emoji}
          </span>
        </>
      )}
      <span className="relative">
        {children}
      </span>
    </span>
  );

  if (isLink) {
    return <a href={href}>{buttonContent}</a>;
  }

  return <button onClick={onClick}>{buttonContent}</button>;
};

// Fix anonymous export by creating a named object first
const AnimatedElements = { AnimatedName, AnimatedButton };
export default AnimatedElements;