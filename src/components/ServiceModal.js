import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaTimes, FaCheck, FaArrowRight, FaCog, FaChartLine } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(66, 153, 225, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 0;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundSecondary};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  overflow: hidden;
  height: 250px;
  border-radius: 20px 20px 0 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradient};
    opacity: 0.7;
    z-index: 1;
  }
`;

const ModalTitle = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 30px;
  color: white;
  font-size: 2.5rem;
  margin: 0;
  z-index: 2;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ModalBody = styled.div`
  padding: 30px;
  color: ${({ theme }) => theme.text};
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.2s forwards;
`;

const ProcessTitle = styled.h3`
  font-size: 1.8rem;
  margin: 40px 0 20px;
  color: ${({ theme }) => theme.heading};
  position: relative;
  padding-left: 20px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.3s forwards;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 25px;
    background: ${({ theme }) => theme.gradient};
    border-radius: 5px;
  }
`;

const StepsList = styled.div`
  margin: 30px 0;
`;

const Step = styled.div`
  display: flex;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px dashed ${({ theme }) => theme.backgroundSecondary};
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out ${({ delay }) => delay}s forwards;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 20px;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 1.3rem;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.heading};
`;

const StepDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.4s forwards;
`;

const Feature = styled.div`
  background: ${({ theme }) => theme.backgroundSecondary};
  padding: 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.5rem;
    margin-right: 15px;
  }
`;

const ContactButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: none;
  color: white;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto 20px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out 0.5s forwards;
  
  svg {
    margin-left: 10px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    svg {
      transform: translateX(5px);
    }
  }
`;

const SpinningGear = styled(FaCog)`
  animation: ${rotate} 5s linear infinite;
  color: ${({ theme }) => theme.secondary};
`;

const ServiceModal = ({ isOpen, onClose, service }) => {
  // Disable body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Sample process steps for each service
  const processSteps = [
    {
      title: 'Initial Consultation',
      description: 'Detailed meeting to understand your specific needs and business objectives.'
    },
    {
      title: 'Custom Proposal',
      description: 'Development of a strategic plan tailored to your requirements and budget.'
    },
    {
      title: 'Implementation',
      description: 'Professional execution of the plan with constant updates and adjustments as needed.'
    },
    {
      title: 'Evaluation & Optimization',
      description: 'Analysis of results and continuous refinement to maximize performance.'
    }
  ];
  
  // Sample features for each service
  const features = [
    'Personalized Attention',
    'Ongoing Technical Support',
    'Detailed Reports',
    'Cutting-edge Technology'
  ];
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <ModalHeader>
          <img src={service.image} alt={service.title} />
          <ModalTitle>{service.title}</ModalTitle>
        </ModalHeader>
        
        <ModalBody>
          <ServiceDescription>
            {service.description} 
            Our team of experts works with the latest technologies and methodologies to ensure exceptional results that exceed your expectations.
          </ServiceDescription>
          
          <ProcessTitle>Our Process</ProcessTitle>
          
          <StepsList>
            {processSteps.map((step, index) => (
              <Step key={index} delay={0.5 + (index * 0.1)}>
                <StepNumber>{index + 1}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </Step>
            ))}
          </StepsList>
          
          <ProcessTitle>Features</ProcessTitle>
          
          <FeaturesList>
            {features.map((feature, index) => (
              <Feature key={index}>
                {index % 2 === 0 ? <SpinningGear /> : <FaCheck />}
                <span>{feature}</span>
              </Feature>
            ))}
          </FeaturesList>
          
          <ContactButton onClick={() => window.location.href = '/contact'}>
            Request this service <FaArrowRight />
          </ContactButton>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ServiceModal;
