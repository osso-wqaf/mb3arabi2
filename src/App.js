import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import './App.css';
import './i18n'; // Import i18n configuration

// Theme
import { lightTheme, darkTheme } from './themes';
import GlobalStyles from './GlobalStyles';

// Context
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';

// هذا المكون يجب أن يكون داخل Router
const AppRoutes = () => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const location = useLocation();
  
  useEffect(() => {
    // تعيين اتجاه الصفحة بناءً على اللغة
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n]);

  return (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="app-container">
        <Header />
        
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
