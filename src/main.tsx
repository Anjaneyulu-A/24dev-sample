import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './global.css'; // Add this line
import { HelmetProvider } from 'react-helmet-async'; // 1. Import HelmetProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>  
      <App />
    </HelmetProvider>
  </StrictMode>
);

