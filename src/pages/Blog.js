import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlogContainer = styled.div`
  padding-top: 80px; /* For fixed navbar */
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 5%;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradient};
    opacity: 0.05;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 100px 5% 50px;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 2;
  text-align: center;
  animation: fadeIn 1s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
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
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
`;

const Section = styled.section`
  padding: 100px 5%;
  background-color: ${props => props.background || props.theme.background};
  position: relative;
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogSidebar = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px;
  box-shadow: ${({ theme }) => theme.shadow};
  position: sticky;
  top: 100px;
  height: fit-content;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
  
  @media (max-width: 992px) {
    margin-bottom: 40px;
    position: static;
    width: 100%;
  }
`;

const BlogContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.2fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid ${({ theme }) => theme.backgroundSecondary};
  border-radius: 50px;
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.heading};
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 40px;
`;

const CategoryItem = styled.li`
  margin-bottom: 10px;
`;

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 8px 0;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateX(5px);
  }
  
  span:last-child {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.text};
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 0.8rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

const Tag = styled(Link)`
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  padding: 5px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const RecentPostsList = styled.div`
  margin: 0 0 40px;
`;

const PostThumbnail = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const RecentPost = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundSecondary};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  &:hover {
    transform: translateX(5px);
    
    ${PostThumbnail} img {
      transform: scale(1.1);
    }
    
    ${PostThumbnail} {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostTitle = styled.h4`
  margin: 0 0 5px;
  font-size: 1rem;
  color: ${({ theme }) => theme.heading};
  transition: ${({ theme }) => theme.transition};
  
  ${RecentPost}:hover & {
    color: ${({ theme }) => theme.primary};
  }
`;

const PostDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textLight};
`;

const BlogCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const BlogCardImage = styled.div`
  height: 220px;
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
    z-index: 1;
    transition: opacity 0.3s ease;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${BlogCard}:hover & img {
    transform: scale(1.05);
  }
`;

const BlogCardCategory = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-decoration: none;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.secondary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const BlogCardDate = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: white;
  font-size: 0.9rem;
  z-index: 2;
`;

const BlogCardContent = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BlogCardTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 15px;
  color: ${({ theme }) => theme.heading};
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: ${({ theme }) => theme.gradient};
    transition: width 0.3s ease;
  }
  
  ${BlogCard}:hover &:after {
    width: 100px;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const BlogCardExcerpt = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
`;

const BlogCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.backgroundSecondary};
  padding-top: 15px;
  margin-top: auto;
`;

const BlogCardAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
`;

const ReadMoreLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: ${({ theme }) => theme.transition};
  position: relative;
  padding-right: 20px;
  
  &:after {
    content: '→';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: ${({ theme }) => theme.transition};
  }
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
    
    &:after {
      right: -5px;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  background: ${props => props.active ? props.theme.gradient : props.theme.backgroundSecondary};
  color: ${props => props.active ? 'white' : props.theme.text};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow};
    background: ${props => props.active ? props.theme.gradient : props.theme.backgroundSecondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Newsletter = styled.div`
  margin-top: 40px;
  padding: 30px;
  background: ${({ theme }) => theme.gradient};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: white;
  text-align: center;
`;

const NewsletterTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 15px;
`;

const NewsletterDescription = styled.p`
  margin-bottom: 20px;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 10px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const NewsletterButton = styled.button`
  background: white;
  color: ${({ theme }) => theme.primary};
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const BlogPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    // Initialize AOS with staggered animations
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-out-cubic',
      delay: 50
    });
    window.scrollTo(0, 0);
  }, []);

  // Mock blog posts data (in a real app, this would come from an API)
  const blogPosts = [
    {
      id: 1,
      title: 'How to Improve Your SEO Rankings in 2023',
      excerpt: 'Learn the latest strategies and techniques to boost your website\'s search engine rankings and drive more organic traffic.',
      image: 'https://via.placeholder.com/800x600',
      category: 'SEO',
      date: 'April 10, 2023',
      author: {
        name: 'John Smith',
        avatar: 'https://via.placeholder.com/100'
      }
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Social Media Marketing',
      excerpt: 'Discover how to create a winning social media strategy that engages your audience and drives conversions.',
      image: 'https://via.placeholder.com/800x600',
      category: 'Social Media',
      date: 'March 28, 2023',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/100'
      }
    },
    {
      id: 3,
      title: 'E-commerce Trends to Watch in 2023',
      excerpt: 'Stay ahead of the competition by implementing these trending e-commerce strategies and technologies.',
      image: 'https://via.placeholder.com/800x600',
      category: 'E-commerce',
      date: 'March 15, 2023',
      author: {
        name: 'Michael Brown',
        avatar: 'https://via.placeholder.com/100'
      }
    },
    {
      id: 4,
      title: 'Why Content Marketing is Essential for Your Business',
      excerpt: 'Learn how content marketing can help establish your brand as an authority and drive customer engagement.',
      image: 'https://via.placeholder.com/800x600',
      category: 'Content',
      date: 'February 22, 2023',
      author: {
        name: 'Lisa Anderson',
        avatar: 'https://via.placeholder.com/100'
      }
    },
    {
      id: 5,
      title: 'Maximizing ROI on PPC Campaigns',
      excerpt: 'Optimize your pay-per-click advertising to get the best return on investment and reach your target audience.',
      image: 'https://via.placeholder.com/800x600',
      category: 'PPC',
      date: 'February 10, 2023',
      author: {
        name: 'David Wilson',
        avatar: 'https://via.placeholder.com/100'
      }
    },
    {
      id: 6,
      title: 'The Importance of Mobile-First Design',
      excerpt: 'With mobile traffic exceeding desktop, learn why your website needs to prioritize the mobile user experience.',
      image: 'https://via.placeholder.com/800x600',
      category: 'Web Design',
      date: 'January 28, 2023',
      author: {
        name: 'Emma Davis',
        avatar: 'https://via.placeholder.com/100'
      }
    }
  ];

  return (
    <BlogContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle data-aos="fade-up">{t('blog.title')}</HeroTitle>
          <HeroText data-aos="fade-up" data-aos-delay="100">
            {t('blog.description')}
          </HeroText>
        </HeroContent>
      </HeroSection>
      
      {/* Blog Content Section */}
      <Section>
        <BlogContent>
          <div>
            <BlogGrid>
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} data-aos="fade-up" data-aos-delay={100 + (index * 50)}>
                  <BlogCardImage>
                    <img src={post.image} alt={post.title} />
                    <BlogCardCategory to={`/category/${post.category.toLowerCase()}`}>
                      {post.category}
                    </BlogCardCategory>
                    <BlogCardDate>{post.date}</BlogCardDate>
                  </BlogCardImage>
                  <BlogCardContent>
                    <BlogCardTitle>
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </BlogCardTitle>
                    <BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
                    <BlogCardFooter>
                      <BlogCardAuthor>
                        <AuthorAvatar>
                          <img src={post.author.avatar} alt={post.author.name} />
                        </AuthorAvatar>
                        <AuthorName>{post.author.name}</AuthorName>
                      </BlogCardAuthor>
                      <ReadMoreLink to={`/blog/${post.id}`}>
                        {t('blog.readMore')} <i className="fas fa-arrow-right"></i>
                      </ReadMoreLink>
                    </BlogCardFooter>
                  </BlogCardContent>
                </BlogCard>
              ))}
            </BlogGrid>
            
            <Pagination>
              <PaginationButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                &lt;
              </PaginationButton>
              <PaginationButton active={currentPage === 1} onClick={() => setCurrentPage(1)}>1</PaginationButton>
              <PaginationButton active={currentPage === 2} onClick={() => setCurrentPage(2)}>2</PaginationButton>
              <PaginationButton active={currentPage === 3} onClick={() => setCurrentPage(3)}>3</PaginationButton>
              <PaginationButton disabled={currentPage === 3} onClick={() => setCurrentPage(currentPage + 1)}>
                &gt;
              </PaginationButton>
            </Pagination>
          </div>
          
          <BlogSidebar data-aos="fade-left">
            <SearchBox>
              <SearchInput placeholder="Search..." />
              <SearchButton>
                <i className="fas fa-search"></i>
              </SearchButton>
            </SearchBox>
            
            <CategoryTitle>{t('blog.categories')}</CategoryTitle>
            <CategoryList>
              <CategoryItem>
                <CategoryLink to="/blog/category/seo">
                  <span>SEO</span>
                  <span>12</span>
                </CategoryLink>
              </CategoryItem>
              <CategoryItem>
                <CategoryLink to="/blog/category/social-media">
                  <span>Social Media</span>
                  <span>9</span>
                </CategoryLink>
              </CategoryItem>
              <CategoryItem>
                <CategoryLink to="/blog/category/content">
                  <span>Content Marketing</span>
                  <span>15</span>
                </CategoryLink>
              </CategoryItem>
              <CategoryItem>
                <CategoryLink to="/blog/category/ppc">
                  <span>PPC</span>
                  <span>7</span>
                </CategoryLink>
              </CategoryItem>
              <CategoryItem>
                <CategoryLink to="/blog/category/web-design">
                  <span>Web Design</span>
                  <span>10</span>
                </CategoryLink>
              </CategoryItem>
              <CategoryItem>
                <CategoryLink to="/blog/category/e-commerce">
                  <span>E-commerce</span>
                  <span>8</span>
                </CategoryLink>
              </CategoryItem>
            </CategoryList>
            
            <CategoryTitle>{t('blog.recent')}</CategoryTitle>
            <RecentPostsList>
              {blogPosts.slice(0, 3).map(post => (
                <RecentPost key={post.id} to={`/blog/${post.id}`}>
                  <PostThumbnail>
                    <img src={post.image} alt={post.title} />
                  </PostThumbnail>
                  <PostInfo>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDate>{post.date}</PostDate>
                  </PostInfo>
                </RecentPost>
              ))}
            </RecentPostsList>
            
            <CategoryTitle>{t('blog.tags')}</CategoryTitle>
            <TagsContainer>
              <Tag to="/blog/tag/seo">SEO</Tag>
              <Tag to="/blog/tag/marketing">Marketing</Tag>
              <Tag to="/blog/tag/social">Social Media</Tag>
              <Tag to="/blog/tag/content">Content</Tag>
              <Tag to="/blog/tag/analytics">Analytics</Tag>
              <Tag to="/blog/tag/ecommerce">E-commerce</Tag>
              <Tag to="/blog/tag/email">Email</Tag>
              <Tag to="/blog/tag/strategy">Strategy</Tag>
            </TagsContainer>
            
            <Newsletter>
              <NewsletterTitle>{t('blog.newsletter.title')}</NewsletterTitle>
              <NewsletterDescription>{t('blog.newsletter.description')}</NewsletterDescription>
              <NewsletterForm>
                <NewsletterInput type="email" placeholder="Email Address" />
                <NewsletterButton type="submit">Subscribe</NewsletterButton>
              </NewsletterForm>
            </Newsletter>
          </BlogSidebar>
        </BlogContent>
      </Section>
    </BlogContainer>
  );
};

export default BlogPage;
