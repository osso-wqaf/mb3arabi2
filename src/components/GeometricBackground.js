import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const float2 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(20px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled components
const BackgroundContainer = styled.div`
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.height || '300px'};
  overflow: hidden;
  z-index: ${props => props.zIndex || '0'};
`;

const Shape = styled.div`
  position: absolute;
  background: ${props => props.color};
  opacity: ${props => props.opacity || 0.1};
  z-index: ${props => props.zIndex || '-1'};
  animation: ${props => props.animation === 'float' 
    ? float 
    : props.animation === 'float2' 
      ? float2 
      : props.animation === 'pulse'
        ? pulse
        : rotate} ${props => props.duration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  filter: blur(${props => props.blur || '0'}px);
  transform-origin: center;
`;

const Circle = styled(Shape)`
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`;

const Square = styled(Shape)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  transform: rotate(${props => props.rotate || '0'}deg);
`;

const Triangle = styled(Shape)`
  width: 0;
  height: 0;
  border-left: ${props => props.size / 2}px solid transparent;
  border-right: ${props => props.size / 2}px solid transparent;
  border-bottom: ${props => props.size}px solid ${props => props.color};
  background: transparent;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`;

const Donut = styled(Shape)`
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: ${props => props.thickness || 15}px solid ${props => props.color};
  background: transparent;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.gradient || 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'};
  z-index: -1;
`;

/**
 * GeometricBackground Component - Creates a vibrant background with animated geometric shapes
 * @param {Object} props - Component props
 * @param {string} props.mainColor - Primary color for shapes
 * @param {string} props.accentColor - Secondary color for shapes
 * @param {string} props.height - Height of the container
 * @param {boolean} props.absolute - Whether to position absolutely
 * @param {string} props.zIndex - z-index of the container
 * @param {boolean} props.dense - Whether to use more shapes for a denser pattern
 * @param {string} props.style - Theme style: 'modern', 'playful', 'minimal', 'tech'
 */
const GeometricBackground = ({ 
  mainColor = '#316a8c', 
  accentColor = '#ff9966', 
  height = '300px', 
  absolute = true,
  zIndex = '0',
  dense = false,
  style = 'modern'
}) => {
  // Different styles to choose from
  const renderShapes = () => {
    switch(style) {
      case 'playful':
        return (
          <>
            <Circle size={150} left={-5} top={10} color={mainColor} opacity={0.1} animation="float" duration="15s" />
            <Circle size={80} left={20} top={60} color={accentColor} opacity={0.15} animation="pulse" duration="7s" />
            <Circle size={60} left={80} top={20} color={mainColor} opacity={0.1} animation="float2" duration="10s" />
            <Circle size={40} left={70} top={70} color={accentColor} opacity={0.2} animation="pulse" duration="5s" />
            <Square size={100} left={60} top={0} color={mainColor} opacity={0.08} animation="float" duration="12s" rotate="45" />
            <Triangle size={120} left={30} top={30} color={accentColor} opacity={0.08} animation="float2" duration="20s" />
            <Donut size={200} left={80} top={60} color={mainColor} opacity={0.1} thickness={20} animation="rotate" duration="30s" />
            
            {dense && (
              <>
                <Circle size={100} left={10} top={30} color={accentColor} opacity={0.07} animation="float2" duration="13s" />
                <Square size={70} left={90} top={40} color={accentColor} opacity={0.1} animation="float" duration="8s" rotate="30" />
                <Triangle size={80} left={40} top={80} color={mainColor} opacity={0.06} animation="float" duration="18s" />
                <Donut size={150} left={5} top={70} color={accentColor} opacity={0.05} thickness={15} animation="rotate" duration="25s" delay="2s" />
              </>
            )}
          </>
        );
        
      case 'minimal':
        return (
          <>
            <Circle size={250} left={-10} top={-10} color={mainColor} opacity={0.04} blur={30} />
            <Circle size={200} left={70} top={60} color={accentColor} opacity={0.05} blur={20} />
            <Donut size={150} left={50} top={20} color={mainColor} opacity={0.06} thickness={8} animation="float" duration="20s" />
            
            {dense && (
              <>
                <Circle size={180} left={20} top={70} color={mainColor} opacity={0.03} blur={15} />
                <Donut size={120} left={75} top={15} color={accentColor} opacity={0.04} thickness={6} animation="float2" duration="25s" />
              </>
            )}
          </>
        );
        
      case 'tech':
        return (
          <>
            <Square size={150} left={-5} top={10} color={mainColor} opacity={0.1} animation="float" duration="15s" rotate="45" />
            <Square size={100} left={85} top={60} color={accentColor} opacity={0.15} animation="float2" duration="12s" rotate="30" />
            <Square size={80} left={40} top={-10} color={mainColor} opacity={0.08} animation="float" duration="18s" rotate="20" />
            <Square size={60} left={70} top={70} color={accentColor} opacity={0.12} animation="float2" duration="10s" rotate="60" />
            <Square size={40} left={20} top={60} color={mainColor} opacity={0.1} animation="float" duration="14s" rotate="10" />
            
            {dense && (
              <>
                <Square size={120} left={60} top={30} color={mainColor} opacity={0.05} animation="float2" duration="16s" rotate="15" />
                <Square size={90} left={10} top={80} color={accentColor} opacity={0.07} animation="float" duration="13s" rotate="25" />
                <Square size={70} left={50} top={50} color={mainColor} opacity={0.06} animation="float2" duration="20s" rotate="35" />
              </>
            )}
          </>
        );
        
      case 'modern':
      default:
        return (
          <>
            <Circle size={200} left={-5} top={-5} color={mainColor} opacity={0.08} animation="float" duration="15s" />
            <Circle size={150} left={70} top={60} color={accentColor} opacity={0.1} animation="float2" duration="12s" />
            <Square size={120} left={20} top={20} color={mainColor} opacity={0.07} animation="float" duration="18s" rotate="45" />
            <Square size={80} left={80} top={10} color={accentColor} opacity={0.09} animation="float2" duration="10s" rotate="30" />
            <Donut size={180} left={50} top={40} color={mainColor} opacity={0.06} thickness={12} animation="rotate" duration="30s" />
            
            {dense && (
              <>
                <Circle size={120} left={10} top={70} color={accentColor} opacity={0.05} animation="float2" duration="13s" />
                <Square size={100} left={60} top={80} color={mainColor} opacity={0.07} animation="float" duration="16s" rotate="20" />
                <Donut size={150} left={90} top={30} color={accentColor} opacity={0.04} thickness={10} animation="rotate" duration="25s" delay="5s" />
              </>
            )}
          </>
        );
    }
  };

  return (
    <BackgroundContainer height={height} absolute={absolute} zIndex={zIndex}>
      {renderShapes()}
      <Gradient gradient={`linear-gradient(135deg, ${mainColor}05 0%, ${accentColor}05 100%)`} />
    </BackgroundContainer>
  );
};

export default GeometricBackground;
