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

const rotateReverse = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
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

const translateDiagonal = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(20px, -20px); }
  50% { transform: translate(0, 0); }
  75% { transform: translate(-20px, 20px); }
  100% { transform: translate(0, 0); }
`;

const moveInCircle = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(15px, 15px); }
  50% { transform: translate(0, 30px); }
  75% { transform: translate(-15px, 15px); }
  100% { transform: translate(0, 0); }
`;

const glowEffect = keyframes`
  0% { filter: drop-shadow(0 0 2px rgba(106, 76, 147, 0.5)); }
  50% { filter: drop-shadow(0 0 15px rgba(106, 76, 147, 0.8)); }
  100% { filter: drop-shadow(0 0 2px rgba(106, 76, 147, 0.5)); }
`;

const morphPath = keyframes`
  0% { d: path('M0,100 Q250,180 500,100 T1000,100'); }
  50% { d: path('M0,100 Q250,20 500,100 T1000,100'); }
  100% { d: path('M0,100 Q250,180 500,100 T1000,100'); }
`;

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.6;
  overflow: hidden;
`;

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

const DiagonalElement = styled.g`
  animation: ${translateDiagonal} 8s ease-in-out infinite;
`;

const CircleMotionElement = styled.g`
  animation: ${moveInCircle} 12s ease-in-out infinite;
`;

const GlowingElement = styled.g`
  animation: ${glowEffect} 5s ease-in-out infinite;
`;

const MorphingPath = styled.path`
  animation: ${morphPath} 10s ease-in-out infinite;
`;

const ServicesHeroSVG = ({ isDarkMode }) => {
  // استخدام مجموعة ألوان مختلفة عن صفحة About وHome
  const primaryColor = isDarkMode ? '#6a4c93' : '#5a189a'; // بنفسجي داكن
  const secondaryColor = isDarkMode ? '#f77f00' : '#f15025'; // برتقالي محمر
  const accentColor = isDarkMode ? '#00b4d8' : '#00b4d8'; // أزرق فيروزي
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
          <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor}>
              <animate 
                attributeName="stop-color" 
                values={`${primaryColor}; ${secondaryColor}; ${accentColor}; ${primaryColor}`} 
                dur="10s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="50%" stopColor={secondaryColor}>
              <animate 
                attributeName="stop-color" 
                values={`${secondaryColor}; ${accentColor}; ${primaryColor}; ${secondaryColor}`} 
                dur="10s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor={accentColor}>
              <animate 
                attributeName="stop-color" 
                values={`${accentColor}; ${primaryColor}; ${secondaryColor}; ${accentColor}`} 
                dur="10s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
          
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.05" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.05" />
          </linearGradient>
          
          <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
            <circle cx="20" cy="20" r="2" fill={primaryColor} fillOpacity="0.3" />
          </pattern>
          
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor={primaryColor} floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glowColor" />
            <feComposite in="glowColor" in2="SourceGraphic" operator="over" />
          </filter>
          
          <clipPath id="serviceWindow">
            <rect x="30" y="250" width="700" height="400" rx="20" />
          </clipPath>
        </defs>
        
        {/* خلفية أساسية مع تأثيرات متحركة */}
        <rect width="100%" height="100%" fill="url(#gridGradient)">
          <animate 
            attributeName="opacity" 
            values="0.8;0.3;0.8" 
            dur="8s" 
            repeatCount="indefinite" 
          />
        </rect>
        <rect width="100%" height="100%" fill="url(#dots)" />
        
        {/* تأثير وهج متحرك */}
        <FadingElement>
          <circle cx="960" cy="540" r="400" fill="url(#glowGradient)" opacity="0.2" />
        </FadingElement>
        
        {/* أشكال موجية متحركة في الخلفية */}
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <MorphingPath 
              key={`wave-${i}`}
              d="M0,800 Q480,700 960,800 T1920,700" 
              fill="none" 
              stroke={i % 2 === 0 ? primaryColor : secondaryColor}
              strokeWidth="2"
              opacity="0.2"
              transform={`translate(0, ${i * 50})`}
            />
          ))}
        </g>
        
        {/* خطوط شبكية في الخلفية مع حركة */}
        <g opacity="0.2">
          {Array.from({ length: 10 }).map((_, i) => (
            <DashingPath 
              key={`horizontal-${i}`}
              d={`M0,${i * 120} L1920,${i * 120}`}
              stroke={accentColor}
              strokeWidth="1"
              fill="none"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <DashingPath 
              key={`vertical-${i}`}
              d={`M${i * 200},0 L${i * 200},1080`}
              stroke={primaryColor}
              strokeWidth="1"
              fill="none"
            />
          ))}
        </g>
        
        {/* نافذة متوهجة تحتضن عناصر الخدمات */}
        <g clipPath="url(#serviceWindow)">
          <rect x="30" y="250" width="700" height="400" rx="20" fill={darkColor} opacity="0.1" />
          
          {/* تأثير ضوئي متحرك في داخل النافذة */}
          <CircleMotionElement>
            <circle cx="380" cy="450" r="180" fill={primaryColor} opacity="0.05" />
          </CircleMotionElement>
          
          <DiagonalElement>
            <circle cx="380" cy="450" r="120" fill={secondaryColor} opacity="0.05" />
          </DiagonalElement>
          
          {/* أشكال مميزة ومتنوعة تمثل الخدمات المختلفة */}
          <WavingElement>
            <rect x="100" y="300" width="200" height="150" rx="20" fill={primaryColor} opacity="0.3" />
            <rect x="450" y="300" width="200" height="150" rx="20" fill={secondaryColor} opacity="0.3" />
          </WavingElement>
          
          <DiagonalElement>
            <rect x="280" y="500" width="200" height="150" rx="20" fill={accentColor} opacity="0.3" />
          </DiagonalElement>
        </g>
        
        {/* حواف متوهجة حول نافذة الخدمات */}
        <GlowingElement>
          <rect 
            x="30" y="250" width="700" height="400" 
            rx="20" 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth="3"
            opacity="0.7"
            filter="url(#neon)"
          />
        </GlowingElement>
          
        {/* عرض الخدمات بنفس ترتيب ظهورها في الصفحة مع تنسيق مناسب */}
        <g transform="translate(1300, 300)">
          {/* تمثيل خدمات الشركة الستة بنفس الترتيب الظاهر في الصفحة */}
          
          {/* الخدمة الأولى - Service 1 */}
          <FloatingElement>
            <g transform="translate(-1000, 0)">
              <g style={{ transform: 'scaleX(-1)' }}>
                <rect width="140" height="100" rx="10" fill={primaryColor} opacity="0.8" filter="url(#glow)" />
                
                {/* إطار مضيء حول البطاقة */}
                <rect width="140" height="100" rx="10" fill="none" stroke={lightColor} strokeWidth="1" opacity="0.3" />
                
                {/* شريط عنوان في أعلى البطاقة */}
                <rect x="0" y="0" width="140" height="30" rx="10 10 0 0" fill={darkColor} opacity="0.5" />
                
                {/* نص العنوان داخل الشريط */}
                <text 
                  x="70" 
                  y="20" 
                  textAnchor="middle" 
                  fill={lightColor} 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  Service 1
                </text>
                
                {/* رمز تصميم الويب داخل منطقة المحتوى */}
                <path d="M50,60 L90,60 M50,70 L90,70 M50,80 L70,80" stroke={lightColor} strokeWidth="2" />
              </g>
            </g>
          </FloatingElement>
          
          {/* الخدمة الثانية - Service 2 */}
          <DiagonalElement>
            <g transform="translate(-800, 50)">
              <g style={{ transform: 'scaleX(-1)' }}>
                <rect width="140" height="100" rx="10" fill={secondaryColor} opacity="0.8" filter="url(#glow)" />
                
                {/* إطار مضيء حول البطاقة */}
                <rect width="140" height="100" rx="10" fill="none" stroke={lightColor} strokeWidth="1" opacity="0.3" />
                
                {/* شريط عنوان في أعلى البطاقة */}
                <rect x="0" y="0" width="140" height="30" rx="10 10 0 0" fill={darkColor} opacity="0.5" />
                
                {/* نص العنوان داخل الشريط */}
                <text 
                  x="70" 
                  y="20" 
                  textAnchor="middle" 
                  fill={lightColor} 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  Service 2
                </text>
                
                {/* رمز تسويق رقمي داخل منطقة المحتوى */}
                <polygon points="70,65 50,85 90,85" fill="none" stroke={lightColor} strokeWidth="2" />
              </g>
            </g>
          </DiagonalElement>
          
          {/* الخدمة الثالثة - Service 3 */}
          <CircleMotionElement>
            <g transform="translate(-600, 0)">
              <g style={{ transform: 'scaleX(-1)' }}>
                <rect width="140" height="100" rx="20" fill={accentColor} opacity="0.8" filter="url(#glow)" />
                
                {/* إطار مضيء حول البطاقة */}
                <rect width="140" height="100" rx="20" fill="none" stroke={lightColor} strokeWidth="1" opacity="0.3" />
                
                {/* شريط عنوان في أعلى البطاقة */}
                <rect x="0" y="0" width="140" height="30" rx="20 20 0 0" fill={darkColor} opacity="0.5" />
                
                {/* نص العنوان داخل الشريط */}
                <text 
                  x="70" 
                  y="20" 
                  textAnchor="middle" 
                  fill={lightColor} 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  Service 3
                </text>
                
                {/* رمز تحليلات البيانات داخل منطقة المحتوى */}
                <path d="M50,75 L60,60 L70,70 L80,50 L90,65" fill="none" stroke={lightColor} strokeWidth="2" />
              </g>
            </g>
          </CircleMotionElement>
          
          {/* الخدمة الرابعة - Service 4 */}
          <WavingElement>
            <g transform="translate(-1000, 150)">
              <g style={{ transform: 'scaleX(-1)' }}>
                <rect width="140" height="100" rx="0" fill={primaryColor} opacity="0.8" filter="url(#glow)" />
                
                {/* إطار مضيء حول البطاقة */}
                <rect width="140" height="100" rx="0" fill="none" stroke={lightColor} strokeWidth="1" opacity="0.3" />
                
                {/* شريط عنوان في أعلى البطاقة */}
                <rect x="0" y="0" width="140" height="30" rx="0" fill={darkColor} opacity="0.5" />
                
                {/* نص العنوان داخل الشريط */}
                <text 
                  x="70" 
                  y="20" 
                  textAnchor="middle" 
                  fill={lightColor} 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  Service 4
                </text>
                
                {/* رمز الاستراتيجية داخل منطقة المحتوى */}
                <circle cx="70" cy="65" r="15" fill="none" stroke={lightColor} strokeWidth="2" />
                <line x1="70" y1="50" x2="70" y2="80" stroke={lightColor} strokeWidth="2" />
                <line x1="55" y1="65" x2="85" y2="65" stroke={lightColor} strokeWidth="2" />
              </g>
            </g>
          </WavingElement>
          
          {/* الخدمة الخامسة - Service 5 */}
          <DiagonalElement>
            <g transform="translate(-800, 200)">
              <g style={{ transform: 'scaleX(-1)' }}>
                <rect width="140" height="100" rx="0" fill={secondaryColor} opacity="0.8" filter="url(#glow)" />
                
                {/* إطار مضيء حول البطاقة */}
                <rect width="140" height="100" rx="0" fill="none" stroke={lightColor} strokeWidth="1" opacity="0.3" />
                
                {/* شريط عنوان في أعلى البطاقة */}
                <rect x="0" y="0" width="140" height="30" rx="0" fill={darkColor} opacity="0.5" />
                
                {/* نص العنوان داخل الشريط */}
                <text 
                  x="70" 
                  y="20" 
                  textAnchor="middle" 
                  fill={lightColor} 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  Service 5
                </text>
                
                {/* رمز التطوير داخل منطقة المحتوى */}
                <rect x="55" y="60" width="30" height="20" fill="none" stroke={lightColor} strokeWidth="2" />
                <path d="M55,60 L70,50 L85,60" fill="none" stroke={lightColor} strokeWidth="2" />
              </g>
            </g>
          </DiagonalElement>
          
          {/* الخدمة السادسة - Service 6 */}
          <FloatingElement>
            <g transform="translate(-600, 150)">
              <g style={{ transform: 'scaleX(-1)' }}>
                <rect width="140" height="100" rx="10" fill={accentColor} opacity="0.8" filter="url(#glow)" />
                
                {/* إطار مضيء حول البطاقة */}
                <rect width="140" height="100" rx="10" fill="none" stroke={lightColor} strokeWidth="1" opacity="0.3" />
                
                {/* شريط عنوان في أعلى البطاقة */}
                <rect x="0" y="0" width="140" height="30" rx="10 10 0 0" fill={darkColor} opacity="0.5" />
                
                {/* نص العنوان داخل الشريط */}
                <text 
                  x="70" 
                  y="20" 
                  textAnchor="middle" 
                  fill={lightColor} 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  Service 6
                </text>
                
                {/* رمز الدعم داخل منطقة المحتوى */}
                <circle cx="60" cy="65" r="10" fill="none" stroke={lightColor} strokeWidth="2" />
                <circle cx="80" cy="65" r="10" fill="none" stroke={lightColor} strokeWidth="2" />
                <path d="M50,55 C60,45 80,45 90,55" fill="none" stroke={lightColor} strokeWidth="2" />
              </g>
            </g>
          </FloatingElement>
          
          {/* خطوط توصيل بين الخدمات تعبر عن التكامل */}
          <DashingPath 
            d="M-930,50 L-730,100 L-530,50 M-930,150 L-730,200 L-530,200" 
            fill="none" 
            stroke={lightColor} 
            strokeWidth="1.5" 
            opacity="0.5"
          />
          
          {/* دائرة مركزية توضح تكامل الخدمات */}
          <RotatingElement>
            <circle cx="-750" cy="125" r="180" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="-750" cy="125" r="150" stroke={secondaryColor} strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="-750" cy="125" r="120" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.2" />
          </RotatingElement>
        </g>
        
        {/* رموز تمثل أنواع الخدمات مع حركات مختلفة */}
        <FloatingElement>
          <g transform="translate(400, 300)">
            <rect x="0" y="0" width="120" height="80" rx="10" fill={primaryColor} opacity="0.6" />
            <rect x="10" y="15" width="100" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="35" width="80" height="10" rx="5" fill={lightColor} opacity="0.6" />
            <rect x="10" y="55" width="60" height="10" rx="5" fill={lightColor} opacity="0.6" />
          </g>
        </FloatingElement>
        
        {/* كرات متوهجة متحركة */}
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <circle 
              key={`ball-${i}`}
              cx={500 + i * 150} 
              cy={900}
              r="15" 
              fill={i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor}
              opacity="0.7"
              filter="url(#glow)"
            >
              <animate 
                attributeName="cy" 
                values="900;850;900" 
                dur={`${2 + i * 0.5}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          ))}
        </g>
        
        {/* نقاط متحركة عشوائية في أنحاء الصفحة */}
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

export default ServicesHeroSVG;
