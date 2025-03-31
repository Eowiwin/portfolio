import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import GradientBackground from '../components/GradientBackground';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import { translations } from '../utils/translations';
import MouseFollower from '../components/MouseFollower';

const ContactSection = ({ onNavigate }) => {
  const { isDarkMode } = useThemeStore();
  const { isFrench } = useLanguageStore();
  const t = translations[isFrench ? 'fr' : 'en'];
  const formRef = useRef();
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  
  const COOLDOWN_TIME = 10 * 60 * 1000;
  
  const EMAIL_SERVICE_ID = "service_6rhvv8f";
  const EMAIL_TEMPLATE_ID = "template_yoa1t3n";
  const EMAIL_PUBLIC_KEY = "v8YTg1GPw9xxJdszT";
  
  useEffect(() => {
    const lastEmailTime = localStorage.getItem('lastEmailTime');
    if (lastEmailTime) {
      const timeElapsed = Date.now() - parseInt(lastEmailTime, 10);
      if (timeElapsed < COOLDOWN_TIME) {
        const remainingTime = Math.ceil((COOLDOWN_TIME - timeElapsed) / 1000);
        setCooldownRemaining(remainingTime);
        
        const interval = setInterval(() => {
          setCooldownRemaining(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(interval);
      }
    }
  }, []);
  
  const formatCooldownTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cooldownRemaining > 0) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: t.cooldownMessage?.replace('{time}', formatCooldownTime(cooldownRemaining)) || 
               `Please wait ${formatCooldownTime(cooldownRemaining)} before sending another email.`
      });
      return;
    }
    
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    emailjs.sendForm(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      formRef.current,
      EMAIL_PUBLIC_KEY
    )
    .then((result) => {
      console.log('Email successfully sent!', result.text);
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      localStorage.setItem('lastEmailTime', Date.now().toString());
      
      setCooldownRemaining(COOLDOWN_TIME / 1000);
      
      const interval = setInterval(() => {
        setCooldownRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      formRef.current.reset();
    })
    .catch((error) => {
      console.error('Failed to send email:', error.text);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: t.emailError || 'Failed to send message. Please try again.'
      });
    });
  };

  return (
    <div className="relative w-full h-auto min-h-screen overflow-y-auto overflow-x-hidden touch-manipulation overscroll-none">
      <MouseFollower />
      <GradientBackground />
      
      <div className="relative z-10 px-4 max-w-7xl mx-auto pt-28 pb-24 md:pt-40 md:pb-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-16">
          <div className="w-full md:w-5/12">
            <h1 className={`text-3xl md:text-6xl font-bold mb-6 md:mb-12 font-display ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {t.contactTitle}
            </h1>
            
            <div className="space-y-6 md:space-y-8">
              <p className={`text-base md:text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                {t.contactDescription}
              </p>
              
              <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                <a href="mailto:erwanmenagerpro@gmail.com" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm md:text-base">erwanmenagerpro@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/erwan-menager-430783291/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <span className="text-sm md:text-base">linkedin.com/in/erwan-menager-430783291/</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-6/12 mt-6 md:mt-0">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6 scale-90 md:scale-100 origin-top">
              <div>
                <label htmlFor="user_name" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  disabled={cooldownRemaining > 0}
                  className={`w-full px-3 py-2 text-sm md:text-base rounded-lg focus:outline-none ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border border-gray-300 focus:border-blue-500'
                  } ${cooldownRemaining > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
              </div>
              
              <div>
                <label htmlFor="user_email" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  disabled={cooldownRemaining > 0}
                  className={`w-full px-3 py-2 text-sm md:text-base rounded-lg focus:outline-none ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border border-gray-300 focus:border-blue-500'
                  } ${cooldownRemaining > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
              </div>
              
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  disabled={cooldownRemaining > 0}
                  className={`w-full px-3 py-2 text-sm md:text-base rounded-lg focus:outline-none ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500' 
                      : 'bg-white text-gray-900 border border-gray-300 focus:border-blue-500'
                  } ${cooldownRemaining > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                ></textarea>
              </div>
              
              {cooldownRemaining > 0 && (
                <div className="py-2 px-3 text-xs md:text-sm bg-yellow-100 text-yellow-800 rounded-lg">
                  {t.cooldownMessage?.replace('{time}', formatCooldownTime(cooldownRemaining)) || 
                   `You can send another message in ${formatCooldownTime(cooldownRemaining)}`}
                </div>
              )}
              
              {formStatus.submitted && (
                <div className="py-2 px-3 text-xs md:text-sm bg-green-100 text-green-800 rounded-lg">
                  {t.messageSent}
                </div>
              )}
              
              {formStatus.error && (
                <div className="py-2 px-3 text-xs md:text-sm bg-red-100 text-red-800 rounded-lg">
                  {formStatus.error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={formStatus.submitting || cooldownRemaining > 0}
                className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                } ${(formStatus.submitting || cooldownRemaining > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {formStatus.submitting 
                  ? (t.sending || 'Sending...') 
                  : cooldownRemaining > 0 
                    ? formatCooldownTime(cooldownRemaining)
                    : t.sendButton
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;