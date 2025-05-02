import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { FaGlobe, FaLanguage } from 'react-icons/fa';

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
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const LanguageToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => `${theme.backgroundSecondary}80` || 'rgba(240, 240, 250, 0.8)'};
  border-radius: 22px;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => `${theme.primary}20` || 'rgba(0, 123, 255, 0.2)'};
  position: relative;
  overflow: hidden;
  color: ${({ theme }) => theme.text || '#333'};
  
  &:hover {
    background: ${({ theme }) => `${theme.primary}15` || 'rgba(0, 123, 255, 0.15)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 5px 12px;
  }
`;

const LanguageIcon = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary || '#007BFF'};
  animation: ${pulse} 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentLanguage = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

const LanguageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: ${props => props.isRTL ? 'auto' : '0'};
  left: ${props => props.isRTL ? '0' : 'auto'};
  background: ${({ theme }) => theme.cardBackground || 'white'};
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 8px;
  min-width: 150px;
  z-index: 1000;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  border: 1px solid ${({ theme }) => `${theme.primary}10` || 'rgba(0, 123, 255, 0.1)'};
  
  &:before {
    content: '';
    position: absolute;
    top: -8px;
    right: ${props => props.isRTL ? 'auto' : '15px'};
    left: ${props => props.isRTL ? '15px' : 'auto'};
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    background: ${({ theme }) => theme.cardBackground || 'white'};
    border-left: ${props => props.isRTL ? 'none' : '1px solid rgba(0, 123, 255, 0.1)'};
    border-top: ${props => props.isRTL ? 'none' : '1px solid rgba(0, 123, 255, 0.1)'};
    border-right: ${props => props.isRTL ? '1px solid rgba(0, 123, 255, 0.1)' : 'none'};
    border-bottom: ${props => props.isRTL ? '1px solid rgba(0, 123, 255, 0.1)' : 'none'};
  }
  
  animation: ${props => props.isOpen ? fadeIn : 'none'} 0.3s ease;
`;

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ active, theme }) => active ? theme.primary || '#007BFF' : theme.text || '#333'};
  background: ${({ active, theme }) => active ? `${theme.primary}10` || 'rgba(0, 123, 255, 0.1)' : 'transparent'};
  font-weight: ${({ active }) => active ? '600' : '500'};
  
  &:hover {
    background: ${({ theme }) => `${theme.backgroundSecondary}` || '#f5f5f5'};
    color: ${({ theme }) => theme.primary || '#007BFF'};
    padding-left: ${props => props.isRTL ? '15px' : '20px'};
    padding-right: ${props => props.isRTL ? '20px' : '15px'};
  }
  
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

const LanguageName = styled.span`
  font-size: 0.95rem;
`;

const LanguageCode = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => `${theme.text}80` || '#33333380'};
  text-transform: uppercase;
  margin-left: auto;
`;

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  
  const isRTL = i18n.dir() === 'rtl';
  
  const languages = [
    { code: 'ar', name: 'العربية', nativeName: 'العربية' },
    { code: 'en', name: 'English', nativeName: 'English' }
  ];
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
    
    // Set direction based on language
    if (lng === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.style.direction = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.style.direction = 'ltr';
      document.body.style.textAlign = 'left';
    }
  };
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Get current language display data
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <SwitcherContainer ref={dropdownRef}>
      <LanguageToggle onClick={() => setDropdownOpen(!dropdownOpen)}>
        <LanguageIcon>
          <FaGlobe />
        </LanguageIcon>
        <CurrentLanguage>{currentLang.code.toUpperCase()}</CurrentLanguage>
      </LanguageToggle>
      
      <LanguageDropdown isOpen={dropdownOpen} isRTL={isRTL}>
        {languages.map((language) => (
          <LanguageOption 
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            active={i18n.language === language.code}
            isRTL={isRTL}
          >
            <LanguageName>{language.nativeName}</LanguageName>
            <LanguageCode>{language.code}</LanguageCode>
          </LanguageOption>
        ))}
      </LanguageDropdown>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
