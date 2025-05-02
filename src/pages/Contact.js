import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactContainer = styled.div`
  text-align: left;
  direction: ltr;
  padding-top: 80px; /* To account for fixed navbar */
`;

const HeroSection = styled.section`
  background-image: url(${props => props.background || 'https://via.placeholder.com/1920x1080'});
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ContactSection = styled.section`
  padding: 5rem 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;
  color: ${({ theme }) => theme.heading};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.heading};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
  }
`;

const ContactInfo = styled.div`
  padding: 2rem;
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;
  color: ${({ theme }) => theme.heading};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
  }
`;

const InfoText = styled.p`
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const InfoItem = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 10px;
  
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const InfoIcon = styled.div`
  margin-right: 1rem;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  ${InfoItem}:hover & {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h4`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.heading};
`;

const MapSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.backgroundSecondary};
`;

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
`;

const MapTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -15px;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
  }
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 450px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    
    // Prevent any page jumping or scrolling on submit
    window.scrollTo({
      top: window.scrollY,
      behavior: 'auto'
    });
    
    // Set form as submitted and clear the form
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // After 3 seconds, hide the success message
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  return (
    <ContactContainer>
      <HeroSection background="https://images.unsplash.com/photo-1557804506-669a67965ba0">
        <HeroContent data-aos="fade-right">
          <HeroTitle>Contact Us</HeroTitle>
          <HeroDescription>
            Have questions or need assistance? We're here to help. Reach out to our team using the contact information below.
          </HeroDescription>
        </HeroContent>
      </HeroSection>
      
      <ContactSection>
        <ContactGrid>
          <ContactForm onSubmit={handleSubmit} data-aos="fade-up">
            <FormTitle>Send Us a Message</FormTitle>
            
            {formSubmitted && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '1rem',
                borderRadius: '5px',
                marginBottom: '1.5rem'
              }}>
                Your message has been sent successfully!
              </div>
            )}
            
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <FormInput 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
          
          <ContactInfo data-aos="fade-up" data-aos-delay="200">
            <InfoTitle>Contact Information</InfoTitle>
            <InfoText>
              Feel free to get in touch with us. We're always ready to help with any questions or concerns.
            </InfoText>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-map-marker-alt"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Our Location</InfoLabel>
                <p>123 Business Avenue, New York, NY 10001</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-phone-alt"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Call Us</InfoLabel>
                <p>+1 (555) 123-4567</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-envelope"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email Us</InfoLabel>
                <p>info@yourcompany.com</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-clock"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Business Hours</InfoLabel>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              </InfoContent>
            </InfoItem>
          </ContactInfo>
        </ContactGrid>
      </ContactSection>
      
      <MapSection>
        <MapContainer>
          <MapTitle data-aos="fade-up">Find Us on the Map</MapTitle>
          <MapFrame 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256349542!2d-73.98784492404069!3d40.75790657138285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            data-aos="zoom-in"
          />
        </MapContainer>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;
