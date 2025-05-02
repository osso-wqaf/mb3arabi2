import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  padding: 80px 5% 40px;
  text-align: left;
  direction: ltr;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const FooterLogo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const FooterDescription = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  transition: ${({ theme }) => theme.transition};
  border: 1px solid ${({ theme }) => theme.border};
  
  &:hover {
    background: ${({ theme }) => theme.gradient};
    color: white;
    transform: translateY(-5px);
    border: 1px solid transparent;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.heading};
  position: relative;
  padding-bottom: 15px;
  
  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
    bottom: 0;
    left: 0;
    border-radius: 2px;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 12px;
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition};
    display: flex;
    align-items: center;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
      transform: translateX(5px);
    }
    
    i {
      margin-right: 10px;
      color: ${({ theme }) => theme.primary};
      font-size: 0.8rem;
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  
  i {
    margin-right: 15px;
    margin-top: 5px;
    color: ${({ theme }) => theme.primary};
  }
  
  div {
    flex: 1;
  }
  
  h4 {
    margin: 0 0 5px;
    color: ${({ theme }) => theme.heading};
    font-size: 1rem;
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NewsletterInput = styled.input`
  padding: 15px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  transition: ${({ theme }) => theme.transition};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryLight};
  }
`;

const NewsletterButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 30px;
  margin-top: 50px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Copyright = styled.p`
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition};
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <LogoContainer>
            <FooterLogo to="/">{t('navbar.logo')}</FooterLogo>
          </LogoContainer>
          <FooterDescription>
            {t('footer.description')}
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>{t('footer.quickLinks')}</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <Link to="/">
                <i className="fas fa-chevron-right"></i> {t('navbar.home')}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/services">
                <i className="fas fa-chevron-right"></i> {t('navbar.services')}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/about">
                <i className="fas fa-chevron-right"></i> {t('navbar.about')}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/blog">
                <i className="fas fa-chevron-right"></i> {t('navbar.blog')}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/contact">
                <i className="fas fa-chevron-right"></i> {t('navbar.contact')}
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>{t('footer.services')}</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <Link to="/services#seo">
                <i className="fas fa-chevron-right"></i> {t('services.mainServices.seo.title')}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/services#ppc">
                <i className="fas fa-chevron-right"></i> {t('services.mainServices.ppc.title')}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/services#social">
                <i className="fas fa-chevron-right"></i> {t('services.mainServices.social.title')}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link to="/services#web">
                <i className="fas fa-chevron-right"></i> {t('services.mainServices.web.title')}
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>{t('footer.contact')}</FooterTitle>
          <ContactInfo>
            <ContactItem>
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>{t('footer.address.title')}</h4>
                <p>{t('footer.address.value')}</p>
              </div>
            </ContactItem>
            <ContactItem>
              <i className="fas fa-phone-alt"></i>
              <div>
                <h4>{t('footer.phone.title')}</h4>
                <p>{t('footer.phone.value')}</p>
              </div>
            </ContactItem>
            <ContactItem>
              <i className="fas fa-envelope"></i>
              <div>
                <h4>{t('footer.email.title')}</h4>
                <p>{t('footer.email.value')}</p>
              </div>
            </ContactItem>
          </ContactInfo>
          <NewsletterForm>
            <NewsletterInput type="email" placeholder={t('footer.newsletter.placeholder')} />
            <NewsletterButton type="submit">{t('footer.newsletter.button')}</NewsletterButton>
          </NewsletterForm>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          {t('footer.copyright', { year: currentYear })}
        </Copyright>
        <FooterBottomLinks>
          <Link to="/privacy">{t('footer.privacy')}</Link>
          <Link to="/terms">{t('footer.terms')}</Link>
          <Link to="/sitemap">{t('footer.sitemap')}</Link>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
