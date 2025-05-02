import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServicesHeroSVG from '../components/ServicesHeroSVG';
import { useTheme } from '../contexts/ThemeContext';
import ServiceModal from '../components/ServiceModal';

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ServicesContainer = styled.div`
  padding-top: 0; /* تغيير من 80px إلى 0 لإزالة الفراغ */
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 80vh; /* ليست 100vh كما في صفحة About */
  display: flex;
  align-items: flex-start; /* بداية من الأعلى بدلاً من المنتصف */
  justify-content: flex-start; /* محاذاة للجانب بدلاً من المنتصف */
  padding: 120px 5% 0; /* هامش علوي أكبر */
  background: transparent;
  overflow: hidden;
  
  &:before {
    content: none;
  }

  @media (max-width: 768px) {
    padding: 100px 5% 0;
    text-align: center;
    min-height: 70vh;
    align-items: center;
    justify-content: center;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  width: 50%;
  position: relative;
  z-index: 2;
  text-align: left;
  animation: ${fadeInUp} 1s ease-out;
  background: transparent;
  padding: 40px;
  border-radius: 20px 0 0 20px;
  box-shadow: none;
  margin-left: 0;
  border-right: none;
  border-left: none;
  
  @media (max-width: 768px) {
    width: 90%;
    text-align: center;
    margin: 0 auto;
    border-radius: 0;
    border-right: none;
    border-top: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
`;

const Section = styled.section`
  padding: 100px 5%;
  background-color: ${props => props.background || props.theme.background};
  position: relative;
  margin-top: 50px;
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  position: relative;
  margin-bottom: 60px;
  text-align: center;
  color: ${({ theme }) => theme.heading};
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const SectionIntro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.text};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme, variant }) => 
    variant === 'rounded' ? '20px' : 
    variant === 'sharp' ? '0px' : 
    theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: ${({ theme, variant }) => 
    variant === 'bordered' ? `2px solid ${theme.border}` : 
    variant === 'accent' ? `2px solid ${theme.primary}` : 
    'none'};
  
  ${({ variant, theme }) => variant === 'accent' && `
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: ${theme.gradient};
    }
  `}
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const ServiceImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradient};
    opacity: 0.3;
    z-index: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  &:hover:before {
    opacity: 0.1;
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ServiceCard}:hover & img {
    transform: scale(1.1) rotate(2deg);
  }
`;

const ServiceContent = styled.div`
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.heading};
  position: relative;
  padding-bottom: 15px;
  transition: transform 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
    bottom: 0;
    left: 0;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  ${ServiceCard}:hover &:after {
    width: 75px;
  }
  
  ${ServiceCard}:hover & {
    transform: translateX(5px);
  }
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.8;
  margin-bottom: 20px;
  flex: 1;
`;

const ServiceButton = styled.button`
  display: inline-block;
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 12px 25px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  i {
    margin-left: 10px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    i {
      transform: translateX(5px);
    }
  }
`;

const ProcessSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 50px;
  
  &:before {
    content: '';
    position: absolute;
    top: 50px;
    left: 15%;
    right: 15%;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    &:before {
      display: none;
    }
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StepNumber = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 20px;
  box-shadow: ${({ theme }) => theme.shadowDarker};
  position: relative;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const StepTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.heading};
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const PricingSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PricingCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: ${({ theme }) => theme.transition};
  text-align: center;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
  
  ${props => props.featured && `
    border: 2px solid ${props.theme.primary};
    transform: scale(1.05);
    z-index: 2;
    
    &:hover {
      transform: scale(1.05) translateY(-10px);
    }
    
    @media (max-width: 768px) {
      transform: scale(1);
      
      &:hover {
        transform: translateY(-10px);
      }
    }
  `}
`;

const PricingHeader = styled.div`
  padding: 30px;
  background: ${props => props.featured ? props.theme.gradient : 'transparent'};
  color: ${props => props.featured ? 'white' : props.theme.heading};
`;

const PricingTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const PricingPrice = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 20px 0;
  
  span {
    font-size: 1rem;
    font-weight: normal;
    opacity: 0.8;
  }
`;

const PricingBody = styled.div`
  padding: 30px;
`;

const PricingFeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 30px 0;
  text-align: left;
`;

const PricingFeature = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: '✓';
    color: ${({ theme }) => theme.primary};
    margin-right: 10px;
    font-weight: bold;
  }
  
  ${props => props.excluded && `
    opacity: 0.5;
    text-decoration: line-through;
    
    &:before {
      content: '✕';
      color: #ff6b6b;
    }
  `}
`;

const PricingButton = styled(Link)`
  display: inline-block;
  background: ${props => props.featured ? 'white' : props.theme.gradient};
  color: ${props => props.featured ? props.theme.primary : 'white'};
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const FeaturedLabel = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${({ theme }) => theme.secondary};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 3;
`;

const CTASection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.gradient};
  color: white;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${({ theme }) => theme.primary};
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Services = () => {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  // Estado para la ventana modal
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Función para abrir el modal con el servicio seleccionado
  const openServiceModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  
  // Función para cerrar el modal
  const closeServiceModal = () => {
    setIsModalOpen(false);
    // Pequeño retraso antes de eliminar los datos del servicio para permitir que la animación de cierre se complete
    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  };
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  // Sample services data
  const services = [
    {
      id: 1,
      title: t('services.service1.title', 'Web Development'),
      description: t('services.service1.description', 'We create custom, attractive websites that perfectly represent your brand and engage your target audience.'),
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'default'
    },
    {
      id: 2,
      title: t('services.service2.title', 'Digital Marketing'),
      description: t('services.service2.description', 'Integrated digital marketing strategies that maximize your online presence and generate tangible results.'),
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'accent'
    },
    {
      id: 3,
      title: t('services.service3.title', 'SEO & SEM'),
      description: t('services.service3.description', 'We optimize your search engine visibility to attract quality traffic and convert visitors into customers.'),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'rounded'
    },
    {
      id: 4,
      title: t('services.service4.title', 'UX/UI Design'),
      description: t('services.service4.description', 'Intuitive and attractive user experiences that improve customer satisfaction and engagement.'),
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'bordered'
    },
    {
      id: 5,
      title: t('services.service5.title', 'Digital Consulting'),
      description: t('services.service5.description', 'Strategic advice on digital transformation to drive efficiency and growth for your business.'),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'sharp'
    },
    {
      id: 6,
      title: t('services.service6.title', 'Data Analytics'),
      description: t('services.service6.description', 'Advanced data analysis to gain valuable insights that inform your business decisions.'),
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'default'
    },
    {
      id: 7,
      title: t('services.service7.title', 'Content Creation'),
      description: t('services.service7.description', 'Engaging and valuable content that resonates with your audience and builds your brand authority.'),
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'accent'
    },
    {
      id: 8,
      title: t('services.service8.title', 'Social Media Management'),
      description: t('services.service8.description', 'Strategic planning and management of your social media presence to build community and drive engagement.'),
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variant: 'rounded'
    }
  ];
  
  return (
    <ServicesContainer>
      {/* Hero Section */}
      <HeroSection>
        <ServicesHeroSVG isDarkMode={isDarkMode} />
        <HeroContent>
          <HeroTitle>{t('services.hero.title', 'Our Services')}</HeroTitle>
          <HeroText>
            {t('services.hero.description', 'Comprehensive digital marketing solutions to help your business grow and succeed in the digital landscape.')}
          </HeroText>
        </HeroContent>
      </HeroSection>
      
      {/* Services Section */}
      <Section>
        <SectionTitle>{t('services.title')}</SectionTitle>
        <SectionIntro>
          {t('services.intro')}
        </SectionIntro>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              variant={service.variant}
              data-aos="fade-up" 
              data-aos-delay={100 + (index * 50)}
            >
              <ServiceImageContainer>
                <img src={service.image} alt={service.title} />
              </ServiceImageContainer>
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceButton onClick={() => openServiceModal(service)}>
                  {t('services.learnMore')} <i className="fas fa-arrow-right"></i>
                </ServiceButton>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>
      
      {/* Process Section */}
      <Section>
        <SectionTitle>{t('services.process.title')}</SectionTitle>
        <SectionIntro>
          Our streamlined process ensures we deliver quality results on time, every time.
        </SectionIntro>
        <ProcessSection>
          <ProcessSteps>
            <ProcessStep data-aos="fade-up" data-aos-delay="200">
              <StepNumber>1</StepNumber>
              <StepTitle>{t('services.process.step1.title')}</StepTitle>
              <StepDescription>{t('services.process.step1.description')}</StepDescription>
            </ProcessStep>
            
            <ProcessStep data-aos="fade-up" data-aos-delay="300">
              <StepNumber>2</StepNumber>
              <StepTitle>{t('services.process.step2.title')}</StepTitle>
              <StepDescription>{t('services.process.step2.description')}</StepDescription>
            </ProcessStep>
            
            <ProcessStep data-aos="fade-up" data-aos-delay="400">
              <StepNumber>3</StepNumber>
              <StepTitle>{t('services.process.step3.title')}</StepTitle>
              <StepDescription>{t('services.process.step3.description')}</StepDescription>
            </ProcessStep>
            
            <ProcessStep data-aos="fade-up" data-aos-delay="500">
              <StepNumber>4</StepNumber>
              <StepTitle>{t('services.process.step4.title')}</StepTitle>
              <StepDescription>{t('services.process.step4.description')}</StepDescription>
            </ProcessStep>
          </ProcessSteps>
        </ProcessSection>
      </Section>
      
      {/* Pricing Section */}
      <Section>
        <SectionTitle>{t('services.pricing.title')}</SectionTitle>
        <SectionIntro>
          Transparent pricing options designed to fit businesses of all sizes.
        </SectionIntro>
        <PricingSection>
          <PricingContainer>
            <PricingCard data-aos="fade-up" data-aos-delay="200">
              <PricingHeader>
                <PricingTitle>{t('services.pricing.basic.title')}</PricingTitle>
                <PricingPrice>${t('services.pricing.basic.price')} <span>/ {t('services.pricing.month')}</span></PricingPrice>
              </PricingHeader>
              <PricingBody>
                <PricingFeatureList>
                  <PricingFeature>{t('services.pricing.basic.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.basic.feature2')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.basic.feature3')}</PricingFeature>
                  <PricingFeature excluded>{t('services.pricing.premium.feature1')}</PricingFeature>
                  <PricingFeature excluded>{t('services.pricing.premium.feature2')}</PricingFeature>
                </PricingFeatureList>
                <PricingButton to="/contact">{t('services.pricing.getStarted')}</PricingButton>
              </PricingBody>
            </PricingCard>
            
            <PricingCard featured data-aos="fade-up" data-aos-delay="300">
              <FeaturedLabel>Popular</FeaturedLabel>
              <PricingHeader featured>
                <PricingTitle>{t('services.pricing.standard.title')}</PricingTitle>
                <PricingPrice>${t('services.pricing.standard.price')} <span>/ {t('services.pricing.month')}</span></PricingPrice>
              </PricingHeader>
              <PricingBody>
                <PricingFeatureList>
                  <PricingFeature>{t('services.pricing.basic.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.basic.feature2')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.basic.feature3')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.standard.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.standard.feature2')}</PricingFeature>
                  <PricingFeature excluded>{t('services.pricing.premium.feature1')}</PricingFeature>
                </PricingFeatureList>
                <PricingButton featured to="/contact">{t('services.pricing.getStarted')}</PricingButton>
              </PricingBody>
            </PricingCard>
            
            <PricingCard data-aos="fade-up" data-aos-delay="400">
              <PricingHeader>
                <PricingTitle>{t('services.pricing.premium.title')}</PricingTitle>
                <PricingPrice>${t('services.pricing.premium.price')} <span>/ {t('services.pricing.month')}</span></PricingPrice>
              </PricingHeader>
              <PricingBody>
                <PricingFeatureList>
                  <PricingFeature>{t('services.pricing.basic.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.basic.feature2')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.basic.feature3')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.standard.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.standard.feature2')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.premium.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.pricing.premium.feature2')}</PricingFeature>
                </PricingFeatureList>
                <PricingButton to="/contact">{t('services.pricing.getStarted')}</PricingButton>
              </PricingBody>
            </PricingCard>
          </PricingContainer>
        </PricingSection>
      </Section>
      
      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in">
          <CTATitle>{t('services.cta.title')}</CTATitle>
          <CTAText>{t('services.cta.description')}</CTAText>
          <CTAButton to="/contact">{t('services.cta.button')}</CTAButton>
        </div>
      </CTASection>
      
      {/* Ventana modal para detalles del servicio */}
      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={closeServiceModal} 
        service={selectedService}
      />
    </ServicesContainer>
  );
};

export default Services;
