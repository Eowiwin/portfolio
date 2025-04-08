import React, { useState, useRef, useEffect } from 'react';
import useThemeStore from '../store/themeStore';

// Array of music tracks for rotation. Love Toby Fox <3
const musicTracks = [
  { src: '/audio/HisTheme.mp3', title: 'His Theme' },
  { src: '/audio/CybersWorld.mp3', title: 'Cybers World' },
  { src: '/audio/RainingSomewhereElse.mp3', title: 'Raining Somewhere Else' },
  { src: '/audio/WeMeetAgain.mp3', title: 'We Meet Again' },
  { src: '/audio/BattleAgainstATrueHero.mp3', title: 'Battle Against A True Hero' },
];

const MusicPlayer = ({ hideControls = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const { isDarkMode } = useThemeStore();
  const audioRef = useRef(null);
  
  // Get current track info
  const currentTrack = musicTracks[currentTrackIndex];
  
  // Reset isLoaded when track changes
  useEffect(() => {
    setIsLoaded(false);
  }, [currentTrackIndex]);
  
  useEffect(() => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      const handleCanPlayThrough = () => setIsLoaded(true);
      audioElement.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // Add event listener for when track ends
      const handleTrackEnd = () => {
        // Move to next track when current one ends
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicTracks.length);
      };
      audioElement.addEventListener('ended', handleTrackEnd);
      
      return () => {
        audioElement.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioElement.removeEventListener('ended', handleTrackEnd);
        audioElement.pause();
      };
    }
  }, [currentTrackIndex]);
  
  const togglePlay = () => {
    if (!isLoaded) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      // Move to next track and then play it
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicTracks.length);
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
                  {currentTrack.title} • {currentTrack.title} •
                </textPath>
              </text>
            </svg>
          </div>
          
          {/* Play/Pause icon overlay - Only shown if hideControls is false */}
          {!hideControls && (
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
          )}
        </div>
      </button>
      
      <audio
        ref={audioRef}
        src={process.env.PUBLIC_URL + currentTrack.src}
        loop={false}
        preload="auto"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
};

export default MusicPlayer;