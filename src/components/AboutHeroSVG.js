import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const gradientFlow = keyframes`
  0% { stop-color: #7b2cbf; }
  50% { stop-color: #ff9966; }
  100% { stop-color: #06d6a0; }
`;

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.6; /* تقليل التعتيم لزيادة الشفافية */
  overflow: hidden;
`;

const FloatingElement = styled.g`
  animation: ${float} 6s ease-in-out infinite;
`;

const RotatingElement = styled.g`
  animation: ${rotate} 20s linear infinite;
  transform-origin: center center;
`;

const PulsingElement = styled.g`
  animation: ${pulse} 4s ease-in-out infinite;
`;

const AnimatedStop = styled.stop`
  animation: ${gradientFlow} 8s ease-in-out infinite;
`;

const AboutHeroSVG = ({ isDarkMode }) => {
  const primaryColor = isDarkMode ? '#9d4edd' : '#7b2cbf'; // Purple
  const secondaryColor = isDarkMode ? '#ff9966' : '#ff7733'; // Orange
  const accentColor = isDarkMode ? '#2a9d8f' : '#06d6a0'; // Teal/Mint green
  const lightColor = isDarkMode ? '#e0e0e0' : '#ffffff';
  const darkColor = isDarkMode ? '#2d3748' : '#1a202c';
  
  return (
    <SVGContainer>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: 'scaleX(-1)' }}
      >
        <defs>
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <AnimatedStop offset="0%" stopColor={primaryColor} />
            <AnimatedStop offset="50%" stopColor={secondaryColor} />
            <AnimatedStop offset="100%" stopColor={accentColor} />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <pattern id="dots" patternUnits="userSpaceOnUse" width="30" height="30">
            <circle cx="10" cy="10" r="2" fill={lightColor} opacity="0.5" />
          </pattern>
        </defs>
        
        {/* Abstract background shapes */}
        <PulsingElement>
          <circle cx="200" cy="600" r="400" fill="url(#mainGradient)" opacity="0.15" />
          <circle cx="1600" cy="350" r="300" fill="url(#mainGradient)" opacity="0.2" />
          <ellipse cx="900" cy="900" rx="600" ry="400" fill={accentColor} opacity="0.1" />
        </PulsingElement>
        
        {/* Rotating background decoration */}
        <RotatingElement>
          <path d="M960 540 L1000 500 L1040 540 L1000 580 Z" fill={secondaryColor} opacity="0.3" />
          <path d="M960 540 L920 500 L880 540 L920 580 Z" fill={primaryColor} opacity="0.3" />
          <path d="M960 540 L1000 580 L960 620 L920 580 Z" fill={accentColor} opacity="0.3" />
          <path d="M960 540 L920 500 L960 460 L1000 500 Z" fill={lightColor} opacity="0.3" />
        </RotatingElement>
        
        {/* Floating elements */}
        <FloatingElement>
          <path d="M1200,300 L1300,350 L1250,450 L1150,400 Z" fill={secondaryColor} opacity="0.6" filter="url(#glow)" />
          <path d="M300,500 L400,450 L450,550 L350,600 Z" fill={accentColor} opacity="0.5" filter="url(#glow)" />
          <path d="M1000,700 L1100,750 L1050,850 L950,800 Z" fill={primaryColor} opacity="0.4" filter="url(#glow)" />
          
          <circle cx="1500" cy="300" r="30" fill={secondaryColor} opacity="0.6" filter="url(#glow)" />
          <circle cx="400" cy="700" r="40" fill={primaryColor} opacity="0.5" filter="url(#glow)" />
          <circle cx="1100" cy="500" r="25" fill={accentColor} opacity="0.7" filter="url(#glow)" />
        </FloatingElement>
        
        {/* Abstract data visualization elements */}
        <g>
          <rect x="100" y="400" width="40" height="80" fill={primaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="80;120;80" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="160" y="430" width="40" height="50" fill={primaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="50;90;50" 
              dur="5s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="220" y="410" width="40" height="70" fill={primaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="70;100;70" 
              dur="6s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="280" y="440" width="40" height="40" fill={primaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="40;80;40" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="340" y="420" width="40" height="60" fill={primaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="60;100;60" 
              dur="7s" 
              repeatCount="indefinite" 
            />
          </rect>
          
          <rect x="1500" y="450" width="40" height="100" fill={secondaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="100;60;100" 
              dur="5s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="1560" y="480" width="40" height="70" fill={secondaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="70;110;70" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="1620" y="460" width="40" height="90" fill={secondaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="90;50;90" 
              dur="6s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="1680" y="490" width="40" height="60" fill={secondaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="60;100;60" 
              dur="4.5s" 
              repeatCount="indefinite" 
            />
          </rect>
          <rect x="1740" y="470" width="40" height="80" fill={secondaryColor} opacity="0.7">
            <animate 
              attributeName="height" 
              values="80;40;80" 
              dur="7s" 
              repeatCount="indefinite" 
            />
          </rect>
        </g>
      </svg>
    </SVGContainer>
  );
};

export default AboutHeroSVG;
