import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutHeroSVG from '../components/AboutHeroSVG';
import CompanyStorySVG from '../components/CompanyStorySVG';
import { useTheme } from '../contexts/ThemeContext';

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

const AboutContainer = styled.div`
  padding-top: 0; /* تغيير من 80px إلى 0 لإزالة الفراغ */
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh; /* زيادة الارتفاع من 70vh إلى 100vh */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5% 0;
  background: transparent;
  color: white;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0 5% 0;
    text-align: center;
    min-height: 80vh; /* زيادة الارتفاع من 50vh إلى 80vh للشاشات الصغيرة */
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 2;
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  margin-top: 80px; /* إضافة هامش علوي ليتناسب مع ارتفاع شريط التنقل */
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff9966 0%, #ff7733 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.heroText || 'white'};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

const Section = styled.section`
  padding: 100px 5% 60px;
  background-color: ${props => props.background || props.theme.background};
  position: relative;
  overflow: hidden;
  margin-top: 50px; /* إضافة هامش علوي للأقسام */
  
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
    background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
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

const StoryContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StoryImage = styled.div`
  flex: 1;
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowDarker};
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const StoryText = styled.div`
  flex: 1;
  
  p {
    margin-bottom: 20px;
    line-height: 1.8;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamMember = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.borderColor || 'rgba(255, 255, 255, 0.1)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const MemberImage = styled.div`
  height: 280px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%);
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s ease;
  }
  
  ${TeamMember}:hover &:before {
    opacity: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${TeamMember}:hover & img {
    transform: scale(1.05);
  }
`;

const MemberSocial = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  
  ${TeamMember}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const MemberInfo = styled.div`
  padding: 25px;
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.heading};
`;

const MemberPosition = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 15px;
`;

const MemberBio = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const StatisticsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
`;

const StatTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 10px;
`;

const StatDescription = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ValueCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  border-top: 4px solid ${({ theme }) => theme.primary};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const ValueIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
  transition: all 0.3s ease;
  
  ${ValueCard}:hover & {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.heading};
`;

const ValueDescription = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const ClientsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ClientLogo = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  img {
    max-width: 100%;
    max-height: 80%;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
    
    img {
      transform: scale(1.05);
    }
  }
`;

const CTASection = styled.section`
  padding: 80px 5% 60px;
  background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius || '0px'} ${({ theme }) => theme.borderRadius || '0px'} 0 0;
  margin-top: 40px;
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

const About = () => {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      position: 'CEO & Founder',
      bio: 'Digital marketing expert with over 10 years of experience leading successful campaigns.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: 2,
      name: 'Jane Doe',
      position: 'Creative Director',
      bio: 'Award-winning creative director with a passion for innovative design solutions.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: 3,
      name: 'Bob Smith',
      position: 'Technical Director',
      bio: 'Highly skilled technical director with expertise in web development and software engineering.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: 4,
      name: 'Alice Johnson',
      position: 'SEO Specialist',
      bio: 'Results-driven SEO specialist with a proven track record of improving website rankings and driving organic traffic.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    }
  ];
  
  return (
    <AboutContainer>
      <HeroSection>
        <AboutHeroSVG isDarkMode={isDarkMode} />
        <HeroContent data-aos="fade-up">
          <HeroTitle>{t('about.hero.title', 'About Our Company')}</HeroTitle>
          <HeroText>
            {t('about.hero.subtitle', 'Discover our story, our mission, and the passionate team behind our success')}
          </HeroText>
        </HeroContent>
      </HeroSection>
      
      {/* Our Story Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.story.title', 'Our Story')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          {t('about.story.intro', 'From humble beginnings to industry leadership - the journey that defines who we are today.')}
        </SectionIntro>
        <StoryContent>
          <StoryText data-aos="fade-right">
            <p>
              Founded in 2010, our company began with a simple mission: to help businesses navigate the complex digital landscape and achieve meaningful growth. What started as a small team of passionate marketers has grown into a full-service digital agency trusted by clients worldwide.
            </p>
            <p>
              Over the years, we've expanded our services, refined our expertise, and built a team of dedicated professionals who share our commitment to excellence. Through continuous innovation and a client-first approach, we've established ourselves as industry leaders known for delivering results.
            </p>
            <p>
              Today, we're proud to have served over 500 clients across various industries, helping them transform their digital presence and achieve their business goals. Our journey continues as we embrace new technologies and methodologies to provide cutting-edge solutions for our clients.
            </p>
          </StoryText>
          <StoryImage data-aos="fade-left">
            <CompanyStorySVG isDarkMode={isDarkMode} />
          </StoryImage>
        </StoryContent>
      </Section>
      
      {/* Our Values Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.values.title', 'Our Values')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          These core principles guide everything we do and define our approach to business.
        </SectionIntro>
        <ValuesGrid>
          <ValueCard data-aos="fade-up" data-aos-delay="200">
            <ValueIcon>
              <i className="fas fa-lightbulb"></i>
            </ValueIcon>
            <ValueTitle>Innovation</ValueTitle>
            <ValueDescription>We're constantly exploring new ideas and technologies to provide cutting-edge solutions for our clients.</ValueDescription>
          </ValueCard>
          
          <ValueCard data-aos="fade-up" data-aos-delay="300">
            <ValueIcon>
              <i className="fas fa-handshake"></i>
            </ValueIcon>
            <ValueTitle>Integrity</ValueTitle>
            <ValueDescription>We believe in transparency, honesty, and ethical practices in all our business dealings.</ValueDescription>
          </ValueCard>
          
          <ValueCard data-aos="fade-up" data-aos-delay="400">
            <ValueIcon>
              <i className="fas fa-chart-line"></i>
            </ValueIcon>
            <ValueTitle>Results-Driven</ValueTitle>
            <ValueDescription>We focus on delivering measurable results and ROI for every client project we undertake.</ValueDescription>
          </ValueCard>
          
          <ValueCard data-aos="fade-up" data-aos-delay="500">
            <ValueIcon>
              <i className="fas fa-users"></i>
            </ValueIcon>
            <ValueTitle>Collaboration</ValueTitle>
            <ValueDescription>We work closely with our clients, fostering partnerships that lead to shared success.</ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </Section>
      
      {/* Statistics Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.stats.title', 'Statistics')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          Numbers that speak volumes about our success and growth over the years.
        </SectionIntro>
        <StatisticsSection>
          <StatItem data-aos="fade-up" data-aos-delay="200">
            <StatNumber>500+</StatNumber>
            <StatTitle>Clients Served</StatTitle>
            <StatDescription>Businesses that have achieved their marketing goals with our help</StatDescription>
          </StatItem>
          
          <StatItem data-aos="fade-up" data-aos-delay="300">
            <StatNumber>1200+</StatNumber>
            <StatTitle>Projects Completed</StatTitle>
            <StatDescription>Successful marketing campaigns and website implementations</StatDescription>
          </StatItem>
          
          <StatItem data-aos="fade-up" data-aos-delay="400">
            <StatNumber>10+</StatNumber>
            <StatTitle>Years Experience</StatTitle>
            <StatDescription>Over a decade of expertise in digital marketing and web development</StatDescription>
          </StatItem>
          
          <StatItem data-aos="fade-up" data-aos-delay="500">
            <StatNumber>25+</StatNumber>
            <StatTitle>Team Members</StatTitle>
            <StatDescription>Skilled professionals dedicated to your success</StatDescription>
          </StatItem>
        </StatisticsSection>
      </Section>
      
      {/* Team Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.team.title', 'Our Team')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          Meet the talented professionals behind our success.
        </SectionIntro>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember key={member.id} data-aos="fade-up" data-aos-delay={100 + (index * 50)}>
              <MemberImage>
                <img src={member.image} alt={member.name} />
                <MemberSocial>
                  <SocialLink href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </SocialLink>
                  <SocialLink href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </SocialLink>
                  <SocialLink href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </SocialLink>
                </MemberSocial>
              </MemberImage>
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberPosition>{member.position}</MemberPosition>
                <MemberBio>{member.bio}</MemberBio>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid>
      </Section>
      
      {/* Clients Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.clients.title', 'Our Clients')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          Trusted by leading businesses across various industries.
        </SectionIntro>
        <ClientsGrid>
          <ClientLogo data-aos="zoom-in" data-aos-delay="100">
            <span>Company A</span>
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="200">
            <span>Company B</span>
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="300">
            <span>Company C</span>
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="400">
            <span>Company D</span>
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="500">
            <span>Company E</span>
          </ClientLogo>
        </ClientsGrid>
      </Section>
      
      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in">
          <CTATitle>Ready to Work With Us?</CTATitle>
          <CTAText>Contact our team today to discuss your project and how we can help you achieve your digital marketing goals.</CTAText>
          <CTAButton to="/contact">Get in Touch</CTAButton>
        </div>
      </CTASection>
    </AboutContainer>
  );
};

export default About;
