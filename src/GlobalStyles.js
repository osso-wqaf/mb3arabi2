import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Adjust based on navbar height */
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.5s ease, color 0.5s ease;
    overflow-x: hidden;
    min-height: 100vh;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.heading};
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }
  
  h3 {
    font-size: 1.75rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: ${({ theme }) => theme.secondary};
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }
  
  ul {
    list-style: none;
  }
  
  img {
    max-width: 100%;
  }
  
  input, textarea {
    font-family: inherit;
  }
  
  /* Add padding to account for fixed navbar */
  main {
    padding-top: 70px !important; /* Force padding to account for navbar */
    
    @media (max-width: 768px) {
      padding-top: 60px !important;
    }
  }
  
  /* Ensure fixed navbar stays on top */
  body {
    overflow-x: hidden;
  }
  
  /* Custom scrollbar for better dark mode experience */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundSecondary};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

export default GlobalStyles;
