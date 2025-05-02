import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeContext } from 'styled-components';

// Define animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  .floating {
    animation: ${float} 6s ease-in-out infinite;
  }
  
  .pulsing {
    animation: ${pulse} 4s ease-in-out infinite;
  }
  
  .rotating {
    animation: ${rotate} 20s linear infinite;
    transform-origin: center;
  }
`;

const AboutSVG = () => {
  // Use ThemeContext to access the current theme
  const theme = useContext(ThemeContext);
  
  // Define colors based on the current theme
  const primaryColor = theme.primary || '#316a8c';
  const secondaryColor = theme.secondary || '#ff9966';
  const accentColor = theme.accent || '#44bec7';
  const backgroundColor = theme.background === '#000000' ? '#222' : '#f8f9fa';
  const textColor = theme.text || '#333';
  const lightColor = theme.background === '#000000' ? '#555' : '#e0e0e0';
  
  return (
    <SVGContainer>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Elements */}
        <rect x="0" y="0" width="800" height="600" fill={backgroundColor} opacity="0.1" />
        
        {/* Subtle Grid Pattern */}
        <g opacity="0.1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line 
              key={`h-${i}`} 
              x1="0" 
              y1={i * 50} 
              x2="800" 
              y2={i * 50} 
              stroke={lightColor} 
              strokeWidth="1" 
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line 
              key={`v-${i}`} 
              x1={i * 50} 
              y1="0" 
              x2={i * 50} 
              y2="600" 
              stroke={lightColor} 
              strokeWidth="1" 
            />
          ))}
        </g>
        
        {/* Company Story Timeline */}
        <g className="pulsing">
          <path
            d="M150 300 L650 300"
            stroke={primaryColor}
            strokeWidth="4"
            strokeDasharray="8 8"
          />
          
          {/* Timeline Nodes */}
          <circle cx="200" cy="300" r="20" fill={primaryColor} />
          <circle cx="350" cy="300" r="20" fill={primaryColor} />
          <circle cx="500" cy="300" r="20" fill={primaryColor} />
          <circle cx="650" cy="300" r="20" fill={primaryColor} />
          
          <text x="200" y="330" textAnchor="middle" fill={textColor} fontSize="14" fontWeight="bold">2018</text>
          <text x="350" y="330" textAnchor="middle" fill={textColor} fontSize="14" fontWeight="bold">2020</text>
          <text x="500" y="330" textAnchor="middle" fill={textColor} fontSize="14" fontWeight="bold">2022</text>
          <text x="650" y="330" textAnchor="middle" fill={textColor} fontSize="14" fontWeight="bold">2025</text>
          
          {/* Timeline Icons */}
          <g className="floating" style={{ animationDelay: '-1s' }}>
            <rect x="175" y="220" width="50" height="50" rx="10" fill={primaryColor} opacity="0.2" />
            <text x="200" y="250" textAnchor="middle" fill={primaryColor} fontSize="24">🚀</text>
            <text x="200" y="275" textAnchor="middle" fill={textColor} fontSize="12">Founded</text>
          </g>
          
          <g className="floating" style={{ animationDelay: '-2s' }}>
            <rect x="325" y="220" width="50" height="50" rx="10" fill={primaryColor} opacity="0.2" />
            <text x="350" y="250" textAnchor="middle" fill={primaryColor} fontSize="24">📈</text>
            <text x="350" y="275" textAnchor="middle" fill={textColor} fontSize="12">Growth</text>
          </g>
          
          <g className="floating" style={{ animationDelay: '-3s' }}>
            <rect x="475" y="220" width="50" height="50" rx="10" fill={primaryColor} opacity="0.2" />
            <text x="500" y="250" textAnchor="middle" fill={primaryColor} fontSize="24">🌐</text>
            <text x="500" y="275" textAnchor="middle" fill={textColor} fontSize="12">Expansion</text>
          </g>
          
          <g className="floating" style={{ animationDelay: '-4s' }}>
            <rect x="625" y="220" width="50" height="50" rx="10" fill={primaryColor} opacity="0.2" />
            <text x="650" y="250" textAnchor="middle" fill={primaryColor} fontSize="24">🏆</text>
            <text x="650" y="275" textAnchor="middle" fill={textColor} fontSize="12">Leadership</text>
          </g>
        </g>
        
        {/* Company Vision */}
        <g className="pulsing" transform="translate(400, 100)" style={{ transformOrigin: 'center' }}>
          <circle cx="0" cy="0" r="60" fill={secondaryColor} opacity="0.2" />
          <circle cx="0" cy="0" r="45" fill={backgroundColor} stroke={secondaryColor} strokeWidth="2" />
          
          {/* Vision Rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line 
              key={`ray-${i}`} 
              x1="0" 
              y1="0" 
              x2={Math.cos(Math.PI * 2 * i / 8) * 80} 
              y2={Math.sin(Math.PI * 2 * i / 8) * 80} 
              stroke={secondaryColor} 
              strokeWidth="2" 
              opacity="0.5"
            />
          ))}
          
          <circle cx="0" cy="0" r="30" fill={secondaryColor} opacity="0.8" />
          <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">VISION</text>
        </g>
        
        {/* Company Values */}
        <g transform="translate(190, 430)">
          <rect x="0" y="0" width="120" height="120" rx="20" fill={primaryColor} opacity="0.1" stroke={primaryColor} strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fill={textColor} fontSize="16" fontWeight="bold">INNOVATION</text>
          <path d="M40 50 L80 50 M40 60 L80 60 M40 70 L80 70 M40 80 L70 80" stroke={primaryColor} strokeWidth="2" />
          <circle cx="60" cy="100" r="10" fill={primaryColor} className="pulsing" />
        </g>
        
        <g transform="translate(340, 430)">
          <rect x="0" y="0" width="120" height="120" rx="20" fill={secondaryColor} opacity="0.1" stroke={secondaryColor} strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fill={textColor} fontSize="16" fontWeight="bold">QUALITY</text>
          <polygon points="60,50 70,65 90,70 75,85 80,105 60,95 40,105 45,85 30,70 50,65" fill="none" stroke={secondaryColor} strokeWidth="2" />
          <circle cx="60" cy="75" r="10" fill={secondaryColor} className="pulsing" />
        </g>
        
        <g transform="translate(490, 430)">
          <rect x="0" y="0" width="120" height="120" rx="20" fill={accentColor} opacity="0.1" stroke={accentColor} strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fill={textColor} fontSize="16" fontWeight="bold">INTEGRITY</text>
          <path d="M45 60 C45 75, 75 75, 75 60 S60 45, 45 60" fill="none" stroke={accentColor} strokeWidth="2" />
          <path d="M45 80 C45 95, 75 95, 75 80 S60 65, 45 80" fill="none" stroke={accentColor} strokeWidth="2" />
          <circle cx="60" cy="100" r="10" fill={accentColor} className="pulsing" />
        </g>
        
        {/* Team Connection */}
        <g className="pulsing">
          <circle cx="200" cy="380" r="15" fill={accentColor} opacity="0.8" />
          <circle cx="260" cy="350" r="12" fill={primaryColor} opacity="0.8" />
          <circle cx="320" cy="370" r="10" fill={secondaryColor} opacity="0.8" />
          <circle cx="380" cy="350" r="13" fill={accentColor} opacity="0.8" />
          <circle cx="440" cy="380" r="11" fill={primaryColor} opacity="0.8" />
          <circle cx="500" cy="360" r="14" fill={secondaryColor} opacity="0.8" />
          <circle cx="560" cy="370" r="12" fill={accentColor} opacity="0.8" />
          <circle cx="620" cy="350" r="10" fill={primaryColor} opacity="0.8" />
          
          <line x1="200" y1="380" x2="260" y2="350" stroke={lightColor} strokeWidth="2" />
          <line x1="260" y1="350" x2="320" y2="370" stroke={lightColor} strokeWidth="2" />
          <line x1="320" y1="370" x2="380" y2="350" stroke={lightColor} strokeWidth="2" />
          <line x1="380" y1="350" x2="440" y2="380" stroke={lightColor} strokeWidth="2" />
          <line x1="440" y1="380" x2="500" y2="360" stroke={lightColor} strokeWidth="2" />
          <line x1="500" y1="360" x2="560" y2="370" stroke={lightColor} strokeWidth="2" />
          <line x1="560" y1="370" x2="620" y2="350" stroke={lightColor} strokeWidth="2" />
        </g>
        
        {/* Rotating Global Connection */}
        <g className="rotating" opacity="0.5">
          <circle cx="400" cy="300" r="150" fill="none" stroke={lightColor} strokeWidth="1" strokeDasharray="5 5" />
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 10;
            const x = 400 + Math.cos(angle) * 150;
            const y = 300 + Math.sin(angle) * 150;
            return (
              <circle key={`globe-${i}`} cx={x} cy={y} r="5" fill={i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor} />
            );
          })}
        </g>
      </svg>
    </SVGContainer>
  );
};

export default AboutSVG;
