import React, { useState, useRef, useEffect } from 'react';
import useThemeStore from '../store/themeStore';

const MusicPlayer = ({ audioSrc = '/background-music.mp3', trackTitle = "Now Playing" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDarkMode } = useThemeStore();
  const audioRef = useRef(null);
  
  useEffect(() => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      const handleCanPlayThrough = () => setIsLoaded(true);
      audioElement.addEventListener('canplaythrough', handleCanPlayThrough);
      
      return () => {
        audioElement.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioElement.pause();
      };
    }
  }, []);
  
  const togglePlay = () => {
    if (!isLoaded) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio playback prevented by browser:', error);
        });
      }
    }
    
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="relative">
      <button
        onClick={togglePlay}
        disabled={!isLoaded}
        className={`relative flex items-center justify-center transition-all duration-300 
                   ${!isLoaded ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <div className="relative w-10 h-10">
          {/* Vinyl disc */}
          <div 
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${isDarkMode ? 'from-gray-700 to-gray-900' : 'from-gray-200 to-gray-400'} flex items-center justify-center
                       ${isPlaying ? 'animate-spin-slow' : ''}`}
            style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
          >
            {/* Center hole */}
            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
          </div>
          
          {/* Rotating text */}
          <div 
            className={`absolute inset-0 w-full h-full rounded-full
                       ${isPlaying ? 'animate-spin-slow' : ''}`}
            style={{ animationDirection: 'reverse' }}
          >
            <svg 
              className="w-full h-full" 
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
              </defs>
              <text fill={isDarkMode ? '#ffffff' : '#000000'} fontSize="8">
                <textPath xlinkHref="#circlePath" startOffset="0%">
                  {trackTitle} • {trackTitle} •
                </textPath>
              </text>
            </svg>
          </div>
          
          {/* Play/Pause icon overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
                           ${isPlaying ? 'opacity-0 hover:opacity-80' : 'opacity-80'}
                           ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className={`transition-transform duration-300 ${isPlaying ? 'scale-0' : 'scale-100'}`}
            >
              {isPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </div>
        </div>
      </button>
      
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
};

export default MusicPlayer;