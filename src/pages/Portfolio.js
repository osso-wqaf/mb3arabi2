import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '../contexts/ThemeContext';
import { FaSearch, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import PortfolioHeroSVG from '../components/PortfolioHeroSVG';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding-top: 0;
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 120px 5% 0;
  overflow: hidden;
  
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
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: 60px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 40px 20px 60px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.heading};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionIntro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 30px auto 50px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
`;

// Search and Filter Components
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 24px 16px 50px;
  border-radius: 50px;
  border: 2px solid ${({ theme }) => theme.backgroundSecondary};
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SearchIconContainer = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
`;

const ClearButton = styled.button`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease;
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const FilterTab = styled.button`
  padding: 8px 20px;
  border-radius: 30px;
  border: 2px solid ${({ theme, active }) => active ? theme.primary : 'transparent'};
  background-color: ${({ theme, active }) => active ? 'rgba(66, 153, 225, 0.1)' : theme.backgroundSecondary};
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme, active }) => active ? 'rgba(66, 153, 225, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

// Portfolio Grid
const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 30px;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const ProjectImageContainer = styled.div`
  height: 250px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const ProjectCategory = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ProjectContent = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.heading};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSecondary};
  flex: 1;
`;

const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechBadge = styled.span`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ViewProjectButton = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-decoration: none;
  gap: 5px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(3px);
  }
`;

const EmptyResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.textSecondary};
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.heading};
  }
  
  p {
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const Portfolio = () => {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ui', name: 'UI/UX Design' },
    { id: 'branding', name: 'Branding' },
    { id: 'marketing', name: 'Marketing' }
  ];
  
  // Sample portfolio projects data
  const portfolioProjects = [
    {
      id: 1,
      title: 'E-commerce Website Redesign',
      description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      techStack: ['React', 'Node.js', 'MongoDB'],
      projectUrl: '#'
    },
    {
      id: 2,
      title: 'Fitness Tracking Mobile App',
      description: 'A mobile application that tracks workouts, nutrition, and provides personalized fitness plans.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'mobile',
      techStack: ['React Native', 'Firebase', 'Redux'],
      projectUrl: '#'
    },
    {
      id: 3,
      title: 'Corporate Brand Identity',
      description: 'Development of a comprehensive brand identity including logo, colors, typography, and brand guidelines.',
      image: 'https://images.unsplash.com/photo-1600177448550-e04c71cc5350?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'branding',
      techStack: ['Adobe CC', 'Figma'],
      projectUrl: '#'
    },
    {
      id: 4,
      title: 'Restaurant Ordering System',
      description: 'A digital menu and ordering system for a restaurant chain with real-time order tracking.',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      techStack: ['Angular', 'Express', 'Socket.io'],
      projectUrl: '#'
    },
    {
      id: 5,
      title: 'Financial Dashboard UI Design',
      description: 'User interface design for a financial analytics dashboard with data visualization components.',
      image: 'https://images.unsplash.com/photo-1579689227458-7063e8f1f70b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'ui',
      techStack: ['Figma', 'Adobe XD', 'Sketch'],
      projectUrl: '#'
    },
    {
      id: 6,
      title: 'Social Media Marketing Campaign',
      description: 'A multi-channel social media campaign that increased brand awareness and engagement by 40%.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'marketing',
      techStack: ['Hootsuite', 'Google Analytics', 'Facebook Ads'],
      projectUrl: '#'
    },
    {
      id: 7,
      title: 'Real Estate Property Listings',
      description: 'A web application for real estate agents to manage and showcase property listings with virtual tours.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      techStack: ['Vue.js', 'Laravel', 'MySQL'],
      projectUrl: '#'
    },
    {
      id: 8,
      title: 'Healthcare Patient Portal',
      description: 'A secure portal for patients to access medical records, schedule appointments, and communicate with healthcare providers.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'web',
      techStack: ['React', 'Express', 'PostgreSQL'],
      projectUrl: '#'
    },
    {
      id: 9,
      title: 'Mobile Banking App',
      description: 'A secure and user-friendly mobile banking application with biometric authentication and real-time transactions.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'mobile',
      techStack: ['Flutter', 'Firebase', 'REST API'],
      projectUrl: '#'
    }
  ];
  
  // Filter projects based on search term and category
  useEffect(() => {
    const results = portfolioProjects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProjects(results);
  }, [searchTerm, activeCategory]);
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
  };
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <PortfolioContainer>
      <HeroSection>
        <PortfolioHeroSVG isDarkMode={isDarkMode} />
        <HeroContent>
          <HeroTitle>{t('portfolio.hero.title', 'Our Portfolio')}</HeroTitle>
          <HeroText>
            {t('portfolio.hero.description', 'Explore our diverse collection of projects that showcase our expertise and innovation in digital solutions.')}
          </HeroText>
        </HeroContent>
      </HeroSection>
      
      <Section>
        <SectionTitle>{t('portfolio.title', 'Our Work')}</SectionTitle>
        <SectionIntro>
          {t('portfolio.intro', 'Browse through our portfolio of successful projects that demonstrate our capability to deliver outstanding results across various industries and technologies.')}
        </SectionIntro>
        
        <SearchContainer>
          <SearchBox>
            <SearchIconContainer>
              <FaSearch />
            </SearchIconContainer>
            <SearchInput 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <ClearButton 
              visible={searchTerm.length > 0} 
              onClick={clearSearch}
            >
              <FaTimes />
            </ClearButton>
          </SearchBox>
          
          <FilterTabs>
            {categories.map((category) => (
              <FilterTab
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </FilterTab>
            ))}
          </FilterTabs>
        </SearchContainer>
        
        {filteredProjects.length > 0 ? (
          <PortfolioGrid>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                data-aos="fade-up" 
                data-aos-delay={(project.id % 3) * 100}
              >
                <ProjectImageContainer>
                  <img src={project.image} alt={project.title} />
                  <ProjectCategory>
                    {categories.find(cat => cat.id === project.category)?.name}
                  </ProjectCategory>
                </ProjectImageContainer>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectFooter>
                    <TechStack>
                      {project.techStack.map((tech, index) => (
                        <TechBadge key={index}>{tech}</TechBadge>
                      ))}
                    </TechStack>
                    <ViewProjectButton href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      View <FaExternalLinkAlt size={14} />
                    </ViewProjectButton>
                  </ProjectFooter>
                </ProjectContent>
              </ProjectCard>
            ))}
          </PortfolioGrid>
        ) : (
          <EmptyResults>
            <h3>No projects found</h3>
            <p>Try adjusting your search or filter criteria to find what you're looking for.</p>
          </EmptyResults>
        )}
      </Section>
    </PortfolioContainer>
  );
};

export default Portfolio;
