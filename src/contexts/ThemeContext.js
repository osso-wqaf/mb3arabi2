import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Set dark mode as the default theme
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Initialize theme from localStorage (if available)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Only change from default if explicitly set to light
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // If no saved preference or it's 'dark', save dark as default
      localStorage.setItem('theme', 'dark');
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };
  
  // Value to be provided by the context
  const value = {
    isDarkMode,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
