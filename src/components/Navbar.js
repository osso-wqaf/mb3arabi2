import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';

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

const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-90deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
`;

// Create a fixed header wrapper that will always stay at the top
const HeaderWrapper = styled.header`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: 80px !important;
  z-index: 1000 !important;
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 768px) {
    height: 70px !important;
  }
`;

const Nav = styled.nav`
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto; /* Push to right side */
  order: 2; /* Change order to be second */
  &:hover {
    animation: ${pulse} 1s infinite;
  }
`;

const LogoImage = styled.img`
  height: 50px;
  transition: all 0.3s ease;
`;

const MenuItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-right: auto; /* Push to left side */
  order: 1; /* Change order to be first */
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  margin-left: 2rem;
  position: relative;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '600' : '500'};
  padding: 0.5rem 0;
  position: relative;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    right: 0;
    background: linear-gradient(45deg, #316a8c, #ff9966);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

// Dropdown Styles
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
  min-width: 200px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  padding: 0.75rem 0;
  opacity: 0;
  visibility: hidden;
  transform-origin: top center;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 100;
  margin-top: 15px;

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
  }

  ${MenuItem}:hover & {
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
  
  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.primary};
    transform: translateX(-5px);
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
  margin-left: 5px;
  transition: transform 0.3s ease;
  
  ${MenuItem}:hover & {
    transform: rotate(180deg);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: rotate(90deg);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 5%;
  width: 250px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border-radius: 12px;
  padding: 1rem 0;
  z-index: 999;
  transform-origin: top right;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0.95)')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  
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
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  img {
    height: 40px;
  }
`;

const MobileMenuItem = styled.li`
  width: 100%;
  
  a {
    display: block;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    color: ${({ active, theme }) => active ? theme.primary : theme.text};
    font-weight: ${({ active }) => active ? '600' : '500'};
    border-left: ${({ active, theme }) => active ? `3px solid ${theme.primary}` : '3px solid transparent'};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${({ theme }) => theme.backgroundSecondary};
      padding-left: 2rem;
    }
  }
`;

const MobileDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '600' : '500'};
  border-left: ${({ active, theme }) => active ? `3px solid ${theme.primary}` : '3px solid transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const MobileDropdownContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: ${({ theme }) => `${theme.backgroundSecondary}50`};
`;

const MobileDropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 2.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-align: right;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    padding-right: 3rem;
    padding-left: 1.5rem;
  }
  
  i {
    margin-left: 8px;
    margin-right: 0;
  }
`;

const ThemeToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 1.5rem;
  border: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: rotate(360deg);
  }
  
  i {
    font-size: 1.2rem;
    transition: all 0.3s ease;
    animation: ${rotateIn} 1s;
  }
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const { toggleTheme, isDarkMode } = useTheme();
  const menuRef = useRef(null);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  
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
  
  // Services dropdown items
  const serviceItems = [
    { name: "التسويق الرقمي", path: "/services/digital-marketing", icon: "fas fa-bullhorn" },
    { name: "تحسين محركات البحث", path: "/services/seo", icon: "fas fa-search" },
    { name: "وسائل التواصل الاجتماعي", path: "/services/social-media", icon: "fas fa-hashtag" },
    { name: "إنشاء المحتوى", path: "/services/content", icon: "fas fa-pen-fancy" },
    { name: "تطوير المواقع", path: "/services/web-development", icon: "fas fa-laptop-code" }
  ];
  
  return (
    <HeaderWrapper>
      <Nav>
        <NavContainer>
          <MenuItems>
            <MenuItem>
              <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
                الرئيسية
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/services" active={location.pathname.includes('/services') ? 1 : 0}>
                خدماتنا <DropdownArrow><i className="fas fa-chevron-down"></i></DropdownArrow>
              </NavLink>
              <DropdownMenu>
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
            </MenuItem>
            <MenuItem>
              <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
                من نحن
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/blog" active={location.pathname === '/blog' ? 1 : 0}>
                المدونة
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
                تواصل معنا
              </NavLink>
            </MenuItem>
            <MenuItem>
              <ThemeToggle onClick={toggleTheme} aria-label="Toggle Dark Mode">
                <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </ThemeToggle>
            </MenuItem>
            <MenuItem>
              <LanguageSwitcher />
            </MenuItem>
          </MenuItems>
          
          <LogoContainer>
            <LogoImage src="/logo.png" alt="Marketing Arabi Logo" />
          </LogoContainer>
          
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </MobileMenuButton>
          
          <MobileMenu isOpen={mobileMenuOpen} ref={menuRef}>
            <MobileLogo>
              <img src="/logo.png" alt="Marketing Arabi Logo" />
            </MobileLogo>
            <MobileMenuItems>
              <MobileMenuItem active={location.pathname === '/' ? 1 : 0}>
                <Link to="/">الرئيسية</Link>
              </MobileMenuItem>
              
              <li>
                <MobileDropdownHeader 
                  active={location.pathname.includes('/services') ? 1 : 0}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <span>خدماتنا</span>
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
              
              <MobileMenuItem active={location.pathname === '/about' ? 1 : 0}>
                <Link to="/about">من نحن</Link>
              </MobileMenuItem>
              
              <MobileMenuItem active={location.pathname === '/blog' ? 1 : 0}>
                <Link to="/blog">المدونة</Link>
              </MobileMenuItem>
              
              <MobileMenuItem active={location.pathname === '/contact' ? 1 : 0}>
                <Link to="/contact">تواصل معنا</Link>
              </MobileMenuItem>
              
              <MobileMenuItem>
                <Link to="#" onClick={(e) => { e.preventDefault(); toggleTheme(); }}>
                  {isDarkMode ? 'الوضع الافتراضي' : 'الوضع الداكن'}
                </Link>
              </MobileMenuItem>
              
              <MobileMenuItem>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                  <LanguageSwitcher />
                </div>
              </MobileMenuItem>
            </MobileMenuItems>
          </MobileMenu>
        </NavContainer>
      </Nav>
    </HeaderWrapper>
  );
};

export default Navbar;
