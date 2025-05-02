import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MarketingTechSVG from '../components/MarketingTechSVG';
import AboutSVG from '../components/AboutSVG';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  50% { border-color: transparent }
`;

const HomeContainer = styled.div`
  position: relative;
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 120px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const HeroContent = styled.div`
  max-width: 750px;
  background: transparent;
  border-radius: 20px;
  padding: 50px;
  position: relative;
  animation: ${fadeInUp} 1s ease-out;
  
  @media (max-width: 768px) {
    padding: 40px 25px;
  }
`;

const HeroTag = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 30px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  font-size: 3.8rem;
  line-height: 1.2;
  margin-bottom: 20px;
  font-weight: 800;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.background === '#000000' ? 'white' : 'black'};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &::after {
    content: '';
    display: inline-block;
    background: ${({ theme }) => theme.primary};
    width: 100px;
    height: 4px;
    margin-top: 20px;
    border-radius: 2px;
  }
  
  .gradient-text {
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline;
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.15));
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TypewriterText = styled.div`
  overflow: hidden;
  border-right: 3px solid ${({ theme }) => theme.primary};
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin: 30px 0;
  width: 100%;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  animation: 
    ${typing} 3.5s steps(40, end),
    ${blink} 0.75s step-end infinite;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 35px;
  color: ${({ theme }) => theme.background === '#000000' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)'};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-25deg);
    transition: all 0.75s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    
    &:before {
      width: 100%;
      left: 100%;
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: ${({ theme }) => theme.background === '#000000' ? 'white' : theme.primary};
  border: 2px solid ${({ theme }) => theme.background === '#000000' ? 'white' : theme.primary};
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const Section = styled.section`
  padding: 100px 0;
  position: relative;
  background: ${({ theme }) => theme.background};
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  position: relative;
  margin-bottom: 60px;
  text-align: center;
  color: ${({ theme }) => theme.heading};
  font-weight: 700;
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const SectionIntro = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  color: ${({ theme }) => theme.text};
  line-height: 1.8;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    transition: ${({ theme }) => theme.transition};
  }
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
  
  &:hover:before {
    height: 100%;
    opacity: 0.05;
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  transition: ${({ theme }) => theme.transition};
  
  ${ServiceCard}:hover & {
    transform: scale(1.2) rotate(5deg);
    color: ${({ theme }) => theme.secondary};
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.heading};
  transition: ${({ theme }) => theme.transition};
  
  ${ServiceCard}:hover & {
    color: ${({ theme }) => theme.primary};
  }
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ServiceButton = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  position: relative;
  transition: ${({ theme }) => theme.transition};
  text-decoration: none;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.secondary};
    transition: ${({ theme }) => theme.transition};
  }
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
    
    &:after {
      width: 100%;
    }
  }
`;

const ClientsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ClientLogo = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 100px;
  transition: ${({ theme }) => theme.transition};
  border: 1px solid ${({ theme }) => theme.border};
  
  span {
    font-size: 1.2rem;
    font-weight: bold;
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: ${({ theme }) => theme.transition};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  
  &:before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 5rem;
    color: ${({ theme }) => theme.primary};
    opacity: 0.1;
    font-family: serif;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const TestimonialText = styled.blockquote`
  margin: 0 0 30px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  
  strong {
    color: ${({ theme }) => theme.primary};
    opacity: 1;
  }
`;

const CTASection = styled.section`
  padding: 100px 0;
  background: ${({ theme }) => theme.gradient};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  * {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const CTATitle = styled.h2`
  font-size: 3.2rem;
  margin-bottom: 30px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 3s infinite;
  font-weight: 700;
`;

const CTAText = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.7;
  color: white;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${({ theme }) => theme.primary};
  padding: 18px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.9);
  }
`;

const AboutContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 60px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutSVGWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 400px;
  background: transparent;
  
  @media (max-width: 768px) {
    height: 350px;
    margin-bottom: 20px;
  }
`;

const AboutText = styled.div`
  flex: 1;
  
  h2 {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.heading};
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background: ${({ theme }) => theme.gradient};
      border-radius: 2px;
    }
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.text};
    margin-bottom: 2rem;
    position: relative;
    padding-left: 1rem;
    border-left: 3px solid ${({ theme }) => theme.background === '#000000' 
      ? 'rgba(49, 106, 140, 0.5)' 
      : 'rgba(49, 106, 140, 0.2)'};
  }
`;

const AboutButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 14px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadow};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const Home = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  return (
    <HomeContainer>
      {/* Hero Section with SVG Background */}
      <HeroSection>
        <MarketingTechSVG opacity="1" />
        <ContentWrapper>
          <HeroContent>
            <HeroTag>Marketing & Technology</HeroTag>
            <HeroTitle>
              <span className="gradient-text">Digital Marketing</span> Solutions for Your Business
            </HeroTitle>
            <TypewriterText>Grow Your Business With Us</TypewriterText>
            <HeroText>
              We help businesses grow through digital marketing strategies, SEO, social media, and web development. 
              Our tailored approaches drive results that matter for your success.
            </HeroText>
            <ButtonGroup>
              <PrimaryButton to="/contact">Get Started</PrimaryButton>
              <SecondaryButton to="/services">Explore Services</SecondaryButton>
            </ButtonGroup>
          </HeroContent>
        </ContentWrapper>
      </HeroSection>
      
      {/* About Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('home.about.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up">
          {t('home.about.intro')}
        </SectionIntro>
        <AboutContent>
          <AboutSVGWrapper data-aos="fade-right">
            <AboutSVG />
          </AboutSVGWrapper>
          <AboutText data-aos="fade-left">
            <h2>{t('home.about.title')}</h2>
            <p>{t('home.about.text')}</p>
            <AboutButton to="/about">Learn More</AboutButton>
          </AboutText>
        </AboutContent>
      </Section>

      {/* Services Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('home.services.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up">
          {t('home.services.intro')}
        </SectionIntro>
        <ServicesGrid>
          <ServiceCard data-aos="fade-up" data-aos-delay="100">
            <ServiceIcon>
              <i className="fas fa-bullhorn"></i>
            </ServiceIcon>
            <ServiceTitle>{t('home.services.digital.title')}</ServiceTitle>
            <ServiceDescription>{t('home.services.digital.description')}</ServiceDescription>
            <ServiceButton to="/services/digital-marketing">Learn More</ServiceButton>
          </ServiceCard>
          
          <ServiceCard data-aos="fade-up" data-aos-delay="200">
            <ServiceIcon>
              <i className="fas fa-search"></i>
            </ServiceIcon>
            <ServiceTitle>{t('home.services.seo.title')}</ServiceTitle>
            <ServiceDescription>{t('home.services.seo.description')}</ServiceDescription>
            <ServiceButton to="/services/seo">Learn More</ServiceButton>
          </ServiceCard>
          
          <ServiceCard data-aos="fade-up" data-aos-delay="300">
            <ServiceIcon>
              <i className="fas fa-ad"></i>
            </ServiceIcon>
            <ServiceTitle>{t('home.services.ads.title')}</ServiceTitle>
            <ServiceDescription>{t('home.services.ads.description')}</ServiceDescription>
            <ServiceButton to="/services/ads">Learn More</ServiceButton>
          </ServiceCard>
          
          <ServiceCard data-aos="fade-up" data-aos-delay="400">
            <ServiceIcon>
              <i className="fas fa-laptop-code"></i>
            </ServiceIcon>
            <ServiceTitle>{t('home.services.web.title')}</ServiceTitle>
            <ServiceDescription>{t('home.services.web.description')}</ServiceDescription>
            <ServiceButton to="/services/web-development">Learn More</ServiceButton>
          </ServiceCard>
        </ServicesGrid>
      </Section>

      {/* Clients Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('home.clients.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up">
          Trusted by businesses of all sizes across various industries.
        </SectionIntro>
        <ClientsSection>
          <ClientLogo data-aos="zoom-in" data-aos-delay="100">
            <span>{t('home.clients.companyA')}</span>
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="200">
            <span>{t('home.clients.companyB')}</span>
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="300">
            <span>{t('home.clients.companyC')}</span>
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="400">
            <span>{t('home.clients.companyD')}</span>
          </ClientLogo>
        </ClientsSection>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('home.testimonials.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up">
          See what our clients say about our exceptional marketing services.
        </SectionIntro>
        <TestimonialGrid>
          <TestimonialCard data-aos="fade-up" data-aos-delay="100">
            <TestimonialText>"{t('home.testimonials.testimonial1.text')}"</TestimonialText>
            <TestimonialAuthor>
              <strong>{t('home.testimonials.testimonial1.author')}</strong> - {t('home.testimonials.testimonial1.position')}
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard data-aos="fade-up" data-aos-delay="200">
            <TestimonialText>"{t('home.testimonials.testimonial2.text')}"</TestimonialText>
            <TestimonialAuthor>
              <strong>{t('home.testimonials.testimonial2.author')}</strong> - {t('home.testimonials.testimonial2.position')}
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard data-aos="fade-up" data-aos-delay="300">
            <TestimonialText>"{t('home.testimonials.testimonial3.text')}"</TestimonialText>
            <TestimonialAuthor>
              <strong>{t('home.testimonials.testimonial3.author')}</strong> - {t('home.testimonials.testimonial3.position')}
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </Section>

      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in">
          <CTATitle>Ready to Boost Your Digital Presence?</CTATitle>
          <CTAText>Contact us today for a free consultation to see how we can help you achieve your digital marketing goals.</CTAText>
          <CTAButton to="/contact">Get Started</CTAButton>
        </div>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;
