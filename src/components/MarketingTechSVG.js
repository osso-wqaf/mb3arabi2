import React, { useContext } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SVGContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  opacity: ${props => props.opacity || '1'};
  transform: scaleX(-1); /* This will mirror the SVG horizontally */
  
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Animation props for SVG elements
const getAnimatedPath = (duration, delay) => styled.path`
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${dash} ${duration || '3s'} ease-in-out forwards ${delay || '0s'};
`;

const AnimatedPath = getAnimatedPath('3s', '0s');
const AnimatedPath2 = getAnimatedPath('3s', '0.5s');
const AnimatedPath3 = getAnimatedPath('3s', '1s');

const AnimatedCircle = styled.circle`
  animation: ${pulse} 3s infinite ease-in-out;
  transform-origin: center;
`;

const AnimatedGroup = styled.g`
  animation: ${float} 6s infinite ease-in-out;
  transform-origin: center;
`;

const AnimatedRotatingGroup = styled.g`
  animation: ${rotate} 20s infinite linear;
  transform-origin: center;
`;

const MarketingTechSVG = ({ opacity }) => {
  // Use ThemeContext to access the current theme
  const theme = useContext(ThemeContext);
  const isDarkMode = theme && theme.body === '#000000';
  
  // Enhanced color palette that works for both light and dark modes
  const colors = {
    primary: theme?.primary || '#316a8c',
    primaryLight: isDarkMode ? '#5590b0' : '#5590b0',
    primaryDark: isDarkMode ? '#104e78' : '#1e4e6e',
    secondary: theme?.secondary || '#ff7733',
    secondaryLight: isDarkMode ? '#ff9966' : '#ff9966',
    secondaryDark: isDarkMode ? '#e05c1d' : '#e05c1d',
    accent: theme?.accent || '#27ae60',
    accentLight: isDarkMode ? '#4cbb7a' : '#4cbb7a',
    neutral: isDarkMode ? '#aaa' : '#555',
    neutralLight: isDarkMode ? '#ddd' : '#999',
    background: isDarkMode ? '#121212' : 'white',
    text: isDarkMode ? '#f0f0f0' : '#333333',
  };

  return (
    <SVGContainer opacity={opacity}>
      <svg 
        viewBox="0 0 1920 1080" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Background decoration */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.02" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.primaryLight} />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.secondaryLight} />
          </linearGradient>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.accent} />
            <stop offset="100%" stopColor={colors.accentLight} />
          </linearGradient>
          
          <pattern id="dotPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1" fill={colors.primaryLight} opacity={isDarkMode ? "0.4" : "0.2"} />
          </pattern>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Main background */}
        <rect x="0" y="0" width="1920" height="1080" fill={isDarkMode ? "#0a0a0a" : "#ffffff"} />
        <rect x="0" y="0" width="1920" height="1080" fill="url(#dotPattern)" />
        
        {/* Grid lines - subtle background elements */}
        <g opacity="0.1">
          {Array.from({ length: 12 }, (_, i) => (
            <line 
              key={`horizontal-${i}`}
              x1="0" 
              y1={i * 100} 
              x2="1920" 
              y2={i * 100} 
              stroke={colors.primaryLight} 
              strokeWidth="1" 
              opacity="0.2"
            />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <line 
              key={`vertical-${i}`}
              x1={i * 100} 
              y1="0" 
              x2={i * 100} 
              y2="1080" 
              stroke={colors.primaryLight} 
              strokeWidth="1" 
              opacity="0.2"
            />
          ))}
        </g>
        
        {/* Abstract decorative elements */}
        <AnimatedRotatingGroup opacity="0.3">
          <circle cx="960" cy="450" r="550" stroke={colors.primaryLight} strokeWidth="0.5" fill="none" opacity="0.1" />
          <circle cx="960" cy="450" r="450" stroke={colors.secondaryLight} strokeWidth="0.5" fill="none" opacity="0.1" />
          <circle cx="960" cy="450" r="350" stroke={colors.accentLight} strokeWidth="0.5" fill="none" opacity="0.1" />
        </AnimatedRotatingGroup>
        
        {/* Large background circuit node connections */}
        <g opacity="0.15">
          <AnimatedPath 
            d="M200,200 C400,150 600,350 800,250 C1000,150 1200,400 1400,300 C1600,200 1800,400 2000,300" 
            stroke={colors.primary} 
            strokeWidth="3" 
            fill="none" 
          />
          <AnimatedPath2 
            d="M100,400 C300,350 500,500 700,400 C900,300 1100,550 1300,450 C1500,350 1700,550 1900,450" 
            stroke={colors.primaryLight} 
            strokeWidth="3" 
            fill="none" 
          />
          <AnimatedPath3 
            d="M150,600 C350,550 550,700 750,600 C950,500 1150,750 1350,650 C1550,550 1750,750 1950,650" 
            stroke={colors.primary} 
            strokeWidth="3" 
            fill="none" 
          />
        </g>
        
        {/* Lower right circuit decoration */}
        <AnimatedGroup opacity="0.6" style={{ transform: 'translate(1300px, 650px)' }}>
          <g>
            <line x1="0" y1="0" x2="100" y2="70" stroke={colors.primaryLight} strokeWidth="2" />
            <line x1="0" y1="0" x2="70" y2="-50" stroke={colors.primaryLight} strokeWidth="2" />
            <line x1="0" y1="0" x2="-80" y2="-20" stroke={colors.primaryLight} strokeWidth="2" />
            
            <circle cx="0" cy="0" r="10" fill="url(#circleGradient)" filter="url(#glow)" />
            <circle cx="100" cy="70" r="7" fill="url(#circleGradient)" filter="url(#glow)" />
            <circle cx="70" cy="-50" r="7" fill="url(#circleGradient)" filter="url(#glow)" />
            <circle cx="-80" cy="-20" r="7" fill="url(#circleGradient)" filter="url(#glow)" />
          </g>
        </AnimatedGroup>
        
        {/* Upper left circuit decoration */}
        <AnimatedGroup opacity="0.6" style={{ transform: 'translate(400px, 250px)' }}>
          <g>
            <line x1="0" y1="0" x2="120" y2="30" stroke={colors.secondaryLight} strokeWidth="2" />
            <line x1="0" y1="0" x2="40" y2="-90" stroke={colors.secondaryLight} strokeWidth="2" />
            <line x1="0" y1="0" x2="-60" y2="-40" stroke={colors.secondaryLight} strokeWidth="2" />
            
            <circle cx="0" cy="0" r="10" fill="url(#accentGradient)" filter="url(#glow)" />
            <circle cx="120" cy="30" r="7" fill="url(#accentGradient)" filter="url(#glow)" />
            <circle cx="40" cy="-90" r="7" fill="url(#accentGradient)" filter="url(#glow)" />
            <circle cx="-60" cy="-40" r="7" fill="url(#accentGradient)" filter="url(#glow)" />
          </g>
        </AnimatedGroup>
        
        {/* Analytics chart in background */}
        <g opacity="0.5" transform="translate(1000, 700) scale(0.8)">
          <AnimatedPath3 
            d="M0,150 L150,50 L300,130 L450,30 L600,110 L750,60 L900,140" 
            stroke="url(#accentGradient)" 
            strokeWidth="6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            filter="url(#glow)"
          />
          
          <AnimatedCircle cx="0" cy="150" r="8" fill="url(#accentGradient)" filter="url(#glow)" />
          <AnimatedCircle cx="150" cy="50" r="8" fill="url(#accentGradient)" filter="url(#glow)" />
          <AnimatedCircle cx="300" cy="130" r="8" fill="url(#accentGradient)" filter="url(#glow)" />
          <AnimatedCircle cx="450" cy="30" r="8" fill="url(#accentGradient)" filter="url(#glow)" />
          <AnimatedCircle cx="600" cy="110" r="8" fill="url(#accentGradient)" filter="url(#glow)" />
          <AnimatedCircle cx="750" cy="60" r="8" fill="url(#accentGradient)" filter="url(#glow)" />
          <AnimatedCircle cx="900" cy="140" r="8" fill="url(#accentGradient)" filter="url(#glow)" />
        </g>
        
        {/* Data visualization elements in background */}
        <g opacity="0.4" transform="translate(300, 650) scale(0.7)">
          <rect x="0" y="70" width="40" height="80" rx="4" fill={colors.primaryLight} opacity="0.7" />
          <rect x="60" y="50" width="40" height="100" rx="4" fill={colors.primary} opacity="0.8" />
          <rect x="120" y="30" width="40" height="120" rx="4" fill={colors.primaryDark} opacity="0.9" />
          <rect x="180" y="50" width="40" height="100" rx="4" fill={colors.primary} opacity="0.8" />
          <rect x="240" y="70" width="40" height="80" rx="4" fill={colors.primaryLight} opacity="0.7" />
        </g>
      </svg>
    </SVGContainer>
  );
};

export default MarketingTechSVG;
