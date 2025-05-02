import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shine = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

const flow = keyframes`
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -30; }
`;

const gradientMove = keyframes`
  0% { stop-color: #7b2cbf; }
  50% { stop-color: #ff9966; }
  100% { stop-color: #06d6a0; }
`;

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  animation: ${pulse} 8s ease-in-out infinite;
`;

const FloatingGroup = styled.g`
  animation: ${float} 4s ease-in-out infinite;
`;

const FloatingGroup2 = styled.g`
  animation: ${float} 5s ease-in-out infinite;
`;

const FloatingGroup3 = styled.g`
  animation: ${float} 6s ease-in-out infinite;
`;

const FloatingGroup4 = styled.g`
  animation: ${float} 4.5s ease-in-out infinite;
`;

const FloatingGroup5 = styled.g`
  animation: ${float} 5.5s ease-in-out infinite;
`;

const RotatingElement = styled.g`
  animation: ${rotate} 30s linear infinite;
  transform-origin: center center;
`;

const ShiningElement = styled.g`
  animation: ${shine} 3s ease-in-out infinite;
`;

const FlowingLine = styled.path`
  stroke-dasharray: 5, 5;
  animation: ${flow} 1s linear infinite;
`;

const AnimatedStop = styled.stop`
  animation: ${gradientMove} 8s ease-in-out infinite;
`;

const CompanyStorySVG = ({ isDarkMode }) => {
  const primaryColor = isDarkMode ? '#9d4edd' : '#7b2cbf';
  const secondaryColor = isDarkMode ? '#ff9966' : '#ff7733';
  const accentColor = isDarkMode ? '#2a9d8f' : '#06d6a0';
  const bgColor = isDarkMode ? '#2d3748' : '#f7fafc';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <SVGContainer>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 600" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <AnimatedStop offset="0%" stopColor={primaryColor} />
            <AnimatedStop offset="50%" stopColor={secondaryColor} />
            <AnimatedStop offset="100%" stopColor={accentColor} />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill="none" />
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={textColor} strokeWidth="0.5" opacity="0.1" />
          </pattern>
          
          <radialGradient id="buildingGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Background */}
        <rect width="800" height="600" fill={bgColor} opacity="0.1" rx="20" />
        <rect width="800" height="600" fill="url(#gridPattern)" opacity="0.3" rx="20" />
        
        {/* Timeline line */}
        <FlowingLine
          d="M400 50 L400 550" 
          stroke="url(#timelineGradient)" 
          strokeWidth="4" 
          strokeDasharray="10,10"
          filter="url(#glow)"
        />
        
        {/* Decorative background elements */}
        <RotatingElement opacity="0.1">
          <circle cx="400" cy="300" r="250" stroke={accentColor} strokeWidth="1" fill="none" />
          <circle cx="400" cy="300" r="200" stroke={secondaryColor} strokeWidth="1" fill="none" />
          <circle cx="400" cy="300" r="150" stroke={primaryColor} strokeWidth="1" fill="none" />
        </RotatingElement>
        
        {/* Milestone circles with animation and improved visuals */}
        <FloatingGroup>
          <circle cx="400" cy="100" r="20" fill={secondaryColor} filter="url(#glow)" />
          <circle cx="400" cy="100" r="25" stroke={secondaryColor} strokeWidth="2" fill="none" opacity="0.5">
            <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="430" y="105" fill={textColor} fontWeight="bold" fontSize="16">2010</text>
          <text x="430" y="125" fill={textColor} fontSize="14">Founded</text>
        </FloatingGroup>
        
        <FloatingGroup2>
          <circle cx="400" cy="200" r="20" fill={accentColor} filter="url(#glow)" />
          <circle cx="400" cy="200" r="25" stroke={accentColor} strokeWidth="2" fill="none" opacity="0.5">
            <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="430" y="205" fill={textColor} fontWeight="bold" fontSize="16">2013</text>
          <text x="430" y="225" fill={textColor} fontSize="14">First Major Client</text>
        </FloatingGroup2>
        
        <FloatingGroup3>
          <circle cx="400" cy="300" r="20" fill={primaryColor} filter="url(#glow)" />
          <circle cx="400" cy="300" r="25" stroke={primaryColor} strokeWidth="2" fill="none" opacity="0.5">
            <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="430" y="305" fill={textColor} fontWeight="bold" fontSize="16">2016</text>
          <text x="430" y="325" fill={textColor} fontSize="14">Office Expansion</text>
        </FloatingGroup3>
        
        <FloatingGroup4>
          <circle cx="400" cy="400" r="20" fill={secondaryColor} filter="url(#glow)" />
          <circle cx="400" cy="400" r="25" stroke={secondaryColor} strokeWidth="2" fill="none" opacity="0.5">
            <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="430" y="405" fill={textColor} fontWeight="bold" fontSize="16">2019</text>
          <text x="430" y="425" fill={textColor} fontSize="14">Award Winning</text>
        </FloatingGroup4>
        
        <FloatingGroup5>
          <circle cx="400" cy="500" r="20" fill={accentColor} filter="url(#glow)" />
          <circle cx="400" cy="500" r="25" stroke={accentColor} strokeWidth="2" fill="none" opacity="0.5">
            <animate attributeName="r" values="25;35;25" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="430" y="505" fill={textColor} fontWeight="bold" fontSize="16">2023</text>
          <text x="430" y="525" fill={textColor} fontSize="14">Global Reach</text>
        </FloatingGroup5>
        
        {/* Company building illustration with improved visuals */}
        <g transform="translate(150, 250)">
          <circle cx="75" cy="100" r="100" fill="url(#buildingGlow)" opacity="0.2" />
          
          {/* Base building */}
          <rect x="0" y="50" width="150" height="120" fill={primaryColor} opacity="0.8" rx="5" filter="url(#glow)" />
          
          {/* Door with animation */}
          <rect x="60" y="140" width="30" height="30" fill={primaryColor} opacity="0.9" filter="url(#glow)">
            <animate 
              attributeName="opacity" 
              values="0.9;1;0.9" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </rect>
          
          {/* Windows with light effect */}
          <ShiningElement>
            <rect x="20" y="80" width="25" height="25" fill={textColor} opacity="0.3" />
            <rect x="60" y="80" width="25" height="25" fill={textColor} opacity="0.3" />
            <rect x="100" y="80" width="25" height="25" fill={textColor} opacity="0.3" />
          </ShiningElement>
          
          {/* Roof with slight animation */}
          <path d="M0 50 L75 0 L150 50" fill={primaryColor} opacity="0.9" filter="url(#glow)">
            <animate 
              attributeName="opacity" 
              values="0.9;1;0.9" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </path>
          
          {/* Flag on top */}
          <rect x="70" y="-10" width="2" height="20" fill={secondaryColor} />
          <path d="M72 -10 L85 -5 L72 0" fill={secondaryColor}>
            <animate 
              attributeName="d" 
              values="M72 -10 L85 -5 L72 0; M72 -10 L82 -7 L72 0; M72 -10 L85 -5 L72 0" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </path>
        </g>
        
        {/* Team illustration with improved visuals */}
        <g transform="translate(560, 300)">
          {/* Glow effect around team */}
          <circle cx="20" cy="10" r="50" fill="url(#buildingGlow)" opacity="0.2" />
          
          {/* Person 1 with subtle animation */}
          <g>
            <circle cx="0" cy="0" r="15" fill={secondaryColor} filter="url(#glow)" />
            <rect x="-10" y="15" width="20" height="30" fill={secondaryColor} rx="5" filter="url(#glow)" />
            <animate 
              attributeName="transform" 
              values="translate(0,0); translate(0,-2); translate(0,0)" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </g>
          
          {/* Person 2 with subtle animation */}
          <g>
            <circle cx="40" cy="-10" r="15" fill={accentColor} filter="url(#glow)" />
            <rect x="30" y="5" width="20" height="30" fill={accentColor} rx="5" filter="url(#glow)" />
            <animate 
              attributeName="transform" 
              values="translate(0,0); translate(0,-3); translate(0,0)" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </g>
          
          {/* Person 3 with subtle animation */}
          <g>
            <circle cx="20" cy="30" r="15" fill={primaryColor} filter="url(#glow)" />
            <rect x="10" y="45" width="20" height="30" fill={primaryColor} rx="5" filter="url(#glow)" />
            <animate 
              attributeName="transform" 
              values="translate(0,0); translate(0,-2); translate(0,0)" 
              dur="2.5s" 
              repeatCount="indefinite" 
            />
          </g>
        </g>
        
        {/* Abstract connection lines with animation */}
        <g>
          <line x1="235" y1="250" x2="380" y2="200" stroke={accentColor} strokeWidth="2" opacity="0.6" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="235" y1="250" x2="380" y2="300" stroke={accentColor} strokeWidth="2" opacity="0.6" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="235" y1="250" x2="380" y2="400" stroke={accentColor} strokeWidth="2" opacity="0.6" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.4s" repeatCount="indefinite" />
          </line>
          
          <line x1="560" y1="300" x2="420" y2="200" stroke={secondaryColor} strokeWidth="2" opacity="0.6" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.3s" repeatCount="indefinite" />
          </line>
          <line x1="560" y1="300" x2="420" y2="300" stroke={secondaryColor} strokeWidth="2" opacity="0.6" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="560" y1="300" x2="420" y2="400" stroke={secondaryColor} strokeWidth="2" opacity="0.6" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.7s" repeatCount="indefinite" />
          </line>
        </g>
        
        {/* Data points visualization */}
        <g>
          <circle cx="300" cy="150" r="5" fill={secondaryColor} opacity="0.7">
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="200" r="4" fill={accentColor} opacity="0.7">
            <animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="250" r="6" fill={primaryColor} opacity="0.7">
            <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="500" cy="150" r="5" fill={secondaryColor} opacity="0.7">
            <animate attributeName="r" values="5;8;5" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="520" cy="200" r="4" fill={accentColor} opacity="0.7">
            <animate attributeName="r" values="4;7;4" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="480" cy="250" r="6" fill={primaryColor} opacity="0.7">
            <animate attributeName="r" values="6;9;6" dur="2.7s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </SVGContainer>
  );
};

export default CompanyStorySVG;
