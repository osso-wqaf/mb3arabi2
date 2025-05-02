import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SwitcherButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  margin-left: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#f0f0f0')};
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const Icon = styled.i`
  font-size: 1.2rem;
`;

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  const { t } = useTranslation();
  
  return (
    <SwitcherButton 
      onClick={toggleTheme} 
      theme={theme}
      aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
    >
      <Icon className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'} />
    </SwitcherButton>
  );
};

export default ThemeSwitcher;
