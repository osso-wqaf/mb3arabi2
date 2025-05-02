import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateReverse = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const wave = keyframes`
  0% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(10px) translateY(-5px); }
  50% { transform: translateX(0) translateY(0); }
  75% { transform: translateX(-10px) translateY(5px); }
  100% { transform: translateX(0) translateY(0); }
`;

const dash = keyframes`
  to {
    stroke-dashoffset: 1000;
  }
`;

const fadeInOut = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.8; }
  100% { opacity: 0.2; }
`;

const glowEffect = keyframes`
  0% { filter: drop-shadow(0 0 2px rgba(106, 76, 147, 0.5)); }
  50% { filter: drop-shadow(0 0 15px rgba(106, 76, 147, 0.8)); }
  100% { filter: drop-shadow(0 0 2px rgba(106, 76, 147, 0.5)); }
`;

const SVGContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.9;
  z-index: 1;
`;

// Styled SVG elements with properly applied animations
const FloatingElement = styled.g`
  animation: ${float} 6s ease-in-out infinite;
`;

const RotatingElement = styled.g`
  animation: ${rotate} 20s linear infinite;
  transform-origin: center center;
`;

const RotatingReverseElement = styled.g`
  animation: ${rotateReverse} 15s linear infinite;
  transform-origin: center center;
`;

const PulsingElement = styled.g`
  animation: ${pulse} 4s ease-in-out infinite;
`;

const WavingElement = styled.g`
  animation: ${wave} 10s ease-in-out infinite;
`;

const DashingPath = styled.path`
  stroke-dasharray: 10;
  animation: ${dash} 20s linear infinite;
`;

const FadingElement = styled.g`
  animation: ${fadeInOut} 4s ease-in-out infinite;
`;

const GlowingElement = styled.g`
  animation: ${glowEffect} 5s ease-in-out infinite;
`;

const PortfolioHeroSVG = ({ isDarkMode }) => {
  // Color scheme similar to ServicesHeroSVG but slightly adjusted for portfolio context
  const primaryColor = isDarkMode ? '#6a4c93' : '#5a189a'; // Purple
  const secondaryColor = isDarkMode ? '#00b4d8' : '#00b4d8'; // Teal
  const accentColor = isDarkMode ? '#f77f00' : '#f15025'; // Orange
  const lightColor = isDarkMode ? '#e0e0e0' : '#ffffff';
  const darkColor = isDarkMode ? '#2d3748' : '#1a202c';
  
  // Categories for the portfolio
  const categories = [
    { name: "Web Development", icon: "code" },
    { name: "Mobile Apps", icon: "mobile" },
    { name: "UI/UX Design", icon: "design" },
    { name: "Branding", icon: "branding" },
    { name: "Marketing", icon: "marketing" },
    { name: "Analytics", icon: "analytics" }
  ];

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
          <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor}>
              <animate 
                attributeName="stop-opacity" 
                values="0.2;0.4;0.2" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="50%" stopColor={secondaryColor}>
              <animate 
                attributeName="stop-opacity" 
                values="0.3;0.6;0.3" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor={accentColor}>
              <animate 
                attributeName="stop-opacity" 
                values="0.2;0.5;0.2" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
          
          <pattern 
            id="portfolioPattern" 
            width="100" 
            height="100" 
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="1" fill={primaryColor} />
            <circle cx="0" cy="0" r="1" fill={secondaryColor} />
            <circle cx="0" cy="100" r="1" fill={secondaryColor} />
            <circle cx="100" cy="0" r="1" fill={secondaryColor} />
            <circle cx="100" cy="100" r="1" fill={secondaryColor} />
          </pattern>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <clipPath id="portfolioClip">
            <rect x="0" y="0" width="1920" height="1080" />
          </clipPath>
        </defs>
        
        {/* Background fills */}
        <rect width="100%" height="100%" fill="url(#portfolioPattern)" opacity="0.3" />
        <rect width="100%" height="100%" fill="url(#portfolioGradient)" />
        
        {/* Main container for project categories */}
        <g transform="translate(960, 540)">
          {/* Rotating rings */}
          <RotatingElement>
            <circle cx="0" cy="0" r="400" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="0" cy="0" r="300" stroke={secondaryColor} strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="0" cy="0" r="200" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.2" />
          </RotatingElement>
          
          <RotatingReverseElement>
            <circle cx="0" cy="0" r="350" stroke={primaryColor} strokeDasharray="20,10" strokeWidth="1" fill="none" opacity="0.15" />
            <circle cx="0" cy="0" r="250" stroke={secondaryColor} strokeDasharray="10,15" strokeWidth="1" fill="none" opacity="0.15" />
          </RotatingReverseElement>
          
          {/* Category Cards - arranged in a circle */}
          {categories.map((category, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const x = 300 * Math.cos(angle);
            const y = 300 * Math.sin(angle);
            
            return (
              <FloatingElement key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                <g transform={`translate(${x}, ${y})`}>
                  {/* Category Card */}
                  <g>
                    {/* Card Background */}
                    <rect 
                      x="-70" 
                      y="-50" 
                      width="140" 
                      height="100" 
                      rx="10" 
                      fill={darkColor} 
                      opacity="0.7"
                      stroke={index % 3 === 0 ? primaryColor : index % 3 === 1 ? secondaryColor : accentColor}
                      strokeWidth="2"
                    />
                    
                    {/* Title Strip */}
                    <rect 
                      x="-70" 
                      y="-50" 
                      width="140" 
                      height="25" 
                      rx="10" 
                      ry="10" 
                      fill={index % 3 === 0 ? primaryColor : index % 3 === 1 ? secondaryColor : accentColor} 
                      opacity="0.9" 
                    />
                    
                    {/* Category Name */}
                    <text 
                      x="0" 
                      y="-35" 
                      textAnchor="middle" 
                      fill={lightColor} 
                      fontSize="12" 
                      fontWeight="bold"
                      style={{ transform: 'scaleX(-1)' }}
                    >
                      {category.name}
                    </text>
                    
                    {/* Category Icon - simple shapes to represent each category */}
                    <g style={{ transform: 'scaleX(-1)' }}>
                      {category.icon === "code" && (
                        <g transform="translate(0, 10)">
                          <rect x="-25" y="-10" width="50" height="30" rx="2" fill="none" stroke={lightColor} strokeWidth="1.5" />
                          <text x="0" y="5" textAnchor="middle" fill={lightColor} fontSize="15">&lt;/&gt;</text>
                        </g>
                      )}
                      
                      {category.icon === "mobile" && (
                        <g transform="translate(0, 10)">
                          <rect x="-15" y="-20" width="30" height="50" rx="3" fill="none" stroke={lightColor} strokeWidth="1.5" />
                          <circle cx="0" cy="20" r="3" fill={lightColor} />
                        </g>
                      )}
                      
                      {category.icon === "design" && (
                        <g transform="translate(0, 15)">
                          <circle cx="-10" cy="-10" r="10" fill="none" stroke={lightColor} strokeWidth="1.5" />
                          <circle cx="10" cy="-10" r="10" fill="none" stroke={lightColor} strokeWidth="1.5" />
                          <circle cx="0" cy="5" r="10" fill="none" stroke={lightColor} strokeWidth="1.5" />
                        </g>
                      )}
                      
                      {category.icon === "branding" && (
                        <g transform="translate(0, 10)">
                          <polygon points="0,-15 15,10 -15,10" fill="none" stroke={lightColor} strokeWidth="1.5" />
                          <rect x="-20" y="15" width="40" height="10" fill="none" stroke={lightColor} strokeWidth="1.5" />
                        </g>
                      )}
                      
                      {category.icon === "marketing" && (
                        <g transform="translate(0, 10)">
                          <path d="M-20,20 L-20,-10 L20,-10 L20,20 M-10,-10 L-10,-20 L10,-20 L10,-10" fill="none" stroke={lightColor} strokeWidth="1.5" />
                          <path d="M-10,0 L10,0 M-10,10 L5,10" fill="none" stroke={lightColor} strokeWidth="1.5" />
                        </g>
                      )}
                      
                      {category.icon === "analytics" && (
                        <g transform="translate(0, 10)">
                          <line x1="-20" y1="20" x2="-20" y2="-20" stroke={lightColor} strokeWidth="1.5" />
                          <line x1="-20" y1="20" x2="20" y2="20" stroke={lightColor} strokeWidth="1.5" />
                          <path d="M-15,0 L-5,10 L5,-15 L15,5" fill="none" stroke={lightColor} strokeWidth="1.5" />
                        </g>
                      )}
                    </g>
                  </g>
                </g>
              </FloatingElement>
            );
          })}
        </g>
        
        {/* Connecting lines between categories */}
        <DashingPath 
          d="M460,540 L960,340 L1460,540 M460,740 L960,940 L1460,740" 
          fill="none" 
          stroke={lightColor} 
          strokeWidth="1.5" 
          opacity="0.3"
        />
        
        {/* Floating project items */}
        <FloatingElement style={{ animationDelay: '0.5s' }}>
          <g transform="translate(400, 300)">
            <rect x="0" y="0" width="120" height="80" rx="10" fill={primaryColor} opacity="0.4" />
            <rect x="10" y="15" width="100" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="35" width="80" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="55" width="60" height="10" rx="5" fill={lightColor} opacity="0.6" />
          </g>
        </FloatingElement>
        
        <FloatingElement style={{ animationDelay: '1s' }}>
          <g transform="translate(1500, 400)">
            <rect x="0" y="0" width="120" height="80" rx="10" fill={secondaryColor} opacity="0.4" />
            <rect x="10" y="15" width="100" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="35" width="80" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="55" width="60" height="10" rx="5" fill={lightColor} opacity="0.6" />
          </g>
        </FloatingElement>
        
        <FloatingElement style={{ animationDelay: '1.5s' }}>
          <g transform="translate(200, 700)">
            <rect x="0" y="0" width="120" height="80" rx="10" fill={accentColor} opacity="0.4" />
            <rect x="10" y="15" width="100" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="35" width="80" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="55" width="60" height="10" rx="5" fill={lightColor} opacity="0.6" />
          </g>
        </FloatingElement>
        
        {/* Glowing orbs */}
        <GlowingElement>
          {Array.from({ length: 12 }).map((_, i) => (
            <circle 
              key={`orb-${i}`}
              cx={400 + i * 100} 
              cy={900 + (i % 3) * 50}
              r={10 + (i % 5) * 2} 
              fill={i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor}
              opacity="0.7"
              filter="url(#glow)"
            >
              <animate 
                attributeName="cy" 
                values={`${900 + (i % 3) * 50};${850 + (i % 3) * 50};${900 + (i % 3) * 50}`}
                dur={`${2 + i * 0.5}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          ))}
        </GlowingElement>
        
        {/* Bottom decorative wave */}
        <path 
          d="M0,950 C150,1000 300,900 450,950 C600,1000 750,900 900,950 C1050,1000 1200,900 1350,950 C1500,1000 1650,900 1800,950 L1920,950 L1920,1080 L0,1080 Z" 
          fill={primaryColor} 
          opacity="0.2" 
        />
        <path 
          d="M0,970 C150,1020 300,920 450,970 C600,1020 750,920 900,970 C1050,1020 1200,920 1350,970 C1500,1020 1650,920 1800,970 L1920,970 L1920,1080 L0,1080 Z" 
          fill={secondaryColor} 
          opacity="0.15" 
        />
        
        {/* Bottom floating project thumbnails */}
        <g transform="translate(0, 980)">
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`thumb-${i}`} transform={`translate(${i * 190 + 20}, 0)`}>
              <rect 
                x="0" 
                y="0" 
                width="150" 
                height="90" 
                rx="8" 
                fill={i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor} 
                opacity="0.3"
              />
              <rect 
                x="10" 
                y="10" 
                width="130" 
                height="50" 
                rx="4"
                fill={lightColor}
                opacity="0.1"
              />
              <circle cx="75" cy="35" r="15" fill={lightColor} opacity="0.2" />
              <rect x="30" y="65" width="90" height="10" rx="5" fill={lightColor} opacity="0.2" />
              <animate 
                attributeName="opacity" 
                values={`${0.5 + (i % 5) * 0.1};${0.7 + (i % 5) * 0.1};${0.5 + (i % 5) * 0.1}`}
                dur={`${3 + i}s`}
                repeatCount="indefinite"
              />
            </g>
          ))}
        </g>

        {/* Moving dots */}
        <g>
          {Array.from({ length: 20 }).map((_, i) => (
            <circle 
              key={`dot-${i}`}
              cx={Math.random() * 1920} 
              cy={Math.random() * 1080}
              r="3"
              fill={i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor}
            >
              <animate 
                attributeName="opacity" 
                values="0.2;0.8;0.2" 
                dur={`${3 + i}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="cy" 
                values={`${Math.random() * 1080};${Math.random() * 1080};${Math.random() * 1080}`} 
                dur={`${10 + i * 2}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="cx" 
                values={`${Math.random() * 1920};${Math.random() * 1920};${Math.random() * 1920}`} 
                dur={`${15 + i * 3}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          ))}
        </g>
      </svg>
    </SVGContainer>
  );
};

export default PortfolioHeroSVG;
