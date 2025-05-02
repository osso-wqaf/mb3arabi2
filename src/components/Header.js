import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { FaSun, FaMoon, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import logo from '../logo.png'; 

// Keyframes animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const HeaderContainer = styled.header`
  background: ${({ theme }) => `${theme.headerBackground || theme.cardBackground}dd`};
  padding: 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => `${theme.primary}20`};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  height: 80px;
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 30px ${({ theme }) => `${theme.primary}20`};
  }
  
  @media (max-width: 768px) {
    height: 70px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
  height: 100%;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 5;
  position: relative;
  overflow: hidden;
  order: ${({ isRTL }) => isRTL ? '2' : '0'};
`;

const LogoImage = styled.img`
  height: 50px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    height: 40px;
  }
`;

// Language switcher container on left side
const LanguageSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 5;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Desktop Navigation
const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  transition: all 0.3s ease;
  order: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItems = styled.ul`
  display: flex;
  flex-direction: ${({ isRTL }) => isRTL ? 'row-reverse' : 'row'};
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 1.2rem;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:last-child {
    margin-right: 0;
  }
  
  &:first-child {
    margin-left: 0;
  }
`;

const activeNavLinkStyles = css`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  
  &:after {
    width: 100%;
    opacity: 1;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  
  ${props => props.active && activeNavLinkStyles}
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => `${theme.primary}80`});
    transition: width 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    border-radius: 4px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    
    &:after {
      width: 100%;
      opacity: 1;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 0.75rem 0;
  opacity: 0;
  visibility: hidden;
  transform-origin: top center;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 100;
  border: 1px solid ${({ theme }) => `${theme.primary}15`};

  &:before {
    content: '';
    position: absolute;
    top: -8px;
    right: 50%;
    transform: translateX(50%) rotate(45deg);
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.cardBackground};
    z-index: -1;
    border-top: 1px solid ${({ theme }) => `${theme.primary}15`};
    border-left: 1px solid ${({ theme }) => `${theme.primary}15`};
  }

  ${NavItem}:hover & {
    opacity: 1;
    visibility: visible;
    animation: ${fadeIn} 0.3s forwards;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-align: right;
  white-space: nowrap;
  border-right: 3px solid transparent;
  
  ${props => props.active && `
    color: ${props.theme.primary};
    background: ${props.theme.backgroundSecondary};
    border-right-color: ${props.theme.primary};
  `}
  
  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.primary};
    padding-right: 2rem;
    border-right-color: ${({ theme }) => theme.primary};
  }
`;

const MainServiceItem = styled(Link)`
  display: block;
  padding: 0.85rem 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  text-align: right;
  border-bottom: 1px solid ${({ theme }) => `${theme.primary}20`};
  margin-bottom: 5px;
  
  &:hover {
    background: ${({ theme }) => `${theme.primary}10`};
    color: ${({ theme }) => theme.primary};
    padding-right: 2rem;
  }
`;

const ServiceIcon = styled.i`
  margin-left: 8px;
  margin-right: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const DropdownArrow = styled.span`
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 0.8rem;
`;

// Controls Section
const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 5;
  order: ${({ isRTL }) => isRTL ? '0' : '2'};
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ThemeToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.backgroundSecondary}80`};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px ${({ theme }) => `${theme.primary}20`};
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: rotate(360deg);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

// Mobile Navigation
const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.backgroundSecondary}50`};
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => `${theme.cardBackground}f8`};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  padding: 1.5rem 0;
  overflow-y: auto;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileLogo = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => `${theme.primary}15`};
  
  img {
    height: 40px;
  }
`;

const MobileMenuItem = styled.li`
  width: 100%;
  margin-bottom: 5px;
  
  &:last-child {
    margin-top: 20px;
  }
  
  a {
    display: block;
    padding: 1rem 1.5rem;
    text-decoration: none;
    color: ${({ active, theme }) => active ? theme.primary : theme.text};
    font-weight: ${({ active }) => active ? '600' : '500'};
    border-right: ${({ active, theme }) => active ? `3px solid ${theme.primary}` : '3px solid transparent'};
    transition: all 0.3s ease;
    text-align: right;
    
    &:hover {
      background: ${({ theme }) => `${theme.backgroundSecondary}50`};
      padding-right: 2rem;
      border-right-color: ${({ theme }) => theme.primary};
    }
  }
`;

const MobileDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '600' : '500'};
  border-right: ${({ active, theme }) => active ? `3px solid ${theme.primary}` : '3px solid transparent'};
  transition: all 0.3s ease;
  text-align: right;
  
  &:hover {
    background: ${({ theme }) => `${theme.backgroundSecondary}50`};
    padding-right: 2rem;
    border-right-color: ${({ theme }) => theme.primary};
  }
`;

const MobileDropdownContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: ${({ theme }) => `${theme.backgroundSecondary}30`};
`;

const MobileDropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 2.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-align: right;
  
  &:hover {
    background: ${({ theme }) => `${theme.backgroundSecondary}50`};
    padding-right: 3rem;
    color: ${({ theme }) => theme.primary};
  }
`;

// Social Media Icons in Mobile
const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => `${theme.primary}15`};
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.backgroundSecondary}80`};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Check if current language is RTL
  const isRTL = i18n.dir() === 'rtl';
  
  // Service items with translations
  const serviceItems = [
    { name: t('services.service1.title'), path: '/services/digital-marketing', icon: 'fas fa-bullhorn' },
    { name: t('services.service2.title'), path: '/services/design', icon: 'fas fa-palette' },
    { name: t('services.service3.title'), path: '/services/web-development', icon: 'fas fa-laptop-code' },
    { name: t('services.service4.title'), path: '/services/consulting', icon: 'fas fa-chart-line' },
    { name: t('services.service5.title'), path: '/services/sales', icon: 'fas fa-handshake' },
    { name: t('services.service6.title'), path: '/services/visual-production', icon: 'fas fa-video' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // Prevent body scrolling when menu is open
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [menuRef]);
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);
  
  // Ensure the header stays fixed
  const ensureHeaderFixed = () => {
    const header = document.querySelector('header');
    if (header) {
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.left = '0';
      header.style.right = '0';
      header.style.width = '100%';
      header.style.zIndex = '1000';
    }
  };
  
  useEffect(() => {
    ensureHeaderFixed();
    window.addEventListener('resize', ensureHeaderFixed);
    return () => {
      window.removeEventListener('resize', ensureHeaderFixed);
    };
  }, []);
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer isRTL={isRTL}>
          <Link to="/">
            <LogoImage src={logo} alt="Marketing Arabi Logo" />
          </Link>
        </LogoContainer>
        
        <ControlsGroup isRTL={isRTL}>
          <ButtonGroup>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle Dark Mode">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
            <LanguageSwitcher />
          </ButtonGroup>
          
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </ControlsGroup>
        
        {/* Desktop Navigation */}
        <DesktopNav>
          <NavItems isRTL={isRTL}>
            <NavItem>
              <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
                {t('header.home')}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink 
                to="/services" 
                active={location.pathname === '/services' ? 1 : 0}
              >
                {t('header.services')} <DropdownArrow><FaChevronDown /></DropdownArrow>
              </NavLink>
              <DropdownMenu>
                <MainServiceItem to="/services">
                  <ServiceIcon className="fas fa-list" /> {t('services.allServices', 'All Services')}
                </MainServiceItem>
                
                {serviceItems.map((service, index) => (
                  <DropdownItem 
                    key={index} 
                    to={service.path}
                    active={location.pathname === service.path ? 1 : 0}
                  >
                    <ServiceIcon className={service.icon} /> {service.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/portfolio" active={location.pathname === '/portfolio' ? 1 : 0}>
                {t('header.portfolio')}
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
                {t('header.about')}
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/blog" active={location.pathname === '/blog' ? 1 : 0}>
                {t('header.blog')}
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
                {t('header.contact')}
              </NavLink>
            </NavItem>
          </NavItems>
        </DesktopNav>
        
        {/* Mobile Menu */}
        <MobileMenu isOpen={mobileMenuOpen} ref={menuRef}>
          <MobileLogo>
            <img src={logo} alt="Marketing Arabi Logo" />
          </MobileLogo>
          <MobileMenuItems>
            <MobileMenuItem active={location.pathname === '/' ? 1 : 0}>
              <Link to="/">{t('header.home')}</Link>
            </MobileMenuItem>
            
            <li>
              <MobileDropdownHeader 
                active={location.pathname.includes('/services') ? 1 : 0}
                onClick={toggleMobileServices}
              >
                <span>{t('header.services')}</span>
                <i className={`fas fa-chevron-${mobileServicesOpen ? 'up' : 'down'}`}></i>
              </MobileDropdownHeader>
              
              <MobileDropdownContent isOpen={mobileServicesOpen}>
                {serviceItems.map((service, index) => (
                  <MobileDropdownItem 
                    key={index} 
                    to={service.path}
                  >
                    <i className={service.icon}></i> {service.name}
                  </MobileDropdownItem>
                ))}
              </MobileDropdownContent>
            </li>
            
            <MobileMenuItem active={location.pathname === '/portfolio' ? 1 : 0}>
              <Link to="/portfolio">{t('header.portfolio')}</Link>
            </MobileMenuItem>
            
            <MobileMenuItem active={location.pathname === '/about' ? 1 : 0}>
              <Link to="/about">{t('header.about')}</Link>
            </MobileMenuItem>
            
            <MobileMenuItem active={location.pathname === '/blog' ? 1 : 0}>
              <Link to="/blog">{t('header.blog')}</Link>
            </MobileMenuItem>
            
            <MobileMenuItem active={location.pathname === '/contact' ? 1 : 0}>
              <Link to="/contact">{t('header.contact')}</Link>
            </MobileMenuItem>
            
            <MobileMenuItem>
              <Link to="#" onClick={(e) => { e.preventDefault(); toggleTheme(); }}>
                {isDarkMode ? t('theme.light') : t('theme.dark')}
              </Link>
            </MobileMenuItem>
            
            <MobileMenuItem>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                <LanguageSwitcher />
              </div>
            </MobileMenuItem>
            
            <SocialMediaIcons>
              <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </SocialIcon>
            </SocialMediaIcons>
          </MobileMenuItems>
        </MobileMenu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
