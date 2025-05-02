import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Importamos i18n (debe ser importado antes que App)
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Solo importamos Bootstrap, eliminamos referencias a AdminLTE
import 'bootstrap/dist/css/bootstrap.min.css';

// Agregamos CSS básico
const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  header {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
  }
`;
document.head.appendChild(style);

// Establecemos la dirección inicial del documento como RTL para árabe (idioma predeterminado)
document.documentElement.setAttribute('dir', 'rtl');
document.body.style.direction = 'rtl';
document.body.style.textAlign = 'right';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
